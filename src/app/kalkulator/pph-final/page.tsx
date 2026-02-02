"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Calculator, Info, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CurrencyInput } from "@/components/shared";
import { calculatePPhFinal, PPhFinalInput } from "@/lib/calculations";
import { PPH_FINAL_OPTIONS, PPhFinalType } from "@/lib/constants";
import { formatCurrency, formatPercent } from "@/lib/utils/format";

export default function PPhFinalPage() {
  const [input, setInput] = useState<PPhFinalInput>({
    jenisPPhFinal: "umkm",
    nilaiTransaksi: 0,
    omzetTahunan: 0,
  });

  const result = useMemo(() => {
    if (input.nilaiTransaksi === 0) return null;
    return calculatePPhFinal(input);
  }, [input]);

  const updateInput = <K extends keyof PPhFinalInput>(key: K, value: PPhFinalInput[K]) => {
    setInput((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setInput({
      jenisPPhFinal: "umkm",
      nilaiTransaksi: 0,
      omzetTahunan: 0,
    });
  };

  const isUMKM = input.jenisPPhFinal === "umkm";

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        href="/kalkulator"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Kalkulator
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500 text-white">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">Kalkulator PPh Final</h1>
            <p className="text-muted-foreground">
              UMKM, Sewa, dan Konstruksi
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Input Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Jenis PPh Final</CardTitle>
              <CardDescription>
                Pilih jenis transaksi yang dikenakan PPh Final
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select
                value={input.jenisPPhFinal}
                onValueChange={(value) => updateInput("jenisPPhFinal", value as PPhFinalType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis PPh Final" />
                </SelectTrigger>
                <SelectContent>
                  {PPH_FINAL_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Nilai Transaksi</CardTitle>
              <CardDescription>
                {isUMKM ? "Masukkan omzet yang akan dihitung pajaknya" : "Masukkan nilai transaksi"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nilaiTransaksi">
                  {isUMKM ? "Omzet (yang akan dihitung)" : "Nilai Bruto"}
                </Label>
                <CurrencyInput
                  id="nilaiTransaksi"
                  value={input.nilaiTransaksi}
                  onChange={(value) => updateInput("nilaiTransaksi", value)}
                  placeholder="100.000.000"
                />
              </div>

              {isUMKM && (
                <div className="space-y-2">
                  <Label htmlFor="omzetTahunan">Omzet Tahunan (opsional)</Label>
                  <CurrencyInput
                    id="omzetTahunan"
                    value={input.omzetTahunan || 0}
                    onChange={(value) => updateInput("omzetTahunan", value)}
                    placeholder="1.000.000.000"
                  />
                  <p className="text-xs text-muted-foreground">
                    Untuk validasi batas omzet UMKM (Rp 4.8 Miliar/tahun)
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Button onClick={handleReset} variant="outline" className="w-full">
            Reset
          </Button>
        </div>

        {/* Result */}
        <div className="space-y-6">
          {!result ? (
            <Card className="border-dashed">
              <CardContent className="flex min-h-[300px] flex-col items-center justify-center text-center">
                <Calculator className="mb-4 h-12 w-12 text-muted-foreground/50" />
                <p className="text-muted-foreground">
                  Masukkan nilai transaksi untuk melihat hasil perhitungan
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Warning for UMKM over limit */}
              {!result.isUMKMEligible && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    {result.catatan}
                  </AlertDescription>
                </Alert>
              )}

              {/* Summary Card */}
              <Card className="border-primary/50 bg-primary/5">
                <CardHeader>
                  <CardTitle>Hasil Perhitungan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg bg-background p-4">
                      <p className="text-sm text-muted-foreground">PPh Final</p>
                      <p className="text-2xl font-bold text-primary">
                        {formatCurrency(result.pphFinal)}
                      </p>
                    </div>
                    <div className="rounded-lg bg-background p-4">
                      <p className="text-sm text-muted-foreground">Nilai Setelah Pajak</p>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(result.nilaiSetelahPajak)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Detail Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Rincian</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Nilai Transaksi</span>
                    <span className="font-medium">{formatCurrency(result.nilaiTransaksi)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Tarif</span>
                    <span className="font-medium">{formatPercent(result.tarif, 1)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">PPh Final</span>
                    <span className="font-medium text-primary">{formatCurrency(result.pphFinal)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Nilai Setelah Pajak</span>
                    <span className="font-medium text-green-600">{formatCurrency(result.nilaiSetelahPajak)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Info */}
              {result.catatan && result.isUMKMEligible && (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    {result.catatan}
                  </AlertDescription>
                </Alert>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
