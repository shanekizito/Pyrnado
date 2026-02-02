import { CodeWindow } from "@/components/docs/CodeWindow";
import { DocCallout } from "@/components/docs/DocCallout";
import { Badge } from "@/components/ui/badge";
import { Settings, Shield, Bell, Users, Key, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SettingsAPI() {
    return (
        <div className="space-y-16 max-w-5xl">
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <h1 className="text-4xl font-bold text-white tracking-tight">Settings API</h1>
                    <Badge variant="outline" className="border-zinc-500/20 text-zinc-400">Control V2</Badge>
                </div>
                <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl">
                    Configure your platform's operational parameters.
                    Manage API keys, environment variables, and organizational visibility.
                </p>
            </div>

            {/* --- ENDPOINT: GET ACCOUNT --- */}
            <section className="space-y-8">
                <div className="flex items-center gap-3">
                    <Badge className="bg-blue-500/10 text-blue-400 py-1 px-3 border border-blue-500/20 font-mono">GET</Badge>
                    <code className="text-xl font-mono text-white">/v1/settings/account</code>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-zinc-100">Account Details</h2>
                        <p className="text-zinc-400 text-sm">
                            Retrieve organization-wide settings, including tax IDs and primary contact info.
                        </p>
                        <ResponseCode code="200 OK" desc="Returns organization object." color="blue" />
                    </div>
                </div>
            </section>

            {/* --- ENDPOINT: ROTATE KEYS --- */}
            <section className="space-y-8 py-16 border-t border-white/5">
                <div className="flex items-center gap-3">
                    <Badge className="bg-red-500/10 text-red-400 py-1 px-3 border border-red-500/20 font-mono">POST</Badge>
                    <code className="text-xl font-mono text-white">/v1/settings/keys/rotate</code>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-zinc-100">Rotate API Keys</h2>
                        <p className="text-zinc-400 text-sm">
                            Generates new secret keys and schedules the old ones for expiration in 24 hours.
                        </p>
                        <ResponseCode code="201 Created" desc="New keys generated." color="red" />
                    </div>
                </div>
            </section>

            <DocCallout type="warning" title="Security Perimeter">
                Key rotation is a destructive operation. Ensure you have updated all your environment variables before the 24-hour grace period ends.
            </DocCallout>
        </div>
    );
}

function ResponseCode({ code, desc, color }: { code: string; desc: string; color: "emerald" | "blue" | "red" | "zinc" }) {
    const colorClasses = {
        emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        red: "bg-red-500/10 text-red-400 border-red-500/20",
        zinc: "bg-white/5 text-zinc-400 border-white/10"
    };

    return (
        <div className={cn("flex items-center gap-4 p-4 rounded-xl border", colorClasses[color])}>
            <span className="font-mono font-bold text-sm min-w-[100px]">{code}</span>
            <span className="text-xs opacity-80">{desc}</span>
        </div>
    );
}
