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
import { calculatePPh23, PPh23Input } from "@/lib/calculations";
import { PPH23_OPTIONS, PPh23Type } from "@/lib/constants";
import { formatCurrency, formatPercent } from "@/lib/utils/format";

export default function PPh23Page() {
  const [input, setInput] = useState<PPh23Input>({
    jenisPenghasilan: "jasa_teknik",
    nilaiTransaksi: 0,
    punyaNPWP: true,
  });

  const result = useMemo(() => {
    if (input.nilaiTransaksi === 0) return null;
    return calculatePPh23(input);
  }, [input]);

  const updateInput = <K extends keyof PPh23Input>(key: K, value: PPh23Input[K]) => {
    setInput((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setInput({
      jenisPenghasilan: "jasa_teknik",
      nilaiTransaksi: 0,
      punyaNPWP: true,
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
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500 text-white">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">Kalkulator PPh 23</h1>
            <p className="text-muted-foreground">
              Pajak atas Jasa, Royalti, Bunga & Dividen
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Input Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Jenis Penghasilan</CardTitle>
              <CardDescription>
                Pilih jenis penghasilan yang dikenakan PPh 23
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select
                value={input.jenisPenghasilan}
                onValueChange={(value) => updateInput("jenisPenghasilan", value as PPh23Type)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis penghasilan" />
                </SelectTrigger>
                <SelectContent>
                  {PPH23_OPTIONS.map((option) => (
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
                Masukkan nilai bruto transaksi
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nilaiTransaksi">Nilai Bruto</Label>
                <CurrencyInput
                  id="nilaiTransaksi"
                  value={input.nilaiTransaksi}
                  onChange={(value) => updateInput("nilaiTransaksi", value)}
                  placeholder="10.000.000"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status NPWP</CardTitle>
              <CardDescription>
                Apakah penerima penghasilan memiliki NPWP?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="npwp"
                    checked={input.punyaNPWP}
                    onChange={() => updateInput("punyaNPWP", true)}
                    className="h-4 w-4"
                  />
                  <span>Punya NPWP</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="npwp"
                    checked={!input.punyaNPWP}
                    onChange={() => updateInput("punyaNPWP", false)}
                    className="h-4 w-4"
                  />
                  <span>Tidak Punya NPWP</span>
                </label>
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
                  Masukkan nilai transaksi untuk melihat hasil perhitungan
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Warning for no NPWP */}
              {!input.punyaNPWP && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Tarif PPh 23 untuk penerima tanpa NPWP adalah 100% lebih tinggi dari tarif normal.
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
                      <p className="text-sm text-muted-foreground">PPh 23 Dipotong</p>
                      <p className="text-2xl font-bold text-primary">
                        {formatCurrency(result.pph23)}
                      </p>
                    </div>
                    <div className="rounded-lg bg-background p-4">
                      <p className="text-sm text-muted-foreground">Nilai Diterima (Nett)</p>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(result.nilaiDiterima)}
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
                    <span className="text-muted-foreground">Nilai Bruto</span>
                    <span className="font-medium">{formatCurrency(result.nilaiTransaksi)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Tarif Normal</span>
                    <span className="font-medium">{formatPercent(result.tarifNormal, 0)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Tarif Diterapkan</span>
                    <span className={`font-medium ${!input.punyaNPWP ? "text-red-600" : ""}`}>
                      {formatPercent(result.tarifDiterapkan, 0)}
                      {!input.punyaNPWP && " (2x)"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">PPh 23</span>
                    <span className="font-medium text-primary">{formatCurrency(result.pph23)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Nilai Diterima</span>
                    <span className="font-medium text-green-600">{formatCurrency(result.nilaiDiterima)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Info */}
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  {result.keteranganNPWP}
                </AlertDescription>
              </Alert>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
