import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isAuthenticated = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn;
};
