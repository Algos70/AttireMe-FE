import.meta.env;

export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface ApiOptions {
  method?: ApiMethod;
  headers?: Record<string, string>;
  body?: any;
}

export async function apiFetch<T = any>(
  url: string,
  options: ApiOptions = {}
): Promise<T> {
  const { method = 'GET', headers = {}, body } = options;
  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };
  if (body) {
    fetchOptions.body = JSON.stringify(body);
  }
  const response = await fetch(url, fetchOptions);
  if (!response.ok) {
    // Try to parse error message from response
    let errorMsg = response.statusText;
    try {
      const errorData = await response.json();
      errorMsg = errorData.message || JSON.stringify(errorData);
    } catch {}
    throw new Error(`API error: ${response.status} ${errorMsg}`);
  }
  // Try to parse JSON, otherwise return text
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return response.text() as any;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const GET_USER_BY_EMAIL = import.meta.env.VITE_GET_USER_BY_EMAIL;
const CREATE_USER = import.meta.env.VITE_CREATE_USER;
const UPDATE_USER = import.meta.env.VITE_UPDATE_USER;
const CHECK_USERNAME_UNIQUE = import.meta.env.VITE_CHECK_USERNAME_UNIQUE;
const GET_USER_BY_ID = import.meta.env.VITE_GET_USER_BY_ID;
const SEARCH_CREATOR_BY_USERNAME = import.meta.env.VITE_SEARCH_CREATOR_BY_USERNAME;
const GET_USER_SUBSCRIPTIONS = import.meta.env.VITE_GET_USER_SUBSCRIPTIONS;
const GET_CREATOR_BY_ID = import.meta.env.VITE_GET_CREATOR_BY_ID;

export function getUserByEmail(email: string) {
  return apiFetch(`${BACKEND_URL}${GET_USER_BY_EMAIL}/${email}`);
}

export function createUser(user: { email: string; role: string; username: string }) {
  return apiFetch(`${BACKEND_URL}${CREATE_USER}`, {
    method: 'POST',
    body: user,
  });
}

export function updateUser(user: { email: string; role: string; username: string }) {
  return apiFetch(`${BACKEND_URL}${UPDATE_USER}`, {
    method: 'PUT',
    body: user,
  });
}

export function checkUsernameUnique(username: string) {
  return apiFetch(`${BACKEND_URL}${CHECK_USERNAME_UNIQUE}?username=${encodeURIComponent(username)}`);
}

export function getUserById(id: string) {
  return apiFetch(`${BACKEND_URL}${GET_USER_BY_ID}/${id}`);
}

export function searchCreatorsByUsername(username: string) {
  return apiFetch(`${BACKEND_URL}${SEARCH_CREATOR_BY_USERNAME}/${encodeURIComponent(username)}`);
}

export function getUserSubscriptions(userId: number) {
  return apiFetch(`${BACKEND_URL}${GET_USER_SUBSCRIPTIONS}/${userId}`);
}

export function getCreatorById(id: string | number) {
  return apiFetch(`${BACKEND_URL}${GET_CREATOR_BY_ID}/${id}`);
} 