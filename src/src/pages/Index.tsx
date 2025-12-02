import SoftParticleBackground from "@/components/ParticleBackground";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import AutomationPlayground from "@/components/AutomationPlayground"; 
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SanaChatbot from "@/components/SanaChatbot";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <SoftParticleBackground />

      <Navigation />
      <Hero />
      <About />
      <Skills />
      <AutomationPlayground />
      <Projects />
      <Contact />
      <Footer />
      <SanaChatbot />
    </div>
  );
};

export default Index; 