import React, { useState, useEffect } from 'react';

const script = [
    { text: "npm install vera-ai-sdk --save", cmd: true },
    { text: "npm WARN deprecated request@2.88.2", cmd: false, color: "text-yellow-500" },
    { text: "⸨░░░░░░░░░░░░░░░░⸩ ⠧ fetchMetadata: sill resolveWithNewModule...", cmd: false, color: "text-gray-500" },
    { text: "✔ Downloaded 47 packages in 2.3s", cmd: false, color: "text-green-400" },
    { text: "", cmd: false, pause: true },
    { text: "axobits build --app=charioteer", cmd: true },
    { text: "Compiling TypeScript modules...", cmd: false, color: "text-gray-500" },
    { text: "Bundling assets with Vite...", cmd: false, color: "text-gray-500" },
    { text: "✔ Build complete: dist/charioteer (2.4 MB)", cmd: false, color: "text-green-400" },
    { text: "", cmd: false, pause: true },
    { text: "vera-ai train --model=sentiment-analysis", cmd: true },
    { text: "Loading training dataset (12,847 samples)...", cmd: false, color: "text-gray-500" },
    { text: "Epoch 1/5: loss=0.432, accuracy=0.89", cmd: false, color: "text-cyan-400" },
    { text: "✔ Model trained and saved to models/sentiment-v2", cmd: false, color: "text-green-400" },
    { text: "", cmd: false, pause: true },
    { text: "charioteer deploy --env=production", cmd: true },
    { text: "Provisioning K8s cluster...", cmd: false, color: "text-gray-500" },
    { text: "Applying service mesh configuration...", cmd: false, color: "text-gray-500" },
    { text: "✔ Fleet management system live", cmd: false, color: "text-green-400" },
    { text: "", cmd: false, pause: true },
    { text: "npm run test:e2e", cmd: true },
    { text: "Running end-to-end test suite...", cmd: false, color: "text-gray-500" },
    { text: "✔ 127 tests passed | 0 failed | 0 skipped", cmd: false, color: "text-green-400" },
];

const TerminalSection: React.FC = () => {
    const [displayedLines, setDisplayedLines] = useState(script.slice(0, 4));
    const [currentLineIndex, setCurrentLineIndex] = useState(4);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        const currentScriptLine = script[currentLineIndex % script.length];
        let timeout: ReturnType<typeof setTimeout>;

        if (currentScriptLine.pause) {
            // Pause state - just show blinking cursor for longer
            timeout = setTimeout(() => {
                setCurrentLineIndex((prev) => prev + 1);
            }, 4500);
        } else if (currentScriptLine.cmd) {
            // Typing effect
            if (charIndex < currentScriptLine.text.length) {
                timeout = setTimeout(() => {
                    setCharIndex((prev) => prev + 1);
                }, 50 + Math.random() * 30);
            } else {
                // Finished typing, wait then next
                timeout = setTimeout(() => {
                    setDisplayedLines((prev) => [...prev, currentScriptLine].slice(-6));
                    setCharIndex(0);
                    setCurrentLineIndex((prev) => prev + 1);
                }, 800);
            }
        } else {
            // Output line (delay then show)
            timeout = setTimeout(() => {
                setDisplayedLines((prev) => [...prev, currentScriptLine].slice(-6));
                setCurrentLineIndex((prev) => prev + 1);
            }, 400);
        }

        return () => clearTimeout(timeout);
    }, [charIndex, currentLineIndex]);

    return (
        <section className="py-32 bg-black relative overflow-hidden" id="about">
            <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            {/* Changed container to max-w-7xl and added responsive padding for better margins */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="reveal text-4xl md:text-6xl font-semibold mb-8 leading-tight font-display">Serious software, <br /> built with <span className="brand-gradient">discipline</span>.</h2>
                        <div className="space-y-8">
                            <div className="reveal delay-100 flex gap-4">
                                <div className="mt-1 w-8 h-8 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-400 shrink-0 font-bold">1</div>
                                <div>
                                    <h4 className="text-xl font-semibold mb-2">Build with operational clarity</h4>
                                    <p className="text-gray-400 leading-relaxed">Observability, predictable rollouts, and maintainable systems from day one.</p>
                                </div>
                            </div>
                            <div className="reveal delay-200 flex gap-4">
                                <div className="mt-1 w-8 h-8 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-400 shrink-0 font-bold">2</div>
                                <div>
                                    <h4 className="text-xl font-semibold mb-2">Use AI responsibly</h4>
                                    <p className="text-gray-400 leading-relaxed">Automation and insights that stay auditable, secure, and under your control.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="reveal delay-200 relative">
                        <div className="relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 backdrop-blur-xl h-[340px] flex flex-col">
                            <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4 shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                                </div>
                                <div className="text-xs text-gray-600 font-mono">terminal —-zsh</div>
                            </div>
                            <div className="font-mono text-sm space-y-3 overflow-hidden flex-1">
                                {displayedLines.map((line, i) => (
                                    <div key={i} className={line.cmd ? "flex" : ""}>
                                        {line.cmd && <span className="text-brand-500 mr-2">➜</span>}
                                        <span className={line.color || "text-white"}>{line.text}</span>
                                    </div>
                                ))}
                                {script[currentLineIndex % script.length].cmd && (
                                    <div className="flex">
                                        <span className="text-brand-500 mr-2">➜</span>
                                        <span className="text-white">
                                            {script[currentLineIndex % script.length].text.substring(0, charIndex)}
                                            <span className="animate-pulse">_</span>
                                        </span>
                                    </div>
                                )}
                                {script[currentLineIndex % script.length].pause && (
                                    <div className="flex">
                                        <span className="text-brand-500 mr-2">➜</span>
                                        <span className="text-white animate-pulse">_</span>
                                    </div>
                                )}
                                {!script[currentLineIndex % script.length].cmd && !script[currentLineIndex % script.length].pause && (
                                    <div className="animate-pulse text-transparent">_</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TerminalSection;
