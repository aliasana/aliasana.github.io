import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import heroBg from "@/assets/intro_picture.jpg";

const AnimatedText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setVisibleCount(0);

    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setVisibleCount((prev) => {
          if (prev >= text.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 60);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [text, delay]);

  return (
    <>
      {text.split("").map((char, index) => {
        const isVisible = index < visibleCount;
        return (
          <span
            key={index}
            className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: "opacity 0.15s ease-out",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </>
  );
};

/** rotation between multiple phrases */
const TypewriterRotatingText = ({
  items,
  typingSpeed = 80, // ms per letter while typing
  deletingSpeed = 40, // ms per letter while deleting
  pauseBeforeDelete = 1000, // how long to keep full word before deleting
  pauseBetweenWords = 400, // pause when empty before next word
}: {
  items: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseBeforeDelete?: number;
  pauseBetweenWords?: number;
}) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = items[wordIndex];
    let timeout: number;

    if (!isDeleting && charIndex < currentWord.length) {
      // typing forward
      timeout = window.setTimeout(
        () => setCharIndex((c) => c + 1),
        typingSpeed
      );
    } else if (!isDeleting && charIndex === currentWord.length) {
      // full word shown, wait, then start deleting
      timeout = window.setTimeout(
        () => setIsDeleting(true),
        pauseBeforeDelete
      );
    } else if (isDeleting && charIndex > 0) {
      // deleting letters
      timeout = window.setTimeout(
        () => setCharIndex((c) => c - 1),
        deletingSpeed
      );
    } else if (isDeleting && charIndex === 0) {
      // finished deleting, move to next word
      timeout = window.setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((w) => (w + 1) % items.length);
      }, pauseBetweenWords);
    }

    return () => clearTimeout(timeout);
  }, [
    items,
    wordIndex,
    charIndex,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseBeforeDelete,
    pauseBetweenWords,
  ]);

  const currentText = items[wordIndex].slice(0, charIndex);

  return (
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
      {currentText}
    </span>
  );
};

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <style>{`
        /* Bounce arrow */
        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        .gentle-bounce {
          animation: gentle-bounce 1.8s ease-in-out infinite;
        }

        /* Gradient text shimmer */
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .gradient-animate {
          background-size: 200% 200%;
          animation: gradient-shift 6s ease-in-out infinite;
        }

        /* ✨ Floating sparkles animation */
        @keyframes sparkle-blink {
          0%, 100% { opacity: 0.25; transform: scale(0.6); }
          50% { opacity: 1; transform: scale(1.15); }
        }

        .glitter-name {
          position: relative;
          display: inline-block;
        }

        .glitter-name span.spark {
          position: absolute;
          width: 6px;
          height: 6px;
          background: radial-gradient(circle, rgba(255,255,255,0.9), rgba(255,255,255,0));
          border-radius: 50%;
          pointer-events: none;
          animation: sparkle-blink 3s infinite ease-in-out;
        }

        .glitter-name span.gold {
          background: radial-gradient(circle, rgba(231,199,154,0.95), rgba(231,199,154,0));
        }

        /* Buttons: frosted rectangle + glow on hover */
        .soft-hover-glow {
          background-color: rgba(38, 33, 28, 0.35);
          color: #f5dbb0;
          border-radius: 14px;
          backdrop-filter: blur(6px);
          transition:
            background-color 200ms ease,
            box-shadow 200ms ease,
            transform 200ms ease;
        }
        .soft-hover-glow:hover {
          background-color: rgba(46, 38, 31, 0.45);
          box-shadow:
            0 0 16px rgba(245,219,176,0.50),
            0 0 32px rgba(245,219,176,0.35),
            0 0 54px rgba(245,219,176,0.20);
          transform: translateY(-2px) scale(1.02);
        }

        /* ✨ Arrow Glow Effects */
.arrow-glow {
  transition: all 0.25s ease;
}

.arrow-glow:hover {
  filter: drop-shadow(0 0 6px rgba(231, 199, 154, 0.6));
  transform: scale(1.1);
}


.arrow-glow:active {
  filter: drop-shadow(0 0 18px rgba(231, 199, 154, 1));
  transform: scale(0.95);
}

      `}</style>

      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

<div className="absolute inset-0 bg-gradient-to-b from-background/15 via-background/25 to-background/40 z-0" />


      {/* Content */}
      <div className="w-full px-4 md:px-8 z-10 text-center pt-24 md:pt-32 flex flex-col items-center">
        <h1
        className="
          text-5xl md:text-7xl font-extrabold tracking-tight mb-6 
          bg-clip-text text-transparent 
          bg-gradient-to-r from-primary via-[#e7c79a] to-accent
          gradient-animate
        "
        style={{ fontFamily: 'Poppins, sans-serif' }}
        >
        Sana Alia
      </h1>


        <p
  className="relative text-base md:text-lg text-muted-foreground mx-auto mb-8 max-w-3xl"
  style={{ whiteSpace: "nowrap" }}   
>
  {/* Invisible placeholder so the line always keeps space */}
  <span className="opacity-0">
    Platform Governance
  </span>

  {/* Actual animated text positioned on top */}
  <span className="absolute inset-0 flex items-center justify-center">
    <TypewriterRotatingText
      items={[
        "Data Analysis",
        "Automation",
        "Process Optimization",
        "Data Architecture",
        "Platform Governance",
        "Workflow Automation",
      ]}
      typingSpeed={80}
      deletingSpeed={40}
      pauseBeforeDelete={1000}
      pauseBetweenWords={400}
    />
  </span>
</p>


        {/* Buttons
        <div className="flex gap-4 justify-center">
          <Button
            size="lg"
            className="soft-hover-glow px-8 py-6"
            onClick={() => scrollToSection("projects")}
          >
            View My Work
          </Button>

          <Button
            size="lg"
            className="soft-hover-glow px-8 py-6"
            onClick={() => scrollToSection("contact")}
          >
            Contact Me
          </Button>
        </div> */}
      </div>

      {/* Arrow */}
      <button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer hover:scale-110 transition-transform z-20"
      >
        <div className="gentle-bounce">
          <ArrowDown className="arrow-glow w-16 h-16 md:w-12 md:h-12 text-primary" />
        </div>
      </button>
    </section>
  );
};

export default Hero;
