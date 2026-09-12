export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "URL gerekli" });

  try {
    const apiRes = await fetch(decodeURIComponent(url));
    const data = await apiRes.text();
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).json({ error: "Sunucu hatası" });
  }
}
