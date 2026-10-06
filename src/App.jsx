import { useEffect, useState } from "react";
import Lenis from "lenis";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Reveal from "./components/Reveal.jsx";
import { Icon } from "./components/Icons.jsx";
import {
  profile,
  about,
  stats,
  experience,
  skills,
  projects,
  certifications,
  education,
  languages,
  stackYaml,
} from "./data.js";

function Section({ id, title, intro, children }) {
  return (
    <section id={id} className={`section section-${id}`} aria-labelledby={`${id}-title`}>
      <div className="section-head">
        <h2 id={`${id}-title`}>{title}</h2>
        {intro && <p className="section-intro">{intro}</p>}
      </div>
      {children}
    </section>
  );
}

function About() {
  return (
    <Section id="about" title="About">
      <div className="about-grid">
        <Reveal className="about-copy">
          {about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>
        <Reveal className="about-stats glass" as="dl">
          {stats.map((s) => (
            <div key={s.label} className="stat">
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
          <div className="stat stat-wide">
            <dt>Availability</dt>
            <dd className="stat-text">{profile.availability}</dd>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" title="Experience" intro="Four roles, all Java and Spring Boot. The last four years have been on production banking systems.">
      <ol className="timeline">
        {experience.map((job) => (
          <Reveal as="li" key={job.company} className="job">
            <div className="job-rail" aria-hidden="true">
              <span className="job-dot" />
            </div>
            <article className="job-card glass">
              <header className="job-head">
                <div>
                  <h3>{job.company}</h3>
                  <p className="job-role">{job.role}</p>
                </div>
                <div className="job-meta">
                  <p className="job-period">{job.period}</p>
                  <p>{job.place}</p>
                </div>
              </header>
              {job.client && <p className="job-client">Client: {job.client}</p>}
              <p className="job-summary">{job.summary}</p>
              <ul className="job-points">
                {job.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              {job.note && (
                <p className="job-note">
                  <Icon name="award" size={16} /> {job.note}
                </p>
              )}
              <ul className="chips" aria-label="Technologies">
                {job.stack.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" title="Technical skills">
      <Reveal className="skills-grid">
        {skills.map((g) => (
          <div key={g.group} className="skill-group">
            <h3>{g.group}</h3>
            <ul>
              {g.items.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projects" title="Selected projects" intro="Banking products I built features for, plus open-source work on GitHub.">
      <div className="projects-grid">
        {projects.map((p) => (
          <Reveal as="article" key={p.name} className={`project glass ${p.image ? "has-image" : ""}`}>
            {p.image && (
              <div className="project-shot">
                <img src={p.image} alt={`${p.name} interface`} loading="lazy" width="1200" height="750" />
              </div>
            )}
            <div className="project-body">
              <p className="project-org">{p.org}</p>
              <h3>
                {p.link ? (
                  <a href={p.link} target="_blank" rel="noreferrer">
                    {p.name} <Icon name="external" size={16} />
                  </a>
                ) : (
                  p.name
                )}
              </h3>
              <p>{p.text}</p>
              <ul className="chips">
                {p.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Certifications() {
  return (
    <Section id="certifications" title="Certifications">
      <div className="cert-list">
        {certifications.map((c, i) => (
          <Reveal key={c.name} className={`cert glass ${i === 0 ? "cert-main" : ""}`}>
            <p className="cert-date">{c.date}</p>
            <h3>{c.name}</h3>
            <p className="cert-issuer">{c.issuer}</p>
            <p className="cert-detail">{c.detail}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Education() {
  return (
    <Section id="education" title="Education">
      <div className="edu-list">
        {education.map((e) => (
          <Reveal key={e.degree} className="edu">
            <p className="edu-period">{e.period}</p>
            <div>
              <h3>{e.degree}</h3>
              <p>{e.school}</p>
              <p className="edu-detail">
                {e.detail} · {e.place}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Stack() {
  const [copied, setCopied] = useState(false);
  const text = stackYaml.map(([k, v]) => `${k}:\n${v.map((x) => `  - ${x}`).join("\n")}`).join("\n");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <Section id="stack" title="Technology stack" intro="What I reach for day to day, as a config file.">
      <div className="stack-layout">
        <Reveal className="terminal">
          <div className="terminal-bar">
            <span className="dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="terminal-title">haithem@core: ~/stack.yml</span>
            <button className="terminal-copy" onClick={copy}>
              <Icon name="copy" size={15} /> {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <div className="terminal-body" role="region" aria-label="stack.yml">
            {stackYaml.map(([k, v]) => (
              <pre key={k} className="yml-block">
                <span className="yml-key">{k}</span>:{"\n"}
                {v.map((x, i) => (
                  <span key={x}>
                    {"  "}- <span className="yml-val">{x}</span>
                    {i < v.length - 1 ? "\n" : ""}
                  </span>
                ))}
              </pre>
            ))}
          </div>
        </Reveal>

        <Reveal className="languages glass" id="languages">
          <h3>Languages</h3>
          <ul>
            {languages.map((l) => (
              <li key={l.name}>
                <div className="lang-row">
                  <span>{l.name}</span>
                  <span className="lang-level">{l.level}</span>
                </div>
                <span className="lang-bar" aria-hidden="true">
                  <span style={{ transform: `scaleX(${l.value})` }} />
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <Section id="contact" title="Contact">
      <Reveal className="contact glass">
        <div className="contact-copy">
          <p className="contact-lead">Hiring for a Java backend, Spring Boot or fintech role? I'd like to hear about it.</p>
          <p className="contact-sub">{profile.availability}. Based in {profile.location}.</p>
          <div className="contact-email">
            <a href={`mailto:${profile.email}`} className="email-link">
              <Icon name="mail" /> {profile.email}
            </a>
            <button className="btn btn-small" onClick={copy}>
              <Icon name="copy" size={15} /> {copied ? "Copied" : "Copy email"}
            </button>
          </div>
        </div>
        <div className="contact-actions">
          <a className="btn btn-primary" href={profile.cv.en} download>
            <Icon name="download" /> CV (English)
          </a>
          <a className="btn" href={profile.cv.fr} download>
            <Icon name="download" /> CV (Français)
          </a>
          <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">
            <Icon name="linkedin" /> LinkedIn
          </a>
          <a className="btn" href={profile.github} target="_blank" rel="noreferrer">
            <Icon name="github" /> GitHub
          </a>
        </div>
      </Reveal>
    </Section>
  );
}

export default function App() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.05, anchors: { offset: -72 } });
    let id;
    const raf = (t) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <a className="skip" href="#about">Skip to content</a>
      <div className="backdrop" aria-hidden="true" />
      <Nav />
      <Hero />
      <main>
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Certifications />
        <Education />
        <Stack />
        <Contact />
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Haithem El-Metoui</p>
        <p>
          Built with React, Three.js and Vite ·{" "}
          <a href="https://github.com/haithemelmetoui/haithem-portfolio-v2" target="_blank" rel="noreferrer">
            Source
          </a>
        </p>
      </footer>
    </>
  );
}
