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
const GET_CREATOR_BY_USERNAME = import.meta.env.VITE_GET_CREATOR_BY_USERNAME;
const IS_SUBSCRIBE = import.meta.env.VITE_IS_SUBSCRIBE;
const IS_FOLLOWING = import.meta.env.VITE_IS_FOLLOWING;
const FOLLOW = import.meta.env.VITE_FOLLOW;
const UNFOLLOW = import.meta.env.VITE_UNFOLLOW;
const SUBSCRIBE = import.meta.env.VITE_SUBSCRIBE;
const UNSUBSCRIBE = import.meta.env.VITE_UNSUBSCRIBE;
const CANCEL_UNSUBSCRIPTION = import.meta.env.VITE_CANCEL_UNSUBSCRIPTION;
const GET_ALL_FOLLOWING = import.meta.env.VITE_GET_ALL_FOLLOWING;
const UPDATE_CREATOR = import.meta.env.VITE_UPDATE_CREATOR;

export function getUserByEmail(email: string) {
  return apiFetch(`${BACKEND_URL}${GET_USER_BY_EMAIL}/${email}`);
}

export function createUser(user: { email: string; role: string; username: string }) {
  return apiFetch(`${BACKEND_URL}${CREATE_USER}`, {
    method: 'POST',
    body: user,
  });
}

export function updateUser(user: { id: number; name: string; surname: string; profileImage: string | null }) {
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

export function getCreatorByUsername(username: string) {
  return apiFetch(`${BACKEND_URL}${GET_CREATOR_BY_USERNAME}/${encodeURIComponent(username)}`);
}

export function isSubscribed(creatorId: number, subscriberId: number) {
  return apiFetch(`${BACKEND_URL}${IS_SUBSCRIBE}?creatorID=${creatorId}&subscriberID=${subscriberId}`);
}

export function isFollowing(creatorId: number, followerId: number) {
  return apiFetch(`${BACKEND_URL}${IS_FOLLOWING}?creatorID=${creatorId}&followerID=${followerId}`);
}

export function follow(creatorId: number, followerId: number) {
  return apiFetch(`${BACKEND_URL}${FOLLOW}`, {
    method: 'POST',
    body: { creatorID: creatorId, followerID: followerId },
  });
}

export function unfollow(creatorId: number, followerId: number) {
  return apiFetch(`${BACKEND_URL}${UNFOLLOW}`, {
    method: 'POST',
    body: { creatorID: creatorId, followerID: followerId },
  });
}

export function subscribe(creatorId: number, subscriberId: number) {
  return apiFetch(`${BACKEND_URL}${SUBSCRIBE}`, {
    method: 'POST',
    body: { creatorID: creatorId, subscriberID: subscriberId },
  });
}

export function unsubscribe(creatorId: number, subscriberId: number) {
  return apiFetch(`${BACKEND_URL}${UNSUBSCRIBE}`, {
    method: 'POST',
    body: { creatorID: creatorId, subscriberID: subscriberId },
  });
}

export function cancelUnsubscribe(creatorId: number, subscriberId: number) {
  return apiFetch(`${BACKEND_URL}${CANCEL_UNSUBSCRIPTION}`, {
    method: 'POST',
    body: { creatorID: creatorId, subscriberID: subscriberId },
  });
}

export function getAllFollowing(userId: number) {
  return apiFetch(`${BACKEND_URL}${GET_ALL_FOLLOWING}/${userId}`);
}

export function updateCreator(profile: { bannerImage: string | null; bio: string; profileImage: string | null; userID: number }) {
  return apiFetch(`${BACKEND_URL}${UPDATE_CREATOR}`, {
    method: 'PUT',
    body: profile,
  });
}