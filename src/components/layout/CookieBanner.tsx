import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie, ShieldCheck, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useMetrics } from '@/hooks/useMetrics';

export const CookieBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { trackEvent } = useMetrics();

    useEffect(() => {
        const consent = localStorage.getItem('gp-consent');
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('gp-consent', 'true');
        setIsVisible(false);
        trackEvent({
            category: 'Compliance',
            action: 'Cookies Accepted',
            label: 'Full Consent'
        });
    };

    const handleDecline = () => {
        localStorage.setItem('gp-consent', 'false');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-0 left-0 right-0 z-[100] w-full"
                >
                    <div className="relative bg-background/95 backdrop-blur-xl border-t border-border shadow-[0_-8px_30px_rgba(0,0,0,0.04)] px-6 py-4 sm:px-8 sm:py-5 flex flex-col md:flex-row items-center justify-between gap-6">

                        <div className="flex items-start gap-4 flex-1">
                            <div className="space-y-1.5">
                                <p className="text-[13px] text-muted-foreground leading-relaxed max-w-4xl">
                                    We use cookies and similar technologies on our websites to enhance and tailor your experience, analyze our traffic, and for security and marketing.
                                    You can choose not to allow some type of cookies by clicking <span className="text-primary font-bold cursor-pointer hover:underline">Manage Settings</span>.
                                    For more information see our <span className="text-primary font-bold cursor-pointer hover:underline">Cookie Policy</span>.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 w-full md:w-auto">
                            <button
                                onClick={() => setIsVisible(false)}
                                className="text-[14px] font-bold text-primary hover:text-primary/80 transition-colors whitespace-nowrap"
                            >
                                Manage settings
                            </button>

                            <Button
                                onClick={handleAccept}
                                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-2.5 rounded-lg h-auto transition-all flex-1 md:flex-none whitespace-nowrap"
                            >
                                Accept all
                            </Button>

                            <button
                                onClick={handleDecline}
                                className="p-1.5 rounded-full bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Tactile Noise Texture Overlay */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] dark:opacity-[0.05] pointer-events-none" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
