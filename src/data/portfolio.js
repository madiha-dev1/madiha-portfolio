// ─── Portfolio Data ───────────────────────────────────────────────────────────
// Edit this file to update your name, typing texts, links, etc.

export const personalInfo = {
  name: "Madiha",
  fullName: "Madiha Noor",
  tagline: "Building the future, one line at a time.",
  resumeUrl: "/resume.pdf", // place your resume in /public/resume.pdf
};

// Texts that cycle in the typing animation
export const typingTexts = [
  "Full Stack Developer",
  "Interested in AI/ML & Robotics",
  "Aptech Student",
];

// Navbar links (href uses section IDs for smooth scroll)
export const navLinks = [
  { label: "Home",     href: "#home" },
  { label: "About",    href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Skills",   href: "#skills" },
  { label: "Contact",  href: "#contact" },
];

// Social links
export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/",   // ← replace with your URL
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/", // ← replace with your URL
    icon: "linkedin",
  },
];


export const aboutInfo = {
  bio: "I'm Madiha Noor, a passionate Full Stack Developer. I enjoy building modern, responsive websites and learning new technologies.",

  stats: [
    {
      number: 1,
      suffix: "+",
      label: "Years Learning"
    },
    {
      number: 5,
      suffix: "+",
      label: "Projects"
    },
    {
      number: 10,
      suffix: "+",
      label: "Technologies"
    }
  ]
};


export const services = [
  {
    title: "Web Development",
    description: "Building modern and responsive websites.",
    icon: "Code"
  },
  {
    title: "Frontend Development",
    description: "Creating beautiful user interfaces with React.",
    icon: "Monitor"
  },
  {
    title: "Backend Development",
    description: "Developing server-side applications and APIs.",
    icon: "Server"
  },
  {
    title: "UI/UX Design",
    description: "Designing clean and user-friendly interfaces.",
    icon: "Palette"
  }
];
