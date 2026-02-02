/**
 * Tarif PPh 21 Progresif (UU HPP)
 * Berlaku sejak 1 Januari 2022
 */
export const PPH21_BRACKETS = [
  { min: 0, max: 60_000_000, rate: 0.05 },
  { min: 60_000_000, max: 250_000_000, rate: 0.15 },
  { min: 250_000_000, max: 500_000_000, rate: 0.25 },
  { min: 500_000_000, max: 5_000_000_000, rate: 0.30 },
  { min: 5_000_000_000, max: Infinity, rate: 0.35 },
] as const;

/**
 * PTKP (Penghasilan Tidak Kena Pajak) 2024
 * PMK No. 101/PMK.010/2016
 */
export const PTKP = {
  "TK/0": 54_000_000, // Tidak Kawin, tanpa tanggungan
  "TK/1": 58_500_000, // Tidak Kawin, 1 tanggungan
  "TK/2": 63_000_000, // Tidak Kawin, 2 tanggungan
  "TK/3": 67_500_000, // Tidak Kawin, 3 tanggungan
  "K/0": 58_500_000,  // Kawin, tanpa tanggungan
  "K/1": 63_000_000,  // Kawin, 1 tanggungan
  "K/2": 67_500_000,  // Kawin, 2 tanggungan
  "K/3": 72_000_000,  // Kawin, 3 tanggungan
  "K/I/0": 112_500_000, // Kawin, penghasilan istri digabung, tanpa tanggungan
  "K/I/1": 117_000_000, // Kawin, penghasilan istri digabung, 1 tanggungan
  "K/I/2": 121_500_000, // Kawin, penghasilan istri digabung, 2 tanggungan
  "K/I/3": 126_000_000, // Kawin, penghasilan istri digabung, 3 tanggungan
} as const;

export type PTKPStatus = keyof typeof PTKP;

export const PTKP_OPTIONS = [
  { value: "TK/0", label: "TK/0 - Tidak Kawin, tanpa tanggungan" },
  { value: "TK/1", label: "TK/1 - Tidak Kawin, 1 tanggungan" },
  { value: "TK/2", label: "TK/2 - Tidak Kawin, 2 tanggungan" },
  { value: "TK/3", label: "TK/3 - Tidak Kawin, 3 tanggungan" },
  { value: "K/0", label: "K/0 - Kawin, tanpa tanggungan" },
  { value: "K/1", label: "K/1 - Kawin, 1 tanggungan" },
  { value: "K/2", label: "K/2 - Kawin, 2 tanggungan" },
  { value: "K/3", label: "K/3 - Kawin, 3 tanggungan" },
  { value: "K/I/0", label: "K/I/0 - Kawin (gabung), tanpa tanggungan" },
  { value: "K/I/1", label: "K/I/1 - Kawin (gabung), 1 tanggungan" },
  { value: "K/I/2", label: "K/I/2 - Kawin (gabung), 2 tanggungan" },
  { value: "K/I/3", label: "K/I/3 - Kawin (gabung), 3 tanggungan" },
] as const;

/**
 * Biaya Jabatan PPh 21
 * 5% dari penghasilan bruto, maksimal Rp 6.000.000/tahun atau Rp 500.000/bulan
 */
export const BIAYA_JABATAN_RATE = 0.05;
export const BIAYA_JABATAN_MAX_YEARLY = 6_000_000;
export const BIAYA_JABATAN_MAX_MONTHLY = 500_000;

/**
 * Tarif PPh 23
 */
export const PPH23_RATES = {
  dividen: 0.15,
  bunga: 0.15,
  royalti: 0.15,
  hadiah: 0.15,
  jasa_teknik: 0.02,
  jasa_manajemen: 0.02,
  jasa_konsultan: 0.02,
  jasa_lainnya: 0.02,
} as const;

export type PPh23Type = keyof typeof PPH23_RATES;

