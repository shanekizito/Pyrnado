import { Github, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { PyrnadoLogo } from "@/components/ui/PyrnadoLogo";

const footerLinks = {
  Products: [
    { label: "Global Payroll", href: "/features#payroll" },
    { label: "Smart Escrow", href: "/features#escrow" },
    { label: "Remittances", href: "/features#remit" },
    { label: "API", href: "/features#api" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/about" },
    { label: "Press", href: "/contact" },
    { label: "Contact", href: "/contact" },
  ],
  Resources: [
    { label: "Pricing", href: "/pricing" },
    { label: "Use Cases", href: "/use-cases" },
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Compliance", href: "#" },
    { label: "Licenses", href: "#" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-16 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-10 lg:mb-0">
            <Link to="/">
              <PyrnadoLogo size="md" className="mb-6" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Pyrnado is the financial OS for boundary-less teams. Global payroll, smart escrow, and treasury management in one unified platform.
              Stablecoin-powered infrastructure for Africa, LATAM, and Asia.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-11 h-11 rounded-xl bg-muted/50 flex items-center justify-center hover:bg-muted transition-all text-muted-foreground hover:text-foreground"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-6 text-foreground">
                {category}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-foreground text-base transition-colors font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-10 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Pyrnado Network. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-muted-foreground text-sm flex items-center gap-2.5 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
              All systems operational
            </span>
            <span className="text-muted-foreground text-sm">
              Built on Polygon & Base
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
