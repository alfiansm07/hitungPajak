import Link from "next/link";
import { Metadata } from "next";
import {
  Calculator,
  Users,
  Building2,
  Receipt,
  Percent,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Kalkulator Pajak - HitungPajak",
  description: "Kalkulator pajak online gratis: PPh 21, PPh 23, PPh Final, PPh Badan, dan PPN.",
};

const calculators = [
  {
    title: "Kalkulator PPh 21",
    description: "Hitung pajak penghasilan karyawan dari gaji, tunjangan, THR, dan bonus. Lengkap dengan PTKP dan tarif progresif terbaru.",
    href: "/kalkulator/pph-21",
    icon: Users,
    color: "bg-blue-500",
    features: ["Gaji & Tunjangan", "Bonus/THR", "BPJS", "PTKP"],
  },
  {
    title: "Kalkulator PPh 23",
    description: "Hitung pajak atas jasa, royalti, bunga, dan dividen. Otomatis hitung tarif lebih tinggi jika tanpa NPWP.",
    href: "/kalkulator/pph-23",
    icon: Receipt,
    color: "bg-purple-500",
    features: ["Jasa Teknik", "Royalti", "Bunga", "Dividen"],
  },
  {
    title: "Kalkulator PPh Final",
    description: "Hitung PPh Final untuk UMKM (0.5%), sewa tanah/bangunan (10%), dan jasa konstruksi.",
    href: "/kalkulator/pph-final",
    icon: Building2,
    color: "bg-orange-500",
    features: ["UMKM 0.5%", "Sewa 10%", "Konstruksi"],
  },
  {
    title: "Kalkulator PPh Badan",
    description: "Hitung pajak penghasilan perusahaan dengan tarif 22%. Termasuk fasilitas Pasal 31E untuk omzet di bawah Rp 50 Miliar.",
    href: "/kalkulator/pph-badan",
    icon: Building2,
    color: "bg-emerald-500",
    features: ["Tarif 22%", "Fasilitas 31E", "Biaya Operasional"],
  },
  {
    title: "Kalkulator PPN",
    description: "Hitung Pajak Pertambahan Nilai 11%. Bisa hitung dari harga belum atau sudah termasuk PPN.",
    href: "/kalkulator/ppn",
    icon: Percent,
    color: "bg-rose-500",
    features: ["PPN 11%", "Inklusif/Eksklusif", "Selisih PPN"],
  },
];

export default function KalkulatorPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <div className="mb-8 text-center md:mb-12">
        <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-3">
          <Calculator className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Kalkulator Pajak
        </h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Pilih jenis pajak yang ingin Anda hitung. Gratis dan tanpa perlu login.
        </p>
      </div>

      {/* Calculator Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {calculators.map((calc) => (
          <Link key={calc.href} href={calc.href} className="group">
            <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${calc.color} text-white`}
                  >
                    <calc.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      {calc.title}
                      <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-sm leading-relaxed">
                  {calc.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2">
                  {calc.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Info Section */}
      <div className="mt-12 rounded-lg border bg-muted/30 p-6 text-center">
        <h2 className="text-lg font-semibold">Perhitungan Akurat</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Semua kalkulator menggunakan tarif dan aturan perpajakan terbaru sesuai UU HPP dan peraturan DJP.
          Hasil perhitungan bersifat estimasi dan sebaiknya dikonsultasikan dengan ahli pajak untuk kepastian.
        </p>
      </div>
    </div>
  );
}
