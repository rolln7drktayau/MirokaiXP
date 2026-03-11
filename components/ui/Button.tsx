"use client";

import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const base = variant === "primary" ? "cta-primary" : "cta-secondary";
  return <button {...props} className={`${base} ${className}`.trim()} />;
}
