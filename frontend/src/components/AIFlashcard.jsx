import React, { useState } from 'react';
import { Sparkles, Brain, RotateCcw, ArrowRight, BookOpen } from 'lucide-react';

const AIFlashcard = ({ title, summary, content, category }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="group perspective-1000 w-full h-[320px] cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div className={`relative w-full h-full duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>

                {/* Front Side */}
                <div className="absolute inset-0 backface-hidden rounded-2xl p-8 bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-white/10 flex flex-col justify-between shadow-[0_0_20px_rgba(0,0,0,0.3)] overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute top-0 right-0 p-10 opacity-5">
                        <Brain size={120} />
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-2 py-1 rounded-md bg-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest border border-indigo-500/20">
                                {category || 'Course Module'}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-white leading-tight group-hover:text-indigo-300 transition-colors">
                            {title}
                        </h3>
                    </div>

                    <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-tighter">
                            <Sparkles size={14} className="text-indigo-400" /> AI INSIGHT SOURCE
                        </div>
                        <div className="p-2 rounded-full bg-white/5 group-hover:bg-indigo-500/20 transition-all duration-300">
                            <RotateCcw size={18} className="text-white/40 group-hover:text-indigo-400 group-hover:rotate-45" />
                        </div>
                    </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl p-8 bg-slate-900 border border-indigo-500/30 flex flex-col shadow-[0_0_40px_rgba(99,102,241,0.15)]">
                    <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                        <BookOpen size={16} className="text-indigo-400" />
                        <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400">Condensed Summary</h4>
                    </div>

                    <p className="text-sm md:text-md text-white/90 leading-relaxed font-medium italic">
                        "{summary || content.substring(0, 150) + '...'}"
                    </p>

                    <div className="mt-auto pt-6 flex flex-col gap-3">
                        <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> neural verification active
                        </div>
                        <button className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-xs font-bold text-white flex items-center justify-between group/btn transition-all duration-300">
                            DEEP DIVE COMPLETE <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

            </div>

            {/* Tailwind helper styles for 3D */}
            <style jsx>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
        </div>
    );
};

export default AIFlashcard;
