"use client";

import { ReactNode } from "react";

interface TabSwitcherProps {
    tabs: { id: string; label: string }[];
    activeTab: string;
    onChange: (id: string) => void;
    variant?: "pill" | "underline";
}

export default function TabSwitcher({
    tabs,
    activeTab,
    onChange,
    variant = "pill",
}: TabSwitcherProps) {
    if (variant === "pill") {
        return (
            <div className="p-1 rounded-lg bg-surface-container-high flex items-center justify-between">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onChange(tab.id)}
                        className={`w-1/2 py-2.5 text-center font-label-md text-label-md rounded transition-all duration-300 ${activeTab === tab.id
                                ? "bg-surface-container-lowest text-primary shadow-sm"
                                : "text-on-surface-variant hover:text-primary"
                            }`}
                        type="button"
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onChange(tab.id)}
                    className={`flex-1 py-2.5 px-4 font-label-lg text-label-lg tracking-wider transition-all duration-300 text-center uppercase ${activeTab === tab.id
                            ? "text-on-primary bg-primary shadow-sm"
                            : "text-on-surface-variant hover:text-primary"
                        }`}
                    type="button"
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}