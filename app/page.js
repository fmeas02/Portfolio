"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const WEB3FORMS_ACCESS_KEY = "COLLE_TA_CLE_ICI";

const projects = [
  { name: "Brasier", sector: "Restaurant gastronomique", color: "#a8462c", bg: "#14100d" },
  { name: "Mèche", sector: "Salon de coiffure", color: "#6b3450", bg: "#efe9ea" },
];

export default function Home() {
  const navRef = useRef(null);
  const [status, setStatus] = useState("idle");

  async function handleContact(e) {
    e.preventDefault();
    setStatus("sending");
    const form = e.target;
    const data = new FormData(form);
    data.append("access_key", WEB3FORMS_ACCESS_KEY);
    data.append("subject", "Nouvelle demande de contact — Web Élite");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) lenis.scrollTo(target);
      });
    });

    lenis.on("scroll", ({ scroll }) => {
      if (!navRef.current) return;
      if (scroll > 40) navRef.current.classList.add("nav-blur");
      else navRef.current.classList.remove("nav-blur");
    });

    const ctx = gsap.context(() => {
      document.querySelectorAll("[data-reveal]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { yPercent: 110 },
          { yPercent: 0, duration: 1, ease: "expo.out", delay: i * 0.07, scrollTrigger: { trigger: el, start: "top 90%" } }
        );
      });
      document.querySelectorAll(".reveal-up").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: (i % 3) * 0.06, scrollTrigger: { trigger: el, start: "top 88%" } }
        );
      });
      document.querySelectorAll(".magnetic").forEach((btn) => {
        const move = (e) => {
          const r = btn.getBoundingClientRect();
          const x = (e.clientX - r.left - r.width / 2) * 0.3;
          const y = (e.clientY - r.top - r.height / 2) * 0.3;
          gsap.to(btn, { x, y, duration: 0.3, ease: "power2.out" });
        };
        const leave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.4)" });
        btn.addEventListener("mousemove", move);
        btn.addEventListener("mouseleave", leave);
      });
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        document.querySelectorAll("[data-reveal],.reveal-up").forEach((el) => gsap.set(el, { opacity: 1, yPercent: 0, y: 0 }));
      }
    });

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      <svg className="grain" width="100%" height="100%">
        <filter id="noise-webelite">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-webelite)" />
      </svg>

      {/* NAV */}
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b" style={{ borderColor: "transparent" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
          <a href="#" className="disp text-lg" style={{ letterSpacing: "-0.02em" }}>WEB ÉLITE</a>
          <div className="hidden md:flex items-center gap-9 text-sm" style={{ color: "var(--text-dim)" }}>
            <a href="#services" className="hover:opacity-60 transition-opacity">Services</a>
            <a href="#projets" className="hover:opacity-60 transition-opacity">Projets</a>
            <a href="#process" className="hover:opacity-60 transition-opacity">Méthode</a>
            <a href="#contact" className="hover:opacity-60 transition-opacity">Contact</a>
          </div>
          <a href="#contact" className="magnetic btn-primary text-sm px-5 py-2.5">Demander un devis</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10 w-full">
          <div className="line-mask"><p className="label mb-6" data-reveal="">Studio web indépendant</p></div>
          <h1 className="h1 text-[13vw] md:text-[7.2vw]">
            <div className="line-mask"><div data-reveal="">Des sites qui</div></div>
            <div className="line-mask"><div data-reveal="" style={{ color: "var(--accent)" }}>donnent envie</div></div>
            <div className="line-mask"><div data-reveal="">d&apos;appeler.</div></div>
          </h1>
          <div className="line-mask mt-8 max-w-lg">
            <p data-reveal="" className="text-base" style={{ color: "var(--text-dim)" }}>
              Web Élite conçoit des sites vitrine sur-mesure pour commerçants et indépendants — design soigné, animations fluides, en ligne en quelques jours.
            </p>
          </div>
          <div className="line-mask mt-9">
            <div data-reveal="" className="flex gap-4">
              <a href="#projets" className="magnetic btn-primary px-7 py-3.5 text-sm">Voir les projets</a>
              <a href="#contact" className="magnetic btn-outline px-7 py-3.5 text-sm">Discuter d&apos;un projet</a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 md:py-32" style={{ background: "var(--bg-2)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="label mb-5">Services</p>
          <h2 className="h2 text-4xl md:text-5xl mb-14 max-w-2xl">Ce qu&apos;on fait, sans détour.</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-8 reveal-up">
              <p className="disp text-xl mb-3 uppercase">Site vitrine</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-dim)" }}>Design sur-mesure, animations soignées, pensé pour convertir un visiteur en client.</p>
            </div>
            <div className="card p-8 reveal-up">
              <p className="disp text-xl mb-3 uppercase">Mise en ligne rapide</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-dim)" }}>Hébergement moderne, site livré et en ligne en quelques jours, pas en mois.</p>
            </div>
            <div className="card p-8 reveal-up">
              <p className="disp text-xl mb-3 uppercase">Formulaires connectés</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-dim)" }}>Contact, réservation ou prise de rendez-vous, reliés directement à votre email.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROJETS */}
      <section id="projets" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="label mb-5">Projets récents</p>
          <h2 className="h2 text-4xl md:text-5xl mb-14 max-w-2xl">Deux secteurs, deux identités.</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
            {projects.map((p) => (
              <div key={p.name} className="card overflow-hidden reveal-up">
                <div className="h-48 flex items-center justify-center" style={{ background: p.bg }}>
                  <p className="disp text-3xl uppercase" style={{ color: p.color }}>{p.name}</p>
                </div>
                <div className="p-6">
                  <p className="label mb-2">{p.sector}</p>
                  <p className="text-sm" style={{ color: "var(--text-dim)" }}>Design, animations et prise de contact intégrée.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 md:py-32" style={{ background: "var(--bg-2)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="label mb-5">Méthode</p>
          <h2 className="h2 text-4xl md:text-5xl mb-14 max-w-2xl">Trois étapes, sans blabla.</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="reveal-up">
              <p className="disp text-5xl mb-4" style={{ color: "var(--accent)" }}>01</p>
              <p className="disp text-lg uppercase mb-2">Brief</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-dim)" }}>On discute de votre activité, votre ton, vos envies. 15 minutes suffisent.</p>
            </div>
            <div className="reveal-up">
              <p className="disp text-5xl mb-4" style={{ color: "var(--accent)" }}>02</p>
              <p className="disp text-lg uppercase mb-2">Création</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-dim)" }}>Design et développement sur-mesure, adapté à votre secteur.</p>
            </div>
            <div className="reveal-up">
              <p className="disp text-5xl mb-4" style={{ color: "var(--accent)" }}>03</p>
              <p className="disp text-lg uppercase mb-2">Mise en ligne</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-dim)" }}>Votre site est en ligne, avec formulaire de contact fonctionnel.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 md:py-36 text-center">
        <div className="max-w-md mx-auto px-6 reveal-up">
          <p className="label mb-6">Contact</p>
          <h2 className="h2 text-4xl md:text-6xl mb-10">Un projet en tête ?</h2>
          {status === "success" ? (
            <p className="mb-10" style={{ color: "var(--accent)" }}>Merci, votre message a bien été envoyé ! Réponse sous 24h.</p>
          ) : (
            <form onSubmit={handleContact} className="flex flex-col gap-3 mb-10">
              <input required type="text" name="name" placeholder="Votre nom" className="px-5 py-3 text-sm" style={{ background: "var(--surface)", border: "1px solid var(--line)" }} />
              <input required type="email" name="email" placeholder="Votre email" className="px-5 py-3 text-sm" style={{ background: "var(--surface)", border: "1px solid var(--line)" }} />
              <input type="text" name="activity" placeholder="Votre activité (restaurant, salon...)" className="px-5 py-3 text-sm" style={{ background: "var(--surface)", border: "1px solid var(--line)" }} />
              <textarea name="message" placeholder="Parlez-moi de votre projet" rows="4" className="px-5 py-3 text-sm" style={{ background: "var(--surface)", border: "1px solid var(--line)" }} />
              <button disabled={status === "sending"} className="magnetic btn-primary px-7 py-3 text-sm whitespace-nowrap">
                {status === "sending" ? "Envoi en cours..." : "Envoyer"}
              </button>
              {status === "error" && (
                <p className="text-sm" style={{ color: "var(--accent)" }}>Une erreur est survenue, réessaie dans un instant.</p>
              )}
            </form>
          )}
        </div>
      </section>

      <footer className="border-t py-10" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm" style={{ color: "var(--text-muted)" }}>
          <p className="disp uppercase" style={{ color: "var(--text)" }}>Web Élite</p>
          <p>Studio web indépendant</p>
          <p>© 2026 Web Élite</p>
        </div>
      </footer>
    </div>
  );
}
