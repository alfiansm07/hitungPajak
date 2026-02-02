import Link from "next/link";
import { Calculator } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Calculator className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">HitungPajak</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Tools perpajakan Indonesia gratis untuk membantu menghitung dan memahami pajak Anda.
            </p>
          </div>

          {/* Kalkulator */}
          <div className="space-y-4">
            <h3 className="font-semibold">Kalkulator</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/kalkulator/pph-21" className="hover:text-primary transition-colors">
                  PPh 21
                </Link>
              </li>
              <li>
                <Link href="/kalkulator/pph-23" className="hover:text-primary transition-colors">
                  PPh 23
                </Link>
              </li>
              <li>
                <Link href="/kalkulator/pph-final" className="hover:text-primary transition-colors">
                  PPh Final
                </Link>
              </li>
              <li>
                <Link href="/kalkulator/ppn" className="hover:text-primary transition-colors">
                  PPN
                </Link>
              </li>
            </ul>
          </div>

          {/* Fitur Lainnya */}
          <div className="space-y-4">
            <h3 className="font-semibold">Fitur Lainnya</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/generator" className="hover:text-primary transition-colors">
                  Generator Dokumen
                </Link>
              </li>
              <li>
                <Link href="/simulasi" className="hover:text-primary transition-colors">
                  Simulasi Pajak
                </Link>
              </li>
              <li>
                <Link href="/referensi/tarif" className="hover:text-primary transition-colors">
                  Tarif Pajak
                </Link>
              </li>
              <li>
                <Link href="/referensi/kalender" className="hover:text-primary transition-colors">
                  Kalender Pajak
                </Link>
              </li>
            </ul>
          </div>

          {/* Referensi */}
          <div className="space-y-4">
            <h3 className="font-semibold">Referensi</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/referensi/ptkp" className="hover:text-primary transition-colors">
                  PTKP Terbaru
                </Link>
              </li>
              <li>
                <a
                  href="https://www.pajak.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Website DJP →
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            © {currentYear} HitungPajak. Gratis untuk semua.
          </p>
          <p className="text-xs text-muted-foreground max-w-md">
            <strong>Disclaimer:</strong> Website ini hanya sebagai alat bantu hitung. 
            Untuk kepastian perpajakan, konsultasikan dengan konsultan pajak atau kantor pajak.
          </p>
        </div>
      </div>
    </footer>
  );
}
