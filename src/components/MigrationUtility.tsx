import { useState } from 'react';
import { storage } from '../utils/storage';
import { Database, Upload, CheckCircle, AlertCircle, Loader } from 'lucide-react';

export function MigrationUtility() {
  const [isOpen, setIsOpen] = useState(false);
  const [migrating, setMigrating] = useState(false);
  const [result, setResult] = useState<{ success: boolean; migrated: number; errors: number } | null>(null);

  const handleMigrate = async () => {
    setMigrating(true);
    setResult(null);

    try {
      const migrationResult = await storage.migrateLocalStorageToFirebase();
      setResult(migrationResult);
    } catch (error) {
      console.error('Migration error:', error);
      setResult({ success: false, migrated: 0, errors: 1 });
    } finally {
      setMigrating(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-all hover:scale-110 z-50"
        title="Data Migration Tool"
      >
        <Database className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Database className="w-6 h-6 text-purple-600" />
            Data Migration Tool
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800 mb-2">
              <strong>What does this do?</strong>
            </p>
            <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
              <li>Migrates submissions from localStorage to Firebase</li>
              <li>Creates hierarchical structure by track and exam code</li>
              <li>Backs up your localStorage data automatically</li>
              <li>Safe to run multiple times</li>
            </ul>
          </div>

          {result && (
            <div className={`rounded-lg p-4 ${result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-start gap-3">
                {result.success ? (
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className={`font-medium ${result.success ? 'text-green-800' : 'text-red-800'}`}>
                    {result.success ? 'Migration Complete!' : 'Migration Failed'}
                  </p>
                  <div className="text-sm mt-2 space-y-1">
                    <p className="text-green-700">✓ {result.migrated} submissions migrated</p>
                    {result.errors > 0 && (
                      <p className="text-red-700">✗ {result.errors} errors</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {migrating ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <Loader className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-3" />
                <p className="text-gray-600 font-medium">Migrating data...</p>
                <p className="text-sm text-gray-500 mt-1">This may take a moment</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <button
                onClick={handleMigrate}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                <Upload className="w-5 h-5" />
                Start Migration
              </button>
              
              <button
                onClick={() => setIsOpen(false)}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          )}

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <p className="text-xs text-gray-600">
              <strong>Note:</strong> Your data is automatically synced between localStorage and Firebase. This tool is only needed if you have old data that hasn't been synced yet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
