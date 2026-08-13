import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const { id, email } = req.query;
    
    try {
        const parcalarKlasoru = path.join(process.cwd(), 'parcalar');
        
        if (!fs.existsSync(parcalarKlasoru)) {
            return res.status(404).json({ hata: "'parcalar' klasörü bulunamadı." });
        }

        const dosyalar = fs.readdirSync(parcalarKlasoru);
        
        for (const dosya of dosyalar) {
            if (!dosya.endsWith('.json')) continue;
            
            const filePath = path.join(parcalarKlasoru, dosya);
            const fileData = fs.readFileSync(filePath, 'utf8');
            const data = JSON.parse(fileData);
            
            if (id) {
                const sonuc = data.filter(item => item.discord_id?.toString() === id.toString());
                if (sonuc.length > 0) {
                    return res.status(200).json({ durum: "Bulundu", sonuc });
                }
            }
            
            if (email) {
                const sonuc = data.filter(item => item.encrypted_data_3?.toLowerCase().includes(email.toLowerCase()));
                if (sonuc.length > 0) {
                    return res.status(200).json({ durum: "Bulundu", sonuc });
                }
            }
        }
        
        return res.status(404).json({ durum: "Bulunamadı", mesaj: "Eşleşen kayıt bulunamadı." });

    } catch (error) {
        return res.status(500).json({ hata: error.message });
    }
}
