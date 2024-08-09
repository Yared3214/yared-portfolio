import Image from "next/image";

export default function Home() {
  const frontSkills = [
    {
      title: "React js",
    },
    {
      title: "Next js"
    },
    {
      titie: "React Native"
    },
    {
      title: "Android Kotlin"
    }
  ];
  const backSkills = [
    {
      title: "Node js",
    },
    {
      title: "Express js"
    },
    {
      titie: "Mongodb"
    },
    {
      title: "Hygraph"
    },
    {
      title: "Graphql"
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
              <div className="text-3xl text-white">Frontend</div>
            </div>
            <div>
              <div className="text-3xl text-white">Backend</div>
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
