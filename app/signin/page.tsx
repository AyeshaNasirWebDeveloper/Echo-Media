'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { toast, Toaster } from 'sonner'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'

export default function AuthPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    setLoading(true)

const form = e.currentTarget


    const email = form.email.value
    const password = form.password.value

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      toast.error(error.message)
      setLoading(false)
      return
    }

    toast.success('Logged In Successfully')

    form.reset()

    setTimeout(() => {
      router.push('/')
      router.refresh()
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
              Sign in to continue to your dashboard
            </p>
          </div>

          <form className="mt-10 grid gap-5" onSubmit={handleSignin}>

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none"
              required
            />

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
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-cyan-500 py-4 font-bold text-black hover:scale-[1.02] transition-all duration-300"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            <p className="text-center text-gray-400">
              Create a new account{' '}
              <a
                href="/signup"
                className="text-cyan-400 hover:underline"
              >
                Sign Up
              </a>
            </p>

          </form>
        </div>
      </div>
    </>
  )
}