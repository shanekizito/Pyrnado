import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Simplified world map dots - key financial hubs
const locations = [
  { id: "sf", name: "San Francisco", x: 15, y: 38, region: "Americas" },
  { id: "ny", name: "New York", x: 25, y: 35, region: "Americas" },
  { id: "london", name: "London", x: 48, y: 28, region: "Europe" },
  { id: "lagos", name: "Lagos", x: 50, y: 52, region: "Africa" },
  { id: "nairobi", name: "Nairobi", x: 58, y: 54, region: "Africa" },
  { id: "dubai", name: "Dubai", x: 62, y: 42, region: "Middle East" },
  { id: "singapore", name: "Singapore", x: 78, y: 55, region: "Asia" },
  { id: "tokyo", name: "Tokyo", x: 88, y: 36, region: "Asia" },
];

// Payment flows between locations
const flows = [
  { from: "sf", to: "lagos", amount: "$12,400" },
  { from: "ny", to: "nairobi", amount: "$8,200" },
  { from: "london", to: "lagos", amount: "$24,600" },
  { from: "dubai", to: "nairobi", amount: "$5,800" },
  { from: "singapore", to: "lagos", amount: "$15,200" },
];

export function WorldMapSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFlow, setActiveFlow] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveFlow((prev) => (prev + 1) % flows.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isInView]);

  const getLocation = (id: string) => locations.find((l) => l.id === id)!;

  return (
    <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-center" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="tag tag-accent mb-4">Global Network</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Move money across
            <br />
            <span className="text-emerald-400">borders instantly</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time stablecoin payments flowing between 45+ countries.
            Watch your money move in seconds, not days.
          </p>
        </motion.div>

        {/* Map container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative glass rounded-3xl p-8 lg:p-12"
        >
          {/* World map SVG */}
          <div className="relative aspect-[2/1] w-full">
            <svg
              viewBox="0 0 100 60"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Grid lines */}
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="hsl(222 30% 15%)" strokeWidth="0.1" />
                </pattern>
                <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(160 84% 50%)" stopOpacity="0" />
                  <stop offset="50%" stopColor="hsl(160 84% 50%)" stopOpacity="1" />
                  <stop offset="100%" stopColor="hsl(190 90% 50%)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <rect width="100" height="60" fill="url(#grid)" />

              {/* Payment flow lines */}
              {flows.map((flow, index) => {
                const from = getLocation(flow.from);
                const to = getLocation(flow.to);
                const isActive = index === activeFlow;

                // Curved path
                const midX = (from.x + to.x) / 2;
                const midY = Math.min(from.y, to.y) - 10;

                return (
                  <g key={`${flow.from}-${flow.to}`}>
                    {/* Static line */}
                    <path
                      d={`M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`}
                      fill="none"
                      stroke="hsl(160 84% 50%)"
                      strokeWidth="0.15"
                      strokeOpacity={isActive ? 0.3 : 0.1}
                    />

                    {/* Animated flow */}
                    {isActive && (
                      <motion.circle
                        r="0.8"
                        fill="hsl(160 84% 50%)"
                        filter="url(#glow)"
                        initial={{ offsetDistance: "0%" }}
                        animate={{ offsetDistance: "100%" }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        style={{
                          offsetPath: `path("M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}")`,
                        }}
                      >
                        <animate
                          attributeName="opacity"
                          values="0;1;1;0"
                          dur="2s"
                          repeatCount="1"
                        />
                      </motion.circle>
                    )}
                  </g>
                );
              })}

              {/* Location dots */}
              {locations.map((loc) => {
                const isSource = flows[activeFlow]?.from === loc.id;
                const isTarget = flows[activeFlow]?.to === loc.id;
                const isActive = isSource || isTarget;

                return (
                  <g key={loc.id}>
                    {/* Ping effect for active locations */}
                    {isActive && (
                      <circle
                        cx={loc.x}
                        cy={loc.y}
                        r="1"
                        fill="none"
                        stroke={isTarget ? "hsl(160 84% 50%)" : "hsl(190 90% 50%)"}
                        strokeWidth="0.2"
                        className="animate-ping-slow"
                      />
                    )}

                    {/* Main dot */}
                    <circle
                      cx={loc.x}
                      cy={loc.y}
                      r={isActive ? "0.8" : "0.5"}
                      fill={isActive ? "hsl(160 84% 50%)" : "hsl(215 20% 55%)"}
                      className="transition-all duration-300"
                    />

                    {/* Glow for active */}
                    {isActive && (
                      <circle
                        cx={loc.x}
                        cy={loc.y}
                        r="1.5"
                        fill="hsl(160 84% 50%)"
                        opacity="0.3"
                      />
                    )}
                  </g>
                );
              })}

              {/* Glow filter */}
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="0.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </svg>

            {/* Location labels */}
            {locations.map((loc) => {
              const isSource = flows[activeFlow]?.from === loc.id;
              const isTarget = flows[activeFlow]?.to === loc.id;
              const isActive = isSource || isTarget;

              return (
                <motion.div
                  key={loc.id}
                  className={`absolute text-xs font-medium transition-all duration-300 ${isActive ? "text-foreground" : "text-muted-foreground"
                    }`}
                  style={{
                    left: `${loc.x}%`,
                    top: `${loc.y}%`,
                    transform: "translate(-50%, 16px)",
                  }}
                  animate={{ opacity: isActive ? 1 : 0.5 }}
                >
                  {loc.name}
                </motion.div>
              );
            })}
          </div>

          {/* Active flow info */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            <div className="glass-subtle rounded-xl px-6 py-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-sm text-muted-foreground">
                  {getLocation(flows[activeFlow].from).name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-12 h-1" viewBox="0 0 48 4">
                  <path
                    d="M0 2h40l-4-2m4 2l-4 2"
                    fill="none"
                    stroke="hsl(160 84% 50%)"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-secondary font-semibold font-display text-lg">
                  {flows[activeFlow].amount}
                </span>
                <svg className="w-12 h-1" viewBox="0 0 48 4">
                  <path
                    d="M0 2h40l-4-2m4 2l-4 2"
                    fill="none"
                    stroke="hsl(160 84% 50%)"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <span className="text-sm text-muted-foreground">
                  {getLocation(flows[activeFlow].to).name}
                </span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Settlement Time</p>
              <p className="text-secondary font-display font-bold text-2xl">2.4s</p>
            </div>
          </div>
        </motion.div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
        >
          {[
            { label: "Countries", value: "45+" },
            { label: "Avg Settlement", value: "<3s" },
            { label: "Fee Savings", value: "80%" },
            { label: "Uptime", value: "99.99%" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}