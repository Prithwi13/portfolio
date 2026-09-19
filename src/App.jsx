import { useEffect, useRef, useState } from "react";
import AmbientBackground from "./components/AmbientBackground";
import LossSurface from "./components/LossSurface";
import LiquidLogo from "./components/LiquidLogo";
import GlassLoupe from "./components/GlassLoupe";
import { projects, timeline, timelineMore, skills } from "./data";

function useReveal() {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const reduceMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      setRevealed(true);
      return undefined;
    }
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, revealed];
}

function Reveal({ as: Tag = "div", className = "", children, style }) {
  const [ref, revealed] = useReveal();
  return (
    <Tag ref={ref} className={`reveal-init ${revealed ? "revealed" : ""} ${className}`} style={style}>
      {children}
    </Tag>
  );
}

function useClock() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(
        [d.getHours(), d.getMinutes(), d.getSeconds()]
          .map((n) => String(n).padStart(2, "0"))
          .join(":")
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function Nav() {
  const time = useClock();
  return (
    <header className="nav">
      <div className="nav-inner wrap">
        <a href="#top" className="nav-mark">
          <LiquidLogo size={28} />
          PRITHWIRAJ&nbsp;CHATTERJEE
        </a>
        <ul className="nav-links">
          <li><a href="#work">Work</a></li>
          <li><a href="#timeline">Experience</a></li>
          <li><a href="#tooling">Tooling</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div className="nav-status">
          <span className="pulse" /> <span>{time}</span> Â· OPEN TO ROLES
        </div>
      </div>
    </header>
  );
}

function ProjectCard({ p, i }) {
  const ref = useRef(null);
  function onMouseMove(e) {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `rotateX(${py * -6}deg) rotateY(${px * 6}deg)`;
  }
  function onMouseLeave() {
    if (ref.current) ref.current.style.transform = "rotateX(0) rotateY(0)";
  }
  return (
    <article
      ref={ref}
      className="card"
      tabIndex={0}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ transformStyle: "preserve-3d", perspective: "800px" }}
    >
      <span className="idx">{String(i + 1).padStart(2, "0")}</span>
      <h3>{p.title}</h3>
      <div className="tag">{p.tag}</div>
      <p className="desc">{p.desc}</p>
      <div className="metrics">
        {p.metrics.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
      <a className="repo" href={p.repo} target="_blank" rel="noopener noreferrer">
        VIEW REPO
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 17L17 7M17 7H8M17 7V16" />
        </svg>
      </a>
    </article>
  );
}

function GearDiagram() {
  const teeth = Array.from({ length: 10 }, (_, i) => (i / 10) * 360);
  return (
    <svg viewBox="0 0 380 260" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="edgeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5EEAD4" />
          <stop offset="1" stopColor="#FB7185" />
        </linearGradient>
      </defs>
      <g stroke="#333E4D" fill="none" strokeWidth="1.2">
        <circle cx="72" cy="128" r="34" />
        <circle cx="72" cy="128" r="10" />
        <g>
          {teeth.map((ang) => (
            <rect key={ang} x="69" y="88" width="6" height="10" transform={`rotate(${ang} 72 128)`} />
          ))}
        </g>
      </g>
      <line x1="118" y1="128" x2="182" y2="128" stroke="#5B6472" strokeWidth="1" strokeDasharray="3 4" />
      <path d="M176 122 L184 128 L176 134" fill="none" stroke="#5B6472" strokeWidth="1" />
      <g stroke="#333E4D" strokeWidth="1" fill="none">
        <line x1="210" y1="190" x2="230" y2="150" />
        <line x1="230" y1="150" x2="260" y2="168" />
        <line x1="260" y1="168" x2="292" y2="96" />
        <line x1="230" y1="150" x2="292" y2="140" />
        <line x1="292" y1="140" x2="292" y2="96" />
      </g>
      <g fill="#0B0E13" stroke="#EDEAE2" strokeWidth="1.3">
        <circle cx="210" cy="190" r="4" />
        <circle cx="230" cy="150" r="4" />
        <circle cx="260" cy="168" r="4" />
        <circle cx="292" cy="140" r="4" />
        <circle cx="292" cy="96" r="5" stroke="#5EEAD4" />
      </g>
      <path d="M204 200 C 236 210, 264 150, 300 90" fill="none" stroke="url(#edgeGrad)" strokeWidth="1.6" />
      <text x="72" y="176" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="9" fill="#5B6472">GEAR</text>
      <text x="252" y="220" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="9" fill="#5B6472">GRADIENT DESCENT</text>
    </svg>
  );
}

