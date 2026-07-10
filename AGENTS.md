# 🧊 Portfolio Web — Alif · Prompt Guide

> Panduan lengkap membangun personal portfolio web glassmorphic, minimalist, dan profesional menggunakan **Next.js 16**, **Tailwind CSS**, **Motion**, dan **shadcn/ui** — ditujukan untuk freelancer di Upwork.

---

## Tech Stack

| Layer | Library / Version |
|---|---|
| Framework | `next@16.2.6` |
| UI | `react@19.2.4` + `radix-ui@^1.4.3` + `shadcn@^4.7.0` |
| Styling | `tailwind-merge@^3.6.0` + `tw-animate-css@^1.4.0` |
| Animation | `motion@^12.38.0` |
| Icons | `lucide-react@^1.16.0` |
| Utilities | `clsx@^2.1.1` + `class-variance-authority@^0.7.1` |

---

## Design System

### CSS Variables (globals.css)

```css
:root {
  --primary: #1659F7;
  --secondary: #5b55e6;
  --accent: #00b8d9;
  --neutral: #171717;

  --background: #ffffff;
  --foreground: var(--neutral);
  --card: var(--background);
  --card-foreground: var(--foreground);
  --popover: var(--background);
  --popover-foreground: var(--foreground);
  --primary-foreground: #ffffff;
  --secondary-foreground: #ffffff;
  --accent-foreground: #ffffff;
  --muted: #f4f4f5;
  --muted-foreground: #71717a;
  --border: #e4e4e7;
  --input: var(--border);
  --ring: var(--primary);
  --destructive: #dc2626;
}
```

### Glassmorphic Utility Classes

Tambahkan ke `globals.css` atau `tailwind.config`:

```css
.glass {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px rgba(22, 89, 247, 0.08);
}

.glass-card {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow:
    0 4px 24px rgba(22, 89, 247, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.glass-dark {
  background: rgba(22, 89, 247, 0.04);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(22, 89, 247, 0.12);
}
```

### Typography

```css
/* Font pairing — import di layout.tsx */
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

:root {
  --font-display: 'Syne', sans-serif;   /* Headings — geometric, tegas */
  --font-body: 'DM Sans', sans-serif;   /* Body — clean, readable */
}
```

---

## Struktur Folder

```
src/
├── app/
│   ├── layout.tsx          ← Root layout + font + cursor
│   ├── page.tsx            ← Assembly semua section
│   └── globals.css         ← CSS variables + glass utilities
├── components/
│   ├── ui/                 ← shadcn components
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Experience.tsx
│   │   └── Contact.tsx
│   └── shared/
│       ├── CustomCursor.tsx
│       ├── SectionLabel.tsx
│       └── AnimatedText.tsx
public/
└── assets/
    └── images/
        └── profile.png
```

---

## Custom Cursor

### `components/shared/CustomCursor.tsx`

```tsx
'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

export function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 300 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 20)
      cursorY.set(e.clientY - 20)
      dotX.set(e.clientX - 4)
      dotY.set(e.clientY - 4)
    }

    const handleMouseEnterLink = () => {
      // scale up on hover — pakai CSS class `.cursor-hover` di elemen
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      {/* Outer ring — lambat, blur */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          border: '1.5px solid rgba(22, 89, 247, 0.6)',
          backdropFilter: 'blur(2px)',
        }}
      />
      {/* Inner dot — cepat */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] bg-primary"
        style={{
          x: dotX,
          y: dotY,
        }}
      />
    </>
  )
}
```

**Pasang di `layout.tsx`:**

```tsx
import { CustomCursor } from '@/components/shared/CustomCursor'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="cursor-none">
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
```

---

## Animasi — Pola Standar

Gunakan `motion` dari `motion/react` (bukan `framer-motion`).

### Fade + Slide Up (section reveal)

```tsx
import { motion } from 'motion/react'

// Wrapper untuk setiap section
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

// Di component:
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-80px' }}
  variants={fadeUp}
>
  {/* content */}
</motion.div>
```

