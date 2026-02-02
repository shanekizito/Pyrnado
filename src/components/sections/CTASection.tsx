import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Zap, Shield, Clock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 lg:py-40 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[180px]" />
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="container mx-auto relative z-10 px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass rounded-[2.5rem] p-12 lg:p-20 text-center max-w-5xl mx-auto"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 tag tag-accent mb-8">
            <Zap className="w-4 h-4" />
            Now live in Kenya-Nigeria corridor
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8 leading-tight">
            Everything you need <br />
            to scale globally.
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Replace broken payment rails with unified stablecoin infrastructure.
            Start free — no credit card required.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link to="/pricing">
              <Button
                size="lg"
                className="btn-accent px-10 py-7 text-lg group w-full sm:w-auto"
              >
                Start free trial
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="outline"
                size="lg"
                className="btn-ghost px-10 py-7 text-lg w-full sm:w-auto"
              >
                Book a demo
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-10">
            {[
              { icon: Shield, label: "SOC 2 & KYC/AML" },
              { icon: Clock, label: "< 3s Settlement" },
              { icon: Globe, label: "40+ Countries" },
              { icon: Zap, label: "Polygon & Base" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 text-base font-semibold text-muted-foreground">
                <item.icon className="w-6 h-6 text-accent" />
                {item.label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}