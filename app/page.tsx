'use client'

import { useState } from 'react'
import { toast, Toaster } from 'sonner'

type ChatRole = 'user' | 'ai'

type ChatMessage = {
  role: ChatRole
  text: string
}

export default function EchoMediaWave() {

  const services = [
  {
    title: 'Public Relations (PR)',
    description:
      'Build a powerful brand image with strategic PR campaigns, media outreach, and online reputation management.',
  },
  {
    title: 'Influencer Marketing',
    description:
      'Collaborate with creators and influencers to increase visibility, engagement, and brand trust.',
  },
  {
    title: 'Social Media Management',
    description:
      'Professional management for Instagram, TikTok, LinkedIn, Facebook, and YouTube with growth-driven strategies.',
  },
  {
    title: 'Content & Graphic Designing',
    description:
      'Creative visuals, ad creatives, branding assets, reels, thumbnails, and premium content creation.',
  },
]

  const stats = [
  { value: '500+', label: 'Influencer Campaigns' },
  { value: '120M+', label: 'Total Reach Generated' },
  { value: '300+', label: 'Brand Collaborations' },
  { value: '24/7', label: 'Campaign Support' },
]

const [openChat, setOpenChat] = useState(false)
const [message, setMessage] = useState('')
const [messages, setMessages] = useState<ChatMessage[]>([
  {
    role: 'ai',
    text: 'Hi 👋 Welcome to Echo Media Wave. How can we help grow your brand today?',
  },
])

const [aiLoading, setAiLoading] = useState(false)


const sendMessage = async () => {
  if (!message.trim()) return

  const currentMessage = message

  const userMessage: ChatMessage = {
    role: 'user',
    text: currentMessage,
  }

  setMessages((prev) => [...prev, userMessage])

  setMessage('')
  setAiLoading(true)

  try {
    const res = await fetch('/api/ai-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: currentMessage,
      }),
    })

    if (!res.ok) {
      toast.error('AI failed to respond')
      setAiLoading(false)
      return
    }

    const data = await res.json()

    setMessages((prev) => [
      ...prev,
      {
        role: 'ai',
        text: data.response,
      },
    ])
  } catch (error) {
    toast.error('Something went wrong')
  }

  setAiLoading(false)
}

  return (
    <>
      <Toaster richColors position="top-right" />

      <main className="min-h-screen bg-black text-white overflow-hidden scroll-smooth">
      {/* Floating WhatsApp Button */}
      <button
  onClick={() => setOpenChat(!openChat)}
  className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 text-lg font-black text-black shadow-[0_0_40px_rgba(34,211,238,0.5)] transition-all duration-300 hover:scale-110"
>
  AI
</button>

{openChat && (
  <div className="fixed bottom-24 right-6 z-50 flex h-[600px] max-h-[calc(90vh-120px)] w-[380px] max-w-[calc(100vw-48px)] flex-col overflow-hidden rounded-[32px] border border-white/10 bg-[#0a0a0a]/95 shadow-2xl backdrop-blur-2xl">

    {/* Header */}
    <div className="border-b border-white/10 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 p-5">
      <h2 className="text-xl font-black text-white">
        Echo AI Assistant
      </h2>

      <p className="mt-1 text-sm text-gray-400">
        PR • Influencer Marketing • Brand Growth
      </p>
    </div>

    {/* Messages */}
    <div className="pointer-events-auto flex-1 space-y-4 overflow-y-auto px-4 py-5">

      {messages.map((msg, index) => (
        <div
          key={index}
          className={`max-w-[85%] rounded-3xl px-5 py-4 text-sm leading-relaxed ${
            msg.role === 'user'
              ? 'ml-auto bg-cyan-400 text-black'
              : 'bg-white/10 text-white'
          }`}
        >
          {msg.text}
        </div>
      ))}

      {/* AI Loading Bubble */}
      {aiLoading && (
        <div className="w-fit rounded-3xl bg-white/10 px-5 py-4 text-sm text-gray-300">
          Typing...
        </div>
      )}
    </div>

    {/* Input */}
    <div className="border-t border-white/10 p-4">
      <div className="flex items-center gap-3">

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessage()
            }
          }}
          placeholder="Ask about services..."
          className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-gray-500"
        />

        <button
          onClick={sendMessage}
          disabled={aiLoading}
          className="rounded-2xl bg-cyan-400 px-5 py-4 font-bold text-black transition-all duration-300 hover:scale-105 disabled:opacity-50"
        >
          Send
        </button>

      </div>
    </div>
  </div>
)}

      {/* Sticky Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <h2 className="text-2xl font-black">Echo Media Wave</h2>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#services" className="hover:text-white transition-colors duration-300">Services</a>
            <a href="#portfolio" className="hover:text-white transition-colors duration-300">Portfolio</a>
            <a href="#testimonials" className="hover:text-white transition-colors duration-300">Testimonials</a>
            <a href="#contact" className="hover:text-white transition-colors duration-300">Contact</a>
            <a href="/signin" className="rounded-2xl bg-cyan-400 px-5 py-3 font-semibold text-black hover:scale-105 transition-all duration-300">Sign In</a>
          </nav>
        </div>
      </header>
      <section className="relative flex min-h-screen items-center justify-center px-6 py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/10 to-pink-500/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-xl mb-6">
              Echo Media Wave • PR • Influencer Marketing • Brand Growth Agency
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight">
              Build Viral Influence & Powerful Brand Presence
            </h1>

            <p className="mt-6 text-lg text-gray-300 leading-relaxed max-w-2xl">
              We help brands grow through strategic PR campaigns, influencer collaborations,
viral social media marketing, creator partnerships, and modern digital storytelling.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="rounded-2xl bg-white text-black px-7 py-4 font-semibold hover:scale-105 transition-all duration-300"
              >
                Start Your Campaign
              </a>

              <a
                href="#services"
                className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl px-7 py-4 font-semibold hover:bg-white/20 transition-all duration-300"
              >
                Explore Services
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 shadow-2xl">
              <div className="grid grid-cols-2 gap-5">
                {stats.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-3xl border border-white/10 bg-black/30 p-6"
                  >
                    <h2 className="text-4xl font-black text-cyan-400">{item.value}</h2>
                    <p className="mt-2 text-gray-400">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 p-6">
                <p className="text-lg font-semibold">
                  Trusted by influencers, startups, beauty brands, personal brands, fashion labels, and modern businesses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-black">
              Our Premium Services
            </h2>
            <p className="mt-5 text-gray-400 max-w-2xl mx-auto">
              We combine PR, content, creators, and digital growth strategies to scale modern brands.
            </p>
          </div>

          <div className="mt-16 grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group rounded-[32px] border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-all duration-500"
              >
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500" />

                <h3 className="mt-6 text-2xl font-bold">
                  {service.title}
                </h3>

                <p className="mt-4 text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black">Featured Projects</h2>
            <p className="mt-4 text-gray-400">
              Creative campaigns and digital projects delivered for modern brands.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-24">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5"
              >
                <div className="h-72 bg-gradient-to-br from-cyan-500/30 to-purple-500/30" />

                <div className="p-6">
                  <h3 className="text-2xl font-bold">Brand Campaign {item}</h3>
                  <p className="mt-3 text-gray-400 leading-relaxed">
                    Social media growth, influencer collaborations, and creative branding campaign.
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto max-w-7xl rounded-[40px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-12 backdrop-blur-2xl">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black leading-tight">
                Why Brands Choose Echo Media Wave?
              </h2>

              <p className="mt-6 text-gray-300 leading-relaxed">
                We create high-converting campaigns powered by storytelling, influencer collaborations,
                viral content strategies, and modern PR techniques.
              </p>
            </div>

            <div className="space-y-5">
              {[
                'Advanced Influencer Outreach',
                'Performance Tracking Dashboard',
                'Creative Viral Campaign Planning',
                'Professional Brand Management',
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/30 p-5"
                >
                  <div className="h-4 w-4 rounded-full bg-cyan-400" />
                  <p className="text-lg">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </section>

      <section id="testimonials" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-5xl font-black">Client Testimonials</h2>
            <p className="mt-4 text-gray-400">
              Trusted by startups, creators, and growing brands.
            </p>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {[
              'Echo Media Wave helped us scale our Instagram reach massively.',
              'Professional team with excellent branding and PR strategies.',
              'Amazing website and social media management services.',
            ].map((review, index) => (
              <div
                key={index}
                className="rounded-[32px] border border-white/10 bg-white/5 p-8"
              >
                <p className="text-gray-300 leading-relaxed">“{review}”</p>

                <div className="mt-6">
                  <h4 className="text-xl font-bold">Client {index + 1}</h4>
                  <p className="text-gray-500">Business Owner</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact-form" className="px-6 py-24">
        <div className="mx-auto max-w-5xl rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl p-10">
          <div className="text-center">
            <h2 className="text-5xl font-black">
              Let’s Work Together
            </h2>

            <p className="mt-4 text-gray-400">
              Fill out the form and our team will contact you shortly.
            </p>
          </div>

          <form
            className="mt-12 grid gap-6"
            onSubmit={async (e) => {
              e.preventDefault()

              const form = e.target as HTMLFormElement

              const formData = {
                fullName: (form.fullName as HTMLInputElement).value,
                email: (form.email as HTMLInputElement).value,
                service: (form.service as HTMLSelectElement).value,
                message: (form.message as HTMLTextAreaElement).value,
              }

              const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
              })

              if (response.ok) {
                toast.success('Message Sent Successfully')
                form.reset()
              } else {
                toast.error('Something went wrong')
              }
            }}
          >
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none"
              required
            />

            <select
              name="service"
              className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none"
            >
              <option>Social Media Management</option>
              <option>Graphic Designing</option>
              <option>Influencer Marketing</option>
              <option>Website Development</option>
            </select>

            <textarea
              name="message"
              placeholder="Tell us about your project"
              rows={6}
              className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none"
            />

            <button
              type="submit"
              className="rounded-2xl bg-cyan-400 text-black py-4 font-bold hover:scale-105 transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      <section id="contact" className="px-6 py-24">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-5xl font-black leading-tight">
            Ready To Make Your Brand Go Viral?
          </h2>

          <p className="mt-6 text-lg text-gray-400 leading-relaxed">
            Launch your next PR campaign with Echo Media Wave and build a powerful online presence.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact-form"
              className="rounded-2xl bg-cyan-400 text-black px-8 py-4 font-bold hover:scale-105 transition-all duration-300"
            >
              Book A Discovery Call
            </a>

            <a
              href="#contact-form"
              className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4 font-semibold hover:bg-white/20 transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
            <h3 className="text-2xl font-black">Echo Media Wave</h3>
            <p className="mt-2 text-gray-500">
              Modern PR • Influencer Marketing • Digital Growth
            </p>
          </div>

          <div className="flex items-center gap-6 text-gray-400">
            <a href="#" className="hover:text-white transition-colors duration-300">
              Instagram
            </a>
            <a href="#" className="hover:text-white transition-colors duration-300">
              LinkedIn
            </a>
            <a href="#" className="hover:text-white transition-colors duration-300">
              TikTok
            </a>
          </div>
        </div>
      </footer>
    </main>
    </>
  )
}