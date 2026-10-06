import { useEffect, useState } from "react";
import { sections, profile } from "../data.js";
import { Icon } from "./Icons.jsx";

export default function Nav() {
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <nav className={`topbar ${scrolled ? "is-scrolled" : ""}`} aria-label="Main">
      <a href="#top" className="brand" aria-label="Back to top">
        <span className="brand-mark">HE</span>
        <span className="brand-name">Haithem El&#8209;Metoui</span>
      </a>

      <ul className={`nav-links ${open ? "is-open" : ""}`}>
        {sections.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`} className={active === s.id ? "is-active" : ""} aria-current={active === s.id ? "true" : undefined} onClick={() => setOpen(false)}>
              {s.label}
            </a>
          </li>
        ))}
        <li className="nav-cv">
          <a href={profile.cv.en} download className="btn btn-small btn-primary" onClick={() => setOpen(false)}>
            <Icon name="download" size={16} /> CV
          </a>
        </li>
      </ul>

      <button className="nav-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <Icon name={open ? "close" : "menu"} size={22} />
      </button>
    </nav>
  );
}
