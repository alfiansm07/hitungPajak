"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Calculator, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CurrencyInput } from "@/components/shared";
import { calculatePPN, calculatePPNSelisih, PPNInput } from "@/lib/calculations";
import { PPN_RATE } from "@/lib/constants";
import { formatCurrency, formatPercent } from "@/lib/utils/format";

export default function PPNPage() {
  const [mode, setMode] = useState<"single" | "selisih">("single");
  
  // Single calculation
  const [singleInput, setSingleInput] = useState<PPNInput>({
    nilai: 0,
    sudahTermasukPPN: false,
    jenis: "keluaran",
  });

  // Selisih calculation
  const [keluaranInput, setKeluaranInput] = useState({ nilai: 0, sudahTermasukPPN: false });
  const [masukanInput, setMasukanInput] = useState({ nilai: 0, sudahTermasukPPN: false });

  const singleResult = useMemo(() => {
    if (singleInput.nilai === 0) return null;
    return calculatePPN(singleInput);
  }, [singleInput]);

  const selisihResult = useMemo(() => {
    if (keluaranInput.nilai === 0 && masukanInput.nilai === 0) return null;
    
    const keluaran = calculatePPN({ ...keluaranInput, jenis: "keluaran" });
    const masukan = calculatePPN({ ...masukanInput, jenis: "masukan" });
    
    return {
      keluaran,
      masukan,
      selisih: calculatePPNSelisih(keluaran.ppn, masukan.ppn),
    };
  }, [keluaranInput, masukanInput]);

  const handleReset = () => {
    setSingleInput({ nilai: 0, sudahTermasukPPN: false, jenis: "keluaran" });
    setKeluaranInput({ nilai: 0, sudahTermasukPPN: false });
    setMasukanInput({ nilai: 0, sudahTermasukPPN: false });
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
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500 text-white">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">Kalkulator PPN</h1>
            <p className="text-muted-foreground">
              Pajak Pertambahan Nilai ({formatPercent(PPN_RATE, 0)})
            </p>
          </div>
        </div>
      </div>

      <Tabs value={mode} onValueChange={(v) => setMode(v as "single" | "selisih")}>
        <TabsList className="mb-6 grid w-full grid-cols-2">
          <TabsTrigger value="single">Hitung PPN</TabsTrigger>
          <TabsTrigger value="selisih">Selisih PPN</TabsTrigger>
        </TabsList>

        {/* Single Calculation */}
        <TabsContent value="single">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Input Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Nilai Transaksi</CardTitle>
                  <CardDescription>
                    Masukkan nilai transaksi untuk menghitung PPN
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nilai">Nilai</Label>
                    <CurrencyInput
                      id="nilai"
                      value={singleInput.nilai}
                      onChange={(value) => setSingleInput((prev) => ({ ...prev, nilai: value }))}
                      placeholder="10.000.000"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Nilai ini sudah termasuk PPN?</Label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="ppn-type"
                          checked={!singleInput.sudahTermasukPPN}
                          onChange={() => setSingleInput((prev) => ({ ...prev, sudahTermasukPPN: false }))}
                          className="h-4 w-4"
                        />
                        <span>Belum (Eksklusif PPN)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="ppn-type"
                          checked={singleInput.sudahTermasukPPN}
                          onChange={() => setSingleInput((prev) => ({ ...prev, sudahTermasukPPN: true }))}
                          className="h-4 w-4"
                        />
                        <span>Sudah (Inklusif PPN)</span>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button onClick={handleReset} variant="outline" className="w-full">
                Reset
              </Button>
            </div>

            {/* Result */}
            <div className="space-y-6">
              {!singleResult ? (
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
                  {/* Summary Card */}
                  <Card className="border-primary/50 bg-primary/5">
                    <CardHeader>
                      <CardTitle>Hasil Perhitungan</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div className="rounded-lg bg-background p-4">
                          <p className="text-sm text-muted-foreground">DPP</p>
                          <p className="text-xl font-bold">
                            {formatCurrency(singleResult.dpp)}
                          </p>
                        </div>
                        <div className="rounded-lg bg-background p-4">
                          <p className="text-sm text-muted-foreground">PPN (11%)</p>
                          <p className="text-xl font-bold text-primary">
                            {formatCurrency(singleResult.ppn)}
                          </p>
                        </div>
                        <div className="rounded-lg bg-background p-4">
                          <p className="text-sm text-muted-foreground">Total</p>
                          <p className="text-xl font-bold text-green-600">
                            {formatCurrency(singleResult.total)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Info */}
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      {singleInput.sudahTermasukPPN
                        ? `DPP dihitung dari nilai inklusif: ${formatCurrency(singleInput.nilai)} ÷ 1.11 = ${formatCurrency(singleResult.dpp)}`
                        : `PPN dihitung dari DPP: ${formatCurrency(singleResult.dpp)} × 11% = ${formatCurrency(singleResult.ppn)}`}
                    </AlertDescription>
                  </Alert>
                </>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Selisih Calculation */}
        <TabsContent value="selisih">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Input Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>PPN Keluaran (Penjualan)</CardTitle>
                  <CardDescription>
                    PPN yang dipungut dari pembeli
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Nilai Penjualan</Label>
                    <CurrencyInput
                      value={keluaranInput.nilai}
                      onChange={(value) => setKeluaranInput((prev) => ({ ...prev, nilai: value }))}
                      placeholder="100.000.000"
                    />
                  </div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={keluaranInput.sudahTermasukPPN}
                      onChange={(e) => setKeluaranInput((prev) => ({ ...prev, sudahTermasukPPN: e.target.checked }))}
                      className="h-4 w-4 rounded"
                    />
                    <span className="text-sm">Sudah termasuk PPN</span>
                  </label>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>PPN Masukan (Pembelian)</CardTitle>
                  <CardDescription>
                    PPN yang dibayar ke penjual
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Nilai Pembelian</Label>
                    <CurrencyInput
                      value={masukanInput.nilai}
                      onChange={(value) => setMasukanInput((prev) => ({ ...prev, nilai: value }))}
                      placeholder="80.000.000"
                    />
                  </div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={masukanInput.sudahTermasukPPN}
                      onChange={(e) => setMasukanInput((prev) => ({ ...prev, sudahTermasukPPN: e.target.checked }))}
                      className="h-4 w-4 rounded"
                    />
                    <span className="text-sm">Sudah termasuk PPN</span>
                  </label>
                </CardContent>
              </Card>

              <Button onClick={handleReset} variant="outline" className="w-full">
                Reset
              </Button>
            </div>

            {/* Result */}
            <div className="space-y-6">
              {!selisihResult ? (
                <Card className="border-dashed">
                  <CardContent className="flex min-h-[300px] flex-col items-center justify-center text-center">
                    <Calculator className="mb-4 h-12 w-12 text-muted-foreground/50" />
                    <p className="text-muted-foreground">
                      Masukkan nilai penjualan dan pembelian untuk melihat selisih PPN
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Summary Card */}
                  <Card className="border-primary/50 bg-primary/5">
                    <CardHeader>
                      <CardTitle>Selisih PPN</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="rounded-lg bg-background p-4">
                        <p className="text-sm text-muted-foreground">
                          {selisihResult.selisih.status === "kurang_bayar"
                            ? "PPN Kurang Bayar"
                            : selisihResult.selisih.status === "lebih_bayar"
                            ? "PPN Lebih Bayar"
                            : "PPN Nihil"}
                        </p>
                        <p
                          className={`text-2xl font-bold ${
                            selisihResult.selisih.status === "kurang_bayar"
                              ? "text-red-600"
                              : selisihResult.selisih.status === "lebih_bayar"
                              ? "text-green-600"
                              : ""
                          }`}
                        >
                          {formatCurrency(Math.abs(selisihResult.selisih.selisih))}
                        </p>
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
                        <span className="text-muted-foreground">PPN Keluaran</span>
                        <span className="font-medium">{formatCurrency(selisihResult.keluaran.ppn)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">PPN Masukan</span>
                        <span className="font-medium text-red-600">
                          ({formatCurrency(selisihResult.masukan.ppn)})
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-t pt-3">
                        <span className="font-medium">Selisih</span>
                        <span
                          className={`font-bold ${
                            selisihResult.selisih.selisih > 0
                              ? "text-red-600"
                              : selisihResult.selisih.selisih < 0
                              ? "text-green-600"
                              : ""
                          }`}
                        >
                          {formatCurrency(selisihResult.selisih.selisih)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Info */}
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      {selisihResult.selisih.keterangan}
                    </AlertDescription>
                  </Alert>
                </>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
