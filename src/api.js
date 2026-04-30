import axios from "axios";

const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const client = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  headers: {
    "X-API-Version": "1",
    "X-Client": "web"
  }
});

function getCsrfToken() {
  const match = document.cookie.match(/(?:^|; )csrf_token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "";
}

async function refreshSession() {
  const csrfToken = getCsrfToken();
  await client.post(
    "/auth/refresh",
    {},
    {
      headers: {
        "X-CSRF-Token": csrfToken
      }
    }
  );
}

async function requestWithRetry(config) {
  try {
    return await client.request(config);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      await refreshSession();
      return client.request(config);
    }

    throw error;
  }
}

export async function fetchDashboardMetrics() {
  const response = await requestWithRetry({
    url: "/api/profiles",
    method: "GET",
    params: { page: 1, limit: 1 }
  });

  return response.data;
}

export async function fetchProfiles(params) {
  const response = await requestWithRetry({
    url: "/api/profiles",
    method: "GET",
    params
  });

  return response.data;
}

export async function fetchProfile(id) {
  const response = await requestWithRetry({
    url: `/api/profiles/${id}`,
    method: "GET"
  });

  return response.data;
}

export async function searchProfiles(params) {
  const response = await requestWithRetry({
    url: "/api/profiles/search",
    method: "GET",
    params
  });

  return response.data;
}

export async function createProfile(payload) {
  const csrfToken = getCsrfToken();
  const response = await requestWithRetry({
    url: "/api/profiles",
    method: "POST",
    data: payload,
    headers: { "X-CSRF-Token": csrfToken }
  });

  return response.data;
}

export async function fetchAccount() {
  const response = await requestWithRetry({
    url: "/auth/me",
    method: "GET"
  });

  return response.data;
}

export async function logout() {
  const csrfToken = getCsrfToken();
  const response = await requestWithRetry({
    url: "/auth/logout",
    method: "POST",
    data: {},
    headers: { "X-CSRF-Token": csrfToken }
  });

  return response.data;
}
