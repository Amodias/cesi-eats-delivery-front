import { getCookie } from "./cookies";

export const apiFetch = async (url, options = {}, retry = true) => {
  const token = getCookie("token");

  const response = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include", // pour envoyer le refreshToken en cookie
  });

  if (response.status === 401 && retry) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      return apiFetch(url, options, false); // une seule tentative de retry
    } else {
      throw new Error("Session expirée. Merci de vous reconnecter.");
    }
  }

  return response;
};

const refreshAccessToken = async () => {
  const res = await fetch("/api/refresh-token", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) return false;

  const data = await res.json();
  setAccessToken(data.accessToken);
  return true;
};
