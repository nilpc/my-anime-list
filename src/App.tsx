import { useEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import TeamSection from "./components/TeamSection";

const teamMembers = [
  { id: 1, name: "Hunter x Hunter", image: "/img1.jpg", color: "#7fff00" },
  { id: 2, name: "Demon Slayer", image: "/img2.jpg", color: "#ff6080" },
  { id: 3, name: "Attack on Titan", image: "/img3.jpg", color: "#ffffff" },
  { id: 4, name: "Spy x Family", image: "/img4.jpeg", color: "#ffb3a5" },
  { id: 5, name: "Jujutsu Kaisen", image: "/img5.jpg", color: "#9370ff" },
];

const App: React.FC = () => {
  useEffect(() => {
    gsap.registerPlugin(SplitText);
  }, []);

  return (
    <main className="app">
      <TeamSection teamTitle="Top Animes" teamMembers={teamMembers} />
    </main>
  );
};

export default App;
