"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import Link from "next/link";

// ponytail: demo-only client-side gate, mirroring the source mockup's own
// disclosed behavior (see its inline comment: "DEMO/ILLUSTRATIVE LOGIC ONLY").
// Real implementation needs a server-side approved-email allowlist, real OTP
// dispatch + verification, and a persisted session/cookie on success.
const DEMO_APPROVED = ["cory@augle.com", "shub@augle.com", "steve@augle.com"];
const DEMO_CODE = "123456";
const OTP_LENGTH = 6;

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const GATE_MARK_PATHS = [
  "M194.375 152.331C197.48 140.657 209.466 131.098 221.091 131.098H241.093C245.929 131.098 248.745 135.038 247.518 139.927L236.833 180.132C228.6 211.216 204.339 239.234 173.797 253.537C168.959 255.799 168.021 251.857 169.031 248.136L194.375 152.404V152.331Z",
  "M40.673 204.365L3.72856 139.937C0.970433 135.042 2.63988 131.098 7.43033 131.098H29.2776C40.8909 131.098 55.9153 140.667 62.6653 152.355L101.787 220.581C104.546 225.476 102.876 229.421 98.0855 229.421H85.4564C66.6575 229.421 50.0364 219.34 40.7458 204.292L40.673 204.365Z",
  "M172.061 131.098L83.9506 131.098C66.6043 131.098 64.2822 136.639 72.5561 150.93L111.894 219.396C121.184 235.582 135.264 247.322 151.231 253.81C155.731 255.634 159.65 256.071 161.32 249.874L186.94 153.701C189.916 142.473 185.779 131.171 172.061 131.171V131.098Z",
  "M207.132 50.636L244.076 115.064C246.834 119.958 245.166 123.903 240.375 123.903H218.528C206.914 123.903 191.89 114.334 185.14 102.646L146.018 34.4192C143.259 29.5249 144.929 25.5801 149.719 25.5801H162.349C181.148 25.5801 197.769 35.6608 207.06 50.7087L207.132 50.636Z",
  "M53.9692 102.67C50.833 114.345 38.7264 123.903 26.9839 123.903H6.7811C1.89452 123.903 -0.950011 119.963 0.289869 115.074L11.084 74.8694C19.3985 43.7853 43.9045 15.7659 74.7557 1.46433C79.6422 -0.797667 80.5902 3.1425 79.5693 6.86383L53.9692 102.597V102.67Z",
  "M76.5452 123.903H164.669C181.945 123.903 184.341 118.362 176.066 104.071L136.722 35.6051C127.431 19.4182 113.348 7.67904 97.3784 1.18976C92.8779 -0.633052 88.9583 -1.07027 87.2887 5.12737L61.6644 101.3C58.6882 112.529 62.8256 123.83 76.5452 123.83V123.903Z",
];

