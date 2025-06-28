import { getCookie } from "@/lib/cookies";

export const getNotifications = async () => {
  const response = await fetch(`http://localhost:4005/notifications`, {
    headers: {
      Accept: "application/json",
      authorization: `Bearer ${getCookie("token")}`,
    },
    credentials: "include", // pour envoyer le refreshToken en cookie
    next: { revalidate: 2 },
  });
  const data = await response.json();
  console.log(data);
};
