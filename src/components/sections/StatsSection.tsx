import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 10000000000, prefix: "$", suffix: "", label: "Target Annual Volume", format: "currency" },
  { value: 70000000, prefix: "$", suffix: "", label: "Projected Revenue", format: "currency" },
  { value: 40, prefix: "", suffix: "+", label: "Countries Supported", format: "number" },
  { value: 3, prefix: "<", suffix: "s", label: "Settlement Time", format: "number" },
];

function AnimatedCounter({
  value,
  prefix,
  suffix,
  format,
  isInView,
}: {
  value: number;
  prefix: string;
  suffix: string;
  format: string;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / 1500, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(eased * value);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value]);

  const formatValue = (num: number) => {
    if (format === "currency") {
      if (num >= 1000000000) return (num / 1000000000).toFixed(0) + "B";
      if (num >= 1000000) return Math.round(num / 1000000) + "M";
      if (num >= 1000) return Math.round(num / 1000) + "K";
    }
    return Math.round(num).toString();
  };

  return (
    <span className="stat-value text-5xl sm:text-6xl lg:text-7xl text-white">
      {prefix}{formatValue(count)}{suffix}
    </span>
  );
}

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 lg:py-40 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-accent/8 rounded-full blur-[150px]" />
      </div>
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="container mx-auto relative z-10 px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Built for <span className="text-emerald-400">scale</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Targeting the high-volume Kenya-Nigeria corridor first, then expanding across Africa, LATAM, and Asia.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <AnimatedCounter
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                format={stat.format}
                isInView={isInView}
              />
              <p className="text-muted-foreground text-base mt-4 font-semibold uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}