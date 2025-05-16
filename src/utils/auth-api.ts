import { apiFetch } from './api';

const AUTH_URL = import.meta.env.VITE_AUTH_URL;

export function registerUser(data: { userName: string; email: string; password: string; userType: string }) {
  return apiFetch(`${AUTH_URL}/register`, {
    method: 'POST',
    body: data,
  });
}

export function authenticateUser(data: { email: string; password: string }) {
  return apiFetch(`${AUTH_URL}/authenticate`, {
    method: 'POST',
    body: data,
  });
}

export function confirmEmail(data: { email: string; token: string }) {
  return apiFetch(`${AUTH_URL}/confirm-email`, {
    method: 'POST',
    body: data,
  });
}
