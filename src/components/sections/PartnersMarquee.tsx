import { motion } from "framer-motion";

const partners = [
  "Circle", "Chainalysis", "M-Pesa", "Safaricom", "Flutterwave", 
  "Chipper", "Yellow Card", "Paystack", "Celo", "Base"
];

export function PartnersMarquee() {
  return (
    <section className="py-16 border-y border-border bg-muted/30 overflow-hidden">
      <div className="container mx-auto mb-8">
        <p className="text-center text-sm font-mono text-muted-foreground uppercase tracking-wider">
          Trusted by leading fintechs and exchanges
        </p>
      </div>
      
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        {/* Marquee */}
        <div className="flex animate-marquee">
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-8 lg:mx-12"
            >
              <span className="text-xl lg:text-2xl font-display font-semibold text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors whitespace-nowrap">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
