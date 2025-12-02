import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">

        {/* Icon Hover Glow Styles */}
        <style>{`
          .icon-hover {
            transition: all 220ms ease;
            color: #ffffff; /* default icon color */
          }

          /* Hover → beige + glow */
          .icon-hover:hover {
            color: #e7c79a !important; /* warm beige */
            filter:
              drop-shadow(0 0 6px rgba(231,199,154,0.9))
              drop-shadow(0 0 12px rgba(231,199,154,0.6))
              drop-shadow(0 0 18px rgba(231,199,154,0.4));
            transform: translateY(-2px);
          }

          /* Outline button also glows on hover */
          .icon-btn:hover {
            border-color: #e7c79a !important;
            box-shadow:
              0 0 8px rgba(231,199,154,0.6),
              0 0 14px rgba(231,199,154,0.4);
          }
        `}</style>

        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>

          <p className="text-lg text-muted-foreground mb-8">
            Let’s connect! Whether it’s a new role, a project collaboration,
            or just a friendly hello, I’m always happy to hear from you.
          </p>

          {/* EMAIL BUTTON */}
<div className="flex justify-center gap-4 mb-8">
  <Button
    size="lg"
    className="
      bg-[#e7c79a]            /* beige background */
      text-[#2b2b2b]          /* dark grey text */
      font-medium
      transition-all
      shadow-md

      hover:bg-[#d8b789]      /* slightly darker beige on hover */
      hover:text-[#2b2b2b]    /* keep text dark grey */
      hover:shadow-[0_0_12px_rgba(231,199,154,0.45)]
      hover:translate-y-[-3px]
      hover:scale-[1.03]
    "
    onClick={() => window.location.href = 'mailto:sana.alia@mail.utoronto.ca'}
  >
    {/* No icon-hover here so it stays dark grey */}
    <Mail className="w-5 h-5 mr-2 text-[#2b2b2b]" />
    Email Me
  </Button>
</div>


          {/* SOCIAL ICON BUTTONS */}
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="border-border icon-btn hover:bg-primary/10 transition-all"
              onClick={() => window.open('https://github.com/aliasana', '_blank')}
            >
              <Github className="w-5 h-5 icon-hover" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="border-border icon-btn hover:bg-primary/10 transition-all"
              onClick={() => window.open('https://linkedin.com/in/sana-alia-b68147250', '_blank')}
            >
              <Linkedin className="w-5 h-5 icon-hover" />
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