### Stagger Children

```tsx
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

<motion.ul variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}>
  {skills.map((skill) => (
    <motion.li key={skill} variants={item}>
      {skill}
    </motion.li>
  ))}
</motion.ul>
```

### Hover Card Scale

```tsx
<motion.div
  whileHover={{ y: -4, scale: 1.01 }}
  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  className="glass-card rounded-2xl p-6"
>
  {/* card content */}
</motion.div>
```

---

## Navbar

**File:** `components/layout/Navbar.tsx`

```tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'

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
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`
        fixed top-4 left-1/2 -translate-x-1/2 z-50
        transition-all duration-500
        ${scrolled
          ? 'glass rounded-full px-6 py-3 shadow-lg shadow-primary/10'
          : 'bg-transparent px-8 py-4'
        }
      `}
    >
      <nav className="flex items-center gap-8">
        {/* Logo */}
        <span className="font-display font-bold text-xl text-foreground">Alif.</span>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="
            ml-4 px-5 py-2 rounded-full text-sm font-semibold
            bg-primary text-primary-foreground
            shadow-md shadow-primary/25
            hover:shadow-primary/40 transition-shadow duration-300
          "
        >
          Let's Work Together
        </motion.a>
      </nav>
    </motion.header>
  )
}
```

---

## Hero Section

**File:** `components/sections/Hero.tsx`

```tsx
'use client'

import Image from 'next/image'
import { motion } from 'motion/react'

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 overflow-hidden">

      {/* Background mesh gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-secondary/6 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Small label */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4"
          >
            Hello!
          </motion.span>

          {/* Main Headline */}
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-6">
            I build{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              modern web
            </span>{' '}
            and mobile applications with thoughtful design.
          </h1>

          <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl">
            Focused on creating responsive digital products with clean architecture,
            modern interfaces, and smooth performance across web and mobile platforms.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 flex-wrap">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow"
            >
              View Projects
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-full glass-card text-foreground font-semibold hover:border-primary/30 transition-colors"
            >
              Contact Me
            </motion.a>
          </div>

          {/* Stat Cards */}
          <div className="flex gap-4 mt-10">
            {[
              { value: '2+', label: 'Years Experience', sub: 'Web · Mobile' },
              { value: '10+', label: 'Apps Launched', sub: 'For clients worldwide' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -3 }}
                className="glass-card rounded-2xl px-5 py-4 min-w-[130px]"
              >
                <p className="font-display text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm font-semibold text-foreground mt-0.5">{stat.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center"
        >
          {/* Decorative ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 blur-2xl scale-110" />

          <div className="relative w-72 h-72 lg:w-96 lg:h-96">
            {/* Glass frame */}
            <div className="absolute inset-0 rounded-3xl glass border border-white/30 shadow-2xl" />
            <Image
              src="/assets/images/profile.png"
              alt="Alif — Web & Mobile Developer"
              fill
              className="object-cover rounded-3xl"
              priority
            />
          </div>

          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-4 -left-4 glass-card rounded-2xl px-4 py-3 shadow-xl"
          >
            <p className="text-xs font-medium text-muted-foreground">Available for</p>
            <p className="text-sm font-bold text-primary">Freelance Work</p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
```

---

## About Section

**File:** `components/sections/About.tsx`

```tsx
'use client'

import { motion } from 'motion/react'

export function About() {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6 max-w-4xl">

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">About Me</span>
          <h2 className="font-display text-4xl font-bold mt-3 mb-6 text-foreground">
            Building digital products with clean code and modern user experiences.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass-card rounded-3xl p-8 lg:p-10 space-y-4"
        >
          <p className="text-foreground/80 text-lg leading-relaxed">
            I'm <strong className="text-foreground font-semibold">Alif</strong>, a web and mobile developer passionate
            about creating modern applications that combine performance, usability, and thoughtful design.
            I enjoy turning ideas into scalable digital experiences through clean development practices and
            intuitive interfaces.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed">
            My focus is building responsive products that not only work efficiently, but also feel smooth
            and engaging for users across different platforms.
          </p>
        </motion.div>

      </div>
    </section>
  )
}
```

