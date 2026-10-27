import { icon } from '../icons.js';
import {
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle,
  sendResetEmail,
} from '../services/authService.js';
import { showToast } from '../utils/toast.js';

let activeTab = 'login'; // 'login' | 'register' | 'reset'
let errorMessage = '';
let successMessage = '';
let isLoading = false;

export function openAuthModal(container, defaultTab = 'login', onSuccess = null) {
  activeTab = defaultTab;
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  function render() {
    container.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
        <div
          role="dialog"
          aria-modal="true"
          class="relative w-full max-w-md bg-[#141414] border border-neutral-800 rounded-xl p-6 sm:p-7 shadow-2xl overflow-hidden"
        >
          <!-- Top subtle glow highlight -->
          <div class="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-20 bg-gradient-to-b from-white/10 to-transparent blur-xl pointer-events-none"></div>

          <!-- Close button -->
          <button
            id="auth-modal-close"
            aria-label="Close dialog"
            class="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            ${icon('x', 'w-5 h-5')}
          </button>

          <!-- Header -->
          <div class="flex items-center gap-3 mb-5">
            <div class="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white font-mono font-bold text-base shadow-inner">
              ${icon('sparkles', 'w-5 h-5 text-amber-300')}
            </div>
            <div>
              <h2 class="text-lg font-bold text-white tracking-tight">
                ${
                  activeTab === 'login'
                    ? 'Welcome Back'
                    : activeTab === 'register'
                    ? 'Create Your Account'
                    : 'Reset Password'
                }
              </h2>
              <p class="text-xs text-neutral-400 mt-0.5">
                ${
                  activeTab === 'login'
                    ? 'Sign in to access your Firestore cloud study data.'
                    : activeTab === 'register'
                    ? 'Sync your timetable, tasks, and streaks on all devices.'
                    : 'Enter your email to receive a password reset link.'
                }
              </p>
            </div>
          </div>

          <!-- Tab Selector (Login vs Register) -->
          ${
            activeTab !== 'reset'
              ? `
            <div class="flex items-center bg-[#0C0C0C] p-1 rounded-lg border border-neutral-800 mb-5">
              <button
                id="auth-tab-login"
                class="flex-1 py-1.5 text-xs font-mono font-medium rounded-md transition-all cursor-pointer ${
                  activeTab === 'login'
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }"
              >
                Sign In
              </button>
              <button
                id="auth-tab-register"
                class="flex-1 py-1.5 text-xs font-mono font-medium rounded-md transition-all cursor-pointer ${
                  activeTab === 'register'
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }"
              >
                Register
              </button>
            </div>
          `
              : ''
          }

          <!-- Alert / Error message -->
          ${
            errorMessage
              ? `
            <div class="mb-4 p-3 rounded-lg bg-rose-950/40 border border-rose-800/80 text-rose-200 text-xs flex items-start gap-2">
              ${icon('alertCircle', 'w-4 h-4 text-rose-400 shrink-0 mt-0.5')}
              <div class="leading-relaxed">${errorMessage}</div>
            </div>
          `
              : ''
          }

          <!-- Success message -->
          ${
            successMessage
              ? `
            <div class="mb-4 p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/80 text-emerald-200 text-xs flex items-start gap-2">
              ${icon('checkCircle2', 'w-4 h-4 text-emerald-400 shrink-0 mt-0.5')}
              <div class="leading-relaxed">${successMessage}</div>
            </div>
          `
              : ''
          }

          <!-- Forms -->
          ${
            activeTab === 'login'
              ? `
            <form id="login-form" class="space-y-4">
              <div>
                <label class="block text-xs font-mono font-medium text-neutral-300 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div class="relative">
                  <input
                    type="email"
                    id="login-email"
                    required
                    placeholder="student@example.com"
                    class="w-full bg-[#0C0C0C] border border-neutral-800 focus:border-neutral-500 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between mb-1.5">
                  <label class="text-xs font-mono font-medium text-neutral-300 uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    id="goto-reset-btn"
                    class="text-[11px] text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <input
                  type="password"
                  id="login-password"
                  required
                  placeholder="••••••••"
                  class="w-full bg-[#0C0C0C] border border-neutral-800 focus:border-neutral-500 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                ${isLoading ? 'disabled' : ''}
                class="w-full py-2.5 px-4 rounded-lg bg-white hover:bg-neutral-200 text-black font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
              >
                ${
                  isLoading
                    ? `${icon('refreshCw', 'w-3.5 h-3.5 animate-spin text-black')} <span>Signing In...</span>`
                    : `<span>Sign In to Firestore</span> ${icon('arrowRight', 'w-3.5 h-3.5')}`
                }
              </button>
            </form>
          `
              : activeTab === 'register'
              ? `
            <form id="register-form" class="space-y-3.5">
              <div>
                <label class="block text-xs font-mono font-medium text-neutral-300 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="reg-name"
                  placeholder="e.g. Amarjith Anand"
                  class="w-full bg-[#0C0C0C] border border-neutral-800 focus:border-neutral-500 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label class="block text-xs font-mono font-medium text-neutral-300 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="reg-email"
                  required
                  placeholder="student@example.com"
                  class="w-full bg-[#0C0C0C] border border-neutral-800 focus:border-neutral-500 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label class="block text-xs font-mono font-medium text-neutral-300 uppercase tracking-wider mb-1">
                  Create Password (min 6 chars)
                </label>
                <input
                  type="password"
                  id="reg-password"
                  required
                  minlength="6"
                  placeholder="••••••••"
                  class="w-full bg-[#0C0C0C] border border-neutral-800 focus:border-neutral-500 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label class="block text-xs font-mono font-medium text-neutral-300 uppercase tracking-wider mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="reg-confirm-password"
                  required
                  minlength="6"
                  placeholder="••••••••"
                  class="w-full bg-[#0C0C0C] border border-neutral-800 focus:border-neutral-500 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 outline-none transition-colors"
                />
              </div>

              <div class="p-2.5 bg-neutral-900/60 rounded-lg border border-neutral-800/80 text-[11px] text-neutral-300 space-y-1">
                <div class="flex items-center gap-1.5 text-neutral-200 font-medium">
                  ${icon('checkCircle2', 'w-3 h-3 text-emerald-400')}
                  <span>Real-time cloud backup on Google Firestore</span>
                </div>
                <div class="flex items-center gap-1.5 text-neutral-200 font-medium">
                  ${icon('checkCircle2', 'w-3 h-3 text-emerald-400')}
                  <span>No rigid schedule &mdash; full control over your tasks</span>
                </div>
              </div>

              <button
                type="submit"
                ${isLoading ? 'disabled' : ''}
                class="w-full py-2.5 px-4 rounded-lg bg-white hover:bg-neutral-200 text-black font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
              >
                ${
                  isLoading
                    ? `${icon('refreshCw', 'w-3.5 h-3.5 animate-spin text-black')} <span>Creating Account...</span>`
                    : `<span>Create Free Account</span> ${icon('arrowRight', 'w-3.5 h-3.5')}`
                }
              </button>
            </form>
          `
              : `
            <!-- Reset Password view -->
            <form id="reset-form" class="space-y-4">
              <div>
                <label class="block text-xs font-mono font-medium text-neutral-300 uppercase tracking-wider mb-1.5">
                  Your Account Email
                </label>
                <input
                  type="email"
                  id="reset-email"
                  required
                  placeholder="student@example.com"
                  class="w-full bg-[#0C0C0C] border border-neutral-800 focus:border-neutral-500 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                ${isLoading ? 'disabled' : ''}
                class="w-full py-2.5 px-4 rounded-lg bg-white hover:bg-neutral-200 text-black font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
              >
                ${
                  isLoading
                    ? `${icon('refreshCw', 'w-3.5 h-3.5 animate-spin text-black')} <span>Sending Link...</span>`
                    : `<span>Send Password Reset Email</span>`
                }
              </button>

              <div class="text-center">
                <button
                  type="button"
                  id="back-to-login-btn"
                  class="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1"
                >
                  ${icon('chevronLeft', 'w-3.5 h-3.5')}
                  <span>Back to Sign In</span>
                </button>
              </div>
            </form>
          `
          }

          <!-- Google Sign-in & Guest Option -->
          ${
            activeTab !== 'reset'
              ? `
            <div class="relative my-4">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-neutral-800"></div>
              </div>
              <div class="relative flex justify-center text-[10px] uppercase font-mono tracking-wider">
                <span class="bg-[#141414] px-2 text-neutral-500">Or continue with</span>
              </div>
            </div>

            <div class="space-y-2">
              <button
                type="button"
                id="auth-google-btn"
                ${isLoading ? 'disabled' : ''}
                class="w-full py-2 px-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 hover:border-neutral-500 text-white font-medium text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div class="text-center pt-1">
                <button
                  type="button"
                  id="auth-guest-btn"
                  class="text-[11px] text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer underline decoration-dotted"
                >
                  Continue in Offline Guest Mode (Local Storage)
                </button>
              </div>
            </div>
          `
              : ''
          }
        </div>
      </div>
    `;

    // Attach event listeners
    container.querySelector('#auth-modal-close')?.addEventListener('click', () => {
      container.innerHTML = '';
    });

    container.querySelector('#auth-tab-login')?.addEventListener('click', () => {
      activeTab = 'login';
      errorMessage = '';
      successMessage = '';
      render();
    });

    container.querySelector('#auth-tab-register')?.addEventListener('click', () => {
      activeTab = 'register';
      errorMessage = '';
      successMessage = '';
      render();
    });

    container.querySelector('#goto-reset-btn')?.addEventListener('click', () => {
      activeTab = 'reset';
      errorMessage = '';
      successMessage = '';
      render();
    });

    container.querySelector('#back-to-login-btn')?.addEventListener('click', () => {
      activeTab = 'login';
      errorMessage = '';
      successMessage = '';
      render();
    });

    // Close on guest click
    container.querySelector('#auth-guest-btn')?.addEventListener('click', () => {
      container.innerHTML = '';
      showToast('Running in local guest mode. Sign in anytime to sync to cloud.', 'info');
    });

    // Google Sign-in
    container.querySelector('#auth-google-btn')?.addEventListener('click', async () => {
      try {
        isLoading = true;
        errorMessage = '';
        render();
        const user = await loginWithGoogle();
        container.innerHTML = '';
        showToast(`Signed in as <b>${user.displayName || user.email}</b>! Cloud sync active.`, 'success');
        if (onSuccess) onSuccess(user);
      } catch (err) {
        isLoading = false;
        errorMessage = formatAuthError(err);
        render();
      }
    });

    // Login Form Submit
    container.querySelector('#login-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = container.querySelector('#login-email')?.value || '';
      const password = container.querySelector('#login-password')?.value || '';

      if (!email || !password) return;

      try {
        isLoading = true;
        errorMessage = '';
        render();
        const user = await loginWithEmail(email, password);
        container.innerHTML = '';
        showToast(`Welcome back, <b>${user.displayName || user.email}</b>!`, 'success');
        if (onSuccess) onSuccess(user);
      } catch (err) {
        isLoading = false;
        errorMessage = formatAuthError(err);
        render();
      }
    });

    // Register Form Submit
    container.querySelector('#register-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = container.querySelector('#reg-name')?.value || '';
      const email = container.querySelector('#reg-email')?.value || '';
      const password = container.querySelector('#reg-password')?.value || '';
      const confirmPassword = container.querySelector('#reg-confirm-password')?.value || '';

      if (password !== confirmPassword) {
        errorMessage = 'Passwords do not match. Please verify.';
        render();
        return;
      }

      if (password.length < 6) {
        errorMessage = 'Password must be at least 6 characters.';
        render();
        return;
      }

      try {
        isLoading = true;
        errorMessage = '';
        render();
        const user = await registerWithEmail(email, password, name);
        container.innerHTML = '';
        showToast(`Account created! Welcome, <b>${user.displayName || user.email}</b>.`, 'success');
        if (onSuccess) onSuccess(user);
      } catch (err) {
        isLoading = false;
        errorMessage = formatAuthError(err);
        render();
      }
    });

    // Reset Form Submit
    container.querySelector('#reset-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = container.querySelector('#reset-email')?.value || '';
      if (!email) return;

      try {
        isLoading = true;
        errorMessage = '';
        render();
        await sendResetEmail(email);
        isLoading = false;
        successMessage = `Password reset instructions sent to ${email}. Check your inbox.`;
        render();
      } catch (err) {
        isLoading = false;
        errorMessage = formatAuthError(err);
        render();
      }
    });
  }

  render();
}

/**
 * Format Firebase Auth error codes into helpful user messages
 */
function formatAuthError(err) {
  const code = err?.code || '';
  switch (code) {
    case 'auth/user-not-found':
      return 'No account exists with this email. Please click "Register" to create one.';
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Incorrect email or password. Please verify your credentials.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists. Please Sign In.';
    case 'auth/weak-password':
      return 'Password is too weak. Please use at least 6 characters.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in window was closed before completing.';
    default:
      return err?.message || 'Authentication failed. Please check your network and try again.';
  }
}
