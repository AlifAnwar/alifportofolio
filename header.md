# 🖼️ Hero Section — Darwin Layout Style

Panduan implementasi Hero Section dengan struktur layout seperti referensi gambar:
centered headline besar, foto orang di tengah layar, dan floating UI card yang overlap di atas foto.

---

## Anatomy Layout

```
┌─────────────────────────────────────────────┐
│        [Logo · Nav Links · Login]           │  ← Navbar pill center-top
├─────────────────────────────────────────────┤
│                                             │
│           Small Eyebrow Text                │  ← label kecil (opsional)
│                                             │
│      Big Centered Headline Goes             │
│         Right Here — Bold                   │  ← font display besar, centered
│                                             │
│    Supporting paragraph description text   │  ← subtext tipis, centered
│                                             │
│    [ CTA Button ]  ●●●●● +541 joined       │  ← button + social proof inline
│                                             │
│           ┌──────────────┐                  │
│    ╔════╗ │              │ ╔═════════════╗  │
│    ║card║ │  FOTO ORANG  │ ║  reply card ║  │  ← foto centered, floating cards overlap
│    ╚════╝ │   (no clip)  │ ╚═════════════╝  │
│           │              │                  │
│           │  ╔════════╗  │                  │
│           │  ║ card 3 ║  │                  │  ← card di depan foto bagian bawah
│           └──────────────┘                  │
└─────────────────────────────────────────────┘
```

---

## Background — Gradient Mesh Pastel

Background bukan polos, tapi gradient mesh lembut. Gunakan beberapa radial gradient yang overlap:

```css
/* globals.css */
.hero-bg {
  background:
    radial-gradient(ellipse 60% 50% at 15% 30%, rgba(200, 180, 255, 0.35) 0%, transparent 70%),
    radial-gradient(ellipse 50% 60% at 85% 20%, rgba(180, 220, 255, 0.3) 0%, transparent 70%),
    radial-gradient(ellipse 70% 40% at 50% 80%, rgba(255, 200, 230, 0.2) 0%, transparent 70%),
    #f8f8ff;
}
```

Atau via Tailwind inline style di JSX:

```tsx
<section
  style={{
    background: `
      radial-gradient(ellipse 60% 50% at 15% 30%, rgba(200, 180, 255, 0.35) 0%, transparent 70%),
      radial-gradient(ellipse 50% 60% at 85% 20%, rgba(180, 220, 255, 0.30) 0%, transparent 70%),
      radial-gradient(ellipse 70% 40% at 50% 80%, rgba(255, 200, 230, 0.20) 0%, transparent 70%),
      #f8f9ff
    `
  }}
>
```

---

## Navbar — Floating Pill Center

```tsx
// components/layout/Navbar.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'

const navLinks = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact']

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50"
    >
      <div
        className={`
          flex items-center gap-8 px-6 py-3 rounded-full
          transition-all duration-300
          ${scrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-black/8 border border-white/60'
            : 'bg-white/70 backdrop-blur-md shadow-md shadow-black/5 border border-white/50'
          }
        `}
      >
        {/* Brand */}
        <span className="font-display font-bold text-lg text-foreground whitespace-nowrap">
          Alif.
        </span>

        {/* Divider */}
        <div className="w-px h-4 bg-border" />

        {/* Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 whitespace-nowrap"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* CTA kecil di navbar */}
        <a
          href="#contact"
          className="text-sm font-semibold text-foreground hover:text-primary transition-colors whitespace-nowrap"
        >
          Hire Me
        </a>
      </div>
    </motion.header>
  )
}
```

---

## Hero Section — Full Code

**File:** `components/sections/Hero.tsx`