---

## Skills Section

**File:** `components/sections/Skills.tsx`

```tsx
'use client'

import { motion } from 'motion/react'

const skillChips = [
  'Frontend Development', 'Mobile Development', 'Responsive UI', 'API Integration',
  'Modern UI/UX', 'Cross-platform Apps', 'Performance Optimization', 'Clean Architecture',
]

const techStack = [
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'Tailwind CSS', icon: '🌊' },
  { name: 'Flutter', icon: '💙' },
  { name: 'Firebase', icon: '🔥' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'Figma', icon: '🎨' },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } }
}

const chipVariant = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
}

export function Skills() {
  return (
    <section id="skills" className="py-24 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/3 w-80 h-80 bg-secondary/6 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 max-w-5xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Skills & Technologies</span>
          <h2 className="font-display text-4xl font-bold mt-3 text-foreground">
            Modern technologies for scalable digital products.
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            I work with modern tools and frameworks to build fast, maintainable, and responsive
            applications for web and mobile platforms.
          </p>
        </motion.div>

        {/* Skill Chips */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          {skillChips.map((chip) => (
            <motion.span
              key={chip}
              variants={chipVariant}
              whileHover={{ scale: 1.05, y: -2 }}
              className="glass-card px-5 py-2.5 rounded-full text-sm font-medium text-foreground cursor-default"
            >
              {chip}
            </motion.span>
          ))}
        </motion.div>

        {/* Tech Stack Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-4 sm:grid-cols-8 gap-4"
        >
          {techStack.map((tech) => (
            <motion.div
              key={tech.name}
              variants={chipVariant}
              whileHover={{ y: -4, scale: 1.05 }}
              className="glass-card rounded-2xl p-4 flex flex-col items-center gap-2 text-center"
            >
              <span className="text-2xl">{tech.icon}</span>
              <span className="text-xs font-semibold text-muted-foreground">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
```

---

## Projects Section

**File:** `components/sections/Projects.tsx`

```tsx
'use client'

import { motion } from 'motion/react'
import { ArrowUpRight, Github } from 'lucide-react'

const projects = [
  {
    name: 'Finance Dashboard Platform',
    description: 'A modern financial dashboard designed for tracking analytics, transactions, and business performance with responsive and intuitive interfaces.',
    stack: ['Next.js', 'Tailwind CSS', 'Firebase'],
    liveUrl: '#',
    sourceUrl: '#',
  },
  {
    name: 'Mobile Booking Application',
    description: 'A cross-platform mobile application focused on smooth booking experiences, real-time updates, and clean navigation flows.',
    stack: ['Flutter', 'Firebase', 'REST API'],
    liveUrl: '#',
    sourceUrl: '#',
  },
]

export function Projects() {
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6 max-w-5xl">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Featured Projects</span>
          <h2 className="font-display text-4xl font-bold mt-3 text-foreground">
            Selected projects built with modern technologies.
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl">
            A collection of web and mobile applications focused on performance, scalability,
            and seamless user experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="glass-card rounded-3xl p-7 flex flex-col gap-5 group"
            >
              {/* Stack badges */}
              <div className="flex gap-2 flex-wrap">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-primary/8 text-primary border border-primary/12"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Name & Description */}
              <div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">{project.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 mt-auto">
                <a
                  href={project.liveUrl}
                  className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Live Preview <ArrowUpRight size={15} />
                </a>
                <a
                  href={project.sourceUrl}
                  className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github size={14} /> Source Code
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
```

---

## Experience Section

**File:** `components/sections/Experience.tsx`

