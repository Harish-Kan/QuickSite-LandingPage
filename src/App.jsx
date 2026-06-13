import { useEffect, useRef, useState } from "react";

const approach = [
  {
    number: "01",
    title: "Tell me what you need",
    description:
      "We talk about your business, the pages you need and the look you want.",
    label: "Simple planning",
  },
  {
    number: "02",
    title: "I build your website",
    description:
      "Your site is built in WordPress or custom coded, depending on what fits best.",
    label: "WordPress · Custom code",
  },
  {
    number: "03",
    title: "Review and launch",
    description:
      "You review the website, I make the final changes and help get it online.",
    label: "Revisions · Launch",
  },
];

const principles = [
  ["Looks good everywhere", "Every website works across phones, tablets and desktops."],
  [
    "Easy to use",
    "Clear pages and navigation help visitors find what they need.",
  ],
  [
    "Built for your business",
    "You get the website you need without unnecessary extras.",
  ],
];

const services = [
  [
    "WordPress websites",
    "Business sites · Blogs · Landing pages · Easy editing",
  ],
  ["Custom websites", "HTML · CSS · JavaScript · React"],
  ["Redesigns & updates", "New look · Mobile fixes · Content updates · Site cleanup"],
];

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px" },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

function MagneticLink({ className = "", children, ...props }) {
  const ref = useRef(null);

  const handleMove = (event) => {
    const bounds = ref.current.getBoundingClientRect();
    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;
    ref.current.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  };

  return (
    <a
      ref={ref}
      className={className}
      onPointerMove={handleMove}
      onPointerLeave={() => {
        ref.current.style.transform = "";
      }}
      {...props}
    >
      {children}
    </a>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <a className="brand" href="#top" aria-label="QuickSite, back to top">
        <span className="brand-mark">Q</span>
        <span>QuickSite</span>
      </a>

      <nav className="desktop-nav" aria-label="Main navigation">
        <a href="#work">Process</a>
        <a href="#studio">About</a>
        <a href="#services">Services</a>
      </nav>

      <MagneticLink className="header-cta" href="#contact">
        <span>Email me</span>
        <span className="arrow">↗</span>
      </MagneticLink>
    </header>
  );
}

function Hero() {
  return (
    <>
      <section className="hero">
        <div className="hero-meta">
          <p>
            <span className="status-dot" />
            WordPress & custom websites
          </p>
          <p>Mississauga · Toronto</p>
        </div>

        <h1 className="hero-title" aria-label="Websites with pulse">
          <span className="title-line reveal-text">Websites</span>
          <span className="title-line title-indent reveal-text">
            with <em>pulse.</em>
          </span>
        </h1>

        <div className="hero-bottom">
          <p className="hero-copy reveal">
            I build clean, professional websites for businesses using WordPress
            or custom code. Based in Mississauga and Toronto.
          </p>
          <MagneticLink
            className="round-link reveal"
            href="#work"
            aria-label="See how the website process works"
          >
            <span>How it works</span>
            <span className="round-arrow">↓</span>
          </MagneticLink>
        </div>

        <div className="orbit-word" aria-hidden="true">
          <svg viewBox="0 0 160 160">
            <defs>
              <path
                id="orbit"
                d="M80,80 m-57,0 a57,57 0 1,1 114,0 a57,57 0 1,1 -114,0"
              />
            </defs>
            <text>
              <textPath href="#orbit">
                WORDPRESS • CUSTOM WEBSITES • RESPONSIVE •{" "}
              </textPath>
            </text>
          </svg>
          <span>✦</span>
        </div>
      </section>

      <section className="ticker" aria-label="Capabilities">
        <div className="ticker-track">
          {Array.from({ length: 2 }).map((_, repeat) => (
            <span className="ticker-set" key={repeat}>
              <span>WordPress</span><i>✦</i><span>Custom websites</span><i>✦</i>
              <span>Redesigns</span><i>✦</i><span>Mobile friendly</span><i>✦</i>
            </span>
          ))}
        </div>
      </section>
    </>
  );
}

function Work() {
  return (
    <section className="work section-shell" id="work">
      <div className="section-heading reveal">
        <p className="eyebrow">01 / Simple process</p>
        <h2>
          From idea
          <br />
          to live website.
        </h2>
        <p>A straightforward process without the agency runaround.</p>
      </div>

      <div className="approach-grid">
        {approach.map((item) => (
          <article className="approach-card reveal" key={item.number}>
            <div className="approach-top">
              <span>{item.number}</span>
              <span>↗</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <span className="approach-label">{item.label}</span>
          </article>
        ))}
      </div>

      <div className="real-work reveal">
        <p>Looking for actual project work?</p>
        <a
          href="https://harishkandavell.xyz/"
          target="_blank"
          rel="noreferrer"
        >
          View Harish’s portfolio <span>↗</span>
        </a>
      </div>
    </section>
  );
}

function Studio() {
  return (
    <section className="studio" id="studio">
      <div className="studio-grid section-shell">
        <p className="eyebrow reveal">02 / About QuickSite</p>
        <div className="studio-statement">
          <p className="reveal">
            Straightforward websites for businesses that need to look{" "}
            <em>professional</em> online.
          </p>
          <p className="studio-note reveal">
            I work directly with you from the first conversation to launch.
            No big team, confusing process or services you do not need.
          </p>
        </div>
      </div>

      <div className="principles section-shell">
        {principles.map(([title, text], index) => (
          <article className="principle reveal" key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="services section-shell" id="services">
      <div className="services-intro reveal">
        <p className="eyebrow">03 / What I build</p>
        <p>Website services for small businesses and individuals.</p>
      </div>

      <div className="service-list">
        {services.map(([title, details], index) => (
          <article className="service-row reveal" key={title}>
            <span className="service-number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{title}</h3>
            <p>{details}</p>
            <span className="service-icon">↗</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="section-shell">
        <p className="eyebrow reveal">Have something in mind?</p>
        <a
          className="contact-link reveal"
          href="mailto:harishkan999@gmail.com"
        >
          <span>Let’s make it</span>
          <span>real.</span>
        </a>
        <div className="contact-meta reveal">
          <a href="mailto:harishkan999@gmail.com">
            harishkan999@gmail.com
          </a>
          <div>
            <a
              href="https://harishkandavell.xyz/"
              target="_blank"
              rel="noreferrer"
            >
              Founder portfolio
            </a>
            <a href="#instagram">Instagram</a>
            <a href="#linkedin">LinkedIn</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <a className="brand footer-brand" href="#top">
        <span className="brand-mark">Q</span>
        <span>QuickSite</span>
      </a>
      <p>WordPress & custom websites · Mississauga / Toronto</p>
      <p>
        © 2026 QuickSite ·{" "}
        <a
          href="https://harishkandavell.xyz/"
          target="_blank"
          rel="noreferrer"
        >
          Founder portfolio ↗
        </a>
      </p>
    </footer>
  );
}

export default function App() {
  useReveal();

  return (
    <>
      <div className="noise" aria-hidden="true" />
      <Header />
      <main id="top">
        <Hero />
        <Work />
        <Studio />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
