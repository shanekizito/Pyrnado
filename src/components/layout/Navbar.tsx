import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { PyrnadoLogo } from "@/components/ui/PyrnadoLogo";

const navLinks = [
  { label: "Features", href: "/features" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Developers", href: "/docs", hasDropdown: true },
  { label: "Resources", href: "/resources", hasDropdown: true },
  { label: "Company", href: "/company", hasDropdown: true },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-6 inset-x-0 z-50 flex justify-center pointer-events-none px-4">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className={cn(
            "pointer-events-auto rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl shadow-lg transition-all duration-300 flex items-center justify-between",
            isScrolled ? "py-2.5 px-4 w-full max-w-5xl mx-auto mt-4" : "py-3 px-6 w-full container mx-auto"
          )
          }>
          {/* Left: Logo */}
          <Link to="/" className="flex items-center gap-3 mr-8">
            <PyrnadoLogo size="sm" />
          </Link>

          {/* Center: Nav Links */}
          <div className="hidden lg:flex items-center gap-6 mr-auto">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-1 group/link"
              >
                {link.label}
                {link.hasDropdown && <ChevronDown className="w-3 h-3 opacity-50 group-hover/link:opacity-100 transition-opacity" />}
              </Link>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Log in
            </Link>

            <Link to="/signup">
              <Button className="bg-emerald-500 text-black font-bold px-6 py-2 rounded-xl hover:bg-emerald-400 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.4)] transition-all duration-300">
                Get Started
              </Button>
            </Link>

            <button className="w-10 h-10 flex items-center justify-center rounded-xl text-white hover:bg-white/10 transition-colors ml-1">
              <Globe className="w-4 h-4" />
              <ChevronDown className="w-3 h-3 ml-1 opacity-50" />
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-24 z-40 lg:hidden"
          >
            <div className="bg-[#111] border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 text-lg font-semibold text-zinc-300 hover:text-white transition-colors"
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </Link>
              ))}
              <div className="h-px bg-white/10 my-2" />
              <div className="flex flex-col gap-3">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-center py-2 text-zinc-400 font-medium">
                  Log in
                </Link>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-emerald-500 text-black font-bold py-3 rounded-xl hover:bg-emerald-400 transition-all">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}