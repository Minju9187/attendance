import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  variant?: "default" | "blue" | "gray";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  variant = "default",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  const baseStyles = "transition font-bold cursor-pointer";
  const variantStyles = {
    default: "bg-bm-red text-white hover:brightness-90",
    blue: "bg-bm-blue text-white",
    gray: "text-gray-700",
  };
  const sizeStyles = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base rounded-lg",
    lg: "py-2 text-lg rounded-3xl",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
