import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, X, Zap } from "lucide-react";

const comparisonData = {
  headers: ["Feature", "Pyrnado", "Wise", "Payoneer", "Western Union"],
  rows: [
    {
      feature: "Settlement Time",
      pyrnado: "< 3 seconds",
      wise: "1-2 days",
      payoneer: "2-5 days",
      wu: "Minutes-days",
      winner: true,
    },
    {
      feature: "Fee to Nigeria",
      pyrnado: "0.5%",
      wise: "3.5%",
      payoneer: "3%",
      wu: "5-10%",
      winner: true,
    },
    {
      feature: "Smart Escrow",
      pyrnado: true,
      wise: false,
      payoneer: false,
      wu: false,
      winner: true,
    },
    {
      feature: "M-Pesa Cash-out",
      pyrnado: true,
      wise: "Limited",
      payoneer: false,
      wu: true,
    },
    {
      feature: "On-Chain Audit",
      pyrnado: true,
      wise: false,
      payoneer: false,
      wu: false,
      winner: true,
    },
    {
      feature: "Non-Custodial",
      pyrnado: true,
      wise: false,
      payoneer: false,
      wu: false,
    },
  ],
};

function CellValue({ value, isPyrnado = false }: { value: boolean | string; isPyrnado?: boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <div className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${isPyrnado ? "bg-emerald-500/20" : "bg-muted"
        }`}>
        <Check className={`w-4 h-4 ${isPyrnado ? "text-emerald-400" : "text-muted-foreground"}`} />
      </div>
    ) : (
      <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-muted/50">
        <X className="w-4 h-4 text-zinc-500" />
      </div>
    );
  }
  return (
    <span className={`text-sm ${isPyrnado ? "text-white font-bold" : "text-zinc-300 font-medium"}`}>
      {value}
    </span>
  );
}

export function ComparisonSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 lg:py-40 relative">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="tag tag-muted mb-6 inline-block">Comparison</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight">
            Stop overpaying for
            <br />
            <span className="text-emerald-400">slow transfers</span>
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed">
            See why global teams are switching to Pyrnado Network.
          </p>
        </motion.div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl overflow-hidden border border-white/10 bg-black/40"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-white/10">
                  {comparisonData.headers.map((header, index) => (
                    <th
                      key={header}
                      className={`px-8 py-6 text-left text-base font-bold ${index === 1
                        ? "text-white bg-white/5 border-x border-white/5"
                        : "text-white"
                        }`}
                    >
                      {index === 1 && (
                        <div className="flex items-center gap-2.5">
                          <Zap className="w-5 h-5 text-emerald-400" />
                          {header}
                        </div>
                      )}
                      {index !== 1 && header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonData.rows.map((row, rowIndex) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors ${rowIndex % 2 === 1 ? "bg-white/[0.02]" : ""
                      }`}
                  >
                    <td className="px-8 py-5 text-base font-semibold text-white">
                      {row.feature}
                    </td>
                    <td className="px-8 py-5 bg-white/5 border-x border-white/5">
                      <div className="flex items-center gap-3">
                        <CellValue value={row.pyrnado} isPyrnado />
                        {row.winner && (
                          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold uppercase tracking-wide border border-emerald-500/20">
                            Best
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <CellValue value={row.wise} />
                    </td>
                    <td className="px-8 py-5">
                      <CellValue value={row.payoneer} />
                    </td>
                    <td className="px-8 py-5">
                      <CellValue value={row.wu} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          * Fees based on standard USD to NGN/KES transfers as of January 2026.
        </motion.p>
      </div>
    </section>
  );
}