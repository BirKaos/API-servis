import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const { id, email } = req.query;

    try {
        const filePath = path.join(process.cwd(), 'veritabani.json');
        const fileData = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(fileData);

        if (id) {
            const sonuc = jsonData.filter(item => item.discord_id?.toString() === id.toString());
            return res.status(200).json(sonuc.length > 0 ? { durum: "Başarılı", sonuc } : { durum: "Bulunamadı" });
        }

        if (email) {
            const sonuc = jsonData.filter(item => item.encrypted_data_3?.toLowerCase().includes(email.toLowerCase()));
            return res.status(200).json(sonuc.length > 0 ? { durum: "Başarılı", sonuc } : { durum: "Bulunamadı" });
        }

        return res.status(400).json({ hata: "Parametre girilmedi (id veya email kullan)." });
    } catch (error) {
        return res.status(500).json({ hata: error.message });
    }
}
