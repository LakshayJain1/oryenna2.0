import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "container";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    children: ReactNode;
    fullWidth?: boolean;
}

const variants: Record<Variant, string> = {
    primary:
        "bg-primary text-on-primary hover:bg-primary-container transition-colors duration-300 shadow-sm",
    secondary:
        "bg-surface-container text-ink hover:bg-surface-container-high transition-colors duration-200",
    ghost:
        "bg-transparent text-ink hover:text-accent transition-colors duration-200",
    container:
        "bg-primary-container text-surface hover:bg-primary transition-colors duration-300",
};

export default function Button({
    variant = "primary",
    children,
    fullWidth,
    className = "",
    ...props
}: ButtonProps) {
    return (
        <button
            className={`pressable h-[52px] px-space-lg rounded-full font-label-lg text-label-lg uppercase tracking-[0.14em] flex items-center justify-center gap-space-xs ${variants[variant]
                } ${fullWidth ? "w-full" : ""} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}