# Backend untuk Aplikasi Equilife

Ini adalah repositori untuk layanan backend yang dirancang untuk mendukung aplikasi Equilife. Backend ini dibangun menggunakan Express.js dan TypeScript, dengan arsitektur monolitik modular yang berfokus pada performa, skalabilitas, dan kemudahan pemeliharaan.

## Fitur Utama

-   **Arsitektur Modular**: Kode diorganisir berdasarkan fitur (`auth`, `chatbot`, `custom-ai`) untuk kemudahan pengembangan dan skalabilitas.
    
-   **TypeScript Ready**: Dibangun sepenuhnya dengan TypeScript untuk keamanan tipe (_type-safety_) dan kode yang lebih andal.
    
-   **Testing Terintegrasi**: Dilengkapi dengan Jest dan Supertest untuk _unit testing_ dan _integration testing_ pada setiap endpoint.
    
-   **Deployment Ready**: Dikonfigurasi untuk proses deployment yang mulus ke platform modern seperti Vercel.
    
-   **Penanganan Error Terpusat**: Middleware khusus untuk menangani semua error aplikasi secara konsisten.
    
-   **Manajemen Konfigurasi**: Menggunakan variabel lingkungan (`.env`) untuk mengelola konfigurasi dan kredensial secara aman.
    

## Arsitektur

Proyek ini mengadopsi pendekatan **Monolith Modular**. Meskipun seluruh aplikasi di-deploy sebagai satu unit (monolit), kode sumbernya dipecah menjadi modul-modul independen yang masing-masing memiliki _routes_, _controllers_, dan _services_ sendiri. Pendekatan ini memberikan kemudahan dalam pengembangan awal seperti monolit tradisional, namun tetap menjaga kerapian dan kemudahan pemeliharaan seperti pada microservices.

## Teknologi yang Digunakan

-   **Runtime**: Node.js
    
-   **Framework**: Express.js
    
-   **Bahasa**: TypeScript
    
-   **Testing**: Jest & Supertest
    
-   **Build Tool**: `tsc` (TypeScript Compiler)
    
-   **Deployment**: Vercel
    

## Setup dan Instalasi Lokal

Untuk menjalankan proyek ini di lingkungan lokal Anda, ikuti langkah-langkah berikut:

1.  **Clone repositori ini:**
    
    ```
    git clone https://github.com/NAMA_USER_ANDA/NAMA_REPO_ANDA.git
    cd NAMA_REPO_ANDA
    
    ```
    
2.  **Instal semua dependensi:**
    
    ```
    npm install
    
    ```
    
3.  Buat file .env:
    
    Salin isi dari .env.example (jika ada) atau buat file .env baru di root direktori.
    
    ```
    cp .env.example .env
    
    ```
    
    Isi file `.env` dengan konfigurasi yang diperlukan, contohnya:
    
    ```
    PORT=3001
    GOOGLE_API_KEY=...
    
    ```
    

## Menjalankan Aplikasi

### Mode Pengembangan (Development)

Untuk menjalankan server dalam mode pengembangan dengan _hot-reloading_ (server akan otomatis restart saat ada perubahan kode):

```
npm run dev

```

Server akan berjalan di `http://localhost:3001` (atau port yang Anda tentukan di `.env`).

### Mode Produksi (Production)

Untuk menjalankan aplikasi dalam mode produksi, Anda perlu melakukan _build_ terlebih dahulu.

1.  **Build aplikasi:**
    
    ```
    npm run build
    
    ```
    
    Perintah ini akan mengkompilasi semua file TypeScript dari `src/` ke JavaScript di dalam direktori `dist/`.
    
2.  **Jalankan server dari hasil build:**
    
    ```
    npm start
    
    ```
    

## Menjalankan Test

Untuk menjalankan semua unit test yang ada di dalam proyek:

```
npm test

```

Jest akan secara otomatis mencari dan menjalankan semua file test yang berada di dalam folder `__tests__`.

## Struktur Proyek

```
/
├── dist/                   # Hasil kompilasi JavaScript (output build)
├── src/                    # Kode sumber TypeScript
│   ├── api/                # Modul-modul API
│   │   ├── auth/           # Modul Autentikasi
│   │   │   ├── __tests__/
│   │   │   │   └── auth.test.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.routes.ts
│   │   │   └── auth.service.ts
│   │   ├── chatbot/        # Modul Chatbot (Genkit)
│   │   └── custom-ai/      # Modul AI Kustom
│   │   └── routes.ts       # File untuk menggabungkan semua rute API
│   ├── core/               # Kode inti (konfigurasi, middleware)
│   │   ├── config/
│   │   ├── middleware/
│   │   └── utils/
│   ├── app.ts              # Inisialisasi aplikasi Express
│   └── server.ts           # Entry point untuk menjalankan server
├── .env                    # Variabel lingkungan (tidak di-commit)
├── .gitignore
├── jest.config.js          # Konfigurasi Jest
├── package.json
├── README.md
├── tsconfig.json           # Konfigurasi TypeScript
└── vercel.json             # Konfigurasi untuk deployment Vercel

```

## Endpoint API

Berikut adalah contoh endpoint yang sudah tersedia.

### Autentikasi (`/api/auth`)

-   **`POST /api/auth/register`**
    
    -   Mendaftarkan pengguna baru.
        
    -   **Body**: `{ "email": "user@example.com", "password": "password123" }`
        
    -   **Respons Sukses (201)**: `{ "success": true, "message": "User user@example.com registered successfully." }`
        
-   **`POST /api/auth/login`**
    
    -   Login pengguna.
        
    -   **Body**: `{ "email": "user@example.com", "password": "password123" }`
        
    -   **Respons Sukses (200)**: `{ "success": true, "message": "User user@example.com logged in successfully." }`
        

## Deployment

Proyek ini telah dikonfigurasi untuk deployment otomatis ke **Vercel**. Cukup hubungkan repositori GitHub ini ke akun Vercel Anda. Setiap kali Anda melakukan `push` ke branch `main`, Vercel akan secara otomatis menjalankan perintah `npm run build` dan men-deploy versi terbaru dari aplikasi Anda.