import { PPH_FINAL_RATES, PPhFinalType, UMKM_OMZET_LIMIT } from "@/lib/constants";

export interface PPhFinalInput {
  jenisPPhFinal: PPhFinalType;
  nilaiTransaksi: number;
  omzetTahunan?: number; // Untuk validasi UMKM
}

export interface PPhFinalResult {
  nilaiTransaksi: number;
  tarif: number;
  pphFinal: number;
  nilaiSetelahPajak: number;
  catatan: string | null;
  isUMKMEligible: boolean;
}

/**
 * Hitung PPh Final (UMKM, Sewa, Konstruksi)
 */
export function calculatePPhFinal(input: PPhFinalInput): PPhFinalResult {
  const { jenisPPhFinal, nilaiTransaksi, omzetTahunan } = input;

  // Tarif berdasarkan jenis
  const tarif = PPH_FINAL_RATES[jenisPPhFinal];

  // Hitung PPh Final
  const pphFinal = Math.round(nilaiTransaksi * tarif);

  // Nilai setelah pajak
  const nilaiSetelahPajak = nilaiTransaksi - pphFinal;

  // Catatan khusus untuk UMKM
  let catatan: string | null = null;
  let isUMKMEligible = true;

  if (jenisPPhFinal === "umkm") {
    if (omzetTahunan && omzetTahunan > UMKM_OMZET_LIMIT) {
      catatan = `Perhatian: Omzet tahunan Rp ${(omzetTahunan / 1_000_000_000).toFixed(1)} M melebihi batas Rp 4.8 M. Tarif UMKM 0.5% mungkin tidak berlaku.`;
      isUMKMEligible = false;
    } else {
      catatan = "Tarif PPh Final UMKM 0.5% berlaku untuk WP dengan omzet maksimal Rp 4.8 Miliar per tahun.";
    }
  }

  if (jenisPPhFinal === "sewa_tanah_bangunan") {
    catatan = "PPh Final 10% dipotong oleh penyewa dan bersifat final.";
  }

  if (jenisPPhFinal.startsWith("konstruksi")) {
    catatan = "Tarif bervariasi berdasarkan kualifikasi usaha konstruksi.";
  }

  return {
    nilaiTransaksi,
    tarif,
    pphFinal,
    nilaiSetelahPajak,
    catatan,
    isUMKMEligible,
  };
}
