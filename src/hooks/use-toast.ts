
// This file provides a mock implementation of toast functionality
// It accepts arguments but doesn't actually display notifications

interface ToastProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
  duration?: number;
  action?: React.ReactNode;
}

export const useToast = () => {
  const toast = (props?: ToastProps) => {
    // No-op function, but accepts arguments to prevent TypeScript errors
    console.log('Toast would display:', props);
    return { id: 'mock-toast-id', dismiss: () => {} };
  };

  return { toast };
};

export const toast = (props?: ToastProps) => {
  // No-op function, but accepts arguments to prevent TypeScript errors
  console.log('Toast would display:', props);
  return { id: 'mock-toast-id', dismiss: () => {} };
};
