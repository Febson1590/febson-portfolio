import { useState, useEffect } from 'react';

/** Global styles, font imports and responsive breakpoints */
const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      background: #05091a;
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: #ccd6f6;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #05091a; }
    ::-webkit-scrollbar-thumb { background: #0ea5e9; border-radius: 4px; }
    a { text-decoration: none; color: inherit; }
    input, textarea, button { font-family: 'Plus Jakarta Sans', sans-serif; }
    input::placeholder, textarea::placeholder { color: #334155; }
    input:focus, textarea:focus { outline: none; border-color: #0ea5e9 !important; }

    @keyframes fadeUp  { from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)} }
    @keyframes float   { 0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)} }
    @keyframes blink   { 0%,100%{opacity:1}50%{opacity:0} }
    @keyframes scaleIn { from{transform:scale(0.94);opacity:0}to{transform:scale(1);opacity:1} }

    .fu  { animation: fadeUp 0.65s cubic-bezier(.22,.68,0,1.2) both; }
    .flt { animation: float 5s ease-in-out infinite; }

    @media(max-width:1024px){ .two-col{grid-template-columns:1fr!important} .hide-lg{display:none!important} }
    @media(max-width:768px){
      .nav-links{display:none!important}
      .hero-btns{flex-direction:column!important}
      .skills-grid{grid-template-columns:repeat(3,1fr)!important}
      .proj-grid{grid-template-columns:1fr!important}
      .contact-row{flex-direction:column!important;align-items:center!important;text-align:center!important}
      .footer-inner{flex-direction:column!important;text-align:center!important;gap:12px!important}
      .about-cards{grid-template-columns:1fr 1fr!important}
      .sp{padding:70px 6%!important}
      .hp{padding:110px 6% 60px!important}
    }
    @media(max-width:480px){
      .skills-grid{grid-template-columns:repeat(2,1fr)!important}
      .about-cards{grid-template-columns:1fr!important}
      .form-row{grid-template-columns:1fr!important}
    }
  `}</style>
);

/** Skills data — each entry renders as a card in the Skills section */
const SKILLS = [
  {
    name: 'HTML5',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  },
  {
    name: 'CSS3',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  },
  {
    name: 'JavaScript',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  },
  {
    name: 'React',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  },
  {
    name: 'Bootstrap',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
  },
  {
    name: 'Git',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  },
  {
    name: 'GitHub',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    invert: true,
  },
  {
    name: 'VS Code',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
  },
  {
    name: 'Tailwind',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  },
  {
    name: 'Node.js',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  },
];

/** Projects data — add a new object to this array to display an additional project card */
const PROJECTS = [
  {
    id: 1,
    emoji: '🌤',
    title: 'WeatherNow',
    desc: 'A real-time weather app that shows current conditions, a 5-day forecast, humidity, wind speed, pressure, visibility, sunrise and sunset for any city in the world. The background changes dynamically based on the weather.',
    tags: ['React', 'OpenWeather API', 'Vite'],
    live: 'https://weather-now-plum-seven.vercel.app',
    github: 'https://github.com/Febson1590/WeatherNow',
  },
];

const NAV = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

/** Inline SVG icons for social links — uses currentColor for smooth hover transitions */
const SOCIAL_ICONS = {
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  upwork: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%" aria-hidden="true">
      <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.545-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
    </svg>
  ),
};

/** Navbar — scroll-aware with active section highlighting via IntersectionObserver */
function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let ticking = false;
    const fn = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        height: 68,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 6%',
        background: scrolled ? 'rgba(5,9,26,0.93)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(14,165,233,0.1)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Brand logo */}
      <a href="#home">
        <img
          src="/febson-logo.png"
          alt="Febson.Dev"
          style={{
            height: 180,
            width: 'auto',
            display: 'block',
            filter: 'brightness(1.15) contrast(1.1) saturate(1.1)',
          }}
        />
      </a>

      <div className="nav-links" style={{ display: 'flex', gap: 28 }}>
        {NAV.map((n) => (
          <a
            key={n}
            href={`#${n.toLowerCase()}`}
            style={{
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '0.02em',
              fontFamily: "'DM Mono', monospace",
              color: active === n.toLowerCase() ? '#38bdf8' : '#8899b0',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#38bdf8')}
            onMouseLeave={(e) =>
              (e.target.style.color =
                active === n.toLowerCase() ? '#38bdf8' : '#8899b0')
            }
          >
            {n}
          </a>
        ))}
      </div>

      {/* CTA button */}
      <a
        href="#contact"
        style={{
          background: 'linear-gradient(135deg,#38bdf8,#0ea5e9)',
          color: '#05091a',
          fontWeight: 700,
          fontSize: 13,
          padding: '8px 22px',
          borderRadius: 8,
          transition: 'opacity 0.2s, transform 0.2s',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.target.style.opacity = '.88';
          e.target.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
        }}
      >
        Hire Me
      </a>
    </nav>
  );
}

