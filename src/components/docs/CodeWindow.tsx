import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeWindowProps {
    title?: string;
    code: string;
    language?: string;
    showLineNumbers?: boolean;
    className?: string;
}

export function CodeWindow({ title, code, language = "bash", showLineNumbers = false, className }: CodeWindowProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const lines = code.trim().split("\n");

    return (
        <div className={cn("relative rounded-xl overflow-hidden bg-[#1E1E1E] border border-white/10 shadow-lg group", className)}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#2D2D2D] border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    {title && <span className="ml-3 text-xs font-mono text-zinc-400">{title}</span>}
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">{language}</span>
                    <button
                        onClick={handleCopy}
                        className="p-1.5 rounded-md hover:bg-white/10 transition-colors text-zinc-400 hover:text-white focus:outline-none"
                        aria-label="Copy code"
                    >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                </div>
            </div>

            {/* Code Content */}
            <div className="p-4 overflow-x-auto text-[13px] font-mono leading-relaxed custom-scrollbar">
                <table className="w-full border-collapse">
                    <tbody>
                        {lines.map((line, i) => (
                            <tr key={i}>
                                {showLineNumbers && (
                                    <td className="pr-4 text-right select-none text-zinc-700 w-[1%] whitespace-nowrap align-top">
                                        {i + 1}
                                    </td>
                                )}
                                <td className="text-zinc-300 whitespace-pre align-top">
                                    {/* Basic syntax coloring logic - in a real app, use prismjs or highlight.js */}
                                    <span dangerouslySetInnerHTML={{ __html: colorize(line, language) }} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Robust single-pass regex highlighter to prevent double-wrapping and tag corruption
const colorize = (code: string, lang: string) => {
    if (lang === 'bash') {
        return code.replace(/^\$ /g, '<span class="text-pink-500">$ </span>');
    }

    // Token definitions with priority (order matters)
    const tokenDefs = [
        { type: 'comment', regex: /\/\/.*/g, class: "text-zinc-500" },
        { type: 'key', regex: /"[^"]*"(?=\s*:)/g, class: "text-blue-300" },
        { type: 'string', regex: /"[^"]*"/g, class: "text-emerald-300" },
        { type: 'keyword', regex: /\b(import|export|const|let|var|function|return|if|else|async|await)\b/g, class: "text-purple-400" },
        { type: 'boolean', regex: /\b(true|false|null)\b/g, class: "text-orange-300" },
        { type: 'number', regex: /\b\d+(\.\d+)?\b/g, class: "text-orange-300" },
    ];

    interface Match {
        start: number;
        end: number;
        content: string;
        className: string;
    }

    let matches: Match[] = [];

    // Find all matches for all token types
    tokenDefs.forEach(def => {
        let match;
        // Reset regex state for global searches
        def.regex.lastIndex = 0;
        while ((match = def.regex.exec(code)) !== null) {
            matches.push({
                start: match.index,
                end: match.index + match[0].length,
                content: match[0],
                className: def.class
            });
        }
    });

    // Sort matches by start position, then by length (descending)
    matches.sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start));

    // Filter out overlapping matches
    let lastEnd = 0;
    const finalMatches: Match[] = [];
    for (const m of matches) {
        if (m.start >= lastEnd) {
            finalMatches.push(m);
            lastEnd = m.end;
        }
    }

    // Build the final HTML string
    let lastIndex = 0;
    let result = "";
    for (const m of finalMatches) {
        // Add plain text before the match
        result += escapeHtml(code.substring(lastIndex, m.start));
        // Add the marked-up token
        result += `<span class="${m.className}">${escapeHtml(m.content)}</span>`;
        lastIndex = m.end;
    }
    // Add remaining plain text
    result += escapeHtml(code.substring(lastIndex));

    return result;
};

// Helper to escape HTML characters in the code content
function escapeHtml(text: string) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
