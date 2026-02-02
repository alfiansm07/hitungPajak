import { PPH23_RATES, PPh23Type } from "@/lib/constants";

export interface PPh23Input {
  jenisPenghasilan: PPh23Type;
  nilaiTransaksi: number;
  punyaNPWP: boolean;
}

export interface PPh23Result {
  nilaiTransaksi: number;
  tarifNormal: number;
  tarifDiterapkan: number;
  pph23: number;
  nilaiDiterima: number;
  keteranganNPWP: string;
}

/**
 * Hitung PPh 23 (Pajak atas Jasa, Royalti, Bunga, Dividen)
 */
export function calculatePPh23(input: PPh23Input): PPh23Result {
  const { jenisPenghasilan, nilaiTransaksi, punyaNPWP } = input;

  // Tarif normal berdasarkan jenis penghasilan
  const tarifNormal = PPH23_RATES[jenisPenghasilan];

  // Jika tidak punya NPWP, tarif 100% lebih tinggi
  const tarifDiterapkan = punyaNPWP ? tarifNormal : tarifNormal * 2;

  // Hitung PPh 23
  const pph23 = Math.round(nilaiTransaksi * tarifDiterapkan);

  // Nilai yang diterima (nett)
  const nilaiDiterima = nilaiTransaksi - pph23;

  // Keterangan NPWP
  const keteranganNPWP = punyaNPWP
    ? "Tarif normal diterapkan"
    : "Tarif 100% lebih tinggi karena tidak punya NPWP";

  return {
    nilaiTransaksi,
    tarifNormal,
    tarifDiterapkan,
    pph23,
    nilaiDiterima,
    keteranganNPWP,
  };
}