export function InvestorGate() {
  const [view, setView] = useState<"email" | "otp" | "success">("email");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [otp, setOtp] = useState<string[]>(() => Array(OTP_LENGTH).fill(""));
  const [otpError, setOtpError] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const emailValid = isValidEmail(email.trim());

  function handleContinue() {
    if (!emailValid) return;
    if (!DEMO_APPROVED.includes(email.trim().toLowerCase())) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    setView("otp");
    requestAnimationFrame(() => otpRefs.current[0]?.focus());
  }

  function handleOtpChange(index: number, rawValue: string) {
    const digit = rawValue.replace(/[^0-9]/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    setOtpError(false);

    if (digit && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus();
    }

    if (next.every((d) => d.length === 1)) {
      if (next.join("") === DEMO_CODE) {
        setView("success");
      } else {
        setOtpError(true);
      }
    }
  }

  function handleOtpKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  }

  function handleResend() {
    setOtp(Array(OTP_LENGTH).fill(""));
    setOtpError(false);
    otpRefs.current[0]?.focus();
  }

  function handleBackToEmail() {
    setOtp(Array(OTP_LENGTH).fill(""));
    setOtpError(false);
    setView("email");
  }

  return (
    <div className="flex min-h-[65vh] items-center justify-center px-6 py-16">
      <div className="w-full max-w-[420px] text-center">
        <svg
          className="mx-auto mb-8 h-[72px] w-[72px] text-rust"
          viewBox="0 0 248 255"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {GATE_MARK_PATHS.map((d) => (
            <path key={d.slice(0, 12)} fillRule="evenodd" clipRule="evenodd" d={d} fill="currentColor" />
          ))}
        </svg>

        {view === "email" && (
          <div>
            <p className="mb-7 text-left text-[15px] leading-[1.7] text-ink/80">
              Enter your email to receive a passcode to access the{" "}
              <b className="font-medium text-ink">Corpus Training Data</b>. Access is
              limited to approved users only.
            </p>
            <label htmlFor="gate-email" className="sr-only">
              Email
            </label>
            <input
              id="gate-email"
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false);
              }}
              className={`mb-3.5 w-full rounded-[5px] border bg-offwhite px-4 py-3 text-left text-[15px] text-ink placeholder:text-subtle focus:outline-none ${
                emailError ? "border-rust" : "border-border focus:border-rust"
              }`}
            />
            <button
              type="button"
              onClick={handleContinue}
              disabled={!emailValid}
              className={`mb-3.5 w-full rounded-[5px] py-3 text-[15px] font-semibold text-offwhite disabled:cursor-not-allowed ${
                emailValid ? "bg-rust" : "bg-subtle"
              }`}
            >
              Continue
            </button>
            {emailError && (
              <div className="mb-4 text-left text-[13px] leading-[1.6] text-rust">
                This email is not on our approved access list.
              </div>
            )}
            <p className="mt-4.5 text-left text-xs leading-[1.7] text-muted">
              By continuing you are consenting to receive a one-time passcode via
              email and agree to the{" "}
              <Link href="/privacy" className="text-rust hover:underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms" className="text-rust hover:underline">
                Terms &amp; Conditions
              </Link>
              . We will never send you marketing or promotional messages. Email
              messages are used strictly for verification purposes only.
            </p>
          </div>
        )}

        {view === "otp" && (
          <div>
            <p className="mb-6 text-[15px] leading-[1.7] text-ink/80">
              Check your email for your 6-digit passcode.
            </p>
            <div className="mb-5 flex justify-center gap-2">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    otpRefs.current[i] = el;
                  }}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  maxLength={1}
                  inputMode="numeric"
                  autoComplete={i === 0 ? "one-time-code" : "off"}
                  aria-label={`Passcode digit ${i + 1}`}
                  className={`h-[52px] w-11 rounded-[5px] border bg-offwhite text-center font-mono text-xl text-ink focus:outline-none ${
                    otpError ? "border-rust" : "border-border focus:border-rust"
                  }`}
                />
              ))}
            </div>
            {otpError && (
              <div className="mb-4.5 text-center text-[13px] leading-[1.6] text-rust">
                The code you entered is invalid or has expired. Please re-enter your
                passcode or request a new passcode.
              </div>
            )}
            <button
              type="button"
              onClick={handleResend}
              className="mb-5 w-full rounded-[5px] bg-rust py-3 text-[15px] font-semibold text-offwhite"
            >
              Request a new passcode
            </button>
            <button
              type="button"
              onClick={handleBackToEmail}
              className="text-[13px] text-muted hover:text-rust"
            >
              ← Use a different email
            </button>
          </div>
        )}

        {view === "success" && (
          <div>
            <h1 className="mb-3 font-serif text-[26px] text-ink">You&apos;re in.</h1>
            <p className="mb-6.5 text-sm leading-[1.7] text-body">
              Access granted to the Corpus Training Data. This session stays active
              on this device — you won&apos;t need to re-verify on your next visit.
            </p>
            {/* NOTE: source links to a sibling mockup file outside this app
                ("../Investor PM/augle_outcomes_markets.html") with no in-scope
                equivalent route. Pointing to /outcomes as the closest existing
                analog — flagged for follow-up. */}
            <Link
              href="/outcomes"
              className="inline-block rounded-[5px] bg-rust px-7 py-3 text-[15px] font-semibold text-offwhite"
            >
              Continue to Corpus Training →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
