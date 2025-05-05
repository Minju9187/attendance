import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = {
  label?: string;
  error?: string;
  variant?: "default" | "none";
  labelClassName?: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      variant = "default",
      labelClassName,
      className,
      ...rest
    }: InputProps,
    ref,
  ) => {
    const baseStyles = "outline-none transition w-full";

    const variantStyles = {
      default:
        "border-0 border-b border-[rgba(219,219,219,1)] focus:outline-none focus:border-b-[#006cd8]",
      none: "border-none",
    };

    const errorStyles = error ? "border-red-500 focus:border-red-500" : "";

    return (
      <>
        {label && <label className={labelClassName}>{label}</label>}
        <input
          ref={ref}
          className={cn(
            baseStyles,
            variantStyles[variant],
            errorStyles,
            className,
          )}
          {...rest}
        />
        {error ? (
          <small role="alert" className="mt-1 text-red-600">
            {error}
          </small>
        ) : (
          <></>
        )}
      </>
    );
  },
);

Input.displayName = "Input";

export default Input;
