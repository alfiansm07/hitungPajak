"use client";

import { forwardRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

interface CurrencyInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value: number;
  onChange: (value: number) => void;
}

function formatDisplay(num: number): string {
  if (num === 0) return "";
  return num.toLocaleString("id-ID");
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ value, onChange, className, ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState("");

    // Sync display value when value prop changes externally
    useEffect(() => {
      setDisplayValue(formatDisplay(value));
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/[^\d]/g, "");
      const numValue = parseInt(raw, 10) || 0;
      
      setDisplayValue(raw ? numValue.toLocaleString("id-ID") : "");
      onChange(numValue);
    };

    const handleBlur = () => {
      setDisplayValue(formatDisplay(value));
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      e.target.select();
    };

    return (
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          Rp
        </span>
        <Input
          ref={ref}
          type="text"
          inputMode="numeric"
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={`pl-10 ${className || ""}`}
          {...props}
        />
      </div>
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";
