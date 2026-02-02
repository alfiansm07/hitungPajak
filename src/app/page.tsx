import Link from "next/link";
import {
  Calculator,
  Users,
  Building2,
  Receipt,
  Percent,
  FileText,
  LineChart,
  BookOpen,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const calculators = [
  {
    title: "PPh 21",
    description: "Hitung pajak penghasilan karyawan, gaji, THR, dan bonus",
    href: "/kalkulator/pph-21",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    title: "PPh 23",
    description: "Pajak atas jasa, royalti, bunga, dan dividen",
    href: "/kalkulator/pph-23",
    icon: Receipt,
    color: "bg-purple-500",
  },
  {
    title: "PPh Final",
    description: "UMKM (0.5%), sewa tanah/bangunan, konstruksi",
    href: "/kalkulator/pph-final",
    icon: Building2,
    color: "bg-orange-500",
  },
  {
    title: "PPh Badan",
    description: "Pajak penghasilan perusahaan (22%)",
    href: "/kalkulator/pph-badan",
    icon: Building2,
    color: "bg-emerald-500",
  },
  {
    title: "PPN",
    description: "Pajak pertambahan nilai (11%)",
    href: "/kalkulator/ppn",
    icon: Percent,
    color: "bg-rose-500",
  },
];

const features = [
  {
    title: "Generator Dokumen",
    description: "Buat faktur pajak dan bukti potong dengan mudah",
    href: "/generator",
    icon: FileText,
    status: "coming-soon",
  },
  {
    title: "Simulasi Pajak",
    description: "Simulasi pajak tahunan dan tax planning",
    href: "/simulasi",
    icon: LineChart,
    status: "available",
  },
  {
    title: "Referensi Pajak",
    description: "Tarif, PTKP, dan kalender pajak terbaru",
    href: "/referensi",
    icon: BookOpen,
    status: "available",
  },
];

const benefits = [
  "Gratis sepenuhnya, tanpa perlu daftar",
  "Perhitungan akurat sesuai aturan terbaru",
  "Hasil instan, langsung di browser",
  "Mobile-friendly, bisa diakses di mana saja",
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Hitung Pajak dengan{" "}
              <span className="text-primary">Mudah & Gratis</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              Tools perpajakan Indonesia lengkap untuk Wajib Pajak Pribadi dan Badan. 
              Kalkulator PPh 21, PPh 23, PPh Final, PPh Badan, dan PPN.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link href="/kalkulator">
                  <Calculator className="h-5 w-5" />
                  Mulai Hitung
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link href="/referensi">
                  <BookOpen className="h-5 w-5" />
                  Lihat Referensi
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-y bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculators Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">Kalkulator Pajak</h2>
            <p className="mt-4 text-muted-foreground">
              Pilih jenis pajak yang ingin Anda hitung
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {calculators.map((calc) => (
              <Link key={calc.href} href={calc.href} className="group">
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-lg ${calc.color} text-white`}
                      >
                        <calc.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {calc.title}
                          <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {calc.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Other Features */}
      <section className="border-t bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">Fitur Lainnya</h2>
            <p className="mt-4 text-muted-foreground">
              Tools tambahan untuk membantu urusan perpajakan Anda
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Link key={feature.href} href={feature.href} className="group">
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <feature.icon className="h-6 w-6" />
                      </div>
                      {feature.status === "coming-soon" && (
                        <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                          Segera Hadir
                        </span>
                      )}
                    </div>
                    <CardTitle className="mt-4 flex items-center gap-2">
                      {feature.title}
                      <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Siap Menghitung Pajak Anda?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Mulai sekarang, gratis dan tanpa perlu daftar
            </p>
            <Button asChild size="lg" className="mt-8 gap-2">
              <Link href="/kalkulator">
                <Calculator className="h-5 w-5" />
                Mulai Hitung Sekarang
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
