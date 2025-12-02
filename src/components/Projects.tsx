import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Eventual - Events & Networking Website",
    description:
      "Developed and deployed a student networking website using Next.js, integrating NextAuth for authentication and REST API for seamless client-server communication, with deployment on Vercel.",
    tags: [
      "Next.js",
      "Prisma",
      "CockroachDB",
      "Stripe",
      "Ably",
      "Vercel",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
    ],
    codeLink: "https://github.com/aliasana/final-project-s23-citrus",
    liveLink: "https://final-project-s23-citrus.vercel.app/",
  },
  {
    title: "FuelUp - Gas Price Matching App",
    description:
      "Delivered project proposal and user requirements report, along with prototypes, resulting in a high usability score during the evaluation phase.",
    tags: ["Figma", "Balsamiq", "UX Design"],
    codeLink: "https://github.com/aliasana/FuelUp",
  },
  {
    title: "System Monitoring Tool",
    description:
      "Designed and implemented a real-time system utilization analysis tool leveraging concurrent command handling and signal interception on Linux-based systems.",
    tags: ["C", "Linux", "Concurrency", "Signals"],
    codeLink: "https://github.com/aliasana/System-Monitoring-Tool-Concurrency-Signals",
  },
  
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">

        <style>{`
          /* Beige glow for tags */
          .tag-glow {
            transition: all 200ms ease;
          }
          .tag-glow:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow:
              0 0 12px rgba(231, 199, 154, 0.8),
              0 0 22px rgba(231, 199, 154, 0.5);
            background-color: rgba(231, 199, 154, 0.18);
            color: #e7c79a;
            border-color: rgba(231, 199, 154, 0.6);
          }

          /* ⭐ Dark grey → Beige hover buttons */
          .btn-grey {
            background-color: rgba(255,255,255,0.05); /* dark grey */
            color: white;
            border: 1px solid rgba(255,255,255,0.08);
            transition: all 220ms ease;
          }

          .btn-grey:hover {
            background-color: rgba(231,199,154,0.9);
            color: #000;
            border-color: rgba(231,199,154,0.8);
            box-shadow:
              0 0 10px rgba(231,199,154,0.6),
              0 0 16px rgba(231,199,154,0.4);
          }

          .btn-grey:active {
            transform: scale(0.97);
          }
        `}</style>

        <h2 className="text-4xl font-bold mb-12 text-center">My Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group"
            >
              <CardHeader>
                <CardTitle className="group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>

              <CardContent>
                {/* TAGS */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full tag-glow"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* BUTTONS */}
                <div className="flex gap-2">
                  {project.codeLink && (
                    <Button size="sm" className="flex-1 btn-grey" asChild>
                      <a href={project.codeLink} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        {
                          project.title === "FuelUp - Gas Price Matching App"
                            ? "Prototype"
                            : "Code"
                        }
                      </a>
                    </Button>
                  )}

                  {project.liveLink && (
                    <Button size="sm" className="flex-1 btn-grey" asChild>
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
