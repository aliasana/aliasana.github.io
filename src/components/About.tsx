import { useState, MouseEvent } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import { EditorView } from "@codemirror/view";

const About = () => {
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const [code, setCode] = useState<string>(
`const aboutMe = {
  name: "Sana Alia",
  role: "Computer Science Student @ UofT",
  loves: ["Data", "Automation", "Analytics"],
};

console.log("Hello from the mini terminal!");`
  );

  const [terminal, setTerminal] = useState<string>("");

  const handleRun = () => {
    try {
      const logBuffer: string[] = [];
      const originalLog = console.log;

      console.log = (...args) => {
        logBuffer.push(args.join(" "));
        originalLog(...args);
      };

      // eslint-disable-next-line no-eval
      eval(code);

      console.log = originalLog;

      setTerminal(logBuffer.join("\n") || "✓ Code executed with no output.");
    } catch (err: any) {
      setTerminal(`❌ Error: ${err.message}`);
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 10;
    const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 10;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <section id="about" className="py-20 bg-secondary/30 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-4xl font-bold mb-3">About Me</h2>
        </div>

        {/* Layout */}
        <div className="grid gap-8 md:grid-cols-2 items-start">

          {/* Code Editor + Terminal */}
          <div className="
            bg-background/80 rounded-2xl border border-border/40 shadow-lg overflow-hidden
            w-full max-w-full sm:max-w-md md:max-w-full
          ">

            {/* Code Editor */}
            <style>{`
            /* Force smaller font on mobile screens only */
            @media (max-width: 640px) {
              .cm-editor, .cm-scroller {
                font-size: 11px !important;
                line-height: 1.2 !important;
              }
            }

            /* Normal font size for tablet/desktop */
            @media (min-width: 641px) {
              .cm-editor, .cm-scroller {
                font-size: 15px !important;
                line-height: 1.35 !important;
              }
            }
          `}</style>


          <CodeMirror
            value={code}
            theme={vscodeDark}
            extensions={[
              javascript({ jsx: true }),
              EditorView.lineWrapping
            ]}
            onChange={(value) => setCode(value)}
            basicSetup={{
              lineNumbers: false,
              foldGutter: false,
              highlightActiveLine: false,
            }}
            height="220px"
            className="
              leading-tight
              text-[11px] 
              sm:text-[13px] 
              md:text-[15px]
            "
            style={{
              fontSize: "inherit",
            }}
          />


            {/* Run Button */}
            <div className="p-2 sm:p-3 border-t border-border/40 flex justify-end">
              <button
                onClick={handleRun}
                className="
                  px-3 py-1 text-xs 
                  sm:px-4 sm:py-1.5 sm:text-sm
                  rounded-lg font-medium transition-all shadow-md
                  bg-[#e7c79a] text-[#2b2b2b]
                  hover:bg-[#d8b789]
                  hover:shadow-[0_0_12px_rgba(231,199,154,0.45)]
                  hover:-translate-y-[2px]
                  hover:scale-[1.03]
                "
              >
                Run ▶
              </button>
            </div>

            {/* Terminal */}
            <div
              className="
                bg-black text-green-400 
                text-[10px] sm:text-xs 
                p-2 sm:p-3 
                h-28 sm:h-32 
                overflow-auto font-mono 
                border-t border-border/40
              "
            >
              {terminal || "💻 Terminal ready…"}
            </div>
          </div>

          {/* About Card with Tilt */}
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
                  I'm a Computer Science student who loves working with data — whether it's
                  analyzing, optimizing, protecting, or transforming it into something useful.
                  I'm passionate about{" "}
                  <span className="text-foreground font-semibold">
                    data analysis, automation, digital transformation, and technology strategy
                  </span>.
                </p>

                <p>
                  I enjoy building efficient, reliable, and secure systems. I love turning complex
                  problems into simple, thoughtful solutions that improve processes, strengthen governance,
                  or enhance how teams interact with technology.
                </p>

                <p>
                  When I'm not coding or working with data, you'll find me playing badminton,
                  reading, going for drives, or exploring the latest innovations in tech.
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
