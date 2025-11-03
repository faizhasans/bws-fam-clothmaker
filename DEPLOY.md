# 🚀 Panduan Deploy FAM.CLOTHMAKER ke Firebase

## Prerequisites
1. **Node.js** sudah terinstall
2. **Firebase account** (gratis di firebase.google.com)
3. **Firebase CLI** terinstall

## Step 1: Install Firebase CLI
```bash
npm install -g firebase-tools
```

## Step 2: Login ke Firebase
```bash
firebase login
```
Browser akan terbuka, login dengan akun Google Anda.

## Step 3: Buat Project Firebase
1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Klik "Add project" atau "Tambah project"
3. Beri nama project (contoh: `fam-clothmaker`)
4. Aktifkan Google Analytics (opsional)
5. Tunggu project dibuat

## Step 4: Setup Firebase Hosting
1. Di Firebase Console, pilih project Anda
2. Klik "Hosting" di menu kiri
3. Klik "Get started" 
4. Ikuti instruksi (kita sudah siapkan konfigurasinya)

## Step 5: Konfigurasi Project ID
Edit file `.firebaserc` dan ganti `your-firebase-project-id` dengan Project ID Firebase Anda:

```json
{
  "projects": {
    "default": "fam-clothmaker-123"
  }
}
```

## Step 6: Initialize Firebase (Opsional)
Jika ingin setup manual:
```bash
firebase init hosting
```
- Pilih existing project
- Public directory: `out`
- Configure as single-page app: `Yes`
- Overwrite index.html: `No`

## Step 7: Build & Deploy
```bash
# Build project
npm run export

# Deploy ke Firebase
firebase deploy
```

Atau gunakan shortcut:
```bash
npm run deploy
```

## Step 8: Akses Website
Setelah deploy berhasil, Firebase akan memberikan URL seperti:
- **Hosting URL**: https://fam-clothmaker-123.web.app
- **Custom domain** bisa diatur di Firebase Console

## 🔧 Troubleshooting

### Error: "Firebase project not found"
- Pastikan Project ID di `.firebaserc` benar
- Cek dengan: `firebase projects:list`

### Error: "Permission denied"
- Login ulang: `firebase logout` lalu `firebase login`

### Error: "Build failed"
- Pastikan tidak ada error di kode
- Jalankan: `npm run build` untuk cek error

### Website tidak muncul dengan benar
- Pastikan `firebase.json` mengarah ke folder `out`
- Cek apakah folder `out` ada setelah build

## 📁 Struktur File Deploy
```
fam/
├── out/           # Hasil build (auto-generated)
├── firebase.json  # Konfigurasi Firebase
├── .firebaserc    # Project ID Firebase
└── ...
```

## 🎯 Tips
1. **Custom Domain**: Bisa setup domain sendiri di Firebase Console > Hosting > Add custom domain
2. **SSL**: Otomatis tersedia (HTTPS)
3. **CDN**: Firebase menggunakan Google CDN untuk performa optimal
4. **Analytics**: Bisa integrasikan dengan Google Analytics

## 🔄 Update Website
Untuk update konten:
```bash
npm run deploy
```

Perubahan akan live dalam beberapa menit!

---

**Support**: Jika ada masalah, cek [Firebase Documentation](https://firebase.google.com/docs/hosting) atau tanya di forum Firebase.