```tsx
'use client'

import Image from 'next/image'
import { motion } from 'motion/react'

// Social proof avatars — ganti dengan URL asli atau import lokal
const avatars = [
  '/assets/images/avatar1.jpg',
  '/assets/images/avatar2.jpg',
  '/assets/images/avatar3.jpg',
  '/assets/images/avatar4.jpg',
]

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 60% 50% at 10% 25%, rgba(200, 180, 255, 0.35) 0%, transparent 70%),
          radial-gradient(ellipse 55% 55% at 88% 18%, rgba(180, 220, 255, 0.30) 0%, transparent 70%),
          radial-gradient(ellipse 70% 40% at 50% 85%, rgba(255, 200, 230, 0.20) 0%, transparent 70%),
          #f8f9ff
        `
      }}
    >

      {/* ─── 1. TEXT CONTENT — centered ─── */}
      <div className="relative z-10 flex flex-col items-center text-center pt-40 pb-0 px-6 max-w-3xl mx-auto">

        {/* Eyebrow label (opsional) */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-5"
        >
          Web & Mobile Developer
        </motion.span>

        {/* Headline besar */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-6xl lg:text-7xl font-bold text-foreground leading-[1.05] tracking-tight mb-6"
        >
          Hi, I'm Alif —{' '}
          <br className="hidden md:block" />
          your next{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            dev partner
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.6 }}
          className="text-base text-muted-foreground max-w-lg leading-relaxed mb-8"
        >
          I build modern web and mobile applications with thoughtful design,
          scalable development, and user experiences that feel simple, fast, and reliable.
        </motion.p>

        {/* CTA + Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex items-center gap-5 flex-wrap justify-center"
        >
          {/* CTA Button — gelap seperti referensi */}
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            className="
              px-6 py-3 rounded-full
              bg-neutral-900 text-white
              text-sm font-semibold
              shadow-lg shadow-neutral-900/20
              hover:bg-neutral-800 transition-colors
            "
          >
            View Projects
          </motion.a>

          {/* Social Proof — avatar stack + counter */}
          <div className="flex items-center gap-3">
            {/* Avatar stack */}
            <div className="flex -space-x-2">
              {avatars.map((src, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white overflow-hidden relative"
                  style={{ zIndex: avatars.length - i }}
                >
                  {/*
                    Ganti dengan <Image> jika avatar asli tersedia.
                    Ini placeholder warna berbeda:
                  */}
                  <div
                    className="w-full h-full"
                    style={{
                      background: ['#c084fc','#60a5fa','#34d399','#f97316'][i]
                    }}
                  />
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">+10 clients</span> worldwide
            </p>
          </div>
        </motion.div>
      </div>

      {/* ─── 2. FOTO + FLOATING CARDS ─── */}
      <div className="relative w-full max-w-2xl mx-auto mt-12 flex justify-center">

        {/* Foto orang — tidak di-clip, overflow ke bawah */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-64 lg:w-80 h-[480px] lg:h-[560px]"
        >
          <Image
            src="/assets/images/profile.png"
            alt="Alif — Web & Mobile Developer"
            fill
            className="object-cover object-top"
            // TIDAK pakai rounded — foto mengalir bebas seperti referensi
            // Jika ingin sedikit rounded: className="object-cover object-top rounded-t-[120px]"
            priority
          />

          {/* Subtle glow di belakang foto */}
          <div className="absolute inset-0 -z-10 scale-110 blur-3xl opacity-40 bg-gradient-to-b from-primary/20 to-transparent rounded-full" />
        </motion.div>

        {/* ── Floating Card 1: Stats kiri ── */}
        <motion.div
          initial={{ opacity: 0, x: -20, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4 }}
          className="
            absolute left-0 bottom-32
            bg-white/90 backdrop-blur-xl
            border border-white/60
            rounded-2xl shadow-xl shadow-black/8
            px-5 py-4 min-w-[170px]
            z-20
          "
        >
          <p className="text-2xl font-bold font-display text-foreground">10+</p>
          <p className="text-xs font-semibold text-foreground/80 mt-0.5">Apps Launched</p>
          {/* Progress bar dekoratif */}
          <div className="mt-3 h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '75%' }}
              transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            />
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">For clients worldwide</p>
        </motion.div>

        {/* ── Floating Card 2: Pesan / Replied (kanan atas foto) ── */}
        <motion.div
          initial={{ opacity: 0, x: 20, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4 }}
          className="
            absolute right-0 top-20
            bg-white/90 backdrop-blur-xl
            border border-white/60
            rounded-2xl shadow-xl shadow-black/8
            px-5 py-4 max-w-[200px]
            z-20
          "
        >
          <div className="flex items-center gap-2 mb-2">
            {/* Mini avatar */}
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
              C
            </div>
            <p className="text-xs font-semibold text-foreground">Client replied</p>
          </div>
          <p className="text-xs text-muted-foreground leading-snug">
            Sounds great, let's kick off the project this week!
          </p>
        </motion.div>

        {/* ── Floating Card 3: Experience bawah foto ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4 }}
          className="
            absolute bottom-8 left-1/2 -translate-x-1/2
            bg-white/90 backdrop-blur-xl
            border border-white/60
            rounded-2xl shadow-xl shadow-black/8
            px-6 py-3
            z-20 whitespace-nowrap
          "
        >
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Available now</p>
          <p className="text-sm font-bold text-foreground mt-0.5">
            2+ Years Experience{' '}
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 ml-1 align-middle animate-pulse" />
          </p>
        </motion.div>

      </div>

    </section>
  )
}
```

---

## Floating Card — Komponen Reusable

Kalau ingin cards bisa dikustomisasi lebih mudah, buat komponen terpisah:

```tsx
// components/shared/FloatingCard.tsx
'use client'

import { motion } from 'motion/react'

interface FloatingCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
  initialX?: number
  initialY?: number
}

export function FloatingCard({
  children,
  className = '',
  delay = 0.8,
  initialX = 0,
  initialY = 10,
}: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: initialX, y: initialY }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`
        bg-white/90 backdrop-blur-xl
        border border-white/60
        rounded-2xl shadow-xl shadow-black/8
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}
```

**Penggunaan:**

```tsx
<FloatingCard className="absolute left-0 bottom-32 px-5 py-4" delay={0.85} initialX={-20}>
  <p className="text-2xl font-bold">10+</p>
  <p className="text-xs text-muted-foreground">Apps Launched</p>
</FloatingCard>
```

---

## Animasi Float Idle (opsional)

Supaya card terasa "hidup" meski tidak di-hover, tambahkan `animate` idle:

```tsx
// Floating idle animation — tiap card fase berbeda agar tidak sinkron
<motion.div
  animate={{ y: [0, -6, 0] }}
  transition={{
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut',
    delay: 0,       // card 1: delay 0
    // delay: 1.3,  // card 2: delay 1.3
    // delay: 2.1,  // card 3: delay 2.1
  }}
>
  {/* isi card */}
</motion.div>
```

---

## Tips Posisi Floating Cards

Semua cards pakai `absolute` di dalam wrapper foto. Referensi posisi:

| Card | `className` position |
|---|---|
| Stats kiri | `absolute left-0 bottom-32` |
| Reply kanan atas | `absolute right-0 top-20` |
| Badge bawah tengah | `absolute bottom-8 left-1/2 -translate-x-1/2` |

> **Catatan:** Sesuaikan nilai `bottom-32`, `top-20`, dll. berdasarkan tinggi foto aktual. Gunakan Tailwind DevTools atau nilai px jika perlu presisi.

---

## Foto — Rekomendasi

Agar tampil seperti referensi (orang berdiri, tidak terpotong di tengah):

| Aspek | Rekomendasi |
|---|---|
| Rasio foto | Portrait — sekitar 3:4 atau 2:3 |
| Background foto | Transparan (PNG) atau solid putih/cerah |
| Posisi subjek | Centered, upper body terlihat |
| `object-position` | `object-top` agar wajah tidak terpotong |

Jika foto background bukan transparan, tambahkan efek fade bawah:

```tsx
{/* Fade foto ke bawah — blend dengan background */}
<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f8f9ff] to-transparent z-10" />
```

---

## Struktur Folder Terkait

```
components/
├── layout/
│   └── Navbar.tsx          ← pill floating center
├── sections/
│   └── Hero.tsx            ← full hero section
└── shared/
    └── FloatingCard.tsx    ← reusable card wrapper
```

---

## Checklist

- [ ] Foto portrait tersedia di `public/assets/images/profile.png`
- [ ] Sesuaikan teks headline, subtext, dan CTA href
- [ ] Update social proof counter dan avatar jika ada foto nyata
- [ ] Sesuaikan posisi floating cards berdasarkan ukuran foto
- [ ] Test responsif — di mobile, cards mungkin perlu `hidden md:block` atau reposisi
- [ ] Tambahkan `delay` berbeda di tiap floating card agar animasi idle tidak sinkron