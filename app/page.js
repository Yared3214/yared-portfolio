import Image from "next/image";
import reactLogo from "./assets/react-logo.webp"
import nextLogo from "./assets/next.svg"
import expressLogo from "./assets/express-logo.png"

export default function Home() {
  const frontSkills = [
    {
      title: "React js",
      logo: reactLogo,
      desc: "I specialize in React.js, where I've built dynamic and responsive web applications. My focus is on writing clean, modular code and optimizing component architecture. I’m experienced in leveraging React’s ecosystem, including tools like zustand and TypeScript, to enhance user experience.",
      otherTech: [
        "Javascript", "Zustand", "Tailwind"
      ]

    },
    {
      title: "Next js",
      logo: nextLogo,
      desc: "I’m proficient in Next.js, using it to develop server-side rendered applications with superior performance and SEO capabilities. I’ve worked on building fast, scalable web apps that handle complex routing and data fetching with ease, ensuring optimal performance.",
      otherTech: [
        "ShadcnUi", "Javascript", "Tailwind"
      ]
    },
    {
      title: "React Native",
      logo: reactLogo,
      desc: "I have expertise in React Native for building cross-platform mobile applications. My work includes creating responsive, high-performance apps that run smoothly on both iOS and Android. I focus on optimizing the native experience while maintaining a single codebase.",
      otherTech: [
        "Javascript", "Tailwind"
      ]
    },
    // {
    //   title: "Android Kotlin",
    //   logo: "",
    //   desc: "",
    //   otherTech: [

    //   ]
    // }
  ];
  const backSkills = [
    {
      title: "Node js",
      logo: "",
      desc: "I have solid experience with Node.js, where I build efficient and scalable backend systems. My focus is on developing non-blocking, event-driven architectures that handle high traffic and ensure fast performance. I utilize Node.js to create RESTful APIs and integrate various services.",
    },
    {
      title: "Express js",
      logo: expressLogo,
      desc: "I'm proficient in Express.js, using it to design robust, maintainable server-side applications. I specialize in creating RESTful APIs, handling middleware, and ensuring secure and efficient data flow. Express.js allows me to build scalable web applications with streamlined routing.",
    },
    {
      titie: "Mongodb",
      logo: "",
      desc: "I specialize in MongoDB, utilizing its flexibility to design and manage NoSQL databases. My expertise includes schema design, indexing, and optimizing queries to ensure fast and efficient data retrieval. MongoDB enables me to handle large volumes of data and build scalable applications.",
    },
    {
      title: "Hygraph",
      logo: "",
      desc: "I’m skilled in using Hygraph (formerly GraphCMS) to manage and deliver content via a headless CMS. I focus on creating flexible, scalable content structures that integrate seamlessly with frontend frameworks. Hygraph allows me to build content-driven applications with ease and efficiency.",
    },
    {
      title: "Graphql",
      logo: "",
      desc: "I have expertise in GraphQL, where I design and implement flexible APIs that enable efficient data querying. My work involves crafting precise, scalable schemas that optimize data fetching and reduce over-fetching. GraphQL empowers me to build dynamic applications with real-time data access.",
    }
  ]
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24 px-36">
      <div className="grid grid-cols-3">
        <div className="flex flex-col gap-3">
          <div className="text-5xl text-white">Yared Bitewlign</div>
          <div className="text-xl text-white">Web And App developer</div>
          {/* nav bar  */}
          <nav className="mt-24">
            <ul className="flex flex-col gap-5">
              <li>
                <a href="#about" className="group flex items-center">
                  <span class="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 
                group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 
                motion-reduce:transition-none"></span>
                  <span class="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 
                group-hover:text-slate-200 group-focus-visible:text-slate-200">About</span>
                </a>
              </li>
              <li>
                <a href="#skills" className="group flex items-center">
                  <span class="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 
                group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 
                motion-reduce:transition-none"></span>
                  <span class="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 
                group-hover:text-slate-200 group-focus-visible:text-slate-200">Skills</span>
                </a>
              </li>
              <li>
                <a href="#projects" className="group flex items-center">
                  <span class="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 
                group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 
                motion-reduce:transition-none"></span>
                  <span class="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 
                group-hover:text-slate-200 group-focus-visible:text-slate-200">Projects</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        {/* Content side of the page */}
        <div className="col-span-2">
          {/* self intro part */}
          <p id="about">I am a computer science student at Addis Ababa University, specializing in web development as a
            frontend designer and developer. I have worked on e-learning, e-commerce, and other projects, and
            am currently developing an AI-featured fundraising platform named "Bright-Fund." My career goals
            include working in a tech company to participate in impactful projects and gain valuable experience.
            Outside of my studies, I enjoy watching movies and reading psychology and philosophy books. I am
            motivated by the desire to address and solve the numerous problems in my country, aiming to make a
            significant impact in the future.</p>
          {/* My Skills part of the page */}
          <div className="mt-32">
            {/* Frontend Skils */}
            <div>
              <div className="text-3xl text-white mb-5">Frontend</div>
              {frontSkills.map((skill, index) => (
                <div id={index} className="group relative grid pb-1 transition-all sm:grid-cols-4 sm:gap-8 md:gap-4 lg:hover:!opacity-100 
                lg:group-hover/list:opacity-50 mb-5">
                  <div class="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none 
                  lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] 
                  lg:group-hover:drop-shadow-lg"></div>
                  <div className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-1">
                    <Image src={skill.logo} width={50} height={50}
                      className="w-3/4" />
                  </div>
                  <div className="col-span-3">
                    <div className="font-medium leading-snug text-slate-200">{skill.title}</div>
                    <p className="mt-2 text-sm leading-normal">{skill.desc}</p>
                    <ul id={index} className="mt-2 flex flex-wrap" aria-label="Technologies Used Together">
                      {skill.otherTech.map((other, index) => (
                        <ul>
                          <li className="mr-1.5 mt-2">
                            <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5
                        text-teal-300 ">{other}</div>
                          </li>
                        </ul>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div className="text-3xl text-white mt-5">Backend</div>
            </div>
            <div>
              <div className="text-3xl text-white">Other Skills</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
