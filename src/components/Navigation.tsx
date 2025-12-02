import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Github, Linkedin } from "lucide-react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      {/* Glow styles */}
      <style>{`
        .nav-glow {
          transition: all 200ms ease;
        }

        .nav-glow:hover {
          color: #e7c79a !important;
          text-shadow:
            0 0 6px rgba(231,199,154,0.85),
            0 0 10px rgba(231,199,154,0.6),
            0 0 14px rgba(231,199,154,0.45);
          transform: translateY(-1px);
        }

        .icon-glow {
          transition: all 220ms ease;
        }

        .icon-glow:hover {
          color: #e7c79a !important;
          filter:
            drop-shadow(0 0 6px rgba(231,199,154,0.9))
            drop-shadow(0 0 12px rgba(231,199,154,0.6));
          transform: translateY(-2px);
        }

        /* Softer glow just for the mobile menu button */
        .soft-glow {
          transition: all 220ms ease;
        }

        .soft-glow:hover {
          color: #e7c79a !important;
          filter:
            drop-shadow(0 0 5px rgba(231,199,154,0.55))
            drop-shadow(0 0 10px rgba(231,199,154,0.35));
          transform: translateY(-1px);
        }
      `}</style>

      <div className="flex items-center justify-between h-16 px-4 md:px-8">
        {/* LEFT ICONS */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/aliasana"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground icon-glow"
            aria-label="GitHub"
          >
            <Github size={24} />
          </a>

          <a
            href="http://www.linkedin.com/in/sana-alia-b68147250"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground icon-glow"
            aria-label="LinkedIn"
          >
            <Linkedin size={24} />
          </a>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="text-foreground/80 font-medium nav-glow"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* MOBILE MENU BUTTON */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden soft-glow bg-transparent hover:bg-transparent active:bg-transparent shadow-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <X
              size={36}
              strokeWidth={3}
              className="text-[#e7c79a]"
            />
          ) : (
            <Menu
              size={36}
              strokeWidth={3}
              className="text-[#e7c79a]"
            />
          )}
        </Button>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden py-4 border-t border-border px-4 md:px-8">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="block w-full text-left py-2 px-4 text-foreground/80 rounded-md nav-glow"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
