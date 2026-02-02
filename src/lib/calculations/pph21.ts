import {
  PPH21_BRACKETS,
  PTKP,
  PTKPStatus,
  BIAYA_JABATAN_RATE,
  BIAYA_JABATAN_MAX_YEARLY,
  BPJS_KESEHATAN,
  BPJS_KETENAGAKERJAAN,
} from "@/lib/constants";

export interface PPh21Input {
  gajiPokok: number;
  tunjangan: number;
  bonus: number;
  ptkpStatus: PTKPStatus;
  iuranBpjsKesehatan: boolean;
  iuranBpjsKetenagakerjaan: boolean;
}

export interface PPh21Breakdown {
  label: string;
  value: number;
}

export interface PPh21Result {
  penghasilanBrutoTahunan: number;
  biayaJabatan: number;
  iuranBpjsKaryawan: number;
  penghasilanNeto: number;
  ptkp: number;
  pkp: number;
  pph21Tahunan: number;
  pph21Bulanan: number;
  takeHomePay: number;
  breakdown: PPh21Breakdown[];
  bracketBreakdown: { bracket: string; taxable: number; rate: number; tax: number }[];
}

/**
 * Hitung PPh 21 (Pajak Penghasilan Karyawan)
 */
export function calculatePPh21(input: PPh21Input): PPh21Result {
  const { gajiPokok, tunjangan, bonus, ptkpStatus, iuranBpjsKesehatan, iuranBpjsKetenagakerjaan } = input;

  // 1. Penghasilan Bruto Tahunan
  const penghasilanBulanan = gajiPokok + tunjangan;
  const penghasilanBrutoTahunan = penghasilanBulanan * 12 + bonus;

  // 2. Biaya Jabatan (5% dari bruto, max 6 juta/tahun)
  const biayaJabatan = Math.min(penghasilanBrutoTahunan * BIAYA_JABATAN_RATE, BIAYA_JABATAN_MAX_YEARLY);

  // 3. Iuran BPJS yang ditanggung karyawan (pengurang)
  let iuranBpjsKaryawan = 0;

  if (iuranBpjsKesehatan) {
    const gajiBpjsKesehatan = Math.min(penghasilanBulanan, BPJS_KESEHATAN.max_salary);
    iuranBpjsKaryawan += gajiBpjsKesehatan * BPJS_KESEHATAN.employee * 12;
  }

  if (iuranBpjsKetenagakerjaan) {
    // JHT karyawan
    iuranBpjsKaryawan += penghasilanBulanan * BPJS_KETENAGAKERJAAN.jht_employee * 12;
    // JP karyawan
    const gajiJP = Math.min(penghasilanBulanan, BPJS_KETENAGAKERJAAN.jp_max_salary);
    iuranBpjsKaryawan += gajiJP * BPJS_KETENAGAKERJAAN.jp_employee * 12;
  }

  // 4. Penghasilan Neto
  const penghasilanNeto = penghasilanBrutoTahunan - biayaJabatan - iuranBpjsKaryawan;

  // 5. PTKP
  const ptkp = PTKP[ptkpStatus];

  // 6. PKP (Penghasilan Kena Pajak)
  const pkp = Math.max(0, penghasilanNeto - ptkp);

  // 7. Hitung PPh 21 dengan tarif progresif
  const { tax: pph21Tahunan, breakdown: bracketBreakdown } = calculateProgressiveTax(pkp);

  // 8. PPh 21 per bulan
  const pph21Bulanan = Math.round(pph21Tahunan / 12);

  // 9. Take Home Pay (bulanan)
  const potonganBulanan = pph21Bulanan + (iuranBpjsKaryawan / 12);
  const takeHomePay = penghasilanBulanan - potonganBulanan;

  // Breakdown untuk display
  const breakdown: PPh21Breakdown[] = [
    { label: "Gaji Pokok (per bulan)", value: gajiPokok },
    { label: "Tunjangan (per bulan)", value: tunjangan },
    { label: "Bonus/THR (per tahun)", value: bonus },
    { label: "Penghasilan Bruto (per tahun)", value: penghasilanBrutoTahunan },
    { label: "Biaya Jabatan (5%, max 6 juta)", value: -biayaJabatan },
    { label: "Iuran BPJS Karyawan", value: -iuranBpjsKaryawan },
    { label: "Penghasilan Neto", value: penghasilanNeto },
    { label: `PTKP (${ptkpStatus})`, value: -ptkp },
    { label: "Penghasilan Kena Pajak (PKP)", value: pkp },
    { label: "PPh 21 Terutang (per tahun)", value: pph21Tahunan },
    { label: "PPh 21 (per bulan)", value: pph21Bulanan },
  ];

  return {
    penghasilanBrutoTahunan,
    biayaJabatan,
    iuranBpjsKaryawan,
    penghasilanNeto,
    ptkp,
    pkp,
    pph21Tahunan,
    pph21Bulanan,
    takeHomePay,
    breakdown,
    bracketBreakdown,
  };
}

/**
 * Hitung pajak dengan tarif progresif
 */
function calculateProgressiveTax(pkp: number): {
  tax: number;
  breakdown: { bracket: string; taxable: number; rate: number; tax: number }[];
} {
  let remainingPkp = pkp;
  let totalTax = 0;
  const breakdown: { bracket: string; taxable: number; rate: number; tax: number }[] = [];

  for (const bracket of PPH21_BRACKETS) {
    if (remainingPkp <= 0) break;

    const bracketSize = bracket.max - bracket.min;
    const taxableInBracket = Math.min(remainingPkp, bracketSize);
    const taxInBracket = taxableInBracket * bracket.rate;

    if (taxableInBracket > 0) {
      breakdown.push({
        bracket: `Rp ${formatCompact(bracket.min)} - Rp ${formatCompact(bracket.max)}`,
        taxable: taxableInBracket,
        rate: bracket.rate,
        tax: taxInBracket,
      });
    }

    totalTax += taxInBracket;
    remainingPkp -= taxableInBracket;
  }

  return { tax: Math.round(totalTax), breakdown };
}

function formatCompact(value: number): string {
  if (value === Infinity) return "∞";
  if (value >= 1_000_000_000) return `${value / 1_000_000_000}M`;
  if (value >= 1_000_000) return `${value / 1_000_000}jt`;
  return value.toString();
}
