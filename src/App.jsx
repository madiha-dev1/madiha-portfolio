import React, { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Briefcase,
  Code2,
  Github,
  Globe2,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Send,
  Sparkles,
  X
} from "lucide-react";

import aboutImg from './assets/about.png';
import heroImg from './assets/hero.png';
import experienceImg from './assets/experience.png';
import journeyImg from './assets/journey.png';

// FIX: files inside the "public" folder must NOT be imported like normal
// JS modules — Vite serves them as-is from the site root. Importing them
// breaks the path once "base" is set in vite.config.js (that's what was
// causing the 404s). Build the URLs using BASE_URL instead.
const asset = (name) => `${import.meta.env.BASE_URL}${name}`;

const project1 = asset("project1.png");
const project2 = asset("project2.png");
const project3 = asset("project-3.png");
const project4 = asset("project-4.svg");
const project5 = asset("project-5.svg");
const project6 = asset("project-6.svg");

const navItems = [
  ["Home", "home"],
  ["About", "about"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Experience", "experience"],
  ["Contact", "contact"],
];

const skills = [
  { name: "HTML", icon: "◇", tone: "from-orange-500/30 to-orange-900/10" },
  { name: "CSS", icon: "3", tone: "from-blue-500/30 to-blue-900/10" },
  { name: "JavaScript", icon: "JS", tone: "from-yellow-500/30 to-yellow-900/10" },
  { name: "React", icon: "⚛", tone: "from-cyan-500/30 to-cyan-900/10" },
  { name: "Bootstrap", icon: "B", tone: "from-violet-500/30 to-violet-900/10" },
  { name: "Python", icon: "🐍", tone: "from-blue-500/30 to-yellow-500/10" },
  { name: "Django", icon: "dj", tone: "from-emerald-500/30 to-emerald-900/10" },
  { name: "PostgreSQL", icon: "PG", tone: "from-sky-500/30 to-sky-900/10" },
];

const projects = [
  { title: "library management system", type: "Library", text: "A system to manage and organize library resources.", tech: ["React", "Bootstrap"], image: project1 },
  { title: "Expense Tracker", type: "Web Apps", text: "A simple app to track daily expenses.", tech: ["React", "Bootstrap"], image: project2 },
  { title: "E-commerce Store", type: "E-commerce", text: "E-commerce Store", text: "A clean shopping experience with product-focused layouts.", tech: ["React", "CSS"], image: project3 },
  { title: "Task Manager App", type: "Web Apps", text: "Organize tasks with a clean and responsive interface.", tech: ["React", "LocalStorage"], image: project4 },
  { title: "Weather App", type: "Web Apps", text: "Live-weather concept with a simple, beautiful UI.", tech: ["JavaScript", "API"], image: project5 },
  { title: "Landing Page", type: "Portfolio", text: "A modern landing page for a personal or business idea.", tech: ["HTML", "CSS", "JS"], image: project6 },
];

const posts = [
  ["Why I Chose Python for Backend Development", "Thoughts from my learning journey.", "Aug 25, 2026"],
  ["Essential Tips for Beginner Developers", "Small habits that make coding easier.", "Aug 12, 2026"],
  ["Building My First E-commerce Website", "What I learned while building it.", "Jul 28, 2026"],
];

function Logo() {
  return (
    <a href="#home" className="relative z-10 text-xl font-semibold italic tracking-tight">
      <span className="text-white">Madiha</span><span className="text-[#ff4fd8]">♡</span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-[#07050f]/80 px-5 py-3 shadow-2xl backdrop-blur-xl">
        <Logo />

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map(([label, id]) => (
            <a key={id} href={`#${id}`} className="text-xs text-white/75 transition hover:text-[#ff8ce8]">
              {label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="hidden rounded-full border border-[#ff31d2]/60 px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#ff31d2]/15 md:inline-flex">
          Hire Me <ArrowRight size={13} />
        </a>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav className="mx-auto mt-2 flex max-w-7xl flex-col gap-2 rounded-2xl border border-white/10 bg-[#080611]/95 p-4 backdrop-blur-xl md:hidden">
          {navItems.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/5">
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="mb-8">
      <p className="script text-sm">{eyebrow} ♡</p>
      <h2 className="mt-1 text-3xl font-semibold md:text-4xl">{title} <span className="text-[#ff55d9]">♡</span></h2>
      {text && <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">{text}</p>}
    </div>
  );
}

function GlowBackground() {
  return (
    <>
      <div className="pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-[#ff31d2]/10 blur-[100px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-[#7c2cff]/10 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#b100ff]/10 blur-[100px]" />
    </>
  );
}

function Home() {
  return (
    <section id="home" className="page-shell neon-border min-h-[px] scroll-mt-24 rounded-3xl">
      <GlowBackground />
      <div className="relative grid min-h-[600px] items-center lg:grid-cols-[1fr_1.05fr]">
        <div className="z-10 px-7 py-24 md:px-14 lg:py-28">
          <p className="script text-lg">Hello, I'm ♡</p>
          <h1 className="mt-2 text-5xl font-semibold leading-[1.05] md:text-7xl">
            <span className="gradient-text">Madiha</span> <span className="text-[#ff7be2]">♡</span>
          </h1>
          <h3 className="mt-4 text-xl font-medium md:text-2xl">Web Developer</h3>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/60 md:text-base">
            I build modern, responsive and user-friendly web experiences.
            Passionate about turning ideas into real, clean and functional websites.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a className="glow-btn" href="#projects">View My Projects <ArrowRight size={15} /></a>
            <a className="ghost-btn" href="#contact">Contact Me</a>
          </div>
         <div className="mt-7 flex gap-3">

  <a
    href="https://www.linkedin.com/in/madiha-dev-31554142a/"
    className="group flex h-10 w-10 items-center justify-center rounded-full
               border border-white/10 bg-white/[0.04]
               text-white/65 transition-all duration-300
               hover:border-purple-400
               hover:bg-purple-500/20
               hover:text-purple-200
               hover:shadow-[0_0_20px_rgba(168,85,247,0.7)]
               hover:-translate-y-1"
  >
    <Linkedin size={18} />
  </a>

  <a
    href="https://github.com/madiha-dev1"
    className="group flex h-10 w-10 items-center justify-center rounded-full
               border border-white/10 bg-white/[0.04]
               text-white/65 transition-all duration-300
               hover:border-purple-400
               hover:bg-purple-500/20
               hover:text-purple-200
               hover:shadow-[0_0_20px_rgba(168,85,247,0.7)]
               hover:-translate-y-1"
  >
    <Github size={18} />
  </a>

  <a
    href="https://instagram.com/madihadev08⁠"
    className="group flex h-10 w-10 items-center justify-center rounded-full
               border border-white/10 bg-white/[0.04]
               text-white/65 transition-all duration-300
               hover:border-purple-400
               hover:bg-purple-500/20
               hover:text-purple-200
               hover:shadow-[0_0_20px_rgba(168,85,247,0.7)]
               hover:-translate-y-1"
  >
    <Instagram size={18} />
  </a>

  <a
    href="https://www.madihadev785@gmail.com"
    className="group flex h-10 w-10 items-center justify-center rounded-full
               border border-white/10 bg-white/[0.04]
               text-white/65 transition-all duration-300
               hover:border-purple-400
               hover:bg-purple-500/20
               hover:text-purple-200
               hover:shadow-[0_0_20px_rgba(168,85,247,0.7)]
               hover:-translate-y-1"
  >
    <Mail size={18} />
  </a>

</div>
        </div>

        <div className="relative flex h-full min-h-[500px] items-center justify-center lg:min-h-0">
          <div className="absolute h-[100px] w-[100px] rounded-full border border-[#ff31d2]/45 bg-[#a000ff]/10 shadow-[0_0_100px_rgba(255,49,210,.25)] md:h-[435px] md:w-[435px]" />
          <img src={heroImg} alt="Madiha portfolio portrait" className="relative z-10 h-[430px] w-[430px] aspect-square rounded-full object-cover drop-shadow-[0_0_45px_rgba(255,49,210,.18)]" />
          <p className="script absolute right-4 top-20 z-20 max-w-[170px] rotate-6 text-2xl leading-tight md:right-10">Code<br/>Create<br/>Grow ♡</p>
        </div>
      </div>
      <a href="#about" className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-white/10 p-2 text-white/50 transition hover:text-white">
        <ArrowDown size={16} />
      </a>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="page-shell neon-border scroll-mt-24 rounded-3xl p-7 md:p-12">
      <GlowBackground />
      <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <SectionTitle eyebrow="About Me" title={<>A little about<br/>myself</>} />
          <p className="max-w-xl text-sm leading-7 text-white/60">
            I'm Madiha, a passionate full-stack web developer with a love for creating beautiful
            and functional websites. I enjoy learning new technologies, solving problems
            and bringing creative ideas to life through code.
          </p>

          <div className="mt-8 grid max-w-md gap-4">
            <Info icon={<MapPin size={18}/>} title="Location" value="Pakistan Hyd Sindh" />
            <Info icon={<Mail size={18}/>} title="Email" value="madihadev785@gmail.com" />
            <Info icon={<Briefcase size={18}/>} title="Freelance" value="Available" />
          </div>
        </div>
        <div className="relative flex min-h-[430px] items-center justify-center">
          
          <div className="relative w-[350px] h-[420px] rounded-[40px] border border-purple-400/40 p-3">
  <div className="w-full h-full rounded-[32px] overflow-hidden bg-purple-500/10">
    <img
      src={aboutImg}
      alt="Profile"
      className="w-full h-full object-cover"
    />
  </div>
</div>
          <p className="script absolute bottom-8 right-0 max-w-[130px] -rotate-6 text-2xl leading-tight">Better<br/>Version<br/>of Me ♡</p>
        </div>
      </div>
    </section>
  );
}

function Info({ icon, title, value }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#ff31d2]/40 bg-[#ff31d2]/10 text-[#ff68dc]">{icon}</div>
      <div>
        <p className="text-xs text-white/45">{title}</p>
        <p className="text-sm">{value}</p>
      </div>
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#07050f] px-6 py-16 md:px-12">

  {/* Background Glow */}
  <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#ff31d2]/10 blur-[120px]" />
  <div className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-[#7c2cff]/10 blur-[130px]" />

  <div className="relative z-10">

    {/* Heading */}
    <div className="mb-12">
      <p className="font-[cursive] text-lg text-[#ff75df]">
        What I work with ♡
      </p>

      <h2 className="mt-2 text-4xl font-semibold text-white md:text-5xl">
        My Skills <span className="text-[#ff4fd8]">♡</span>
      </h2>

      <p className="mt-3 max-w-xl text-sm leading-6 text-white/50">
        Technologies and tools I use to create modern, responsive and
        user-friendly websites.
      </p>
    </div>

    {/* Skills Grid */}
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">

      {/* HTML */}
      <div className="group rounded-2xl border border-orange-500/20 bg-white/[0.03] p-6 text-center backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:border-orange-400/60 hover:shadow-[0_0_35px_rgba(249,115,22,0.18)]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-400/30 bg-orange-500/10 text-2xl font-bold text-orange-400">
          HTML
        </div>
        <h3 className="mt-4 text-sm font-semibold text-white">HTML</h3>
        <p className="mt-1 text-xs text-white/40">Structure</p>
      </div>

      {/* CSS */}
      <div className="group rounded-2xl border border-blue-500/20 bg-white/[0.03] p-6 text-center backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:border-blue-400/60 hover:shadow-[0_0_35px_rgba(59,130,246,0.18)]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-400/30 bg-blue-500/10 text-2xl font-bold text-blue-400">
          CSS
        </div>
        <h3 className="mt-4 text-sm font-semibold text-white">CSS</h3>
        <p className="mt-1 text-xs text-white/40">Styling</p>
      </div>

      {/* JavaScript */}
      <div className="group rounded-2xl border border-yellow-500/20 bg-white/[0.03] p-6 text-center backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:border-yellow-400/60 hover:shadow-[0_0_35px_rgba(234,179,8,0.18)]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-yellow-400/30 bg-yellow-500/10 text-xl font-bold text-yellow-400">
          JS
        </div>
        <h3 className="mt-4 text-sm font-semibold text-white">JavaScript</h3>
        <p className="mt-1 text-xs text-white/40">Logic</p>
      </div>

      {/* React */}
      <div className="group rounded-2xl border border-cyan-500/20 bg-white/[0.03] p-6 text-center backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:border-cyan-400/60 hover:shadow-[0_0_35px_rgba(6,182,212,0.18)]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/10 text-2xl text-cyan-400">
          ⚛
        </div>
        <h3 className="mt-4 text-sm font-semibold text-white">React JS</h3>
        <p className="mt-1 text-xs text-white/40">Frontend</p>
      </div>

      {/* Bootstrap */}
      <div className="group rounded-2xl border border-purple-500/20 bg-white/[0.03] p-6 text-center backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:border-purple-400/60 hover:shadow-[0_0_35px_rgba(168,85,247,0.18)]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-400/30 bg-purple-500/10 text-2xl font-bold text-purple-400">
          B
        </div>
        <h3 className="mt-4 text-sm font-semibold text-white">Bootstrap</h3>
        <p className="mt-1 text-xs text-white/40">UI Framework</p>
      </div>

      {/* Python */}
      <div className="group rounded-2xl border border-sky-500/20 bg-white/[0.03] p-6 text-center backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:border-sky-400/60 hover:shadow-[0_0_35px_rgba(14,165,233,0.18)]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-sky-400/30 bg-sky-500/10 text-xl font-bold text-sky-400">
          Py
        </div>
        <h3 className="mt-4 text-sm font-semibold text-white">Python</h3>
        <p className="mt-1 text-xs text-white/40">Backend</p>
      </div>

      {/* Django */}
      <div className="group rounded-2xl border border-emerald-500/20 bg-white/[0.03] p-6 text-center backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:border-emerald-400/60 hover:shadow-[0_0_35px_rgba(16,185,129,0.18)]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-500/10 text-xl font-bold text-emerald-400">
          DJ
        </div>
        <h3 className="mt-4 text-sm font-semibold text-white">Django</h3>
        <p className="mt-1 text-xs text-white/40">Backend</p>
      </div>

      {/* PostgreSQL */}
      <div className="group rounded-2xl border border-indigo-500/20 bg-white/[0.03] p-6 text-center backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:border-indigo-400/60 hover:shadow-[0_0_35px_rgba(99,102,241,0.18)]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-400/30 bg-indigo-500/10 text-lg font-bold text-indigo-400">
          PG
        </div>
        <h3 className="mt-4 text-sm font-semibold text-white">
          PostgreSQL
        </h3>
        <p className="mt-1 text-xs text-white/40">Database</p>
      </div>

    </div>

    {/* Bottom Text */}
    <div className="mt-12 text-right">
      <p className="rotate-[-5deg] font-[cursive] text-xl text-[#ff70df]">
        Still learning, still growing ♡
      </p>
    </div>

  </div>
</section>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="glass-card overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-[#ff31d2]/35">
      <img src={project.image} alt="project-demo" className="h-36 w-full object-cover border-b border-white/10" />
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold">{project.title}</h3>
          <ArrowRight size={14} className="text-[#ff5cda]" />
        </div>
        <p className="mt-2 text-xs leading-5 text-white/50">{project.text}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tech.map(t => <span key={t} className="rounded-full border border-white/10 px-2 py-1 text-[10px] text-white/55">{t}</span>)}
        </div>
      </div>
    </article>
  );
}

function Projects() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Web Apps", "E-commerce", "Portfolio"];
  const visible = filter === "All" ? projects : projects.filter(p => p.type === filter);

  return (
    <section id="projects" className="page-shell neon-border scroll-mt-24 rounded-3xl p-7 md:p-12">
      <GlowBackground />
      <div className="relative">
        <SectionTitle eyebrow="My Projects" title="My Projects" text="Some of the projects I've built to improve my skills and gain real-world experience." />
        <div className="mb-7 flex flex-wrap gap-2">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`rounded-full border px-4 py-2 text-xs transition ${filter === f ? "border-[#ff31d2] bg-[#ff31d2] text-white" : "border-white/10 bg-white/[.03] text-white/60 hover:border-[#ff31d2]/40"}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map(project => <ProjectCard key={project.title} project={project} />)}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const items = [
    ["2026 — Present", " full-stack Web Development Backend learning", "Working on python and Django , postgresql for backend development."],
    ["2025 — 2026", "Front-End Developer (Self Taught)", "Learned HTML, CSS, JavaScript, React and Bootstrap through projects and regular practice."],
    ["2024 — 2025", "WordPress & Shopify", "Built basic websites and explored theme customization and store setup."],
  ];

  return (
    <section id="experience" className="page-shell neon-border scroll-mt-24 rounded-3xl p-7 md:p-12">
      <GlowBackground />
      <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_1fr]">
        <div>
          <SectionTitle eyebrow="My Experience" title="My Experience" text="My journey so far in web development." />
          <div className="relative ml-2 border-l border-[#ff31d2]/60 pl-7">
            {items.map(([date, title, text], i) => (
              <div key={title} className="relative mb-9 last:mb-0">
                <span className="absolute -left-[35px] top-1 h-3 w-3 rounded-full bg-[#ff4bd7] shadow-[0_0_16px_#ff31d2]" />
                <p className="text-xs font-medium text-white/65">{date}</p>
                <h3 className="mt-1 text-sm font-semibold">{title}</h3>
                <p className="mt-1 max-w-lg text-xs leading-5 text-white/50">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative w-[380px] h-[480px] flex items-center justify-center">

  {/* Glow */}
  <div className="absolute w-[300px] h-[380px] bg-fuchsia-500/20 blur-[80px]" />

  {/* Outer rotated frame */}
  <div className="absolute w-[310px] h-[400px] rounded-[45px] border border-fuchsia-400/40 rotate-6" />

  {/* Inner rotated frame */}
  <div className="absolute w-[310px] h-[400px] rounded-[45px] border border-purple-400/30 -rotate-6" />

  {/* Main frame */}
  <div className="relative w-[300px] h-[390px] rounded-[40px] overflow-hidden
                  border border-white/20
                  bg-white/5 backdrop-blur-sm">

    <img
      src={experienceImg}
      alt="Madiha"
      className="w-[300px] min-h-[400px] object-cover"
    />

  </div>

  {/* Small decorative dots */}
  <div className="absolute top-10 right-4 w-3 h-3 rounded-full bg-fuchsia-400" />
  <div className="absolute bottom-16 left-3 w-2 h-2 rounded-full bg-purple-300" />

</div>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section className="page-shell neon-border rounded-3xl p-7 md:p-12">
      <GlowBackground />
      <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="script text-sm">My Journey ♡</p>
          <h2 className="mt-2 text-3xl font-semibold md:text-5xl">From Learner<br/>to Creator</h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-white/55">
            It's not just about writing code, it's about building the life I want.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3 text-xs text-white/70">
            <Step icon={<Sparkles size={17}/>} label="Learn" />
            <ArrowRight size={14} className="text-[#ff45d5]" />
            <Step icon={<Code2 size={17}/>} label="Build" />
            <ArrowRight size={14} className="text-[#ff45d5]" />
            <Step icon={<Globe2 size={17}/>} label="Grow" />
          </div>
          <button className="glow-btn mt-8"><MessageCircle size={16}/> Watch My Journey</button>
          <p className="script mt-8 text-xl">Still Learning ♡</p>
        </div>
        <div className="relative w-[330px] h-[440px] flex items-center justify-center">

  {/* Glow */}
  <div className="absolute inset-8 bg-purple-500/20 blur-[70px]" />

  {/* Back frame */}
  <div className="absolute inset-5 border border-purple-400/30 rounded-[25px] rotate-3" />

  {/* Main frame */}
  <div className="relative w-[300px] h-[410px] overflow-hidden
                  bg-gradient-to-br from-purple-500/20 to-pink-500/5
                  border border-white/20
                  rounded-tl-[70px] rounded-br-[70px]
                  rounded-tr-[20px] rounded-bl-[20px]
                  backdrop-blur-md">

    <img
      src={journeyImg}
      alt="Madiha"
      className="w-full h-full object-cover"
    />

  </div>

  {/* Floating corner */}
  <div className="absolute top-5 right-0 w-14 h-14
                  border-t-2 border-r-2 border-purple-400 rounded-tr-2xl" />

  <div className="absolute bottom-5 left-0 w-14 h-14
                  border-b-2 border-pink-400 rounded-bl-2xl" />

</div>
      </div>
    </section>
  );
}

function Step({ icon, label }) {
  return <div className="flex flex-col items-center gap-2">{icon}<span>{label}</span></div>;
}

function Contact() {
  return (
    <section id="contact" className="page-shell neon-border scroll-mt-24 rounded-3xl p-7 md:p-12">
      <GlowBackground />
      <div className="relative grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
        <div>
          <SectionTitle eyebrow="Let's Connect" title="Get In Touch" text="Have a project in mind or just want to say hi? Feel free to reach out!" />
          <div className="space-y-5">
            <Info icon={<Mail size={18}/>} title="Email" value="madihadev785@gmail.com" />
            <Info icon={<MapPin size={18}/>} title="Location" value="Pakistan Hyd Sindh" />
            <Info icon={<Linkedin size={18}/>} title="LinkedIn" value="linkedin.com/in/madiha-dev" />
            <Info icon={<Github size={18}/>} title="GitHub" value="github.com/madiha-dev1" />
          </div>
        </div>

        <form
  onSubmit={(e) => e.preventDefault()}
  className="glass-card w-full max-w-[500px] p-5 md:p-7"
>
  <div className="grid gap-3">
    <input
      className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none transition focus:border-[#ff31d2]/60"
      placeholder="Your Name"
    />

    <input
      type="email"
      className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none transition focus:border-[#ff31d2]/60"
      placeholder="Your Email"
    />

    <textarea
      rows="6"
      className="resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none transition focus:border-[#ff31d2]/60"
      placeholder="Message"
    />

    <button className="glow-btn mt-1 w-full">
      <Send size={15} /> Send Message
    </button>
  </div>
</form>
      </div>
      <p className="script absolute bottom-8 right-8 hidden text-2xl rotate-6 lg:block">Let's<br/>Work<br/>Together ♡</p>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 text-center text-xs text-white/35">
      Made with <Heart size={12} className="mx-1 inline text-[#ff4bd7]" fill="currentColor" /> by Madiha ♡
    </footer>
  );
}

function App() {
  useEffect(() => {
    document.title = "Madiha ♡ | Full-Stack Web Dev";
  }, []);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl space-y-5 px-3 pb-10 pt-24">
        <Home />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Journey />
        <Contact />

        <section className="page-shell neon-border relative flex min-h-[350px] items-center overflow-hidden rounded-3xl p-8">

  <GlowBackground />

  {/* Left Content */}
  <div className="relative z-10">
    <p className="text-3xl font-semibold text-[#ffb3f2]">
      Thanks<br />for visiting!
    </p>

    <p className="mt-4 max-w-sm text-sm leading-6 text-white/55">
      Let's build something amazing together!
    </p>

    <p className="script mt-5 text-3xl">
      Madiha ♡
    </p>
  </div>


  {/* Image Frame */}
  <div className="relative ml-auto w-[340px] h-[450px] flex items-center justify-center">

    {/* Soft Glow */}
    <div className="absolute w-[280px] h-[360px] rounded-full bg-purple-500/20 blur-[90px]" />


    {/* Back Decorative Frame */}
    <div className="
      absolute
      w-[310px] h-[420px]
      rounded-[28px]
      border border-purple-400/20
      rotate-3
    " />


    {/* Glass Card */}
    <div
      className="
        relative
        w-[310px] h-[420px]
        p-6
        rounded-[28px]
        border border-white/15
        bg-white/[0.04]
        backdrop-blur-xl
        shadow-[0_25px_80px_rgba(0,0,0,0.35)]
        overflow-hidden
      "
    >

      {/* Top Accent */}
      <div className="
        absolute top-0 left-10 right-10 h-[2px]
        bg-gradient-to-r
        from-transparent
        via-purple-400
        to-transparent
      " />


      {/* Image Space */}
      <div className="relative w-full h-full flex items-center justify-center">

        <img
          src={heroImg}
          alt="Madiha"
          className="
            relative z-10
            w-full h-full
            object-cover
          "
        />

      </div>


      {/* Bottom Glass Strip */}
      <div className="
        absolute bottom-4 left-4 right-4 h-12
        rounded-2xl
        bg-white/[0.07]
        border border-white/10
        backdrop-blur-md
      " />

    </div>


    {/* Top Floating Circle */}
    <div className="
      absolute -top-2 -right-2
      w-10 h-10
      rounded-full
      border border-purple-400/50
      bg-purple-500/10
    " />


    {/* Bottom Floating Circle */}
    <div className="
      absolute -bottom-3 -left-3
      w-16 h-16
      rounded-full
      border border-white/10
    " />

  </div>

</section>

        <Footer />
      </main>
    </>
  );
}

export default App;