/** Hero section — typing animation, social links and floating code snippet */
function Hero() {
  const [typed, setTyped] = useState('');
  const [ti, setTi] = useState(0);
  const titles = [
    'Fullstack Developer.',
    'React Specialist.',
    'JavaScript Engineer.',
    'Open to Hire.',
  ];

  useEffect(() => {
    let i = 0,
      del = false;
    const iv = setInterval(() => {
      const w = titles[ti];
      if (!del && i <= w.length) {
        setTyped(w.slice(0, i++));
      } else if (!del) {
        del = true;
      } else if (del && i > 0) {
        setTyped(w.slice(0, --i));
      } else {
        del = false;
        setTi((t) => (t + 1) % titles.length);
      }
    }, 75);
    return () => clearInterval(iv);
  }, [ti]);

  return (
    <section
      id="home"
      className="hp"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '120px 8% 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '18%',
          right: '10%',
          width: 480,
          height: 480,
          borderRadius: '50%',
          background:
            'radial-gradient(circle,rgba(14,165,233,0.10) 0%,transparent 68%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '12%',
          left: '0',
          width: 340,
          height: 340,
          borderRadius: '50%',
          background:
            'radial-gradient(circle,rgba(56,189,248,0.07) 0%,transparent 68%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(rgba(56,189,248,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,0.025) 1px,transparent 1px)',
          backgroundSize: '52px 52px',
        }}
      />

      <div style={{ maxWidth: 680, position: 'relative', zIndex: 1 }}>
        <div
          className="fu"
          style={{
            animationDelay: '.05s',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 18,
            fontFamily: "'DM Mono',monospace",
            fontSize: 12,
            color: '#38bdf8',
            letterSpacing: '0.18em',
          }}
        >
          <span
            style={{
              width: 28,
              height: 1.5,
              background: '#38bdf8',
              display: 'inline-block',
              borderRadius: 2,
            }}
          />
          Hi there, I'm
        </div>

        <h1
          className="fu"
          style={{
            animationDelay: '.12s',
            fontSize: 'clamp(40px,6.5vw,74px)',
            fontWeight: 800,
            lineHeight: 1.08,
            marginBottom: 14,
            letterSpacing: '-1.5px',
            background: 'linear-gradient(135deg,#f0f8ff 30%,#82c8f0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Samson
          <br />
          Febaide
        </h1>

        <div
          className="fu"
          style={{
            animationDelay: '.2s',
            fontFamily: "'DM Mono',monospace",
            fontSize: 'clamp(15px,2.2vw,21px)',
            color: '#38bdf8',
            marginBottom: 22,
            minHeight: 34,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ color: '#1e3a5f' }}>&gt;_</span>
          {typed}
          <span style={{ animation: 'blink 1s step-end infinite' }}>|</span>
        </div>

        <p
          className="fu"
          style={{
            animationDelay: '.28s',
            fontSize: 16,
            color: '#8899b0',
            lineHeight: 1.85,
            maxWidth: 540,
            marginBottom: 40,
          }}
        >
          I am a web developer from{' '}
          <strong style={{ color: '#ccd6f6' }}>Warri, Nigeria</strong> with a
          degree in Software Engineering. I enjoy building websites and apps
          that are fast, good looking and easy to use on any device. I am open
          to remote work and freelance opportunities anywhere in the world.
        </p>

        <div
          className="fu hero-btns"
          style={{
            animationDelay: '.36s',
            display: 'flex',
            gap: 14,
            flexWrap: 'wrap',
          }}
        >
          <a
            href="#projects"
            style={{
              background: 'linear-gradient(135deg,#38bdf8,#0ea5e9)',
              color: '#05091a',
              fontWeight: 700,
              fontSize: 14,
              padding: '13px 30px',
              borderRadius: 10,
              letterSpacing: '0.03em',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 10px 28px rgba(14,165,233,0.38)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            View Projects
          </a>

          <a
            href="#contact"
            style={{
              background: 'transparent',
              color: '#38bdf8',
              fontWeight: 700,
              fontSize: 14,
              padding: '13px 30px',
              borderRadius: 10,
              letterSpacing: '0.03em',
              border: '1.5px solid rgba(56,189,248,0.35)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(56,189,248,0.07)';
              e.target.style.borderColor = '#38bdf8';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.borderColor = 'rgba(56,189,248,0.35)';
            }}
          >
            Get In Touch
          </a>
        </div>

        <div
          className="fu"
          style={{
            animationDelay: '.44s',
            marginTop: 52,
            display: 'flex',
            alignItems: 'center',
            gap: 22,
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: 10,
              color: '#1e3a5f',
              letterSpacing: '0.18em',
            }}
          >
            FIND ME ON
          </span>
          {[
            { label: 'GitHub',   href: 'https://github.com/Febsin1590', icon: 'github' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/samson-febaide-078909385/', icon: 'linkedin' },
            { label: 'Upwork',   href: 'https://www.upwork.com/freelancers/~01ccb4f0ad5963bc94', icon: 'upwork' },
          ].map((s) => (
            <SocialLink key={s.label} {...s} />
          ))}
        </div>
      </div>

      {/* Decorative code snippet — visible on desktop only */}
      <div
        className="flt hide-lg"
        style={{
          position: 'absolute',
          right: '7%',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(10,18,36,0.88)',
          border: '1px solid #1a2f4e',
          borderRadius: 16,
          padding: '26px 28px',
          backdropFilter: 'blur(16px)',
          fontFamily: "'DM Mono',monospace",
          fontSize: 13,
          lineHeight: 2,
          boxShadow: '0 24px 64px rgba(0,0,0,0.55)',
          minWidth: 290,
        }}
      >

        <div>
          <span style={{ color: '#c084fc' }}>const</span>{' '}
          <span style={{ color: '#38bdf8' }}>dev</span>{' '}
          <span style={{ color: '#fff' }}>=</span> {'{'}
        </div>
        <div style={{ paddingLeft: 16 }}>
          <span style={{ color: '#94a3b8' }}>name</span>
          <span>: </span>
          <span style={{ color: '#86efac' }}>"Samson Febaide"</span>,
        </div>
        <div style={{ paddingLeft: 16 }}>
          <span style={{ color: '#94a3b8' }}>stack</span>
          <span>: </span>
          <span style={{ color: '#86efac' }}>"React / JS"</span>,
        </div>
        <div style={{ paddingLeft: 16 }}>
          <span style={{ color: '#94a3b8' }}>open</span>
          <span>: </span>
          <span style={{ color: '#f97316' }}>true</span>,
        </div>
        <div>{'}'}</div>
      </div>
    </section>
  );
}

/** About section — personal bio, education and stats */
function About() {
  return (
    <section id="about" className="sp" style={{ padding: '100px 8%' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Tag label="01 — About Me" />
        <div
          className="two-col"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 60,
            marginTop: 48,
            alignItems: 'start',
          }}
        >
          <div>
            <h2
              style={{
                fontSize: 'clamp(26px,3.8vw,42px)',
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: 24,
                letterSpacing: '-0.5px',
                background: 'linear-gradient(135deg,#f0f8ff 30%,#82c8f0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Passionate Developer. Lifelong Learner.
            </h2>
            <p
              style={{
                color: '#8899b0',
                lineHeight: 1.9,
                marginBottom: 16,
                fontSize: 15,
              }}
            >
              I am <strong style={{ color: '#ccd6f6' }}>Samson Febaide</strong>,
              a web developer based in Warri, Nigeria. I graduated with a{' '}
              <strong style={{ color: '#ccd6f6' }}>
                Second Class Upper in Software Engineering
              </strong>{' '}
              from Novena University, Delta State in 2024.
            </p>
            <p
              style={{
                color: '#8899b0',
                lineHeight: 1.9,
                marginBottom: 16,
                fontSize: 15,
              }}
            >
              After graduation I kept building projects, got deeper into React
              and started taking on freelance work. I care a lot about writing
              code that is clean, accessible and works well on every device and
              screen size.
            </p>
            <p
              style={{
                color: '#8899b0',
                lineHeight: 1.9,
                marginBottom: 32,
                fontSize: 15,
              }}
            >
              I will be joining{' '}
              <strong style={{ color: '#38bdf8' }}>
                Heriot-Watt University
              </strong>{' '}
              in September 2026 to study for my MSc in Software Engineering,
              where I plan to go deeper into cloud computing, system
              architecture and large scale software development.
            </p>
            <a
              href="#contact"
              style={{
                background: 'linear-gradient(135deg,#38bdf8,#0ea5e9)',
                color: '#05091a',
                fontWeight: 700,
                fontSize: 13,
                padding: '10px 24px',
                borderRadius: 9,
                display: 'inline-block',
              }}
            >
              Contact Me
            </a>
          </div>

          <div
            className="about-cards"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}
          >
            {[
              {
                icon: '🎓',
                label: 'DEGREE',
                val: 'B.Sc. Software Engineering',
                sub: 'Novena University · 2nd Class Upper',
              },
              {
                icon: '📍',
                label: 'LOCATION',
                val: 'Warri, Delta, Nigeria',
                sub: 'Open to remote work globally',
              },
              {
                icon: '🏛️',
                label: 'NEXT STEP',
                val: 'MSc Software Engineering',
                sub: 'Heriot-Watt University · Sep 2026',
              },
              {
                icon: '⚡',
                label: 'STATUS',
                val: 'Available for Hire',
                sub: 'Freelance and full time roles',
              },
            ].map((c, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(10,18,36,0.7)',
                  border: '1px solid #1a2f4e',
                  borderRadius: 14,
                  padding: '20px 18px',
                  transition: 'border-color 0.2s, transform 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#38bdf8';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#1a2f4e';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ fontSize: 26, marginBottom: 12 }}>{c.icon}</div>
                <div
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 10,
                    color: '#38bdf8',
                    letterSpacing: '0.12em',
                    marginBottom: 5,
                  }}
                >
                  {c.label}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#e2f0ff',
                    marginBottom: 4,
                    lineHeight: 1.4,
                  }}
                >
                  {c.val}
                </div>
                <div style={{ fontSize: 11, color: '#3a5a7a' }}>{c.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Skills section — renders technology cards from the SKILLS array */
function Skills() {
  return (
    <section
      id="skills"
      className="sp"
      style={{ padding: '100px 8%', background: 'rgba(14,165,233,0.018)' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Tag label="02 — Skills" />
        <h2
          style={{
            fontSize: 'clamp(26px,3.8vw,42px)',
            fontWeight: 800,
            marginTop: 14,
            marginBottom: 44,
            letterSpacing: '-0.5px',
            background: 'linear-gradient(135deg,#f0f8ff 30%,#82c8f0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Technologies I Work With
        </h2>

        <div
          className="skills-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6,1fr)',
            gap: 16,
          }}
        >
          {SKILLS.map((s, i) => (
            <SkillCard key={i} skill={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill: s }) {
  const [h, setH] = useState(false);
  return (
    <div
      style={{
        background: 'rgba(10,18,36,0.7)',
        border: `1px solid ${h ? '#38bdf8' : '#1a2f4e'}`,
        borderRadius: 14,
        padding: '22px 12px',
        textAlign: 'center',
        transform: h ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: h ? '0 12px 30px rgba(14,165,233,0.15)' : 'none',
        transition: 'all 0.2s',
        cursor: 'default',
      }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      <img
        src={s.src}
        alt={s.name}
        width={42}
        height={42}
        style={{
          marginBottom: 10,
          display: 'block',
          margin: '0 auto 10px',
          filter: s.invert ? 'invert(1)' : 'none',
        }}
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: h ? '#38bdf8' : '#8899b0',
          transition: 'color 0.2s',
        }}
      >
        {s.name}
      </div>
    </div>
  );
}

/** Projects section — renders project cards from the PROJECTS array */
function Projects() {
  return (
    <section id="projects" className="sp" style={{ padding: '100px 8%' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Tag label="03 — Projects" />
        <h2
          style={{
            fontSize: 'clamp(26px,3.8vw,42px)',
            fontWeight: 800,
            marginTop: 14,
            marginBottom: 16,
            letterSpacing: '-0.5px',
            background: 'linear-gradient(135deg,#f0f8ff 30%,#82c8f0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Things I Have Built
        </h2>
        <p
          style={{
            color: '#8899b0',
            fontSize: 15,
            marginBottom: 48,
            lineHeight: 1.7,
          }}
        >
          Here are some of the projects I have worked on. Each one helped me
          grow as a developer and learn something new.
        </p>

        <div
          className="proj-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))',
            gap: 22,
          }}
        >
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p }) {
  const [h, setH] = useState(false);
  return (
    <div
      style={{
        background: 'rgba(10,18,36,0.85)',
        border: `1px solid ${h ? '#38bdf8' : '#1a2f4e'}`,
        borderRadius: 16,
        padding: '28px 26px',
        position: 'relative',
        overflow: 'hidden',
        transform: h ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: h ? '0 16px 40px rgba(14,165,233,0.12)' : 'none',
        transition: 'all 0.2s',
      }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'linear-gradient(90deg,#38bdf8,transparent)',
          opacity: h ? 1 : 0,
          transition: 'opacity 0.2s',
        }}
      />

      <div style={{ fontSize: 34, marginBottom: 16 }}>{p.emoji}</div>
      <h3
        style={{
          fontSize: 17,
          fontWeight: 800,
          color: '#e2f0ff',
          marginBottom: 10,
        }}
      >
        {p.title}
      </h3>
      <p
        style={{
          fontSize: 14,
          color: '#8899b0',
          lineHeight: 1.75,
          marginBottom: 20,
        }}
      >
        {p.desc}
      </p>

      <div
        style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 22 }}
      >
        {p.tags.map((t) => (
          <span
            key={t}
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: 11,
              background: 'rgba(56,189,248,0.08)',
              border: '1px solid rgba(56,189,248,0.18)',
              color: '#38bdf8',
              padding: '3px 11px',
              borderRadius: 20,
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 16 }}>
        {p.live && (
          <a
            href={p.live}
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: 12,
              color: '#38bdf8',
            }}
          >
            Live Demo ↗
          </a>
        )}
        {p.github && (
          <a
            href={p.github}
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: 12,
              color: '#4a6fa5',
            }}
          >
            GitHub ↗
          </a>
        )}
        {!p.live && !p.github && (
          <span
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: 11,
              color: '#2a4a6e',
            }}
          >
            Links coming soon
          </span>
        )}
      </div>
    </div>
  );
}

/** Contact section — form submissions handled via Formspree */
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'

  const send = async () => {
    if (!form.name || !form.email || !form.message) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/xpqjnedo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 4000);
  };

  const btnText = {
    idle: 'Send Message',
    sending: 'Sending...',
    success: '✓ Message Sent!',
    error: 'Something went wrong — try again',
  }[status];

  const btnColor = {
    idle: 'linear-gradient(135deg,#38bdf8,#0ea5e9)',
    sending: 'linear-gradient(135deg,#64748b,#475569)',
    success: 'linear-gradient(135deg,#22c55e,#16a34a)',
    error: 'linear-gradient(135deg,#ef4444,#dc2626)',
  }[status];

  return (
    <section
      id="contact"
      className="sp"
      style={{ padding: '100px 8%', background: 'rgba(14,165,233,0.018)' }}
    >
      <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
        <Tag label="04 — Contact" center />
        <h2
          style={{
            fontSize: 'clamp(26px,3.8vw,42px)',
            fontWeight: 800,
            marginTop: 14,
            marginBottom: 16,
            letterSpacing: '-0.5px',
            background: 'linear-gradient(135deg,#f0f8ff 30%,#82c8f0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Let's Work Together
        </h2>
        <p
          style={{
            color: '#8899b0',
            lineHeight: 1.85,
            marginBottom: 48,
            fontSize: 15,
          }}
        >
          I am open to freelance projects, remote jobs and any kind of
          collaboration. Fill in the form below and I will get back to you as
          soon as I can.
        </p>

        <div
          style={{
            background: 'rgba(10,18,36,0.85)',
            border: '1px solid #1a2f4e',
            borderRadius: 18,
            padding: '36px',
            textAlign: 'left',
          }}
        >
          <div
            className="form-row"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 14,
              marginBottom: 14,
            }}
          >
            <div>
              <Lbl text="YOUR NAME" />
              <Inp
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Lbl text="EMAIL ADDRESS" />
              <Inp
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                placeholder="john@email.com"
              />
            </div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <Lbl text="MESSAGE" />
            <textarea
              value={form.message}
              onChange={(e) =>
                setForm((f) => ({ ...f, message: e.target.value }))
              }
              rows={5}
              placeholder="Tell me about your project or opportunity..."
              style={{
                width: '100%',
                background: '#070d1a',
                border: '1px solid #1e3a5f',
                borderRadius: 9,
                color: '#ccd6f6',
                padding: '11px 14px',
                fontSize: 14,
                resize: 'vertical',
              }}
            />
          </div>
          <button
            onClick={send}
            disabled={status === 'sending'}
            style={{
              width: '100%',
              background: btnColor,
              color: '#05091a',
              fontWeight: 700,
              fontSize: 15,
              padding: 14,
              borderRadius: 10,
              border: 'none',
              cursor: status === 'sending' ? 'not-allowed' : 'pointer',
              transition: 'opacity 0.2s, transform 0.2s',
            }}
            onMouseEnter={(e) => {
              if (status === 'idle') {
                e.target.style.opacity = '.88';
                e.target.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = '1';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            {btnText}
          </button>
        </div>

        <div
          className="contact-row"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 40,
            marginTop: 44,
            flexWrap: 'wrap',
          }}
        >
          {[
            {
              icon: '📧',
              label: 'EMAIL',
              val: 'samsonfebaide@gmail.com',
              href: 'mailto:samsonfebaide@gmail.com',
            },
            {
              icon: '📱',
              label: 'PHONE',
              val: '+234 808 235 5722',
              href: 'tel:+2348082355722',
            },
            { icon: '📍', label: 'LOCATION', val: 'Warri, Nigeria', href: '#' },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href}
              style={{ textAlign: 'center', transition: 'transform 0.2s' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = 'translateY(-3px)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = 'translateY(0)')
              }
            >
              <div style={{ fontSize: 24, marginBottom: 6 }}>{c.icon}</div>
              <div
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 10,
                  color: '#38bdf8',
                  letterSpacing: '0.12em',
                  marginBottom: 4,
                }}
              >
                {c.label}
              </div>
              <div style={{ fontSize: 13, color: '#8899b0' }}>{c.val}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Footer — brand logo, copyright and social links */
function Footer() {
  return (
    <footer style={{ padding: '28px 8%', borderTop: '1px solid #0f1e33' }}>
      <div
        className="footer-inner"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 14,
        }}
      >
        <img
          src="/febson-logo.png"
          alt="Febson.Dev"
          style={{ height: 220, width: 'auto', filter: 'brightness(1.1) contrast(1.08)' }}
        />
        <p
          style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: 11,
            color: '#7a9cbf',
          }}
        >
          © 2026 Febson.Dev · Built by Samson Febaide
        </p>
        <div style={{ display: 'flex', gap: 18 }}>
          {[
            { label: 'GitHub',   href: 'https://github.com/Febsin1590', icon: 'github' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/samson-febaide-078909385/', icon: 'linkedin' },
            { label: 'Upwork',   href: 'https://www.upwork.com/freelancers/~01ccb4f0ad5963bc94', icon: 'upwork' },
          ].map((s) => (
            <SocialLink key={s.label} small {...s} />
          ))}
        </div>
      </div>
    </footer>
  );
}

/** Shared utility components */

/** SocialLink — icon + label anchor used in the Hero and Footer */
function SocialLink({ label, href, icon, small }) {
  const [hov, setHov] = useState(false);
  const dim = small ? 15 : 20;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: small ? 6 : 9,
        fontFamily: "'DM Mono',monospace",
        fontSize: small ? 12 : 14,
        fontWeight: 700,
        letterSpacing: '0.04em',
        color: hov ? '#38bdf8' : (small ? '#a8c0d6' : '#a8c0d6'),
        transition: 'color 0.2s',
        textDecoration: 'none',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <span style={{ width: dim, height: dim, display: 'inline-flex', flexShrink: 0 }}>
        {SOCIAL_ICONS[icon]}
      </span>
      {label}
    </a>
  );
}

function Tag({ label, center }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        justifyContent: center ? 'center' : 'flex-start',
      }}
    >
      <span
        style={{
          fontFamily: "'DM Mono',monospace",
          fontSize: 11,
          color: '#38bdf8',
          letterSpacing: '0.18em',
        }}
      >
        {label}
      </span>
      <span
        style={{
          flex: 1,
          maxWidth: 72,
          height: 1,
          background: 'linear-gradient(90deg,#38bdf8,transparent)',
        }}
      />
    </div>
  );
}
function Lbl({ text }) {
  return (
    <div
      style={{
        fontFamily: "'DM Mono',monospace",
        fontSize: 10,
        color: '#38bdf8',
        letterSpacing: '0.12em',
        marginBottom: 7,
      }}
    >
      {text}
    </div>
  );
}
function Inp({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: '100%',
        background: '#070d1a',
        border: '1px solid #1e3a5f',
        borderRadius: 9,
        color: '#ccd6f6',
        padding: '10px 14px',
        fontSize: 14,
      }}
    />
  );
}

/** App — root component, composes all sections and manages active nav state */
export default function App() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const sections = NAV.map((n) =>
      document.getElementById(n.toLowerCase()),
    ).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { threshold: 0.35 },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <G />
      <Navbar active={active} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
