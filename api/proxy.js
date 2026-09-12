export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) {
    return res.status(400).send("URL eksik");
  }
  try {
    const response = await fetch(decodeURIComponent(url));
    const data = await response.text();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Proxy hatasi: " + error.message);
  }
}
