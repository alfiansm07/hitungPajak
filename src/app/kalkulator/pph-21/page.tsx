"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Calculator, Info } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { CurrencyInput } from "@/components/shared";
import { calculatePPh21, PPh21Input } from "@/lib/calculations";
import { PTKP_OPTIONS, PTKPStatus } from "@/lib/constants";
import { formatCurrency, formatPercent } from "@/lib/utils/format";

export default function PPh21Page() {
  const [input, setInput] = useState<PPh21Input>({
    gajiPokok: 0,
    tunjangan: 0,
    bonus: 0,
    ptkpStatus: "TK/0",
    iuranBpjsKesehatan: true,
    iuranBpjsKetenagakerjaan: true,
  });

  const result = useMemo(() => {
    if (input.gajiPokok === 0) return null;
    return calculatePPh21(input);
  }, [input]);

  const updateInput = <K extends keyof PPh21Input>(key: K, value: PPh21Input[K]) => {
    setInput((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setInput({
      gajiPokok: 0,
      tunjangan: 0,
      bonus: 0,
      ptkpStatus: "TK/0",
      iuranBpjsKesehatan: true,
      iuranBpjsKetenagakerjaan: true,
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
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-white">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">Kalkulator PPh 21</h1>
            <p className="text-muted-foreground">
              Pajak Penghasilan Karyawan
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Input Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Penghasilan</CardTitle>
              <CardDescription>
                Masukkan data penghasilan bulanan Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gajiPokok">Gaji Pokok (per bulan)</Label>
                <CurrencyInput
                  id="gajiPokok"
                  value={input.gajiPokok}
                  onChange={(value) => updateInput("gajiPokok", value)}
                  placeholder="10.000.000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tunjangan">Tunjangan (per bulan)</Label>
                <CurrencyInput
                  id="tunjangan"
                  value={input.tunjangan}
                  onChange={(value) => updateInput("tunjangan", value)}
                  placeholder="2.000.000"
                />
                <p className="text-xs text-muted-foreground">
                  Transport, makan, jabatan, dll
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bonus">Bonus / THR (per tahun)</Label>
                <CurrencyInput
                  id="bonus"
                  value={input.bonus}
                  onChange={(value) => updateInput("bonus", value)}
                  placeholder="12.000.000"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status PTKP</CardTitle>
              <CardDescription>
                Penghasilan Tidak Kena Pajak
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select
                value={input.ptkpStatus}
                onValueChange={(value) => updateInput("ptkpStatus", value as PTKPStatus)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih status PTKP" />
                </SelectTrigger>
                <SelectContent>
                  {PTKP_OPTIONS.map((option) => (
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
              <CardTitle>Iuran BPJS</CardTitle>
              <CardDescription>
                Iuran yang ditanggung karyawan (sebagai pengurang)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={input.iuranBpjsKesehatan}
                  onChange={(e) => updateInput("iuranBpjsKesehatan", e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span>BPJS Kesehatan (1%)</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={input.iuranBpjsKetenagakerjaan}
                  onChange={(e) => updateInput("iuranBpjsKetenagakerjaan", e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span>BPJS Ketenagakerjaan (JHT 2% + JP 1%)</span>
              </label>
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
                  Masukkan gaji pokok untuk melihat hasil perhitungan
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Summary Card */}
              <Card className="border-primary/50 bg-primary/5">
                <CardHeader>
                  <CardTitle>Ringkasan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg bg-background p-4">
                      <p className="text-sm text-muted-foreground">PPh 21 / Bulan</p>
                      <p className="text-2xl font-bold text-primary">
                        {formatCurrency(result.pph21Bulanan)}
                      </p>
                    </div>
                    <div className="rounded-lg bg-background p-4">
                      <p className="text-sm text-muted-foreground">Take Home Pay</p>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(result.takeHomePay)}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-lg bg-background p-4">
                    <p className="text-sm text-muted-foreground">PPh 21 / Tahun</p>
                    <p className="text-xl font-semibold">
                      {formatCurrency(result.pph21Tahunan)}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Breakdown Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Rincian Perhitungan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {result.breakdown.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className={item.value < 0 ? "text-muted-foreground" : ""}>
                          {item.label}
                        </span>
                        <span className={`font-medium ${item.value < 0 ? "text-red-600" : ""}`}>
                          {formatCurrency(Math.abs(item.value))}
                          {item.value < 0 && " (-)"}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tarif Progresif */}
              {result.bracketBreakdown.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Tarif Progresif PPh 21</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {result.bracketBreakdown.map((bracket, index) => (
                        <div key={index} className="rounded-lg border p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              {bracket.bracket}
                            </span>
                            <span className="font-medium">
                              {formatPercent(bracket.rate, 0)}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center justify-between text-sm">
                            <span>PKP: {formatCurrency(bracket.taxable)}</span>
                            <span className="font-medium text-primary">
                              Pajak: {formatCurrency(bracket.tax)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Info */}
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Perhitungan ini menggunakan metode Gross (pajak ditanggung karyawan) 
                  dengan tarif PPh 21 sesuai UU HPP yang berlaku sejak 2022.
                </AlertDescription>
              </Alert>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
