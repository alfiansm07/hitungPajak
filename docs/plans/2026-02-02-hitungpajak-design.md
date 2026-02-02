# HitungPajak - Design Document

**Tanggal:** 2 Februari 2026  
**Status:** Approved  
**Versi:** 1.0

---

## 1. Overview

Website tools perpajakan Indonesia yang menyediakan kalkulator, generator dokumen, simulasi, dan referensi pajak. Gratis sepenuhnya, tanpa perlu login.

### Target Pengguna
- **Wajib Pajak Pribadi** - Karyawan, freelancer, pemilik usaha kecil
- **Wajib Pajak Badan** - Staff accounting/finance perusahaan

### Prinsip Desain
- Mobile-first responsive design
- Gratis sepenuhnya (tanpa login untuk MVP)
- Realtime calculation dengan format Rupiah
- Clean & profesional (warna biru + hijau)

---

## 2. Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| Framework | Next.js 15+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Icons | Lucide React |
| Forms | React Hook Form + Zod |
| Database | Supabase (fase berikutnya) |
| Server State | TanStack Query v5 (fase berikutnya) |

---

## 3. Struktur Halaman

```
/                       → Landing page + overview semua tools
/kalkulator             → Hub semua kalkulator
  /pph-21               → Kalkulator PPh 21 (gaji, THR, bonus)
  /pph-23               → Kalkulator PPh 23 (jasa, royalti)
  /pph-final            → Kalkulator PPh Final (UMKM 0.5%, sewa)
  /pph-badan            → Kalkulator PPh Badan (22%)
  /ppn                  → Kalkulator PPN (11%)
/generator              → Hub generator dokumen (placeholder)
  /faktur-pajak         → Generator faktur pajak (coming soon)
  /bukti-potong         → Generator bukti potong (coming soon)
/simulasi               → Simulasi pajak tahunan & tax planning
/referensi              → Hub referensi
  /tarif                → Tabel tarif pajak
  /ptkp                 → Tabel PTKP terbaru
  /kalender             → Kalender deadline pajak
```

---

## 4. Arsitektur Folder

```
src/
├── app/                      # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx              # Landing page
│   ├── kalkulator/
│   │   ├── page.tsx          # Hub kalkulator
│   │   ├── pph-21/page.tsx
│   │   ├── pph-23/page.tsx
│   │   ├── pph-final/page.tsx
│   │   ├── pph-badan/page.tsx
│   │   └── ppn/page.tsx
│   ├── generator/
│   │   ├── page.tsx          # Hub generator (placeholder)
│   │   ├── faktur-pajak/page.tsx
│   │   └── bukti-potong/page.tsx
│   ├── simulasi/
│   │   └── page.tsx
│   └── referensi/
│       ├── page.tsx
│       ├── tarif/page.tsx
│       ├── ptkp/page.tsx
│       └── kalender/page.tsx
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── calculators/          # Komponen kalkulator
│   │   ├── pph21-calculator.tsx
│   │   ├── pph23-calculator.tsx
│   │   ├── pph-final-calculator.tsx
│   │   ├── pph-badan-calculator.tsx
│   │   └── ppn-calculator.tsx
│   ├── generators/           # Komponen generator (placeholder)
│   ├── shared/               # Header, Footer, Layout
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── mobile-nav.tsx
│   │   └── calculator-card.tsx
│   └── forms/                # Form components
│       ├── currency-input.tsx
│       └── select-ptkp.tsx
├── lib/
│   ├── calculations/         # Pure functions perhitungan
│   │   ├── pph21.ts
│   │   ├── pph23.ts
│   │   ├── pph-final.ts
│   │   ├── pph-badan.ts
│   │   └── ppn.ts
│   ├── validations/          # Zod schemas
│   │   └── calculator-schemas.ts
│   ├── constants/            # Tarif & konstanta
│   │   ├── tax-rates.ts
│   │   ├── ptkp.ts
│   │   └── tax-calendar.ts
│   └── utils/                # Helper functions
│       ├── format-currency.ts
│       └── format-number.ts
└── types/                    # TypeScript interfaces
    └── calculator.ts
```