export default function App() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const heroTextRef = useRef(null);

  useEffect(() => {
    setReduceMotion(
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  return (
    <>
      <AmbientBackground />
      <div className="bg-terrain" aria-hidden="true">
        <LossSurface reduceMotion={reduceMotion} />
      </div>
      <div className="bg-scrim" aria-hidden="true" />
      <svg className="grain" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      <Nav />

      <main id="top">
        <section className="hero wrap">
          <div className="hero-copy" ref={heroTextRef}>
            <p className="eyebrow">MECHANICAL ENGINEER â ML / AI ENGINEER</p>
            <h1 style={{ marginTop: 22 }}>
              From tolerance stacks<br />
              to <em>loss landscapes.</em>
            </h1>
            <p className="sub">
              Prithwiraj Chatterjee â mechanical engineer turned data scientist &amp; ML/AI
              engineer. I spent years reading dimension lines before I read gradients; now I
              build models the way I used to build parts â to spec, and built to be trusted.
            </p>
            <div className="cta-row">
              <a className="btn primary" href="#work">View selected work â</a>
              <a className="btn" href="#contact">Get in touch</a>
              <a className="btn" href="https://github.com/Prithwi13" target="_blank" rel="noopener noreferrer">GitHub â</a>
            </div>
            <div className="stat-row">
              <div className="stat"><div className="num">9</div><div className="lbl">Shipped models</div></div>
              <div className="stat"><div className="num">ICBAI '25</div><div className="lbl">Presented</div></div>
              <div className="stat"><div className="num">WACV '26</div><div className="lbl">Submitted</div></div>
            </div>
            <p className="loupe-caption">â that lens beside this text is a real liquid-glass-js refraction â drag it</p>
          </div>
        </section>

        <GlassLoupe targetRef={heroTextRef} />

        <section className="sheet wrap">
          <Reveal className="sheet-head">
            <h2>Thesis</h2>
          </Reveal>
          <div className="about-grid">
            <Reveal className="about-copy">
              <p>I started in a machine shop, not a Jupyter notebook.</p>
              <p>
                Before I touched Python, I was running tolerance stack-ups, reading GD&amp;T
                callouts, and benchmarking a thrust-bearing shaft against a 1200kW motor. That's
                an odd place to start a data science career â but it's exactly why my models
                don't stop at accuracy. I ask what's physically or operationally true before I
                trust what a model says, the same instinct that used to make me double-check a
                drawing before it went to the floor.
              </p>
              <p>
                Now the shop floor is a training loop. I compare optimizers instead of alloys,
                read confusion matrices instead of inspection reports, and a recovery-time chart
                on a supply-chain dashboard means as much to me as a Cp/Cpk plot once did. Same
                discipline. Different medium â CAD, a training script, and a stakeholder
                conversation, all in one workflow.
              </p>
            </Reveal>
            <Reveal className="diagram">
              <GearDiagram />
              <p className="diagram-cap">Fig. 02 â Same discipline, re-drawn</p>
            </Reveal>
          </div>
        </section>

        <section className="sheet wrap" id="work">
          <Reveal className="sheet-head">
            <h2>Selected work</h2>
          </Reveal>
          <div className="grid-projects">
            {projects.map((p, i) => (
              <ProjectCard key={p.title} p={p} i={i} />
            ))}
          </div>
        </section>

        <section className="sheet wrap" id="timeline">
          <Reveal className="sheet-head">
            <h2>Timeline</h2>
          </Reveal>
          <div className="timeline">
            {timeline.map((t) => (
              <Reveal as="div" className="t-row" key={t.role}>
                <div className="t-date">{t.date}</div>
                <div className="t-axis" />
                <div>
                  <h3>{t.role}</h3>
                  <div className="t-org">{t.org}</div>
                  <p>{t.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="t-more">
            <p className="eyebrow" style={{ marginBottom: 10 }}>EARLIER â ENGINEERING ROOTS</p>
            {timelineMore.map((m) => (
              <div className="t-more-row" key={m.role + m.date}>
                <span>{m.date}</span>
                <span className="role">{m.role}</span>
                <span>{m.org}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="sheet wrap" id="tooling">
          <Reveal className="sheet-head">
            <h2>Tooling</h2>
          </Reveal>
          {skills.map((g) => (
            <Reveal className="skill-group" key={g.group}>
              <h4>{g.group}</h4>
              <div className="chips">
                {g.items.map((item) => (
                  <span className="chip" key={item}>{item}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </section>

        <section className="sheet wrap">
          <Reveal className="sheet-head">
            <h2>Credentials</h2>
          </Reveal>
          <div className="cred-grid">
            <Reveal className="cred">
              <h4>Education</h4>
              <div className="cred-item" style={{ borderTop: "none" }}>
                <div className="deg">M.S. Applied Statistics &amp; Data Science</div>
                <div className="org">University of Texas at Arlington</div>
                <div className="meta">GPA 3.9 Â· Expected Dec 2026</div>
              </div>
              <div className="cred-item">
                <div className="deg">B.Tech, Mechanical Engineering</div>
                <div className="org">Maulana Abul Kalam Azad University of Technology</div>
                <div className="meta">2021</div>
              </div>
            </Reveal>
            <Reveal className="cred">
              <h4>Research &amp; publications</h4>
              <div className="cred-item" style={{ borderTop: "none" }}>
                <div className="deg">AR-SCO: Agentic RAG Framework for Dynamic Supply Chain Optimization</div>
                <div className="org">Presented â ICBAI 2025</div>
                <div className="meta">57% â recovery time Â· +21.7pp OTIF</div>
              </div>
              <div className="cred-item">
                <div className="deg">EdgeAuth: On-Device AI-Generated Image Detection</div>
                <div className="org">Submitted â WACV 2026</div>
                <div className="meta">97.4% accuracy Â· AUC 0.978</div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="wrap" id="contact">
          <Reveal className="titleblock">
            <div className="tb-top">
              <p className="eyebrow" style={{ marginBottom: 16 }}>GET IN TOUCH</p>
              <h2>Let's build something that has to work.</h2>
              <p>
                Open to full-time roles as a Data Scientist, ML/AI Engineer, GenAI &amp;
                agentic-AI engineer, computer-vision engineer, or supply-chain / business analyst
                â starting December 2026.
              </p>
              <div className="cta-row" style={{ marginTop: 26 }}>
                <a className="btn primary" href="mailto:pxc7391@mavs.uta.edu">Email me â</a>
                <a className="btn" href="https://www.linkedin.com/in/pvthirteen" target="_blank" rel="noopener noreferrer">LinkedIn â</a>
                <a className="btn" href="https://github.com/Prithwi13" target="_blank" rel="noopener noreferrer">GitHub â</a>
              </div>
            </div>
            <div className="tb-grid">
              <div className="tb-cell"><div className="k">Drawn by</div><div className="v">Prithwiraj Chatterjee</div></div>
              <div className="tb-cell"><div className="k">Role</div><div className="v">Data Scientist / ML &amp; AI Eng.</div></div>
              <div className="tb-cell"><div className="k">Location</div><div className="v">DallasâFort Worth, TX</div></div>
              <div className="tb-cell"><div className="k">Status</div><div className="v">Open to work Â· Dec 2026</div></div>
              <div className="tb-cell"><div className="k">Email</div><div className="v"><a href="mailto:pxc7391@mavs.uta.edu">pxc7391@mavs.uta.edu</a></div></div>
              <div className="tb-cell"><div className="k">LinkedIn</div><div className="v"><a href="https://www.linkedin.com/in/pvthirteen" target="_blank" rel="noopener noreferrer">/in/pvthirteen</a></div></div>
              <div className="tb-cell"><div className="k">GitHub</div><div className="v"><a href="https://github.com/Prithwi13" target="_blank" rel="noopener noreferrer">/Prithwi13</a></div></div>
              <div className="tb-cell"><div className="k">Revision</div><div className="v">Rev. 2026.09</div></div>
            </div>
          </Reveal>

          <footer>
            <span>Â© 2026 PRITHWIRAJ CHATTERJEE â DRAFTED IN THE BROWSER</span>
            <span>SCALE 1:1 Â· NOT FOR PRODUCTION</span>
          </footer>
        </section>
      </main>
    </>
  );
}
