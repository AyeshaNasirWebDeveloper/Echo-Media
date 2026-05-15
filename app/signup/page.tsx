'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { toast, Toaster } from 'sonner'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SignUp() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false)

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()


    const form = e.currentTarget

    const fullName = (form.elements.namedItem('fullName') as HTMLInputElement).value
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value
    const confirmPassword = (form.elements.namedItem('confirmPassword') as HTMLInputElement).value


    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) {
      toast.error(error.message)
      setLoading(false)
      return
    }

    toast.success('Account Created Successfully')

    form.reset()

    setTimeout(() => {
      router.push('/')
    }, 1500)

    setLoading(false)
  }

  return (
    <>
      <Toaster richColors position="top-right" />

      <div className="min-h-screen bg-black flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-2xl">

          <div className="text-center">
            <h1 className="text-4xl font-black text-white">
              Echo Media Wave
            </h1>

            <p className="mt-3 text-gray-400">
              Create your account to continue
            </p>
          </div>

          <form
            className="mt-10 grid gap-5"
            onSubmit={handleSignup}
          >

            {/* Full Name */}
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none"
              required
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none"
              required
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-4 text-gray-400"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={
                  showConfirmPassword ? 'text' : 'password'
                }
                name="confirmPassword"
                placeholder="Retype Password"
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-4 top-4 text-gray-400"
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-cyan-500 py-4 font-bold text-black hover:scale-[1.02] transition-all duration-300"
            >
              {loading
                ? 'Creating Account...'
                : 'Sign Up'}
            </button>

            <p className="text-center text-gray-400">
              Already have an account?{' '}
              <a
                href="/signin"
                className="text-cyan-400 hover:underline"
              >
                Sign In
              </a>
            </p>

          </form>
        </div>
      </div>
    </>
  )
}