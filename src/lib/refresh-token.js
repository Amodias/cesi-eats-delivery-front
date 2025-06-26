export default async function handler(req, res) {
  const refreshRes = await fetch("http://127.0.0.1:4000/auth/refresh", {
    method: "GET",
    headers: {
      Cookie: req.headers.cookie, // on forwarde le cookie JWT
    },
    credentials: "include",
  });

  if (!refreshRes.ok) {
    return res.status(refreshRes.status).end();
  }

  const data = await refreshRes.json();
  res.status(200).json(data);
}
