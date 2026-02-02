"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Calculator, Info, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CurrencyInput } from "@/components/shared";
import { calculatePPhBadan, PPhBadanInput } from "@/lib/calculations";
import { formatCurrency, formatPercent } from "@/lib/utils/format";

export default function PPhBadanPage() {
  const [input, setInput] = useState<PPhBadanInput>({
    penghasilanBruto: 0,
    biayaOperasional: 0,
    omzetTahunan: 0,
  });

  const result = useMemo(() => {
    if (input.penghasilanBruto === 0) return null;
    return calculatePPhBadan(input);
  }, [input]);

  const updateInput = <K extends keyof PPhBadanInput>(key: K, value: PPhBadanInput[K]) => {
    setInput((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setInput({
      penghasilanBruto: 0,
      biayaOperasional: 0,
      omzetTahunan: 0,
    });
  };

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
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500 text-white">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">Kalkulator PPh Badan</h1>
            <p className="text-muted-foreground">
              Pajak Penghasilan Perusahaan (22%)
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Input Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Penghasilan Perusahaan</CardTitle>
              <CardDescription>
                Masukkan data penghasilan tahunan perusahaan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="penghasilanBruto">Penghasilan Bruto (per tahun)</Label>
                <CurrencyInput
                  id="penghasilanBruto"
                  value={input.penghasilanBruto}
                  onChange={(value) => updateInput("penghasilanBruto", value)}
                  placeholder="5.000.000.000"
                />
                <p className="text-xs text-muted-foreground">
                  Total pendapatan usaha sebelum dikurangi biaya
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="biayaOperasional">Biaya Operasional (per tahun)</Label>
                <CurrencyInput
                  id="biayaOperasional"
                  value={input.biayaOperasional}
                  onChange={(value) => updateInput("biayaOperasional", value)}
                  placeholder="3.000.000.000"
                />
                <p className="text-xs text-muted-foreground">
                  Biaya yang dapat dikurangkan dari penghasilan
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Omzet untuk Fasilitas</CardTitle>
              <CardDescription>
                Untuk menghitung fasilitas Pasal 31E (omzet ≤ Rp 50 Miliar)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="omzetTahunan">Omzet Tahunan</Label>
                <CurrencyInput
                  id="omzetTahunan"
                  value={input.omzetTahunan}
                  onChange={(value) => updateInput("omzetTahunan", value)}
                  placeholder="10.000.000.000"
                />
                <p className="text-xs text-muted-foreground">
                  Omzet bruto usaha untuk menentukan fasilitas pengurangan tarif
                </p>
              </div>
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
                  Masukkan penghasilan bruto untuk melihat hasil perhitungan
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Facility Info */}
              {result.dapatFasilitas && (
                <Alert className="border-green-500 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Mendapat fasilitas Pasal 31E! Sebagian PKP dikenakan tarif 11% (50% dari 22%).
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
                      <p className="text-sm text-muted-foreground">PPh Badan Terutang</p>
                      <p className="text-2xl font-bold text-primary">
                        {formatCurrency(result.pphBadanTotal)}
                      </p>
                    </div>
                    <div className="rounded-lg bg-background p-4">
                      <p className="text-sm text-muted-foreground">Tarif Efektif</p>
                      <p className="text-2xl font-bold text-emerald-600">
                        {formatPercent(result.tarifEfektif, 2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Detail Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Rincian Perhitungan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Penghasilan Bruto</span>
                    <span className="font-medium">{formatCurrency(result.penghasilanBruto)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Biaya Operasional</span>
                    <span className="font-medium text-red-600">
                      ({formatCurrency(result.biayaOperasional)})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Penghasilan Neto</span>
                    <span className="font-medium">{formatCurrency(result.penghasilanNeto)}</span>
                  </div>
                  <div className="flex items-center justify-between border-t pt-3">
                    <span className="font-medium">Penghasilan Kena Pajak (PKP)</span>
                    <span className="font-bold">{formatCurrency(result.pkp)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Tarif Breakdown */}
              {result.dapatFasilitas && result.pkpFasilitas > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Rincian Tarif</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">PKP dengan Fasilitas (11%)</span>
                        <span className="font-medium">{formatCurrency(result.pkpFasilitas)}</span>
                      </div>
                      <div className="mt-1 text-right text-sm text-primary">
                        PPh: {formatCurrency(result.pphFasilitas)}
                      </div>
                    </div>
                    {result.pkpTanpaFasilitas > 0 && (
                      <div className="rounded-lg border p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">PKP Tarif Normal (22%)</span>
                          <span className="font-medium">{formatCurrency(result.pkpTanpaFasilitas)}</span>
                        </div>
                        <div className="mt-1 text-right text-sm text-primary">
                          PPh: {formatCurrency(result.pphTanpaFasilitas)}
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-between border-t pt-3">
                      <span className="font-medium">Total PPh Badan</span>
                      <span className="font-bold text-primary">{formatCurrency(result.pphBadanTotal)}</span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Info */}
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  {result.catatan}
                </AlertDescription>
              </Alert>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