---

## 5. Detail Fitur Kalkulator

### 5.1 Kalkulator PPh 21

**Input:**
- Gaji pokok bulanan
- Tunjangan (transport, makan, jabatan, dll)
- Status PTKP (TK/0, K/0, K/1, K/2, K/3)
- BPJS Kesehatan & Ketenagakerjaan
- Bonus / THR (opsional)
- Metode: Gross, Gross-up, atau Nett

**Output:**
- PPh 21 per bulan
- PPh 21 per tahun
- Take home pay
- Breakdown perhitungan lengkap

**Rumus:**
- PKP = Penghasilan Neto - PTKP
- Tarif progresif: 5% (0-60jt), 15% (60-250jt), 25% (250-500jt), 30% (500jt-5M), 35% (>5M)

---

### 5.2 Kalkulator PPh 23

**Input:**
- Jenis penghasilan (jasa, royalti, bunga, dividen, sewa selain tanah/bangunan)
- Nilai bruto
- Penerima punya NPWP atau tidak

**Output:**
- Tarif yang berlaku (2%, 15%, atau 20% lebih tinggi tanpa NPWP)
- Jumlah PPh 23
- Nilai yang diterima (nett)

**Tarif:**
- Dividen, royalti, bunga, hadiah: 15%
- Jasa teknik, manajemen, konsultan: 2%
- Tanpa NPWP: tarif 100% lebih tinggi

---

### 5.3 Kalkulator PPh Final

**Input:**
- Jenis: UMKM, Sewa tanah/bangunan, Konstruksi
- Omzet / Nilai transaksi

**Output:**
- PPh Final terutang
- Catatan batas omzet UMKM

**Tarif:**
- UMKM (omzet < 4.8M/tahun): 0.5%
- Sewa tanah/bangunan: 10%
- Konstruksi: 2% - 6% (tergantung kualifikasi)

---

### 5.4 Kalkulator PPh Badan

**Input:**
- Penghasilan bruto tahunan
- Biaya operasional (dapat dikurangkan)
- Omzet untuk fasilitas pengurangan tarif

**Output:**
- Penghasilan Kena Pajak (PKP)
- PPh Badan terutang
- Breakdown tarif bertingkat jika dapat fasilitas

**Tarif:**
- Tarif umum: 22%
- Fasilitas: Omzet < 50M mendapat pengurangan 50% dari tarif normal untuk bagian PKP proporsional

---

### 5.5 Kalkulator PPN

**Input:**
- Nilai transaksi (DPP)
- Jenis: PPN Keluaran atau Masukan
- Harga sudah termasuk PPN atau belum

**Output:**
- Nilai PPN (11%)
- Total dengan PPN
- DPP dari harga termasuk PPN

**Rumus:**
- PPN = DPP × 11%
- DPP dari harga inklusif = Harga / 1.11

---

## 6. Generator Dokumen (Placeholder)

### 6.1 Generator Faktur Pajak
**Status:** Coming Soon

**Rencana:**
- Input data penjual & pembeli
- Detail barang/jasa
- Generate PDF format standar DJP

### 6.2 Generator Bukti Potong
**Status:** Coming Soon

**Rencana:**
- Support PPh 21, PPh 23, PPh 4(2)
- Generate PDF sesuai template DJP

---

## 7. Simulasi Pajak

**Fitur MVP:**
- Input total penghasilan setahun
- Pilih jenis WP (Pribadi/Badan)
- Output estimasi pajak tahunan
- Tips tax planning sederhana

---

## 8. Halaman Referensi

### 8.1 Tarif Pajak
- Tabel tarif PPh 21 (progresif)
- Tabel tarif PPh 23
- Tabel tarif PPh Final
- Tarif PPh Badan
- Tarif PPN

