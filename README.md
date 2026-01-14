# 📘 Project UAS Pemrograman Berbasis Framework
## Aplikasi Web : Sistem Pencatatan Aktivitas Harian (Master-Detail)

---

## 👤 
- **Nama** : Sarah Triana  
- **NIM**  : 202312054  
- **Mata Kuliah** : Pemrograman Berbasis Framework 
- **Tahun Akademik** : 2024/2025  

---

## 📌 Deskripsi Proyek
Project ini merupakan tugas **Ujian Akhir Semester (UAS)** mata kuliah Pemrograman Berbasis Framework.  
Aplikasi yang dibangun adalah sistem pencatatan aktivitas harian berbasis web dengan konsep **Master–Detail**, di mana pengguna dapat mengelola aktivitas utama beserta detail aktivitasnya.

Aplikasi dikembangkan menggunakan:
- **Node.js & Express.js**
- **Prisma ORM**
- **MySQL Database**
- **EJS (Embedded JavaScript Template)**

---
## ⚙️ Cara Instalasi & Menjalankan Aplikasi

### 1️⃣ Clone Repository
        ```bash
        git clone https://github.com/username/ProjectUAS-Sarah.git
        cd ProjectUAS-Sarah
        
### 2️⃣ Install Dependency
        ```bash
        npm install
        
### 3️⃣ Membuat Database
        Buat database MySQL dengan nama:
        ```bash
        CREATE DATABASE db_aktivitas;
        
### 4️⃣ Konfigurasi Prisma
        Pastikan konfigurasi database pada file prisma/schema.prisma:
        ```bash
        datasource db {
          provider = "mysql"
          url      = "mysql://root:@localhost:3306/db_aktivitas"
        }
        
### 5️⃣ Migrasi Database
        ```bash
        npx prisma migrate dev --name init
        
### 6️⃣ Menjalankan Server
        ```bash
        npm src/app.js


## Akses aplikasi melalui browser:
http://localhost:3000 

---

## 🗄️ Database Schema

---

### 📌 Tabel User
| Nama Kolom | Tipe Data | Keterangan |
|------------|-----------|------------|
| id | Int | Primary Key, Auto Increment |
| username | String | Username unik untuk login |
| password | String | Password user |
| activities | Activity[] | Relasi ke tabel Activity |

---

### 📌 Tabel Activity (Master)
| Nama Kolom | Tipe Data | Keterangan |
|------------|-----------|------------|
| id | Int | Primary Key, Auto Increment |
| judul_aktivitas | String | Judul aktivitas |
| kategori | String | Kategori aktivitas |
| tanggal | DateTime | Tanggal pelaksanaan aktivitas |
| user_id | Int | Foreign Key ke tabel User |
| details | ActivityDetail[] | Relasi ke tabel ActivityDetail |

---

### 📌 Tabel ActivityDetail (Detail)
| Nama Kolom | Tipe Data | Keterangan |
|------------|-----------|------------|
| id | Int | Primary Key, Auto Increment |
| aktivitas_id | Int | Foreign Key ke tabel Activity |
| nomor_detail | Int | Nomor urutan detail aktivitas |
| deskripsi_detail | String | Deskripsi detail aktivitas |
| durasi | Int | Durasi aktivitas (menit) |
| status | String | Status aktivitas (Selesai / Proses) |

---

### 🔗 Relasi Antar Tabel
- User → Activity : One to Many  
- Activity → ActivityDetail : One to Many   
- Setiap aktivitas dimiliki oleh satu user  
- Setiap detail terhubung ke satu aktivitas utama  

---

**🔐 Akun Dummy Login**
Gunakan akun berikut untuk login ke sistem:

Username : admin
Password : 123456

**🚀 Fitur Aplikasi**
- Login dan autentikasi user
- CRUD data aktivitas (master)
- CRUD detail aktivitas (detail)
- Relasi master–detail
- Tampilan antarmuka responsif dan profesional


**Link video demo YouTube:**
https://youtu.be/YEAp24vROH0 
