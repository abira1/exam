import clsx, { type ClassValue } from 'clsx';

/**
 * Utility function to merge Tailwind CSS classes
 * Uses clsx for conditional class names
 *
 * Note: This is a simplified version without tailwind-merge
 * since the project doesn't have it installed.
 * For most use cases, this is sufficient.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

