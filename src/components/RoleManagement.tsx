import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get, set, remove } from 'firebase/database';
import { app } from '../firebase';
import { createEmailKey } from '../utils/initializeAuthorizedUsers';
import { UserPlus, Trash2, Shield, Users as UsersIcon, AlertCircle, CheckCircle, Mail, Calendar, Loader } from 'lucide-react';

interface AuthorizedUser {
  email: string;
  role: 'admin' | 'teacher';
  addedAt: string;
  addedBy: string;
  status: 'active' | 'inactive';
  lastLoginAt?: string;
}

interface RoleManagementProps {
  currentUserEmail: string;
}

export function RoleManagement({ currentUserEmail }: RoleManagementProps) {
  const [authorizedUsers, setAuthorizedUsers] = useState<Record<string, AuthorizedUser>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'admin' | 'teacher'>('teacher');
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const db = getDatabase(app);

  useEffect(() => {
    loadAuthorizedUsers();
  }, []);

  const loadAuthorizedUsers = async () => {
    setIsLoading(true);
    try {
      const snapshot = await get(ref(db, 'authorizedUsers'));
      if (snapshot.exists()) {
        setAuthorizedUsers(snapshot.val());
      } else {
        setAuthorizedUsers({});
      }
    } catch (error) {
      console.error('Error loading authorized users:', error);
      setError('Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsAdding(true);

    try {
      const emailKey = createEmailKey(newEmail);
      const userRef = ref(db, `authorizedUsers/${emailKey}`);
      const userSnapshot = await get(userRef);

      if (userSnapshot.exists()) {
        setError('This email is already authorized');
        setIsAdding(false);
        return;
      }

      // Add new user
      await set(userRef, {
        email: newEmail,
        role: newRole,
        addedAt: new Date().toISOString(),
        addedBy: currentUserEmail,
        status: 'active'
      });

      setSuccess(`Successfully added ${newEmail} as ${newRole}`);
      setNewEmail('');
      setNewRole('teacher');
      setShowAddModal(false);
      loadAuthorizedUsers();
    } catch (error) {
      console.error('Error adding user:', error);
      setError('Failed to add user. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemoveUser = async (emailKey: string, email: string) => {
    // Prevent removing self
    if (email === currentUserEmail) {
      setError('You cannot remove yourself');
      return;
    }

    if (!window.confirm(`Are you sure you want to remove ${email}?`)) {
      return;
    }

    try {
      await remove(ref(db, `authorizedUsers/${emailKey}`));
      setSuccess(`Successfully removed ${email}`);
      loadAuthorizedUsers();
    } catch (error) {
      console.error('Error removing user:', error);
      setError('Failed to remove user');
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="w-7 h-7 text-purple-600" />
            Role Management
          </h2>
          <p className="text-gray-600 mt-1">Manage authorized admin and teacher access</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          data-testid="add-user-button"
        >
          <UserPlus className="w-5 h-5" />
          Add User
        </button>
      </div>

      {/* Success/Error Messages */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <p className="text-red-900 text-sm">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <p className="text-green-900 text-sm">{success}</p>
        </div>
      )}

      {/* Users List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Added
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Object.entries(authorizedUsers).length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No authorized users found
                  </td>
                </tr>
              ) : (
                Object.entries(authorizedUsers).map(([key, user]) => (
                  <tr key={key} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">{user.email}</span>
                        {user.email === currentUserEmail && (
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">You</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === 'admin'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {user.role === 'admin' ? <Shield className="w-3 h-3" /> : <UsersIcon className="w-3 h-3" />}
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {formatDate(user.addedAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(user.lastLoginAt)}
                    </td>
                    <td className="px-6 py-4">
                      {user.email !== currentUserEmail && (
                        <button
                          onClick={() => handleRemoveUser(key, user.email)}
                          className="text-red-600 hover:text-red-700 transition-colors flex items-center gap-1 text-sm font-medium"
                          data-testid={`remove-user-${key}`}
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Add New User</h3>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                  disabled={isAdding}
                  data-testid="new-email-input"
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  id="role"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as 'admin' | 'teacher')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled={isAdding}
                  data-testid="new-role-select"
                >
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setNewEmail('');
                    setError('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={isAdding}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAdding}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  data-testid="submit-add-user"
                >
                  {isAdding ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    'Add User'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
