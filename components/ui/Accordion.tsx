"use client";

import { useState } from "react";

interface AccordionProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export default function Accordion({
    title,
    children,
    defaultOpen = false,
}: AccordionProps) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className="bg-surface-container-low overflow-hidden">
            <button
                className="w-full px-space-md py-space-sm flex items-center justify-between text-left"
                onClick={() => setOpen(!open)}
                type="button"
                aria-expanded={open}
            >
                <span className="font-label-md text-label-md uppercase tracking-[0.16em] text-primary">
                    {title}
                </span>
                <span
                    className={`material-symbols-outlined text-[20px] text-primary transition-transform duration-300 ${open ? "rotate-180" : ""
                        }`}
                >
                    expand_more
                </span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 px-space-md ${open ? "max-h-[500px] pb-space-md" : "max-h-0"
                    }`}
            >
                {children}
            </div>
        </div>
    );
}