### 8.2 PTKP (Penghasilan Tidak Kena Pajak)
- Tabel PTKP 2024
- Penjelasan status (TK, K, K/I)

### 8.3 Kalender Pajak
- Deadline pelaporan SPT
- Deadline pembayaran
- Tanggal penting lainnya

---

## 9. UI/UX Design

### 9.1 Design System

| Aspek | Pilihan |
|-------|---------|
| Theme | Light mode (clean, professional) |
| Primary Color | Biru (#2563EB) |
| Accent Color | Hijau (#10B981) |
| Font | Inter / System default |
| Border Radius | 8px (rounded-lg) |
| Layout | Mobile-first responsive |

### 9.2 Komponen shadcn/ui
- Card - Wrapper setiap kalkulator
- Input - Field angka dengan format Rupiah
- Select - Dropdown (status PTKP, jenis pajak)
- Button - Hitung, Reset, Download
- Table - Hasil breakdown perhitungan
- Tabs - Navigasi dalam kalkulator
- Alert - Info tarif, warning batas omzet

### 9.3 Fitur UX
- Format Rupiah otomatis (5000000 → Rp 5.000.000)
- Hitung realtime (debounced)
- Tombol copy hasil
- Print-friendly layout

### 9.4 Landing Page Layout

```
┌─────────────────────────────────────┐
│  Header: Logo + Navigasi            │
├─────────────────────────────────────┤
│  Hero: "Hitung Pajak dengan Mudah"  │
│  Subtitle + CTA ke kalkulator       │
├─────────────────────────────────────┤
│  Grid 5 Kalkulator (card + ikon)    │
│  [PPh21] [PPh23] [PPhFinal] ...     │
├─────────────────────────────────────┤
│  Section: Fitur lainnya             │
│  Generator | Simulasi | Referensi   │
├─────────────────────────────────────┤
│  Footer: Credit, Disclaimer         │
└─────────────────────────────────────┘
```

---

## 10. Fase Implementasi

### Fase 1: Foundation (MVP)
- [x] Setup Next.js + TypeScript + Tailwind
- [ ] Setup shadcn/ui
- [ ] Buat layout (Header, Footer, Mobile Nav)
- [ ] Landing page

### Fase 2: Kalkulator
- [ ] Kalkulator PPh 21
- [ ] Kalkulator PPh 23
- [ ] Kalkulator PPh Final
- [ ] Kalkulator PPh Badan
- [ ] Kalkulator PPN
- [ ] Hub kalkulator

### Fase 3: Referensi
- [ ] Halaman tarif pajak
- [ ] Halaman PTKP
- [ ] Kalender pajak

### Fase 4: Simulasi
- [ ] Simulasi pajak tahunan (sederhana)

### Fase 5: Placeholder
- [ ] Halaman generator (coming soon)

### Fase Berikutnya (Post-MVP)
- [ ] Generator Faktur Pajak
- [ ] Generator Bukti Potong
- [ ] Login & simpan riwayat (Supabase)
- [ ] Share hasil via URL

---

## 11. Catatan Penting

### Disclaimer
Website ini hanya sebagai alat bantu hitung. Untuk kepastian perpajakan, konsultasikan dengan konsultan pajak atau kantor pajak.

### Update Berkala
Tarif dan aturan pajak dapat berubah. Perlu update berkala sesuai peraturan DJP terbaru.

### Referensi Aturan
- UU HPP (Harmonisasi Peraturan Perpajakan)
- PMK terkait tarif pajak
- PER DJP tentang PPh 21

---

## 12. Approval

| Role | Status | Tanggal |
|------|--------|---------|
| Product Owner | ✅ Approved | 2 Feb 2026 |
| Developer | Pending | - |

---

*Dokumen ini akan diupdate seiring perkembangan project.*
