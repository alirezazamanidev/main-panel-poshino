import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AuthState {
  phone: string | null;
  isAuthenticated: boolean;
  token: string | null;
  setPhone: (phone: string) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

const initialState = {
  phone: null,
  isAuthenticated: false,
  token: null,
};

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        setPhone: (phone: string) =>
          set((state) => ({ ...state, phone }), false, 'setPhone'),

        setToken: (token: string) => {
          // Set token in cookie for server-side access
          if (typeof window !== 'undefined') {
            document.cookie = `auth-token=${token}; path=/; max-age=${
              7 * 24 * 60 * 60
            }; SameSite=lax`;
          }

          set(
            (state) => ({
              ...state,
              token,
              isAuthenticated: true,
            }),
            false,
            'setToken',
          );
        },

        logout: () => {
          // Remove token from cookie
          if (typeof window !== 'undefined') {
            document.cookie =
              'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
          }

          set(initialState, false, 'logout');
        },
      }),
      {
        name: 'auth-storage',
        // فقط این فیلدها در localStorage ذخیره می‌شوند
        partialize: (state) => ({
          token: state.token,
          phone: state.phone,
          isAuthenticated: state.isAuthenticated,
        }),
      },
    ),
  ),
);
