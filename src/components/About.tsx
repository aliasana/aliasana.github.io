import { useState, MouseEvent } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";

const About = () => {
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [code, setCode] = useState<string>(
    `const aboutMe = {
  name: "Sana Alia",
  role: "CS Student @ UofT ",
  loves: ["Data", "Automation", "Platform Governance"],
};

console.log("Hello from the mini terminal!");`
  );

  const [terminal, setTerminal] = useState<string>("");

  const handleRun = () => {
    try {
      const logBuffer: string[] = [];

      // capture console.log
      const originalLog = console.log;
      console.log = (...args) => {
        logBuffer.push(args.join(" "));
        originalLog(...args);
      };

      // execute user code safely
      // eslint-disable-next-line no-eval
      eval(code);

      // restore console.log
      console.log = originalLog;

      setTerminal(logBuffer.join("\n") || "✓ Code executed with no output.");
    } catch (err: any) {
      setTerminal(`❌ Error: ${err.message}`);
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateY = ((x - midX) / midX) * 10;
    const rotateX = -((y - midY) / midY) * 10;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <section
      id="about"
      className="py-20 bg-secondary/30 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-4xl font-bold mb-3">About Me</h2>
        </div>

        {/* Layout: editor (left) + about card (right) */}
        <div className="grid gap-8 md:grid-cols-2 items-start">

          {/* Code Editor + Run Button + Terminal */}
          <div className="bg-background/80 rounded-2xl border border-border/40 shadow-lg overflow-hidden">

            {/* Code Editor */}
            <CodeMirror
              value={code}
              height="260px"
              theme={vscodeDark}
              extensions={[javascript()]}
              onChange={(value) => setCode(value)}
            />

            {/* Run Button */}
            <div className="p-3 border-t border-border/40 flex justify-end">
            <button
  onClick={handleRun}
  className="
    px-4 py-1.5 rounded-lg text-sm font-medium
    transition-all shadow-md
    bg-[#e7c79a]           /* beige background */
    text-[#2b2b2b]         /* dark grey text */
    hover:bg-[#d8b789]     /* slightly darker beige */
    hover:text-[#2b2b2b]
    hover:shadow-[0_0_12px_rgba(231,199,154,0.45)]
    hover:-translate-y-[2px]
    hover:scale-[1.03]
  "
>
  Run ▶
</button>



            </div>

            {/* Terminal Output */}
            <div className="bg-black text-green-400 text-xs p-3 h-32 overflow-auto font-mono border-t border-border/40">
              {terminal || "💻 Terminal ready…"}
            </div>
          </div>

          {/* About Me Tilt Card */}
          <div className="[perspective:1200px]">
            <div
              className="
                tilt-card
                bg-background/60 border border-border/40 rounded-2xl
                px-6 md:px-8 py-8 shadow-sm
              "
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: "transform .15s ease-out",
              }}
            >
              <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
                <p>
                  I&apos;m a Computer Science student who loves working with data — whether it&apos;s
                  analyzing, optimizing, protecting or transforming it into something useful. I&apos;m passionate
                  about{" "}
                  <span className="text-foreground font-semibold">
                    data analysis, automation, digital transformation, and technology strategy
                  </span>
                  .
                </p>
                <p>
                I’m passionate about building efficient, reliable, and secure systems. I enjoy turning complex problems into simple, thoughtful solutions especially when they help improve processes, strengthen security, or enhance the way teams interact with technology. When I&apos;m not
                  coding or exploring new tech trends, you&apos;ll find me playing badminton, reading,
                  going for drives, or catching up on the latest innovations shaping our digital world.
                </p>
              </div>


            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
