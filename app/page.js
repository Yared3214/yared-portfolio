import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24 px-36">
      <div className="grid grid-cols-3">
        <div className="text-5xl">Yared Bitewlign</div>
        <div className="col-span-2">
          <p>I am a computer science student at Addis Ababa University, specializing in web development as a
            frontend designer and developer. I have worked on e-learning, e-commerce, and other projects, and
            am currently developing an AI-featured fundraising platform named "Bright-Fund." My career goals
            include working in a tech company to participate in impactful projects and gain valuable experience.
            Outside of my studies, I enjoy watching movies and reading psychology and philosophy books. I am
            motivated by the desire to address and solve the numerous problems in my country, aiming to make a
            significant impact in the future.</p>
        </div>
      </div>
    </main>
  );
}
