/**
 * Toast notification utility for XP gains, streak milestones, and badge unlocks
 */

let toastContainer = null;

function ensureContainer() {
  if (!toastContainer || !document.body.contains(toastContainer)) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'gamification-toast-container';
    toastContainer.className =
      'fixed top-20 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full';
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

export function showToast(message, type = 'xp', duration = 3000) {
  const container = ensureContainer();

  const toast = document.createElement('div');
  toast.className =
    'pointer-events-auto flex items-center gap-3 p-3.5 rounded-lg border shadow-xl transition-all duration-300 transform translate-x-4 opacity-0 font-sans text-xs';

  if (type === 'badge') {
    toast.className += ' bg-amber-950/90 border-amber-600 text-amber-100 shadow-amber-950/50';
  } else if (type === 'bonus') {
    toast.className += ' bg-emerald-950/90 border-emerald-600 text-emerald-100 shadow-emerald-950/50';
  } else if (type === 'streak') {
    toast.className += ' bg-orange-950/90 border-orange-600 text-orange-100 shadow-orange-950/50';
  } else {
    toast.className += ' bg-neutral-900/95 border-neutral-700 text-white shadow-black/80';
  }

  toast.innerHTML = message;

  container.appendChild(toast);

  // Trigger enter animation
  requestAnimationFrame(() => {
    toast.classList.remove('translate-x-4', 'opacity-0');
    toast.classList.add('translate-x-0', 'opacity-100');
  });

  // Remove toast
  setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-x-0');
    toast.classList.add('opacity-0', 'translate-x-4');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, duration);
}