```tsx
'use client'

import { motion } from 'motion/react'

const timeline = [
  {
    year: '2023',
    text: 'Started focusing on modern frontend and mobile application development.',
  },
  {
    year: '2024',
    text: 'Built multiple responsive applications and explored scalable architecture for modern products.',
  },
  {
    year: '2025',
    text: 'Developed web and mobile projects for clients and personal products with a focus on performance and clean user experiences.',
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="container mx-auto px-6 max-w-3xl">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Experience</span>
          <h2 className="font-display text-4xl font-bold mt-3 text-foreground">
            My development journey and professional growth.
          </h2>
          <p className="text-muted-foreground mt-4">
            Over the past 2+ years, I've worked on various web and mobile projects focused on
            responsive interfaces, scalable systems, and modern digital experiences.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-8 border-l border-border space-y-8">
          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              {/* Dot */}
              <div className="absolute -left-[2.35rem] top-1 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-md shadow-primary/30" />

              <div className="glass-card rounded-2xl p-5">
                <span className="font-display text-2xl font-bold text-primary">{item.year}</span>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
```

---

## Contact Section

**File:** `components/sections/Contact.tsx`

```tsx
'use client'

import { motion } from 'motion/react'
import { Mail, Linkedin, Github, Briefcase } from 'lucide-react'

const contactLinks = [
  { label: 'Email', href: 'mailto:alif@email.com', icon: Mail },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/alif', icon: Linkedin },
  { label: 'GitHub', href: 'https://github.com/alif', icon: Github },
  { label: 'Upwork', href: 'https://upwork.com/freelancers/alif', icon: Briefcase },
]

export function Contact() {
  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-primary/6 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 max-w-2xl text-center">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Contact</span>
          <h2 className="font-display text-4xl font-bold mt-3 text-foreground">
            Let's build something modern together.
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            I'm available for freelance projects, collaborations, and opportunities
            related to web and mobile development.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex gap-4 justify-center mt-8"
        >
          <motion.a
            href="mailto:alif@email.com"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="px-7 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow"
          >
            Contact Me
          </motion.a>
          <motion.a
            href="https://upwork.com/freelancers/alif"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="px-7 py-3 rounded-full glass-card font-semibold text-foreground hover:border-primary/30 transition-colors"
          >
            Hire Me
          </motion.a>
        </motion.div>

        {/* Contact Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="flex justify-center gap-5 mt-10"
        >
          {contactLinks.map(({ label, href, icon: Icon }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, scale: 1.1 }}
              title={label}
              className="glass-card rounded-2xl p-3.5 text-muted-foreground hover:text-primary transition-colors"
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
```

---

## Footer

**File:** `components/layout/Footer.tsx`

```tsx
export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © 2026 Alif. Crafted with modern design and clean development.
        </p>
        <nav className="flex gap-6">
          {['Home', 'Projects', 'Experience', 'Contact'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {link}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
```

---

## Root Page Assembly

**File:** `app/page.tsx`

```tsx
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { Experience } from '@/components/sections/Experience'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
```

---

## Performance & Accessibility

```tsx
// ✅ Semua gambar pakai next/image dengan priority pada hero
// ✅ Custom cursor dinonaktifkan otomatis di touch device — tambahkan:

useEffect(() => {
  if (window.matchMedia('(pointer: coarse)').matches) return
  // ... init cursor logic
}, [])

// ✅ Animasi respek reduced-motion preference — tambahkan di globals.css:
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

// ✅ Semua <a> punya href yang valid
// ✅ Image alt text deskriptif
// ✅ Semantic HTML: <header>, <main>, <section>, <footer>
```

---

## Checklist Sebelum Deploy

- [ ] Ganti placeholder `href` di Projects dengan URL asli
- [ ] Update email, LinkedIn, GitHub, Upwork di Contact
- [ ] Pastikan `public/assets/images/profile.png` ada dan resolusi ≥ 500×500px
- [ ] Test di mobile — cursor tersembunyi otomatis di touch device
- [ ] Jalankan `next build` dan pastikan tidak ada error
- [ ] Deploy ke Vercel: `vercel --prod`

---

> **Font import** · Tambahkan di `<head>` atau gunakan `next/font/google` untuk performa optimal.
>
> **Motion import** · Selalu gunakan `from 'motion/react'` (bukan `framer-motion`) sesuai `motion@^12.38.0`.