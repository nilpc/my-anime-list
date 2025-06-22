import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import ProfileImage from "./ProfileImage";
import NameElement from "./NameElement";

interface TeamMember {
  id: number;
  name: string;
  image: string;
  color: string;
}

interface TeamSectionProps {
  teamTitle: string;
  teamMembers: TeamMember[];
}

const TeamSection: React.FC<TeamSectionProps> = ({
  teamTitle,
  teamMembers,
}) => {
  const profileImagesContainerRef = useRef<HTMLDivElement>(null);
  const defaultNameRef = useRef<HTMLDivElement>(null);
  const memberRefs = useRef<
    Map<
      number,
      { imageRef: HTMLDivElement | null; nameRef: HTMLDivElement | null }
    >
  >(new Map());

  useEffect(() => {
    teamMembers.forEach((member) => {
      if (!memberRefs.current.has(member.id)) {
        memberRefs.current.set(member.id, { imageRef: null, nameRef: null });
      }
    });
  }, [teamMembers]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.innerWidth >= 900) {
      if (defaultNameRef.current) {
        const defaultNameHeading = defaultNameRef.current.querySelector("h1");
        if (defaultNameHeading) {
          const defaultSplit = new SplitText(defaultNameHeading, {
            type: "chars",
          });
          defaultSplit.chars.forEach((char) => {
            char.classList.add("letter");
          });

          const defaultLetters =
            defaultNameRef.current.querySelectorAll(".letter");

          gsap.set(defaultLetters, { y: "0%" });

          if (profileImagesContainerRef.current) {
            profileImagesContainerRef.current.addEventListener(
              "mouseenter",
              () => {
                gsap.to(defaultLetters, {
                  y: "0%",
                  ease: "power4.out",
                  duration: 0.75,
                  stagger: {
                    each: 0.025,
                    from: "center",
                  },
                });
              }
            );

            profileImagesContainerRef.current.addEventListener(
              "mouseleave",
              () => {
                gsap.to(defaultLetters, {
                  y: "0%",
                  ease: "power4.out",
                  duration: 0.75,
                  stagger: {
                    each: 0.025,
                    from: "center",
                  },
                });
              }
            );
          }
        }
      }

      teamMembers.forEach((member) => {
        const memberRef = memberRefs.current.get(member.id);
        if (!memberRef) return;

        const { imageRef, nameRef } = memberRef;
        if (!imageRef || !nameRef) return;

        const nameHeading = nameRef.querySelector("h1");
        if (!nameHeading) return;

        const split = new SplitText(nameHeading, { type: "chars" });
        split.chars.forEach((char) => {
          char.classList.add("letter");
        });

        const letters = nameRef.querySelectorAll(".letter");

        imageRef.addEventListener("mouseenter", () => {
          gsap.to(imageRef, {
            width: 140,
            height: 140,
            duration: 0.5,
            ease: "power4.out",
          });

          gsap.to(letters, {
            y: "-100%",
            ease: "power4.out",
            duration: 0.75,
            stagger: {
              each: 0.025,
              from: "center",
            },
          });

          if (defaultNameRef.current) {
            const defaultLetters =
              defaultNameRef.current.querySelectorAll(".letter");
            gsap.to(defaultLetters, {
              y: "100%",
              ease: "power4.out",
              duration: 0.75,
              stagger: {
                each: 0.025,
                from: "center",
              },
            });
          }
        });

        imageRef.addEventListener("mouseleave", () => {
          gsap.to(imageRef, {
            width: 100,
            height: 100,
            duration: 0.5,
            ease: "power4.out",
          });

          gsap.to(letters, {
            y: "0%",
            ease: "power4.out",
            duration: 0.75,
            stagger: {
              each: 0.025,
              from: "center",
            },
          });

          if (defaultNameRef.current) {
            const defaultLetters =
              defaultNameRef.current.querySelectorAll(".letter");
            gsap.to(defaultLetters, {
              y: "0%",
              ease: "power4.out",
              duration: 0.75,
              stagger: {
                each: 0.025,
                from: "center",
              },
            });
          }
        });
      });
    }
  }, [teamMembers]);

  const setImageRef = (id: number, el: HTMLDivElement | null) => {
    const memberRef = memberRefs.current.get(id);
    if (memberRef) {
      memberRefs.current.set(id, { ...memberRef, imageRef: el });
    }
  };

  const setNameRef = (id: number, el: HTMLDivElement | null) => {
    const memberRef = memberRefs.current.get(id);
    if (memberRef) {
      memberRefs.current.set(id, { ...memberRef, nameRef: el });
    }
  };

  return (
    <section className="team">
      <div className="profile-images" ref={profileImagesContainerRef}>
        {teamMembers.map((member) => (
          <ProfileImage
            key={member.id}
            imageUrl={member.image}
            alt={member.name}
            ref={(el) => setImageRef(member.id, el)}
          />
        ))}
      </div>

      <div className="profile-names">
        <div className="name default" ref={defaultNameRef}>
          <h1>{teamTitle}</h1>
        </div>

        {teamMembers.map((member) => (
          <NameElement
            key={member.id}
            name={member.name}
            color={member.color}
            ref={(el) => setNameRef(member.id, el)}
          />
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
