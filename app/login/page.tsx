"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser, useSignIn, useSignUp } from "@clerk/nextjs";
import TabSwitcher from "@/components/ui/TabSwitcher";

const errMsg = (e: unknown, fallback: string) =>
    e && typeof e === "object" && "message" in e && typeof (e as any).message === "string" && (e as any).message
        ? (e as any).message
        : fallback;

const resetSubmit = (
    setSubmitting: (v: boolean) => void,
    setSubmitText: (v: string) => void,
    mode: string
) => {
    setSubmitting(false);
    setSubmitText(mode === "signin" ? "Enter Your Sanctuary" : "Transmit Sensory Link");
};

export default function AuthPage() {
    const router = useRouter();
    const { isSignedIn } = useUser();
    const { signIn } = useSignIn();
    const { signUp } = useSignUp();

    const [mode, setMode] = useState("signin");
    const [showPass, setShowPass] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitText, setSubmitText] = useState("Enter Your Sanctuary");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [verifyMode, setVerifyMode] = useState<null | "register" | "token">(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (isSignedIn) router.push("/account");
    }, [isSignedIn, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (mode === "signin") {
            if (!signIn) return;
            setSubmitting(true);
            setSubmitText("Authenticating Presence...");
            const { error } = await signIn.password({ identifier: email, password });
            if (error) {
                setError(errMsg(error, "Invalid email or passcode."));
                resetSubmit(setSubmitting, setSubmitText, mode);
                return;
            }
            if (signIn.status === "complete") {
                const fin = await signIn.finalize();
                if (fin.error) {
                    setError(errMsg(fin.error, "Could not complete sign in."));
                    resetSubmit(setSubmitting, setSubmitText, mode);
                    return;
                }
                setSubmitText("Welcome Back.");
                router.push("/account");
            } else {
                setError("Additional verification is required to enter.");
                resetSubmit(setSubmitting, setSubmitText, mode);
            }
        } else {
            if (!signUp) return;
            setSubmitting(true);
            setSubmitText("Sending Link...");
            const { error } = await signUp.create({ emailAddress: email });
            if (error) {
                setError(errMsg(error, "Could not create your sanctuary account."));
                resetSubmit(setSubmitting, setSubmitText, mode);
                return;
            }
            const sent = await signUp.verifications.sendEmailCode();
            if (sent.error) {
                setError(errMsg(sent.error, "Could not dispatch verification code."));
                resetSubmit(setSubmitting, setSubmitText, mode);
                return;
            }
            setVerifyMode("register");
            setSubmitText("Enter Your Sanctuary");
            setSubmitting(false);
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);

        if (verifyMode === "register") {
            if (!signUp) return;
            const { error } = await signUp.verifications.verifyEmailCode({ code });
            if (error) {
                setError(errMsg(error, "Invalid verification code."));
                setSubmitting(false);
                return;
            }
            if (signUp.status === "complete") {
                const fin = await signUp.finalize();
                if (fin.error) {
                    setError(errMsg(fin.error, "Could not complete registration."));
                    setSubmitting(false);
                    return;
                }
                router.push("/account");
            } else {
                setError("Verification incomplete. Try again.");
                setSubmitting(false);
            }
        } else if (verifyMode === "token") {
            if (!signIn) return;
            const { error } = await signIn.emailCode.verifyCode({ code });
            if (error) {
                setError(errMsg(error, "Invalid one-time token."));
                setSubmitting(false);
                return;
            }
            if (signIn.status === "complete") {
                const fin = await signIn.finalize();
                if (fin.error) {
                    setError(errMsg(fin.error, "Could not complete sign in."));
                    setSubmitting(false);
                    return;
                }
                router.push("/account");
            } else {
                setError("Verification incomplete. Try again.");
                setSubmitting(false);
            }
        }
    };

    const handleToken = async () => {
        setError("");
        if (!email) {
            setError("Enter your atelier email first, then request a token.");
            return;
        }
        if (!signIn) return;
        setSubmitting(true);
        const created = await signIn.create({ identifier: email });
        if (created.error) {
            setError(errMsg(created.error, "Could not start verification."));
            setSubmitting(false);
            return;
        }
        const sent = await signIn.emailCode.sendCode();
        if (sent.error) {
            setError(errMsg(sent.error, "Could not dispatch one-time token."));
            setSubmitting(false);
            return;
        }
        setVerifyMode("token");
        setSubmitting(false);
    };

    return (
        <main className="min-h-screen w-full flex items-center justify-center bg-surface p-margin-mobile md:p-margin">
            <div className="flex flex-col w-full max-w-7xl mx-auto my-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-surface-container-low shadow-sm">
                    {/* Left Visual */}
                    <div
                        className="relative lg:col-span-5 min-h-[520px] lg:min-h-[820px] flex flex-col justify-between p-8 sm:p-12 overflow-hidden bg-surface-container bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB7W6uiDblG4XiKCWper-ukLsOvDWQXCAZVKFUZOAp-wFN4c91flr2zVxS5tymrYw9Yuls4QUfO3Uezx6hYu0AVEXbc7xy6irldHPWfCTElehVOKFJMHikXnlLSmDQdFGg529Rydg_D9tz5R3dfHiXegl1zn1twGgYGHYKFvnI8EHFxfKDF8naEZrJDTaZop8-kKubjDy-QWXXvm8mdOxpcLYGfSmdV2nswak2znfcr1t_Xo1HJVxvMkA')",
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-primary/40 pointer-events-none" />
                        <div className="relative z-10 flex items-center justify-between text-surface-bright">
                            <div className="flex items-center gap-2">
                                <span className="font-display text-headline-sm tracking-widest uppercase">
                                    Oryenna
                                </span>
                                <span className="text-label-sm font-label-sm tracking-widest opacity-70 px-2 py-0.5 bg-surface/10 backdrop-blur-sm">
                                    N° 1402
                                </span>
                            </div>
                            <div className="text-label-sm font-label-sm tracking-widest uppercase opacity-75">
                                Atelier Archive
                            </div>
                        </div>

                        <div className="relative z-10 flex flex-col gap-6 mt-auto pt-24">
                            <div className="p-6 bg-surface-bright/95 backdrop-blur-md shadow-md">
                                <div className="flex items-center gap-2 text-secondary mb-3">
                                    <span
                                        className="material-symbols-outlined text-title"
                                        style={{ fontVariationSettings: "'FILL' 1" }}
                                    >
                                        local_fire_department
                                    </span>
                                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
                                        Atelier Manual • Entry 01
                                    </span>
                                </div>
                                <blockquote className="font-body-lg text-body-lg text-primary italic leading-relaxed">
                                    "The striking of a match is a boundary line between the noise
                                    outside and your quiet haven within."
                                </blockquote>
                            </div>
                        </div>
                    </div>

                    {/* Right Form */}
                    <div className="lg:col-span-7 flex flex-col justify-between p-8 sm:p-14 lg:p-16 bg-surface">
                        <div className="w-full max-w-xl mx-auto flex flex-col">
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <span className="w-6 h-px bg-outline-variant" />
                                    <span className="font-label-md text-label-md uppercase text-secondary tracking-widest">
                                        Oryenna Atelier & Sanctuary
                                    </span>
                                </div>
                                <h1 className="font-display text-headline-lg sm:text-display text-primary tracking-tight mt-1">
                                    Return to Calm.
                                </h1>
                                <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                                    Access your bespoke order archive, private seasonal releases,
                                    and personalized olfactory preferences.
                                </p>
                            </div>

                            <div className="mt-8 mb-8">
                                <TabSwitcher
                                    tabs={[
                                        { id: "signin", label: "Sign In" },
                                        { id: "register", label: "Join Sanctuary" },
                                    ]}
                                    activeTab={mode}
                                    onChange={setMode}
                                    variant="pill"
                                />
                            </div>

                            <form className="flex flex-col gap-6" onSubmit={verifyMode ? handleVerify : handleSubmit}>
                                <div className="flex flex-col gap-2">
                                    <label className="font-label-md text-label-md tracking-wider uppercase text-on-surface-variant">
                                        Atelier Email / Sanctuary ID
                                    </label>
                                    <input
                                        className="w-full py-3 px-4 bg-surface-container-low text-primary font-body-md focus:bg-surface-container-lowest focus:outline-none transition-colors placeholder:text-outline-variant"
                                        placeholder="julian.vane@sanctuary.studio"
                                        required
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={!!verifyMode}
                                    />
                                </div>

                                {verifyMode && (
                                    <div className="flex flex-col gap-2">
                                        <label className="font-label-md text-label-md tracking-wider uppercase text-on-surface-variant">
                                            Verification Token
                                        </label>
                                        <input
                                            className="w-full py-3 px-4 bg-surface-container-low text-primary font-body-md focus:bg-surface-container-lowest focus:outline-none transition-colors placeholder:text-outline-variant tracking-[0.3em]"
                                            placeholder="••••••"
                                            required
                                            type="text"
                                            value={code}
                                            onChange={(e) => setCode(e.target.value)}
                                        />
                                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                                            A token was dispatched to {email}. Enter it to enter your sanctuary.
                                        </span>
                                    </div>
                                )}

                                {mode === "signin" && !verifyMode && (
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <label className="font-label-md text-label-md tracking-wider uppercase text-on-surface-variant">
                                                Passcode
                                            </label>
                                            <a
                                                className="font-body-sm text-body-sm text-secondary hover:text-primary underline underline-offset-4"
                                                href="#forgot"
                                            >
                                                Forgot passcode?
                                            </a>
                                        </div>
                                        <div className="relative flex items-center">
                                            <input
                                                type={showPass ? "text" : "password"}
                                                className="w-full py-3 pl-4 pr-16 bg-surface-container-low text-primary font-body-md focus:bg-surface-container-lowest focus:outline-none"
                                                placeholder="••••••••••••"
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <button
                                                onClick={() => setShowPass(!showPass)}
                                                className="absolute right-3 px-2 py-1 font-label-sm text-label-sm tracking-wider uppercase text-on-surface-variant hover:text-primary"
                                                type="button"
                                            >
                                                {showPass ? "Hide" : "Show"}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center justify-between py-1">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            defaultChecked
                                            className="sr-only peer"
                                            type="checkbox"
                                        />
                                        <div className="w-4 h-4 bg-surface-container peer-checked:bg-primary flex items-center justify-center transition-colors">
                                            <span className="material-symbols-outlined text-[14px] text-surface font-bold opacity-0 peer-checked:opacity-100 transition-opacity">
                                                check
                                            </span>
                                        </div>
                                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                                            Keep me signed in to this sanctuary
                                        </span>
                                    </label>
                                    <span className="hidden sm:inline-flex items-center gap-1 text-label-sm font-label-sm text-secondary tracking-wider uppercase">
                                        <span
                                            className="material-symbols-outlined text-title"
                                            style={{ fontVariationSettings: "'FILL' 1" }}
                                        >
                                            lock
                                        </span>
                                        256-Bit Encrypted
                                    </span>
                                </div>

                                {error && (
                                    <div className="p-3 bg-error/10 border border-error/30 text-error font-body-sm text-body-sm">
                                        {error}
                                    </div>
                                )}

                                <button
                                    className={`w-full py-4 px-8 bg-primary text-on-primary font-label-lg text-label-lg tracking-widest uppercase hover:bg-surface-tint transition-colors duration-300 flex items-center justify-center gap-3 shadow-sm ${submitting ? "opacity-80 pointer-events-none" : ""
                                        }`}
                                    type="submit"
                                >
                                    <span>{verifyMode ? "Verify & Enter Sanctuary" : submitText}</span>
                                    <span className="material-symbols-outlined text-title">
                                        east
                                    </span>
                                </button>
                            </form>

                            <div className="mt-6 pt-6">
                                <div className="relative flex items-center justify-center mb-6">
                                    <div className="w-full h-px bg-surface-container-high" />
                                    <span className="absolute bg-surface px-4 font-label-sm text-label-sm uppercase tracking-widest text-outline">
                                        Or Quiet Verification
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 gap-3">
                                    <button
                                        className="w-full h-12 px-4 bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
                                        type="button"
                                        onClick={handleToken}
                                    >
                                        <span className="material-symbols-outlined text-title">
                                            vpn_key
                                        </span>
                                        <span>One-Time Token</span>
                                    </button>
                                </div>
                            </div>

                            <div className="mt-8 p-6 bg-surface-container-low flex flex-col gap-3">
                                <div className="flex items-center gap-2 text-primary font-title text-title mb-1">
                                    <span className="material-symbols-outlined text-title text-secondary">
                                        workspace_premium
                                    </span>
                                    <span>Sanctuary Patron Privileges</span>
                                </div>
                                <ul className="flex flex-col gap-2.5 font-body-sm text-body-sm text-on-surface-variant">
                                    {[
                                        "Complimentary Slow Sensory Dispatch on all private pours.",
                                        "Priority invitation to limited seasonal botanical batches.",
                                        "Curated handwritten unboxing notes with each order.",
                                    ].map((privilege) => (
                                        <li key={privilege} className="flex items-start gap-2.5">
                                            <span className="material-symbols-outlined text-body-sm text-secondary mt-0.5">
                                                spa
                                            </span>
                                            <span>{privilege}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-8 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between text-body-sm text-on-surface-variant gap-2">
                                <span>Need guidance with your account?</span>
                                <Link
                                    href="/concierge"
                                    className="text-primary font-label-md text-label-md uppercase tracking-wider hover:text-secondary underline underline-offset-4"
                                >
                                    Inquire with Concierge
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}