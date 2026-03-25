import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaArrowRight,
  FaChartLine,
  FaDownload,
  FaEnvelope,
  FaExternalLinkAlt,
  FaFileAlt,
  FaGithub,
  FaGraduationCap,
  FaLaptopCode,
  FaLinkedin,
  FaMapMarkerAlt,
  FaMoon,
  FaPaperPlane,
  FaPhoneAlt,
  FaTimes,
  FaSun
} from "react-icons/fa";
import {
  SiCss,
  SiExpress,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiPython,
  SiReact
} from "react-icons/si";
import { fallbackPortfolio } from "./fallbackPortfolio";

const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
const serverBaseUrl = apiBaseUrl.replace(/\/api\/?$/, "");
const navItems = ["home", "about", "skills", "projects", "certifications", "education", "contact"];
const projectFilters = ["All", "ML", "DSA", "MERN"];
const heroRoles = ["Data Analyst", "MERN Developer", "UI Designer"];
const aboutFocusPoints = [
  "Transform raw data into actionable insights and decision-ready reports.",
  "Design dashboards with Power BI, Excel, and Python to uncover patterns, trends, and opportunities.",
  "Build interactive interfaces that make data easier to understand, explore, and communicate.",
  "Develop full-stack, data-driven applications focused on practical problem-solving and user impact.",
  "Apply statistical analysis and basic machine learning techniques to solve real-world problems.",
  "Continuously learn and adapt to new tools, technologies, and industry practices."
];

const iconMap = {
  github: FaGithub,
  linkedin: FaLinkedin,
  file: FaFileAlt,
  javascript: SiJavascript,
  react: SiReact,
  html5: SiHtml5,
  css3: SiCss,
  node: SiNodedotjs,
  server: SiExpress,
  database: SiMongodb,
  python: SiPython,
  chart: FaChartLine,
  sheet: FaChartLine,
  java: FaLaptopCode,
  git: SiGit
};

const resolveAssetUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${serverBaseUrl}${path}`;
};

const SectionHeading = ({ eyebrow, title, text }) => (
  <div className="mx-auto mb-10 max-w-3xl text-center">
    <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
      {eyebrow}
    </span>
    <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
      {title}
    </h2>
    <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
      {text}
    </p>
  </div>
);

const Reveal = ({ as: Tag = "div", className = "", delay = 0, children, ...props }) => (
  <Tag
    data-reveal
    className={`reveal ${className}`.trim()}
    style={{ "--reveal-delay": `${delay}ms` }}
    {...props}
  >
    {children}
  </Tag>
);

export default function App() {
  const [portfolio, setPortfolio] = useState(null);
  const [theme, setTheme] = useState("dark");
  const [activeSection, setActiveSection] = useState("home");
  const [activeSkillCategory, setActiveSkillCategory] = useState("All");
  const [activeProjectFilter, setActiveProjectFilter] = useState("All");
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activeCertificateIndex, setActiveCertificateIndex] = useState(0);
  const [isCertificatesModalOpen, setIsCertificatesModalOpen] = useState(false);
  const [submitState, setSubmitState] = useState({ loading: false, error: "", success: "" });
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [error, setError] = useState("");
  const [usingFallback, setUsingFallback] = useState(false);
  const [typedHeroRole, setTypedHeroRole] = useState("");
  const navClickRef = useRef(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/portfolio`);
        if (!response.ok) throw new Error("Could not load portfolio content.");
        const data = await response.json();
        setPortfolio(data);
        setUsingFallback(false);
      } catch (fetchError) {
        setPortfolio(fallbackPortfolio);
        setUsingFallback(true);
        setError(fetchError.message);
      }
    };

    fetchPortfolio();
  }, []);

  useEffect(() => {
    let roleIndex = 0;
    let characterIndex = 0;
    let isDeleting = false;
    let timeoutId;

    const runTypingAnimation = () => {
      const currentRole = heroRoles[roleIndex];

      if (isDeleting) {
        characterIndex -= 1;
      } else {
        characterIndex += 1;
      }

      setTypedHeroRole(currentRole.slice(0, characterIndex));

      if (!isDeleting && characterIndex === currentRole.length) {
        timeoutId = window.setTimeout(() => {
          isDeleting = true;
          runTypingAnimation();
        }, 1200);
        return;
      }

      if (isDeleting && characterIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % heroRoles.length;
      }

      timeoutId = window.setTimeout(runTypingAnimation, isDeleting ? 60 : 110);
    };

    runTypingAnimation();

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!portfolio) return undefined;

    const sections = document.querySelectorAll("section[id]");
    if (!sections.length) return undefined;

    let ticking = false;

    const updateActiveSection = () => {
      const markerOffset = 140;
      let currentSection = sections[0]?.id || "home";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= markerOffset && rect.bottom >= markerOffset) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
      ticking = false;
    };

    const handleScroll = () => {
      if (navClickRef.current) return;
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [portfolio]);

  useEffect(() => {
    if (!portfolio) return undefined;

    const revealItems = document.querySelectorAll("[data-reveal]");
    if (!revealItems.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [portfolio, activeSkillCategory, activeProjectFilter, activeProjectIndex, activeCertificateIndex]);

  const skillCategories = useMemo(() => {
    if (!portfolio) return ["All"];
    return ["All", ...new Set(portfolio.skills.map((skill) => skill.category))];
  }, [portfolio]);

  const filteredSkills = useMemo(() => {
    if (!portfolio) return [];
    return activeSkillCategory === "All"
      ? portfolio.skills
      : portfolio.skills.filter((skill) => skill.category === activeSkillCategory);
  }, [activeSkillCategory, portfolio]);

  const filteredProjects = useMemo(() => {
    if (!portfolio) return [];
    return activeProjectFilter === "All"
      ? portfolio.projects
      : portfolio.projects.filter((project) => {
          const category = project.category || "";
          return category.toUpperCase() === activeProjectFilter;
        });
  }, [activeProjectFilter, portfolio]);

  const stats = portfolio
    ? [
        { label: "Projects", value: portfolio.projects.length },
        { label: "Certifications", value: portfolio.certifications.length },
        { label: "Skill Areas", value: skillCategories.length - 1 },
        { label: "Education Stages", value: portfolio.education.length }
      ]
    : [];

  useEffect(() => {
    setActiveProjectIndex(0);
  }, [activeProjectFilter]);

  const activeProject = filteredProjects?.[activeProjectIndex];
  const activeCertificate = portfolio?.certifications?.[activeCertificateIndex];
  const linkedInProfile = portfolio?.hero?.socialLinks?.find((link) => link.label.toLowerCase() === "linkedin");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const handleNavClick = (sectionId) => {
    const targetSection = document.getElementById(sectionId);
    if (!targetSection) return;

    navClickRef.current = true;
    setActiveSection(sectionId);

    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    window.setTimeout(() => {
      navClickRef.current = false;
      const markerOffset = 140;
      const sections = document.querySelectorAll("section[id]");
      let currentSection = sectionId;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= markerOffset && rect.bottom >= markerOffset) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    }, 700);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitState({ loading: true, error: "", success: "" });

    try {
      const response = await fetch(`${apiBaseUrl}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to save your message.");
      setSubmitState({ loading: false, error: "", success: "Thanks for your message. I will contact you soon." });
      setFormState({ name: "", email: "", subject: "", message: "" });
    } catch (submitError) {
      setSubmitState({ loading: false, error: submitError.message, success: "" });
    }
  };

  useEffect(() => {
    if (!isCertificatesModalOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsCertificatesModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCertificatesModalOpen]);

  if (!portfolio && !error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-950">
        <div className="space-y-4 text-center">
          <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-cyan-400/20 border-t-cyan-400" />
          <p className="text-slate-600 dark:text-slate-300">Loading your dynamic portfolio...</p>
        </div>
      </div>
    );
  }

  if (error && !portfolio) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-6 text-center dark:bg-slate-950">
        <div className="glass-card max-w-xl p-8">
          <h1 className="font-display text-3xl font-bold">Portfolio unavailable</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.20),transparent_28%),radial-gradient(circle_at_80%_15%,rgba(251,191,36,0.16),transparent_22%),linear-gradient(180deg,#eff6ff_0%,#e2e8f0_100%)] text-slate-900 dark:bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.22),transparent_25%),radial-gradient(circle_at_80%_15%,rgba(249,115,22,0.18),transparent_20%),linear-gradient(180deg,#020617_0%,#0f172a_100%)] dark:text-white">
      <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <header className="sticky top-4 z-30 mt-4 flex items-center justify-between gap-3 rounded-full border border-slate-200/70 bg-white/80 px-3 py-3 shadow-xl shadow-slate-300/30 backdrop-blur dark:border-white/10 dark:bg-slate-900/75">
          <button type="button" onClick={() => handleNavClick("home")} className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-sky-500 to-amber-300 font-display text-sm font-bold text-slate-950">AK</span>
            <div className="hidden sm:block">
              <p className="font-display text-sm font-bold">{portfolio.hero.name}</p>
            </div>
          </button>
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleNavClick(item)}
                className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition ${
                  activeSection === item
                    ? "bg-slate-900 text-white dark:bg-cyan-400 dark:text-slate-950"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
          <button onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white dark:border-white/10 dark:bg-white/5">
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
        </header>

        {usingFallback ? (
          <div className="mx-auto mt-5 max-w-6xl rounded-3xl border border-amber-300/30 bg-amber-100/80 px-5 py-4 text-sm text-amber-900 shadow-lg shadow-amber-200/30 dark:border-amber-300/20 dark:bg-amber-300/10 dark:text-amber-100">
            Showing built-in portfolio data because the API could not be reached. Your backend is likely running, but the database may not be seeded yet or the server may need a restart.
          </div>
        ) : null}

        <main className="space-y-24 pb-12 pt-10">
          <section id="home" className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <Reveal className="glass-card p-8 sm:p-10">
                <h1 className="mt-5 min-h-[4.5rem] font-display text-5xl font-bold leading-none tracking-tight sm:min-h-[5.5rem] sm:text-6xl lg:min-h-[6.5rem] lg:text-7xl">
                  <span className="typing-text">{typedHeroRole}</span>
                  <span className="typing-cursor" aria-hidden="true">|</span>
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">{portfolio.hero.tagline}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="info-pill"><FaMapMarkerAlt className="text-cyan-500" />{portfolio.hero.location}</span>
                  <span className="info-pill"><FaEnvelope className="text-cyan-500" />{portfolio.hero.email}</span>
                  <span className="info-pill"><FaPhoneAlt className="text-cyan-500" />{portfolio.hero.phone}</span>
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a href={resolveAssetUrl(portfolio.hero.resumeUrl)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white dark:bg-cyan-400 dark:text-slate-950"><FaDownload />Resume</a>
                  <a href="#projects" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold dark:border-white/15"><FaArrowRight />Explore Projects</a>
                </div>
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">{portfolio.hero.availability}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {portfolio.hero.socialLinks.map((link) => {
                    const Icon = iconMap[link.icon] || FaExternalLinkAlt;
                    return (
                      <a key={link.label} href={resolveAssetUrl(link.url)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                        <Icon />
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              </Reveal>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat, index) => (
                  <Reveal key={stat.label} className="glass-card p-5" delay={index * 70}>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{stat.label}</p>
                    <p className="mt-3 font-display text-4xl font-bold">{String(stat.value).padStart(2, "0")}</p>
                  </Reveal>
                ))}
              </div>
            </div>
            <div className="space-y-5">
              <Reveal className="glass-card overflow-hidden p-4" delay={120}>
                <img src={resolveAssetUrl(portfolio.hero.profileImage)} alt={portfolio.hero.name} className="h-[30rem] w-full rounded-[2rem] object-cover" />
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  {portfolio.hero.stats.map((stat) => (
                    <div key={stat.label} className="rounded-3xl border border-slate-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
                      <p className="font-display text-2xl font-bold">{stat.value}</p>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
              <div className="grid gap-4 sm:grid-cols-3">
                {[{ title: "Data analysis", icon: FaChartLine }, { title: "Full-stack builds", icon: FaLaptopCode }, { title: "Continuous learning", icon: FaGraduationCap }].map((item, index) => {
                  const Icon = item.icon;
                  return <Reveal key={item.title} className="glass-card p-5" delay={index * 90}><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-600 dark:text-cyan-300"><Icon /></div><h3 className="mt-4 font-display text-xl font-bold">{item.title}</h3></Reveal>;
                })}
              </div>
            </div>
          </section>

          <section id="about">
            <Reveal as={SectionHeading} eyebrow="About" title="My real portfolio data, made more expressive" text={portfolio.about.intro} />
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <Reveal className="glass-card p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-700 dark:text-cyan-300">Career Objective</p>
                <h3 className="mt-4 font-display text-3xl font-bold">Combining data thinking with product thinking</h3>
                <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                  {aboutFocusPoints.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <div className="grid gap-4">
                {portfolio.about.highlights.map((item, index) => (
                  <Reveal as="article" key={item.title} className="glass-card p-6" delay={index * 90}>
                    <h3 className="font-display text-2xl font-bold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section id="skills">
            <Reveal as={SectionHeading} eyebrow="Skills" title="Skills applied through data and development work" text="A focused mix of data analysis, full-stack development, and practical tools used to build solutions for real-world problems." />
            <div className="mb-6 flex flex-wrap justify-center gap-3">
              {skillCategories.map((category) => (
                <button key={category} onClick={() => setActiveSkillCategory(category)} className={`rounded-full px-5 py-2 text-sm font-semibold transition ${activeSkillCategory === category ? "bg-slate-900 text-white dark:bg-cyan-400 dark:text-slate-950" : "border border-slate-200 bg-white/70 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"}`}>{category}</button>
              ))}
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredSkills.map((skill, index) => {
                const Icon = iconMap[skill.icon] || FaLaptopCode;
                return (
                  <Reveal as="article" key={skill.name} className="glass-card p-6" delay={(index % 6) * 70}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/15 text-xl text-cyan-600 dark:text-cyan-300"><Icon /></div>
                      <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] dark:border-white/10">{skill.level}%</span>
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-bold">{skill.name}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{skill.description}</p>
                    <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-amber-300" style={{ width: `${skill.level}%` }} /></div>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">{skill.category}</p>
                  </Reveal>
                );
              })}
            </div>
          </section>

          <section id="projects">
            <Reveal as={SectionHeading} eyebrow="Projects" title="Projects built around real-world problem solving" text="A mix of data analysis, machine learning, and full-stack development projects focused on practical use cases and measurable outcomes." />
            <div className="mb-6 flex flex-wrap justify-center gap-3">
              {projectFilters.map((filter) => (
                <button key={filter} onClick={() => setActiveProjectFilter(filter)} className={`rounded-full px-5 py-2 text-sm font-semibold transition ${activeProjectFilter === filter ? "bg-slate-900 text-white dark:bg-cyan-400 dark:text-slate-950" : "border border-slate-200 bg-white/70 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"}`}>{filter}</button>
              ))}
            </div>
            <div className="grid gap-6 lg:grid-cols-[0.42fr_0.58fr]">
              <div className="space-y-4">
                {filteredProjects.map((project, index) => (
                  <Reveal as="button" key={project.title} onClick={() => setActiveProjectIndex(index)} className={`w-full rounded-[1.75rem] border p-6 text-left transition ${activeProjectIndex === index ? "border-cyan-400 bg-slate-900 text-white dark:bg-cyan-400 dark:text-slate-950" : "glass-card"}`} delay={index * 80}>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] opacity-70">Project {String(index + 1).padStart(2, "0")}</p>
                    <h3 className="mt-3 font-display text-2xl font-bold">{project.title}</h3>
                    <p className="mt-2 text-sm leading-7 opacity-80">{project.subtitle}</p>
                    <p className="mt-3 inline-flex rounded-full border border-current/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em]">{project.category || "General"}</p>
                  </Reveal>
                ))}
              </div>
              {activeProject ? (
                <Reveal as="article" className="glass-card overflow-hidden" delay={140}>
                  <img src={resolveAssetUrl(activeProject.image)} alt={activeProject.title} className="h-72 w-full object-cover" />
                  <div className="p-8">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="font-display text-3xl font-bold">{activeProject.title}</h3>
                      <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-300">{activeProject.category || "General"}</span>
                    </div>
                    <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">{activeProject.summary}</p>
                    <p className="mt-4 rounded-3xl border border-slate-200/70 bg-white/70 p-5 text-sm leading-7 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">{activeProject.impact}</p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-3">{activeProject.metrics.map((metric) => <div key={metric.label} className="rounded-3xl border border-slate-200/70 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5"><p className="font-display text-2xl font-bold">{metric.value}</p><p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">{metric.label}</p></div>)}</div>
                    <div className="mt-6 flex flex-wrap gap-3">{activeProject.tags.map((tag) => <span key={tag} className="rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm dark:border-white/10 dark:bg-white/5">{tag}</span>)}</div>
                    <div className="mt-8 flex flex-wrap gap-4">{activeProject.links.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white dark:bg-cyan-400 dark:text-slate-950">{link.type === "demo" ? <FaExternalLinkAlt /> : <FaGithub />}{link.label}</a>)}</div>
                  </div>
                </Reveal>
              ) : (
                <Reveal as="article" className="glass-card flex min-h-80 items-center justify-center p-8 text-center" delay={140}>
                  <div>
                    <h3 className="font-display text-2xl font-bold">No projects in this filter yet</h3>
                    <p className="mt-3 text-slate-600 dark:text-slate-300">Try another project category or add more projects to this portfolio dataset.</p>
                  </div>
                </Reveal>
              )}
            </div>
          </section>

          <section id="certifications">
            <Reveal as={SectionHeading} eyebrow="Certifications" title="Verified achievements through continuous learning" text="Certifications that reflect ongoing skill development, practical learning, and a commitment to strengthening technical capabilities." />
            <div className="grid items-start gap-6 lg:grid-cols-[0.38fr_0.62fr]">
              <div className="space-y-3">
                {portfolio.certifications.map((certificate, index) => (
                  <Reveal as="button" key={certificate.title} onClick={() => setActiveCertificateIndex(index)} className={`w-full rounded-[1.6rem] p-5 text-left transition ${activeCertificateIndex === index ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950" : "glass-card"}`} delay={index * 80}>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] opacity-70">{certificate.issuedOn}</p>
                    <h3 className="mt-2 font-display text-xl font-bold">{certificate.title}</h3>
                    <p className="mt-2 text-sm opacity-80">{certificate.issuer}</p>
                  </Reveal>
                ))}
              </div>
              {activeCertificate ? (
                <Reveal as="article" className="certificate-preview glass-card overflow-hidden" delay={140}>
                  <div className="certificate-preview__layout">
                    <div className="certificate-preview__media">
                      <img
                        src={resolveAssetUrl(activeCertificate.image)}
                        alt={activeCertificate.title}
                        className="certificate-preview__image"
                      />
                    </div>
                    <div className="certificate-preview__content">
                      <div>
                      <h3 className="font-display text-3xl font-bold">{activeCertificate.title}</h3>
                      <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{activeCertificate.issuer} | {activeCertificate.issuedOn}</p>
                      <div className="mt-6 flex flex-wrap gap-3">{activeCertificate.skills.map((skill) => <span key={skill} className="rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm dark:border-white/10 dark:bg-white/5">{skill}</span>)}</div>
                      <div className="mt-8 flex flex-wrap gap-4">
                        <a href={activeCertificate.credentialUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold dark:border-white/15">View Credential<FaExternalLinkAlt /></a>
                        <button
                          type="button"
                          onClick={() => setIsCertificatesModalOpen(true)}
                          className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-700 dark:border-white/15 dark:bg-white/5 dark:text-slate-100 dark:hover:text-cyan-300"
                        >
                          <FaFileAlt />
                          View Certificates
                        </button>
                      </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ) : null}
            </div>
          </section>

          <section id="education">
            <Reveal as={SectionHeading} eyebrow="Education" title="Academic Journey" text="An academic journey from school to Computer Science engineering, building strong foundations in analytical thinking, problem solving, and technical skills." />
            <div className="grid gap-4">
              {portfolio.education.map((item, index) => (
                <Reveal as="article" key={item.title} className="glass-card p-6 sm:p-7" delay={index * 90}>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-300/30 text-slate-900 dark:bg-amber-300/20 dark:text-amber-300"><FaGraduationCap /></div>
                    <div className="flex-1">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div><h3 className="font-display text-2xl font-bold">{item.title}</h3><p className="mt-1 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{item.institution}</p></div>
                        <span className="rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-medium dark:border-white/10 dark:bg-white/5">{item.period}</span>
                      </div>
                      <p className="mt-4 text-base font-semibold text-cyan-700 dark:text-cyan-300">{item.score}</p>
                      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
                      {item.coursework?.length ? (
                        <div className="mt-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Relevant Coursework</p>
                          <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.coursework.join(" • ")}</p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="contact">
            <Reveal as={SectionHeading} eyebrow="Contact" title={portfolio.contact.heading} text={portfolio.contact.subheading} />
            <div className="grid gap-6 lg:grid-cols-[0.42fr_0.58fr]">
              <div className="space-y-4">
                <Reveal className="glass-card p-7 sm:p-8">
                  <h3 className="mt-4 font-display text-3xl font-bold text-white">Get in touch quickly</h3>
                  <div className="mt-8 space-y-4">
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Email</p>
                      <a href={`mailto:${portfolio.hero.email}`} className="mt-2 inline-flex items-center gap-3 text-sm font-medium text-white transition hover:text-emerald-300">
                        <FaEnvelope className="text-emerald-400" />
                        {portfolio.hero.email}
                      </a>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Phone</p>
                      <a href={`tel:${portfolio.hero.phone}`} className="mt-2 inline-flex items-center gap-3 text-sm font-medium text-white transition hover:text-emerald-300">
                        <FaPhoneAlt className="text-emerald-400" />
                        {portfolio.hero.phone}
                      </a>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Location</p>
                      <div className="mt-2 inline-flex items-center gap-3 text-sm font-medium text-white">
                        <FaMapMarkerAlt className="text-emerald-400" />
                        {portfolio.hero.location}
                      </div>
                    </div>
                    {linkedInProfile ? (
                      <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">LinkedIn</p>
                        <a href={linkedInProfile.url} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-3 text-sm font-medium text-white transition hover:text-emerald-300">
                          <FaLinkedin className="text-emerald-400" />
                          {linkedInProfile.url.replace(/^https?:\/\//, "")}
                        </a>
                      </div>
                    ) : null}
                  </div>
                </Reveal>
              </div>
              <Reveal as="form" onSubmit={handleSubmit} className="glass-card p-7 sm:p-8" delay={120}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="space-y-2"><span className="text-sm font-semibold">Name</span><input type="text" name="name" value={formState.name} onChange={handleInputChange} placeholder="Your name" required className="input-field" /></label>
                  <label className="space-y-2"><span className="text-sm font-semibold">Email</span><input type="email" name="email" value={formState.email} onChange={handleInputChange} placeholder="your.email@example.com" required className="input-field" /></label>
                  <label className="space-y-2 sm:col-span-2"><span className="text-sm font-semibold">Subject</span><input type="text" name="subject" value={formState.subject} onChange={handleInputChange} placeholder="Internship, freelance project, collaboration..." required className="input-field" /></label>
                  <label className="space-y-2 sm:col-span-2"><span className="text-sm font-semibold">Message</span><textarea name="message" value={formState.message} onChange={handleInputChange} placeholder="Tell me what you want to build or discuss." rows="6" required className="input-field min-h-40 resize-y" /></label>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <button type="submit" disabled={submitState.loading} className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white disabled:opacity-70 dark:bg-cyan-400 dark:text-slate-950">{submitState.loading ? "Saving..." : "Send Message"}<FaPaperPlane /></button>
                  {submitState.success ? <p className="text-sm font-medium text-emerald-600 dark:text-emerald-300">{submitState.success}</p> : null}
                  {submitState.error ? <p className="text-sm font-medium text-rose-600 dark:text-rose-300">{submitState.error}</p> : null}
                </div>
              </Reveal>
            </div>
          </section>
        </main>

        <footer className="border-t border-slate-200/70 py-8 text-sm text-slate-600 dark:border-white/10 dark:text-slate-400">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>{portfolio.hero.name}</p>
            <a href={`mailto:${portfolio.hero.email}`} className="inline-flex items-center gap-2 font-medium text-cyan-700 dark:text-cyan-300"><FaEnvelope />{portfolio.hero.email}</a>
          </div>
        </footer>
      </div>

      {isCertificatesModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm" onClick={() => setIsCertificatesModalOpen(false)}>
          <div className="max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/95 shadow-2xl shadow-black/40" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 sm:px-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">Certificates</p>
                <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">{activeCertificate?.title || "Certificate Preview"}</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCertificatesModalOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                aria-label="Close certificates"
              >
                <FaTimes />
              </button>
            </div>
            <div className="max-h-[calc(90vh-5.5rem)] overflow-y-auto px-6 py-6 sm:px-8">
              {activeCertificate ? (
                <article className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03]">
                  <img
                    src={resolveAssetUrl(activeCertificate.image)}
                    alt={activeCertificate.title}
                    className="max-h-[72vh] w-full object-contain bg-slate-900"
                  />
                </article>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
