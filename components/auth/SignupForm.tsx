import Link from "next/link";

export function SignupForm() {
  return (
    <form className="space-y-4 rounded-2xl bg-white p-4 shadow-sm">
      <label className="block">
        <span className="text-sm font-semibold">Name</span>
        <input className="mt-2 h-12 w-full rounded-xl border border-[#eadfce] px-3 outline-none focus:border-[#606c38]" />
      </label>
      <label className="block">
        <span className="text-sm font-semibold">Email</span>
        <input className="mt-2 h-12 w-full rounded-xl border border-[#eadfce] px-3 outline-none focus:border-[#606c38]" type="email" />
      </label>
      <label className="block">
        <span className="text-sm font-semibold">Password</span>
        <input className="mt-2 h-12 w-full rounded-xl border border-[#eadfce] px-3 outline-none focus:border-[#606c38]" type="password" />
      </label>
      <Link className="block rounded-xl bg-[#606c38] px-4 py-3 text-center text-sm font-bold text-white" href="/onboarding">
        Create account
      </Link>
      <p className="text-center text-sm text-[#7a6b58]">
        Already have an account? <Link className="font-bold text-[#20201d]" href="/login">Login</Link>
      </p>
    </form>
  );
}