export const PPH23_OPTIONS = [
  { value: "dividen", label: "Dividen (15%)" },
  { value: "bunga", label: "Bunga (15%)" },
  { value: "royalti", label: "Royalti (15%)" },
  { value: "hadiah", label: "Hadiah & Penghargaan (15%)" },
  { value: "jasa_teknik", label: "Jasa Teknik (2%)" },
  { value: "jasa_manajemen", label: "Jasa Manajemen (2%)" },
  { value: "jasa_konsultan", label: "Jasa Konsultan (2%)" },
  { value: "jasa_lainnya", label: "Jasa Lainnya (2%)" },
] as const;

/**
 * Tarif PPh Final
 */
export const PPH_FINAL_RATES = {
  umkm: 0.005, // 0.5% untuk omzet <= 4.8M/tahun
  sewa_tanah_bangunan: 0.10, // 10%
  konstruksi_kualifikasi_kecil: 0.019, // 1.9%
  konstruksi_kualifikasi_menengah_besar: 0.024, // 2.4%
  konstruksi_tanpa_kualifikasi: 0.04, // 4%
  konstruksi_konsultan_kualifikasi: 0.035, // 3.5%
  konstruksi_konsultan_tanpa_kualifikasi: 0.06, // 6%
} as const;

export type PPhFinalType = keyof typeof PPH_FINAL_RATES;

export const PPH_FINAL_OPTIONS = [
  { value: "umkm", label: "UMKM (0.5%)" },
  { value: "sewa_tanah_bangunan", label: "Sewa Tanah/Bangunan (10%)" },
  { value: "konstruksi_kualifikasi_kecil", label: "Konstruksi - Kualifikasi Kecil (1.9%)" },
  { value: "konstruksi_kualifikasi_menengah_besar", label: "Konstruksi - Kualifikasi Menengah/Besar (2.4%)" },
  { value: "konstruksi_tanpa_kualifikasi", label: "Konstruksi - Tanpa Kualifikasi (4%)" },
  { value: "konstruksi_konsultan_kualifikasi", label: "Konstruksi Konsultan - Dengan Kualifikasi (3.5%)" },
  { value: "konstruksi_konsultan_tanpa_kualifikasi", label: "Konstruksi Konsultan - Tanpa Kualifikasi (6%)" },
] as const;

/**
 * Batas omzet UMKM untuk PPh Final 0.5%
 */
export const UMKM_OMZET_LIMIT = 4_800_000_000; // Rp 4.8 Miliar per tahun

/**
 * Tarif PPh Badan
 * UU HPP berlaku mulai 2022
 */
export const PPH_BADAN_RATE = 0.22; // 22%

/**
 * Batas omzet untuk fasilitas pengurangan tarif PPh Badan
 * Pasal 31E UU PPh
 */
export const PPH_BADAN_FACILITY_LIMIT = 50_000_000_000; // Rp 50 Miliar
export const PPH_BADAN_FACILITY_PORTION = 4_800_000_000; // Rp 4.8 Miliar

/**
 * Tarif PPN
 * UU HPP berlaku mulai 1 April 2022
 */
export const PPN_RATE = 0.11; // 11%

/**
 * Tarif BPJS
 */
export const BPJS_KESEHATAN = {
  company: 0.04, // 4% ditanggung perusahaan
  employee: 0.01, // 1% ditanggung karyawan
  max_salary: 12_000_000, // Batas maksimal gaji untuk perhitungan
} as const;

export const BPJS_KETENAGAKERJAAN = {
  jht_company: 0.037, // 3.7% JHT perusahaan
  jht_employee: 0.02, // 2% JHT karyawan
  jkk: 0.0024, // 0.24% - 1.74% (gunakan rata-rata rendah)
  jkm: 0.003, // 0.3%
  jp_company: 0.02, // 2% JP perusahaan
  jp_employee: 0.01, // 1% JP karyawan
  jp_max_salary: 10_042_300, // Batas maksimal gaji untuk JP (2024)
} as const;
