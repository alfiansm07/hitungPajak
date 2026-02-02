import {
  PPH_BADAN_RATE,
  PPH_BADAN_FACILITY_LIMIT,
  PPH_BADAN_FACILITY_PORTION,
} from "@/lib/constants";

export interface PPhBadanInput {
  penghasilanBruto: number;
  biayaOperasional: number;
  omzetTahunan: number;
}

export interface PPhBadanResult {
  penghasilanBruto: number;
  biayaOperasional: number;
  penghasilanNeto: number;
  pkp: number;
  dapatFasilitas: boolean;
  pkpFasilitas: number;
  pkpTanpaFasilitas: number;
  pphFasilitas: number;
  pphTanpaFasilitas: number;
  pphBadanTotal: number;
  tarifEfektif: number;
  catatan: string;
}

/**
 * Hitung PPh Badan (Pajak Penghasilan Perusahaan)
 * Tarif: 22%
 * Fasilitas: Omzet <= 50M dapat pengurangan 50% untuk PKP proporsional
 */
export function calculatePPhBadan(input: PPhBadanInput): PPhBadanResult {
  const { penghasilanBruto, biayaOperasional, omzetTahunan } = input;

  // Penghasilan Neto = Bruto - Biaya
  const penghasilanNeto = penghasilanBruto - biayaOperasional;

  // PKP (untuk badan, tidak ada PTKP)
  const pkp = Math.max(0, penghasilanNeto);

  // Cek apakah dapat fasilitas Pasal 31E
  const dapatFasilitas = omzetTahunan <= PPH_BADAN_FACILITY_LIMIT;

  let pkpFasilitas = 0;
  let pkpTanpaFasilitas = 0;
  let pphFasilitas = 0;
  let pphTanpaFasilitas = 0;
  let pphBadanTotal = 0;
  let catatan = "";

  if (dapatFasilitas && omzetTahunan > 0) {
    // Hitung proporsi PKP yang mendapat fasilitas
    // PKP Fasilitas = (4.8M / Omzet) × PKP
    const proporsi = Math.min(PPH_BADAN_FACILITY_PORTION / omzetTahunan, 1);
    pkpFasilitas = Math.round(pkp * proporsi);
    pkpTanpaFasilitas = pkp - pkpFasilitas;

    // PPh dengan fasilitas (50% dari tarif normal)
    pphFasilitas = Math.round(pkpFasilitas * PPH_BADAN_RATE * 0.5);
    
    // PPh tanpa fasilitas (tarif normal)
    pphTanpaFasilitas = Math.round(pkpTanpaFasilitas * PPH_BADAN_RATE);

    pphBadanTotal = pphFasilitas + pphTanpaFasilitas;

    catatan = `Mendapat fasilitas Pasal 31E: ${(proporsi * 100).toFixed(1)}% dari PKP dikenakan tarif 11% (50% dari 22%)`;
  } else {
    // Tanpa fasilitas, tarif normal 22%
    pkpTanpaFasilitas = pkp;
    pphTanpaFasilitas = Math.round(pkp * PPH_BADAN_RATE);
    pphBadanTotal = pphTanpaFasilitas;

    if (omzetTahunan > PPH_BADAN_FACILITY_LIMIT) {
      catatan = "Omzet melebihi Rp 50 Miliar, tidak mendapat fasilitas pengurangan tarif.";
    } else {
      catatan = "Tarif PPh Badan 22% diterapkan penuh.";
    }
  }

  // Tarif efektif
  const tarifEfektif = pkp > 0 ? pphBadanTotal / pkp : 0;

  return {
    penghasilanBruto,
    biayaOperasional,
    penghasilanNeto,
    pkp,
    dapatFasilitas,
    pkpFasilitas,
    pkpTanpaFasilitas,
    pphFasilitas,
    pphTanpaFasilitas,
    pphBadanTotal,
    tarifEfektif,
    catatan,
  };
}
