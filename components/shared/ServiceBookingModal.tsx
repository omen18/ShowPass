"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X, User, Phone, Mail, ChevronRight, ChevronLeft,
  Check, CreditCard, Building2, Shield, Tag, QrCode,
  Download, Share2, Loader2,
} from "lucide-react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";

const QRCodeDisplay = dynamic(() => import("@/components/ui/QRCodeDisplay"), { ssr: false });

export interface ServiceItem {
  type: "flight" | "train" | "hotel" | "bus" | "explore" | "stay";
  title: string;
  subtitle: string;
  price: number;
  details: Record<string, string>;
  image?: string;
}

interface Props {
  item: ServiceItem | null;
  onClose: () => void;
}

type Step = "passengers" | "review" | "payment" | "otp" | "confirmed";

const DEMO_DISCOUNTS: Record<string, number> = {
  SHOW10: 10, NEWUSER: 10, FESTIVE: 20, SUMMER: 15, VIP: 30, FIRST50: 50,
};

export default function ServiceBookingModal({ item, onClose }: Props) {
  const [step, setStep] = useState<Step>("passengers");
  const [passengers, setPassengers] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [discountPct, setDiscountPct] = useState(0);
  const [discountApplied, setDiscountApplied] = useState("");
  const [activeTab, setActiveTab] = useState<"card" | "bank">("card");
  const [cardNum, setCardNum] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [processing, setProcessing] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [booking, setBooking] = useState<{ id: string; qr: string } | null>(null);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (item) {
      setStep("passengers");
      setPassengers(1);
      setName(""); setEmail(""); setPhone("");
      setDiscountCode(""); setDiscountPct(0); setDiscountApplied("");
      setCardNum(""); setCardName(""); setExpiry(""); setCvv("");
      setOtpValues(["", "", "", "", "", ""]);
      setOtpError(""); setBooking(null); setProcessing(false);
    }
  }, [item]);

  if (!item) return null;

  const base = item.price * passengers;
  const gst = Math.round(base * 0.05);
  const convFee = 49 * passengers;
  const discountAmt = Math.round(base * discountPct / 100);
  const total = base + gst + convFee - discountAmt;

  function applyDiscount() {
    const pct = DEMO_DISCOUNTS[discountCode.toUpperCase().trim()];
    if (pct) {
      setDiscountPct(pct);
      setDiscountApplied(discountCode.toUpperCase().trim());
      toast.success(`${discountCode.toUpperCase()} applied — ${pct}% off!`);
    } else {
      toast.error("Invalid or expired code");
    }
  }

  async function handlePayNow() {
    if (!cardNum && activeTab === "card") { toast.error("Enter card details"); return; }
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 800));
    setProcessing(false);
    setStep("otp");
  }

  function handleOtpInput(val: string, idx: number) {
    const next = [...otpValues];
    next[idx] = val.slice(-1);
    setOtpValues(next);
    setOtpError("");
    if (val && idx < 5) otpRefs.current[idx + 1]?.focus();
    const full = next.join("");
    if (full.length === 6) setTimeout(() => verifyOtp(full), 200);
  }

  async function verifyOtp(otp: string) {
    if (!item) return;
    if (otp !== "123456") {
      setOtpError("Incorrect OTP. Use demo OTP: 123456");
      return;
    }
    setProcessing(true);
    try {
      const res = await fetch("/api/book-service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_type: item.type,
          summary: `${item.title} — ${item.subtitle}`,
          passengers,
        }),
      });
      const json = await res.json();
      setBooking({ id: json.data.booking_id, qr: json.data.qr_code });
      setStep("confirmed");
    } catch {
      toast.error("Booking failed. Try again.");
    } finally {
      setProcessing(false);
    }
  }

  const stepOrder: Step[] = ["passengers", "review", "payment", "otp", "confirmed"];
  const stepIdx = stepOrder.indexOf(step);

  return (
    <AnimatePresence>
      {item && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={step !== "confirmed" ? onClose : undefined}
          />

          {/* Sheet */}
          <motion.div
            className="fixed inset-x-0 bottom-0 z-[201] max-h-[92svh] overflow-hidden rounded-t-3xl bg-white shadow-2xl md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:w-[560px] md:rounded-3xl"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
          >
            {/* Handle (mobile) */}
            <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-gray-200 md:hidden" />

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <p className="font-semibold text-gray-900 text-[15px]">{item.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.subtitle}</p>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            {/* Step progress */}
            {step !== "confirmed" && (
              <div className="flex items-center gap-1 px-6 py-3 border-b border-gray-50">
                {(["passengers", "review", "payment"] as Step[]).map((s, i) => (
                  <div key={s} className="flex items-center gap-1">
                    <div className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold transition-colors ${
                      stepIdx > i ? "bg-[var(--accent)] text-white" :
                      stepIdx === i ? "bg-[var(--accent-dark)] text-white" :
                      "bg-gray-100 text-gray-400"
                    }`}>
                      {stepIdx > i ? <Check size={10} /> : i + 1}
                    </div>
                    <span className={`text-[10px] font-medium capitalize ${stepIdx >= i ? "text-gray-700" : "text-gray-400"}`}>
                      {s}
                    </span>
                    {i < 2 && <div className={`h-px w-4 rounded ${stepIdx > i ? "bg-[var(--accent)]" : "bg-gray-200"}`} />}
                  </div>
                ))}
              </div>
            )}

            {/* Step content */}
            <div className="overflow-y-auto max-h-[65svh] md:max-h-[500px]">
              <AnimatePresence mode="wait">
                {/* ── PASSENGERS ── */}
                {step === "passengers" && (
                  <motion.div key="passengers" className="p-6 space-y-5"
                    initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }}>
                    {/* Summary card */}
                    <div className="rounded-2xl bg-gray-50 p-4 flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)]/10">
                        <QrCode size={18} className="text-[var(--accent)]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{item.subtitle}</p>
                        <p className="mt-1 text-sm font-bold text-[var(--accent)]">₹{item.price.toLocaleString("en-IN")} / person</p>
                      </div>
                    </div>

                    {/* Passenger count */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">Passengers / Guests</label>
                      <div className="flex items-center gap-3">
                        <button onClick={() => setPassengers(Math.max(1, passengers - 1))}
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors text-lg font-bold">
                          −
                        </button>
                        <span className="w-8 text-center text-lg font-bold text-gray-900">{passengers}</span>
                        <button onClick={() => setPassengers(Math.min(6, passengers + 1))}
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors text-lg font-bold">
                          +
                        </button>
                      </div>
                    </div>

                    {/* Contact details */}
                    <div className="space-y-3">
                      <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500">Contact Details</label>
                      <div className="relative">
                        <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name"
                          className="w-full rounded-xl border border-gray-200 py-3 pl-9 pr-4 text-sm text-gray-900 outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all" />
                      </div>
                      <div className="relative">
                        <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" type="email"
                          className="w-full rounded-xl border border-gray-200 py-3 pl-9 pr-4 text-sm text-gray-900 outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all" />
                      </div>
                      <div className="relative">
                        <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" type="tel"
                          className="w-full rounded-xl border border-gray-200 py-3 pl-9 pr-4 text-sm text-gray-900 outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all" />
                      </div>
                    </div>

                    <button
                      onClick={() => { if (!name || !email || !phone) { toast.error("Fill in all contact details"); return; } setStep("review"); }}
                      className="w-full rounded-2xl bg-[var(--accent)] py-3.5 text-sm font-bold text-white flex items-center justify-center gap-2 hover:bg-[var(--accent-strong)] transition-colors"
                    >
                      Continue to Review <ChevronRight size={16} />
                    </button>
                  </motion.div>
                )}

                {/* ── REVIEW ── */}
                {step === "review" && (
                  <motion.div key="review" className="p-6 space-y-5"
                    initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }}>
                    {/* Booking details */}
                    <div className="rounded-2xl border border-gray-100 overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 text-xs font-semibold uppercase tracking-widest text-gray-500">Booking Summary</div>
                      <div className="divide-y divide-gray-50">
                        {Object.entries(item.details).map(([k, v]) => (
                          <div key={k} className="flex items-center justify-between px-4 py-2.5 text-sm">
                            <span className="text-gray-500">{k}</span>
                            <span className="font-medium text-gray-900">{v}</span>
                          </div>
                        ))}
                        <div className="flex items-center justify-between px-4 py-2.5 text-sm">
                          <span className="text-gray-500">Passengers</span>
                          <span className="font-medium text-gray-900">{passengers}</span>
                        </div>
                      </div>
                    </div>

                    {/* Promo code */}
                    <div>
                      {discountApplied ? (
                        <div className="flex items-center gap-2 rounded-xl bg-green-50 border border-green-200 px-4 py-2.5 text-sm font-medium text-green-700">
                          <Check size={14} />
                          <span>{discountApplied} — {discountPct}% off</span>
                          <button onClick={() => { setDiscountPct(0); setDiscountApplied(""); setDiscountCode(""); }}
                            className="ml-auto text-green-500 hover:text-green-700"><X size={13} /></button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Tag size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input value={discountCode} onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                              placeholder="Promo code (try SHOW10)"
                              className="w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all" />
                          </div>
                          <button onClick={applyDiscount}
                            className="rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-bold text-white hover:bg-[var(--accent-strong)] transition-colors">
                            Apply
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Price breakdown */}
                    <div className="rounded-2xl border border-gray-100 p-4 space-y-2">
                      {[
                        [`₹${item.price.toLocaleString("en-IN")} × ${passengers}`, base],
                        ["GST (5%)", gst],
                        [`Convenience fee × ${passengers}`, convFee],
                      ].map(([label, val]) => (
                        <div key={label as string} className="flex justify-between text-sm text-gray-600">
                          <span>{label}</span>
                          <span>₹{(val as number).toLocaleString("en-IN")}</span>
                        </div>
                      ))}
                      {discountAmt > 0 && (
                        <div className="flex justify-between text-sm font-medium text-green-600">
                          <span>Discount ({discountPct}%)</span>
                          <span>−₹{discountAmt.toLocaleString("en-IN")}</span>
                        </div>
                      )}
                      <div className="flex justify-between border-t border-gray-100 pt-2 text-base font-bold text-gray-900">
                        <span>Total</span>
                        <span>₹{total.toLocaleString("en-IN")}</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button onClick={() => setStep("passengers")}
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
                        <ChevronLeft size={18} />
                      </button>
                      <button onClick={() => setStep("payment")}
                        className="flex-1 rounded-2xl bg-[var(--accent)] py-3.5 text-sm font-bold text-white flex items-center justify-center gap-2 hover:bg-[var(--accent-strong)] transition-colors">
                        Pay ₹{total.toLocaleString("en-IN")} <ChevronRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ── PAYMENT ── */}
                {step === "payment" && (
                  <motion.div key="payment" className="p-6 space-y-5"
                    initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }}>
                    {/* Tabs */}
                    <div className="flex gap-2 rounded-2xl bg-gray-100 p-1">
                      {(["card", "bank"] as const).map((t) => (
                        <button key={t} onClick={() => setActiveTab(t)}
                          className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all ${
                            activeTab === t ? "bg-white shadow text-gray-900" : "text-gray-500"
                          }`}>
                          {t === "card" ? <CreditCard size={14} /> : <Building2 size={14} />}
                          {t === "card" ? "Card" : "Net Banking"}
                        </button>
                      ))}
                    </div>

                    {activeTab === "card" ? (
                      <div className="space-y-3">
                        {/* Card preview */}
                        <div className="h-[120px] w-full rounded-2xl bg-gradient-to-br from-[var(--accent-dark)] to-[var(--accent)] p-5 text-white shadow-lg">
                          <div className="flex items-start justify-between">
                            <div className="h-5 w-7 rounded-sm bg-yellow-400 opacity-90" />
                            <span className="text-[11px] font-semibold opacity-60">
                              {cardNum.startsWith("4") ? "VISA" : cardNum.startsWith("5") ? "MASTERCARD" : "CARD"}
                            </span>
                          </div>
                          <p className="mt-3 font-mono text-sm tracking-widest opacity-90">
                            {cardNum.replace(/\d{4}(?=.)/g, "•••• ").trim() || "•••• •••• •••• ••••"}
                          </p>
                          <p className="mt-1 text-[11px] opacity-50">{cardName || "CARDHOLDER NAME"}</p>
                        </div>

                        <div className="relative">
                          <input value={cardNum}
                            onChange={(e) => {
                              const v = e.target.value.replace(/\D/g, "").slice(0, 16);
                              setCardNum(v.replace(/(.{4})/g, "$1 ").trim());
                            }}
                            placeholder="Card number"
                            className="w-full rounded-xl border border-gray-200 py-3 px-4 text-sm outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all" />
                        </div>
                        <input value={cardName} onChange={(e) => setCardName(e.target.value.toUpperCase())}
                          placeholder="Cardholder name"
                          className="w-full rounded-xl border border-gray-200 py-3 px-4 text-sm outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all" />
                        <div className="grid grid-cols-2 gap-3">
                          <input value={expiry}
                            onChange={(e) => {
                              const v = e.target.value.replace(/\D/g, "").slice(0, 4);
                              setExpiry(v.length > 2 ? `${v.slice(0, 2)}/${v.slice(2)}` : v);
                            }}
                            placeholder="MM/YY"
                            className="w-full rounded-xl border border-gray-200 py-3 px-4 text-sm outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all" />
                          <input value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                            placeholder="CVV" type="password"
                            className="w-full rounded-xl border border-gray-200 py-3 px-4 text-sm outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all" />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-2">
                        {["SBI", "HDFC", "ICICI", "AXIS", "KOTAK", "PNB"].map((bank) => (
                          <button key={bank} onClick={() => { setActiveTab("bank"); handlePayNow(); }}
                            className="rounded-xl border border-gray-200 p-3 text-left hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 transition-all">
                            <p className="text-sm font-bold text-[var(--accent)]">{bank}</p>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Security badge */}
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Shield size={12} className="text-green-500" />
                      <span>256-bit SSL encrypted · Secured by Razorpay</span>
                    </div>

                    <div className="flex gap-3">
                      <button onClick={() => setStep("review")}
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
                        <ChevronLeft size={18} />
                      </button>
                      <button onClick={handlePayNow} disabled={processing}
                        className="flex-1 rounded-2xl bg-[var(--accent)] py-3.5 text-sm font-bold text-white flex items-center justify-center gap-2 hover:bg-[var(--accent-strong)] transition-colors disabled:opacity-60">
                        {processing ? <Loader2 size={16} className="animate-spin" /> : <>Pay ₹{total.toLocaleString("en-IN")} <ChevronRight size={16} /></>}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ── OTP ── */}
                {step === "otp" && (
                  <motion.div key="otp" className="p-6 space-y-5 text-center"
                    initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}>
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent)]/10">
                      <Shield size={24} className="text-[var(--accent)]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Verify Payment</h3>
                      <p className="text-sm text-gray-500 mt-1">Enter the 6-digit OTP sent to your phone</p>
                      <p className="text-[11px] text-[var(--accent)] mt-1 font-semibold">Demo OTP: 123456</p>
                    </div>

                    <div className="flex justify-center gap-2">
                      {otpValues.map((v, i) => (
                        <input key={i}
                          ref={(el) => { otpRefs.current[i] = el; }}
                          value={v}
                          onChange={(e) => handleOtpInput(e.target.value, i)}
                          onKeyDown={(e) => { if (e.key === "Backspace" && !v) otpRefs.current[i - 1]?.focus(); }}
                          maxLength={1}
                          className={`h-12 w-10 rounded-xl border-2 text-center text-lg font-bold outline-none transition-all ${
                            v ? "border-[var(--accent)] bg-[var(--accent)]/5 text-[var(--accent)]" : "border-gray-200"
                          }`}
                        />
                      ))}
                    </div>

                    {otpError && <p className="text-sm text-red-500">{otpError}</p>}

                    {processing && (
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                        <Loader2 size={16} className="animate-spin" />
                        <span>Confirming booking…</span>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* ── CONFIRMED ── */}
                {step === "confirmed" && booking && (
                  <motion.div key="confirmed" className="p-6 space-y-5 text-center"
                    initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    {/* Success burst */}
                    <motion.div
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
                      className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500 shadow-lg shadow-green-500/30"
                    >
                      <Check size={28} strokeWidth={3} className="text-white" />
                    </motion.div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Booking Confirmed!</h3>
                      <p className="text-sm text-gray-500 mt-1">{item.title}</p>
                      <p className="font-mono text-xs text-[var(--accent)] mt-2 bg-[var(--accent)]/5 rounded-lg px-3 py-1.5 inline-block">
                        {booking.id}
                      </p>
                    </div>

                    <div className="flex justify-center">
                      <QRCodeDisplay value={booking.qr} size={140} label={booking.id} />
                    </div>

                    <div className="rounded-2xl bg-gray-50 p-4 text-left space-y-2">
                      {Object.entries(item.details).slice(0, 3).map(([k, v]) => (
                        <div key={k} className="flex justify-between text-sm">
                          <span className="text-gray-500">{k}</span>
                          <span className="font-medium text-gray-900">{v}</span>
                        </div>
                      ))}
                      <div className="flex justify-between text-sm border-t border-gray-100 pt-2">
                        <span className="text-gray-500">Amount Paid</span>
                        <span className="font-bold text-green-600">₹{total.toLocaleString("en-IN")}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-2 rounded-2xl border border-gray-200 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                        <Download size={15} /> Download
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 rounded-2xl border border-gray-200 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                        <Share2 size={15} /> Share
                      </button>
                      <button onClick={onClose}
                        className="flex-1 rounded-2xl bg-[var(--accent)] py-3 text-sm font-bold text-white hover:bg-[var(--accent-strong)] transition-colors">
                        Done
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
