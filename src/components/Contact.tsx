import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin } from "lucide-react";

const Contact = () => {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.target);
    formData.append("access_key", "d24aa294-2448-4400-9fb1-65ff49e6174d");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());

    if (response.success) {
      setStatus("sent");
      e.target.reset();
    } else {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">

        {/* ICON HOVER GLOW */}
        <style>{`
          .icon-hover {
            transition: all 220ms ease;
            color: #ffffff;
          }
          .icon-hover:hover {
            color: #e7c79a !important;
            filter:
              drop-shadow(0 0 6px rgba(231,199,154,0.9))
              drop-shadow(0 0 12px rgba(231,199,154,0.6))
              drop-shadow(0 0 18px rgba(231,199,154,0.4));
            transform: translateY(-2px);
          }
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

          {/* CONTACT FORM */}
          <form
        onSubmit={handleSubmit}
        className="
          space-y-4 
          w-full 
          max-w-sm 
          sm:max-w-md 
          md:max-w-lg 
          mx-auto mb-10
        "
      >
        <input
          type="text"
          name="name"
          required
          placeholder="Your Name"
          className="
            w-full p-2 sm:p-3 rounded-md
            bg-[#2b2b2b] text-white
            border border-gray-600
            focus:border-[#e7c79a]
            focus:ring-2 focus:ring-[#e7c79a]/40
            transition-all outline-none
          "
        />

        <input
          type="email"
          name="email"
          required
          placeholder="Your Email"
          className="
            w-full p-2 sm:p-3 rounded-md
            bg-[#2b2b2b] text-white
            border border-gray-600
            focus:border-[#e7c79a]
            focus:ring-2 focus:ring-[#e7c79a]/40
            transition-all outline-none
          "
        />

        <textarea
          name="message"
          rows={5}
          required
          placeholder="Your Message"
          className="
            w-full p-2 sm:p-3 rounded-md
            bg-[#2b2b2b] text-white
            border border-gray-600
            focus:border-[#e7c79a]
            focus:ring-2 focus:ring-[#e7c79a]/40
            transition-all outline-none
          "
        />

        <Button
          type="submit"
          size="lg"
          className="
            w-full font-medium
            bg-[#e7c79a] text-[#2b2b2b]
            hover:bg-[#d8b789]
            hover:shadow-[0_0_12px_rgba(231,199,154,0.45)]
            transition-all
            hover:-translate-y-[3px]
            hover:scale-[1.03]
          "
        >
          {status === "loading"
            ? "Sending..."
            : status === "sent"
            ? "Message Sent!"
            : "Send Message"}
        </Button>
      </form>


          {/* SOCIAL ICON BUTTONS */}
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="border-border icon-btn hover:bg-primary/10 transition-all"
              onClick={() => window.open("https://github.com/aliasana", "_blank")}
            >
              <Github className="w-5 h-5 icon-hover" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="border-border icon-btn hover:bg-primary/10 transition-all"
              onClick={() =>
                window.open(
                  "https://linkedin.com/in/sana-alia-b68147250",
                  "_blank"
                )
              }
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

