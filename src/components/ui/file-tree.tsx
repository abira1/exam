import { useState } from "react";
import { cn } from "../../lib/utils";

export interface FileNode {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  extension?: string;
  metadata?: {
    submissionId?: string;
    examCode?: string;
    trackId?: string;
    testType?: 'partial' | 'mock';
    studentName?: string;
    submittedAt?: string;
    status?: string;
    isFullyMarked?: boolean;
    isPublished?: boolean;
  };
}

interface FileTreeProps {
  data: FileNode[];
  className?: string;
  onNodeClick?: (node: FileNode) => void;
  onContextMenu?: (node: FileNode, event: React.MouseEvent) => void;
  selectedNodeId?: string | null;
}

interface FileItemProps {
  node: FileNode;
  depth: number;
  isLast: boolean;
  parentPath: boolean[];
  onNodeClick?: (node: FileNode) => void;
  onContextMenu?: (node: FileNode, event: React.MouseEvent) => void;
  selectedNodeId?: string | null;
}

const getFileIcon = (extension?: string) => {
  const iconMap: Record<string, { color: string; icon: string }> = {
    submission: { color: "text-blue-500", icon: "📄" },
    session: { color: "text-green-500", icon: "📅" },
    default: { color: "text-muted-foreground", icon: "◇" },
  };
  return iconMap[extension || "default"] || iconMap.default;
};

function FileItem({ node, depth, isLast, parentPath, onNodeClick, onContextMenu, selectedNodeId }: FileItemProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const isFolder = node.type === "folder";
  const hasChildren = isFolder && node.children && node.children.length > 0;
  const fileIcon = getFileIcon(node.extension);
  const isSelected = selectedNodeId === node.id;

  const handleClick = () => {
    if (isFolder) {
      setIsOpen(!isOpen);
    }
    if (onNodeClick) {
      onNodeClick(node);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    // Only allow context menu on session folders (extension='session')
    if (node.extension === 'session' && onContextMenu) {
      e.preventDefault();
      e.stopPropagation();
      onContextMenu(node, e);
    }
  };

  return (
    <div className="select-none">
      <div
        className={cn(
          "group relative flex items-center gap-2 py-1.5 px-2 rounded-md cursor-pointer",
          "transition-all duration-200 ease-out",
          isSelected && "bg-blue-100 border border-blue-300",
          !isSelected && isHovered && "bg-file-tree-hover",
        )}
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {/* Tree lines */}
        {depth > 0 && (
          <div className="absolute left-0 top-0 bottom-0 flex" style={{ left: `${(depth - 1) * 16 + 16}px` }}>
            <div className={cn("w-px transition-colors duration-200", isHovered ? "bg-primary/40" : "bg-border/50")} />
          </div>
        )}

        {/* Folder/File indicator */}
        <div
          className={cn(
            "flex items-center justify-center w-4 h-4 transition-transform duration-200 ease-out",
            isFolder && isOpen && "rotate-90",
          )}
        >
          {isFolder ? (
            <svg
              width="6"
              height="8"
              viewBox="0 0 6 8"
              fill="none"
              className={cn("transition-colors duration-200", isHovered ? "text-primary" : "text-muted-foreground")}
            >
              <path
                d="M1 1L5 4L1 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <span className={cn("text-xs transition-opacity duration-200", fileIcon.color)}>{fileIcon.icon}</span>
          )}
        </div>

        {/* Icon */}
        <div
          className={cn(
            "flex items-center justify-center w-5 h-5 rounded transition-all duration-200",
            isFolder
              ? isHovered
                ? "text-folder-icon scale-110"
                : "text-folder-icon/80"
              : isHovered
                ? cn(fileIcon.color, "scale-110")
                : cn(fileIcon.color, "opacity-70"),
          )}
        >
          {isFolder ? (
            <svg width="16" height="14" viewBox="0 0 16 14" fill="currentColor">
              <path d="M1.5 1C0.671573 1 0 1.67157 0 2.5V11.5C0 12.3284 0.671573 13 1.5 13H14.5C15.3284 13 16 12.3284 16 11.5V4.5C16 3.67157 15.3284 3 14.5 3H8L6.5 1H1.5Z" />
            </svg>
          ) : (
            <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" opacity="0.8">
              <path d="M1.5 0C0.671573 0 0 0.671573 0 1.5V14.5C0 15.3284 0.671573 16 1.5 16H12.5C13.3284 16 14 15.3284 14 14.5V4.5L9.5 0H1.5Z" />
              <path d="M9 0V4.5H14" fill="currentColor" fillOpacity="0.5" />
            </svg>
          )}
        </div>

        {/* Name */}
        <span
          className={cn(
            "font-mono text-sm transition-colors duration-200",
            isFolder
              ? isHovered
                ? "text-foreground"
                : "text-foreground/90"
              : isHovered
                ? "text-foreground"
                : "text-muted-foreground",
          )}
        >
          {node.name}
        </span>

        {/* Status Indicators (for submission files only) */}
        {node.extension === 'submission' && node.metadata && (
          <div className="flex items-center gap-1.5 ml-2">
            {/* Fully Marked Indicator - Green Dot */}
            {node.metadata.isFullyMarked && (
              <div
                className="w-2 h-2 rounded-full bg-green-500 shadow-sm"
                title="Fully Marked"
              />
            )}
            {/* Published Indicator - Blue Dot */}
            {node.metadata.isPublished && (
              <div
                className="w-2 h-2 rounded-full bg-blue-500 shadow-sm"
                title="Published"
              />
            )}
          </div>
        )}

        {/* Hover indicator */}
        <div
          className={cn(
            "absolute right-2 w-1.5 h-1.5 rounded-full bg-primary transition-all duration-200",
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-0",
          )}
        />
      </div>

      {/* Children with animated height */}
      {hasChildren && (
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-out",
            isOpen ? "opacity-100" : "opacity-0 h-0",
          )}
          style={{
            maxHeight: isOpen ? `${node.children!.length * 100}px` : "0px",
          }}
        >
          {node.children!.map((child, index) => (
            <FileItem
              key={child.id}
              node={child}
              depth={depth + 1}
              isLast={index === node.children!.length - 1}
              parentPath={[...parentPath, !isLast]}
              onNodeClick={onNodeClick}
              onContextMenu={onContextMenu}
              selectedNodeId={selectedNodeId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function FileTree({ data, className, onNodeClick, onContextMenu, selectedNodeId }: FileTreeProps) {
  return (
    <div
      className={cn(
        "bg-file-tree-bg rounded-lg border border-border/50 p-3 font-mono",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 pb-3 mb-2 border-b border-border/30">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[oklch(0.65_0.2_25)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[oklch(0.75_0.18_85)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[oklch(0.65_0.18_150)]" />
        </div>
        <span className="text-xs text-muted-foreground ml-2">Submissions Explorer</span>
      </div>

      {/* Tree */}
      <div className="space-y-0.5">
        {data.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No submissions found
          </div>
        ) : (
          data.map((node, index) => (
            <FileItem
              key={node.id}
              node={node}
              depth={0}
              isLast={index === data.length - 1}
              parentPath={[]}
              onNodeClick={onNodeClick}
              onContextMenu={onContextMenu}
              selectedNodeId={selectedNodeId}
            />
          ))
        )}
      </div>
    </div>
  );
}

