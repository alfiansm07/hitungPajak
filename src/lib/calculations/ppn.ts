import { PPN_RATE } from "@/lib/constants";

export interface PPNInput {
  nilai: number;
  sudahTermasukPPN: boolean;
  jenis: "keluaran" | "masukan";
}

export interface PPNResult {
  dpp: number;
  ppn: number;
  total: number;
  jenis: "keluaran" | "masukan";
}

export interface PPNSelisihResult {
  ppnKeluaran: number;
  ppnMasukan: number;
  selisih: number;
  status: "kurang_bayar" | "lebih_bayar" | "nihil";
  keterangan: string;
}

/**
 * Hitung PPN (Pajak Pertambahan Nilai)
 * Tarif: 11%
 */
export function calculatePPN(input: PPNInput): PPNResult {
  const { nilai, sudahTermasukPPN, jenis } = input;

  let dpp: number;
  let ppn: number;
  let total: number;

  if (sudahTermasukPPN) {
    // Nilai sudah termasuk PPN, hitung mundur
    // DPP = Nilai / (1 + tarif PPN)
    dpp = Math.round(nilai / (1 + PPN_RATE));
    ppn = nilai - dpp;
    total = nilai;
  } else {
    // Nilai belum termasuk PPN
    dpp = nilai;
    ppn = Math.round(nilai * PPN_RATE);
    total = dpp + ppn;
  }

  return {
    dpp,
    ppn,
    total,
    jenis,
  };
}

/**
 * Hitung selisih PPN (Keluaran - Masukan)
 */
export function calculatePPNSelisih(
  ppnKeluaran: number,
  ppnMasukan: number
): PPNSelisihResult {
  const selisih = ppnKeluaran - ppnMasukan;

  let status: "kurang_bayar" | "lebih_bayar" | "nihil";
  let keterangan: string;

  if (selisih > 0) {
    status = "kurang_bayar";
    keterangan = `PPN Kurang Bayar: Anda harus menyetor Rp ${selisih.toLocaleString("id-ID")} ke kas negara.`;
  } else if (selisih < 0) {
    status = "lebih_bayar";
    keterangan = `PPN Lebih Bayar: Anda dapat mengkompensasikan atau mengajukan restitusi sebesar Rp ${Math.abs(selisih).toLocaleString("id-ID")}.`;
  } else {
    status = "nihil";
    keterangan = "PPN Nihil: Tidak ada kurang bayar atau lebih bayar.";
  }

  return {
    ppnKeluaran,
    ppnMasukan,
    selisih,
    status,
    keterangan,
  };
}
