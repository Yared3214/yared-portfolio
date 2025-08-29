"use client"
import Image from "next/image";
import reactLogo from "./assets/react-logo.png"
import nextLogo from "./assets/next.svg"
import Link from "next/link";
import healthCompanion from "./assets/skin-health-companion.png"
import stock from "./assets/stock.png"
import fastX from "./assets/fastX-logo.png"
import { useState, useEffect } from "react";
import { ExternalLink, Star } from "lucide-react";

const sections = ["about", "skills", "projects"];

export default function Home() {

  const [activeSection, setActiveSection] = useState(sections[0]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2; // Middle of the viewport
      let currentSection = sections[0];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const offsetTop = top + window.scrollY;
          const offsetBottom = bottom + window.scrollY;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            currentSection = section;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const cursorGlow = document.getElementById("cursor-glow");

    const moveCursor = (e) => {
      if (cursorGlow) {
        cursorGlow.style.transform = `translate(${e.clientX - 80}px, ${e.clientY - 80}px)`;
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  // ✅ Keep only relevant frontend/mobile skills
  const frontSkills = [
    {
      title: "React Native",
      logo: reactLogo,
      desc: "I am a frontend mobile app developer specializing in React Native. I build cross-platform mobile applications that run smoothly on both iOS and Android, focusing on responsive design, performance optimization, and creating a seamless native experience.",
      otherTech: [
        "Javascript", "Tailwind"
      ]
    },
    {
      title: "React JS",
      logo: reactLogo,
      desc: "I also work with React.js to create dynamic, responsive, and maintainable web applications. My focus is on writing clean, modular code and leveraging the React ecosystem to enhance user experience.",
      otherTech: [
        "Javascript", "Zustand", "Tailwind"
      ]
    },
    {
      title: "Next.js",
      logo: nextLogo,
      desc: "I have experience with Next.js for building performant, SEO-friendly web applications. I use it for advanced routing, server-side rendering, and scalable architecture.",
      otherTech: [
        "ShadcnUI", "Javascript", "Tailwind"
      ]
    }
  ];

  const projects = [
    {
      title: "Skin Health Companion – Patient-Focused Mobile App",
      desc: "Skin Health Companion is a React Native healthcare app that helps patients access dermatologist-approved resources, manage their profiles, and connect with verified experts. Built with Firebase and Supabase, it features secure authentication, document uploads, role-based access, and a modern, patient-focused design.",
      img: healthCompanion, // replace with your image path
      link: "https://github.com/Yared3214/AI-SkinDisease-Classification-App",
      stars: null,
      installs: null,
      tech: ["ReactNative", "React", "Firebase", "Supabase"],
    },
    {
      title: "Ethio Stock Link Lite — Mobile Stock Trading App",
      desc: "Ethio Stock Link Lite is a React Native offline-first stock trading app built for the Ethiopian market. It allows users to manage their portfolio, view live and cached stock data, place buy/sell orders, and securely deposit funds. The app features smooth bottom-sheet popups, animated transitions, and a modern UI designed for seamless trading even with limited connectivity.",
      img: stock,
      link: "https://github.com/Yared3214/EthioStockLink-Lite",
      stars: null,
      installs: null,
      tech: ["React", "ReactNative", "SQLite"],
    },
    {
      title: "FastX Delivery",
      desc: "FastX Delivery is a modern, high-performance delivery management system designed to streamline logistics, optimize routes, and enhance the delivery experience. Whether you're a small business or a large enterprise, FastX ensures seamless order tracking and efficient dispatching.",
      img: fastX,
      link: "https://github.com/johnwalle/fastx-delivery-app",
      stars: null,
      installs: null,
      tech: ["React", "Tailwind"],
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-6 md:px-12 lg:px-36">
  {/* Glow Effect */}
  <div
    id="cursor-glow"
    className="pointer-events-none fixed top-0 left-0 h-[500px] w-[500px] rounded-full bg-blue-200 opacity-5 blur-3xl mix-blend-color-dodge transition-transform duration-100"
  ></div>

  {/* Grid Layout */}
  <div className="grid grid-cols-1 lg:grid-cols-3 w-full">
    
    {/* Sidebar (only visible on lg and above) */}
    <div className="hidden lg:flex flex-col gap-3 sticky top-0 h-screen overflow-y-auto py-24">
      <div className="text-5xl text-white">Yared Bitewlign</div>
      <div className="text-xl text-white">Frontend React Native Developer</div>
      
      <nav className="mt-24">
        <ul className="flex flex-col gap-5">
          {sections.map((section) => (
            <li key={section}>
              <Link href={`#${section}`} className="group flex items-center">
                <span
                  className={`nav-indicator mr-4 h-px transition-all ${
                    activeSection === section
                      ? "w-16 bg-slate-200"
                      : "w-8 bg-slate-600"
                  }`}
                ></span>
                <span
                  className={`nav-text text-xs font-bold uppercase tracking-widest transition-colors ${
                    activeSection === section
                      ? "text-slate-200"
                      : "text-slate-500"
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>

    {/* Content Area */}
    <div className="col-span-2">
      {/* On mobile/tablet, show Name + Title at top */}
      <div className="lg:hidden text-center mt-10">
        <div className="text-4xl text-white font-bold text-left">Yared Bitewlign</div>
        <div className="text-lg text-slate-300 text-left">
          Frontend React Native Developer
        </div>
      </div>

      {/* About section */}
      <section id="about" className="py-12 lg:py-24">
        <div className="lg:hidden text-sm text-white mb-5">About Me</div>
        <p className="text-sm">
          I am a Computer Science graduate from Addis Ababa University and a
          passionate frontend React Native mobile app developer. I specialize in
          building cross-platform mobile applications with React Native,
          focusing on delivering smooth user experiences and responsive designs.
          In addition to mobile development, I also work with React.js and
          Next.js for creating dynamic and scalable web applications. My career
          goal is to contribute to impactful projects in the tech industry while
          continuously improving my skills as a frontend developer.
        </p>
      </section>

      {/* Skills section */}
      <section id="skills" className="py-12">
        {/* <div className="hidden lg:block text-3xl text-white mb-5">
          Frontend / Mobile Skills
        </div> */}
        <div className="lg:hidden text-sm font-bold text-white mb-5">Skills</div>
        {/* Frontend/Mobile Skills */}
        {frontSkills.map((skill, index) => (
          <div
            key={index}
            className="group relative grid grid-cols-4 gap-4 pb-1 transition-all lg:hover:!opacity-100 
            lg:group-hover/list:opacity-50 mb-7"

          >
            <div
              className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none 
                  lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] 
                  lg:group-hover:drop-shadow-lg"
            ></div>
            <div className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-1">
              <Image
                alt={skill.title}
                src={skill.logo}
                width={1200}
                height={300}
                className="lg:w-3/4 md:w-3/4 w-3/4 h-auto object-contain"
              />
            </div>
            <div className="col-span-3">
              <div className="font-medium leading-snug text-slate-200">
                {skill.title}
              </div>
              <p className="mt-2 text-sm leading-normal">{skill.desc}</p>
              <ul
                className="mt-2 flex flex-wrap"
                aria-label="Technologies Used Together"
              >
                {skill.otherTech.map((other, index) => (
                  <li key={index} className="mr-1.5 mt-2">
                    <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                      {other}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        {/* Soft skills */}
        <div className="lg:text-3xl text-lg text-white mt-24">Other Skills</div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          <div className="flex flex-col items-center">
            <img
              src="https://i.ibb.co/PZM6bqB/debugging.png"
              alt="Problem-Solving & Debugging Icon"
              className="lg:w-16 lg:h-16 md:w-13 md:h-13 w-10 h-10"
            />
            <p className="mt-2 text-center lg:text-lg text-sm font-semibold">
              Problem-Solving & Debugging
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2535/2535547.png"
              alt="Responsive Design Icon"
              className="lg:w-16 lg:h-16 md:w-13 md:h-13 w-10 h-10"
            />
            <p className="mt-2 text-center lg:text-lg text-sm font-semibold">
              Responsive Design
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/000/534/837/small/gdpr_line_solid-13.jpg"
              alt="Collaboration Icon"
              className="lg:w-16 lg:h-16 md:w-13 md:h-13 w-10 h-10"
            />
            <p className="mt-2 text-center lg:text-lg text-sm font-semibold">
              Collaboration & Communication
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://img.icons8.com/color/48/000000/git.png"
              alt="Version Control Icon"
              className="lg:w-16 lg:h-16 md:w-13 md:h-13 w-10 h-10"
            />
            <p className="mt-2 text-center lg:text-lg text-sm font-semibold">
              Version Control (Git)
            </p>
          </div>
        </div>
      </section>

      <section id="projects" className="mt-20">
      <h2 className="text-lg lg:hidden font-bold text-slate-200 mb-8">Projects</h2>
      <div className="space-y-10">
        {projects.map((project, i) => (
          <div
            key={i}
            className="group relative grid grid-cols-6 gap-4 pb-4 border-b border-slate-700/50"
          >
            {/* Project Image */}
            <div className="col-span-2 flex items-start">
              <Image
                alt={project.title}
                src={project.img}
                width={500}
                height={300}
                className="rounded-lg shadow-md object-contain w-full h-auto"
              />
            </div>

            {/* Project Content */}
            <div className="col-span-4 flex flex-col">
              {/* Title + External Link */}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-md font-semibold text-slate-200 hover:text-teal-300"
              >
                {project.title}
                <ExternalLink className="ml-2 w-4 h-4" />
              </a>

              {/* Description */}
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                {project.desc}
              </p>

              {/* Meta Info (Stars or Installs) */}
              {project.stars && (
                <div className="mt-2 flex items-center text-sm text-slate-400">
                  <Star className="w-4 h-4 mr-1 text-yellow-400" />{" "}
                  {project.stars}
                </div>
              )}
              {project.installs && (
                <div className="mt-2 flex items-center text-sm text-slate-400">
                  ⭐ {project.installs} Installs
                </div>
              )}

              {/* Tech Stack */}
              <ul className="mt-3 flex flex-wrap">
                {project.tech.map((t, idx) => (
                  <li key={idx} className="mr-2 mt-2">
                    <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium text-teal-300">
                      {t}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
    </div>
  </div>
</main>

  );
}
