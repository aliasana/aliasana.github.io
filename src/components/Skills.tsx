import { useState } from "react";
import { Code2, Wrench, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const skillCategories = [
  {
    icon: Code2,
    title: "Programming Languages",
    skills: [
      "R",
      "Python",
      "C",
      "SQL",
      "CSS",
      "HTML",
      "SAS",
      "Assembly Language",
      "JavaScript",
      "VBA",
      "TypeScript",
      "Java",
    ],
  },
  {
    icon: Wrench,
    title: "Developer/Project Management Tools",
    skills: [
      "Atlassian Tool Suite (JIRA, Confluence)",
      "R Studio",
      "ServiceNow",
      "GitHub",
      "Power Platform (Power Apps, Power Automate)",
      "Visual Studio Code",
      "Figma",
      "Sharepoint",
      "Firebase",
      "Postman",
      "SDLC",
      "Agile Methodology",
      "Scrum Framework",
      "SAS Enterprise",
      "Prisma",
      "SQLite",
      "Balsamiq",
      "Slack",
      "Eclipse",
      "Linux/Unix",
      "Docker",
      "SAS Viya",
      "PostgreSQL",
      "MySQL",
      "Android Studio",
    ],
  },
  {
    icon: BarChart3,
    title: "Analysis/Visualization Tools",
    skills: [
      "Microsoft Excel",
      "Matplotlib",
      "Pandas",
      "NumPy",
      "Power BI",
      "Tableau",
      "Alteryx",
    ],
  },
];

const Skills = () => {
  const [flipped, setFlipped] = useState(
    skillCategories.map(() => false)
  );

  const toggleFlip = (index: number) => {
    setFlipped((prev) =>
      prev.map((value, i) => (i === index ? !value : value))
    );
  };

  return (
    <section id="skills" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">

      <style>{`
  /* GRID LAYOUT — fully responsive */
  .skills-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    width: 100%;
  }

  /* When screen is VERY small (<360px) → stack cards cleanly */
  @media (max-width: 380px) {
    .skills-grid {
      grid-template-columns: 1fr;
    }
  }

  /* Flip card container */
  .flip-card {
    perspective: 1200px;
    height: 100%;
    width: 100%;
    overflow: visible;
  }

  /* Inner flipping container */
  .flip-inner {
    position: relative;
    width: 100%;
    height: 100%;
    display: grid;
    transform-style: preserve-3d;
    transition: transform 500ms ease;
  }

  .flip-inner.is-flipped {
    transform: rotateY(180deg);
  }

  /* Front/back faces */
  .flip-face {
    grid-area: 1 / 1;
    height: 100%;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden; /* iOS fix */
  }

  .flip-back {
    transform: rotateY(180deg);
  }

  /* Heading glow */
  .skill-heading {
    font-size: clamp(1.3rem, 4vw, 1.75rem);
    font-weight: 700;
    color: #e7c79a;
    text-shadow: 0 0 10px rgba(231, 199, 154, 0.4);
    transition:
      transform 300ms ease,
      letter-spacing 300ms ease,
      opacity 350ms ease;
  }

  .flip-face:hover .skill-heading {
    transform: translateX(4px);
    letter-spacing: 0.05em;
  }

  .flip-inner.is-flipped .skill-heading {
    opacity: 0;
    transform: translateY(-8px) scale(0.96);
  }

  .flip-back .skill-heading {
    opacity: 0;
    transform: translateY(8px) scale(0.96);
    transition: opacity 350ms ease 120ms, transform 350ms ease 120ms;
  }

  .flip-inner.is-flipped .flip-back .skill-heading {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  /* Badge glow */
  .skill-glow {
    transition:
      transform 200ms ease,
      box-shadow 250ms ease,
      background-color 200ms ease,
      color 200ms ease,
      border-color 200ms ease;
  }

  .skill-glow:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 
      0 0 10px rgba(231, 199, 154, 0.8),
      0 0 20px rgba(231, 199, 154, 0.5);
    background-color: rgba(231, 199, 154, 0.18);
    color: #e7c79a;
    border-color: rgba(231, 199, 154, 0.6);
  }
`}</style>


        <h2 className="text-4xl font-bold mb-12 text-center">
          Skills & Expertise
        </h2>

        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="flip-card">
              <div
                className={`flip-inner ${
                  flipped[index] ? "is-flipped" : ""
                }`}
                onClick={() => toggleFlip(index)}
              >
                {/* FRONT */}
                <Card className="flip-face border-border/50 cursor-pointer hover:border-primary/60 hover:shadow-lg">
                  <CardContent className="p-6 flex flex-col justify-center h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <category.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="skill-heading">{category.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Click to see the skills.
                    </p>
                  </CardContent>
                </Card>

                {/* BACK */}
                <Card className="flip-face flip-back border-border/50 cursor-pointer bg-background/90">
                  <CardContent className="p-6 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <category.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="skill-heading">{category.title}</h3>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {category.skills.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="secondary"
                          className="px-3 py-1 text-sm skill-glow"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>

                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
