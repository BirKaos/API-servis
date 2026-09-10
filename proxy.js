export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    const { target } = req.query;

    if (!target) {
        return res.status(400).json({ error: "Target URL gerekli!" });
    }

    try {
        const response = await fetch(decodeURIComponent(target), {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
            }
        });
        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "API Bağlantı Hatası veya Sunucu Kapalı" });
    }
}
