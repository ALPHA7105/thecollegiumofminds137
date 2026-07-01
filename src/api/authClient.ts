// Local mock implementation of authentication and database clients for standard client-side persistence
import { Member } from '../types';

const USERS_KEY = 'com_users';
const CURRENT_USER_KEY = 'com_current_user';
const APPLICATIONS_KEY = 'com_applications';

// Initialize default mock users if not present
if (!localStorage.getItem(USERS_KEY)) {
  localStorage.setItem(USERS_KEY, JSON.stringify([
    { email: 'sarvesh@collegium.org', password: 'password', role: 'admin', name: 'Sarvesh Kore' },
    { email: 'joel@collegium.org', password: 'password', role: 'member', name: 'Joel Mendonca' },
    { email: 'ssworld7105@gmail.com', password: 'password', role: 'admin', name: 'ssworld7105' }
  ]));
}

const getUsers = () => JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
const saveUsers = (users: any[]) => localStorage.setItem(USERS_KEY, JSON.stringify(users));

export const authClient = {
  auth: {
    loginViaEmailPassword: async (email: string, password: string) => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 600));
      const users = getUsers();
      const user = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
      if (!user) {
        throw new Error('User not registered. Please create an account.');
      }
      if (user.password !== password) {
        throw new Error('Invalid password. Please try again.');
      }
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      return user;
    },

    loginWithProvider: (provider: string, path: string) => {
      // Direct redirect with standard Google identity mock
      const mockGoogleUser = {
        email: 'ssworld7105@gmail.com',
        role: 'admin',
        name: 'ssworld7105'
      };
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(mockGoogleUser));
      window.location.href = path || '/';
    },

    register: async ({ email, password }: any) => {
      await new Promise((resolve) => setTimeout(resolve, 700));
      const users = getUsers();
      if (users.some((u: any) => u.email.toLowerCase() === email.toLowerCase())) {
        throw new Error('An account with this email already exists.');
      }
      // Store pending registration
      localStorage.setItem('com_pending_reg', JSON.stringify({ email, password }));
      return { status: 'verification_required' };
    },

    verifyOtp: async ({ email, otpCode }: any) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const pending = localStorage.getItem('com_pending_reg');
      if (!pending) {
        throw new Error('No pending registration found.');
      }
      const { email: pendingEmail, password } = JSON.parse(pending);
      if (otpCode !== '123456' && otpCode.length === 6) {
        // Allow any 6 digit code for ease of testing
      }
      
      const users = getUsers();
      const newUser = {
        email: pendingEmail,
        password,
        role: 'member',
        name: pendingEmail.split('@')[0]
      };
      users.push(newUser);
      saveUsers(users);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
      localStorage.removeItem('com_pending_reg');
      return { access_token: 'mock_token_abc123' };
    },

    resendOtp: async (email: string) => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return { status: 'sent' };
    },

    resetPasswordRequest: async (email: string) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { status: 'sent' };
    },

    resetPassword: async ({ resetToken, newPassword }: any) => {
      await new Promise((resolve) => setTimeout(resolve, 600));
      // Just a mock update
      const pending = localStorage.getItem(CURRENT_USER_KEY);
      if (pending) {
        const user = JSON.parse(pending);
        const users = getUsers();
        const updated = users.map((u: any) => 
          u.email.toLowerCase() === user.email.toLowerCase() ? { ...u, password: newPassword } : u
        );
        saveUsers(updated);
      }
      return { status: 'success' };
    },

    me: async () => {
      let userStr = localStorage.getItem(CURRENT_USER_KEY);
      if (!userStr) {
        // Auto-login default admin user to keep doors open but bypass blocker
        const defaultUser = { email: 'ssworld7105@gmail.com', role: 'admin', name: 'Sarvesh Kore' };
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(defaultUser));
        userStr = JSON.stringify(defaultUser);
      }
      return JSON.parse(userStr);
    },

    setToken: (token: string) => {
      // Stored token
    }
  },

  entities: {
    MemberApplication: {
      create: async (data: any) => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        const applications = JSON.parse(localStorage.getItem(APPLICATIONS_KEY) || '[]');
        applications.push({
          id: `app_${Date.now()}`,
          ...data,
          submittedAt: new Date().toISOString()
        });
        localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));
        return { success: true };
      }
    }
  }
};
