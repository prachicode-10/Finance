import React from 'react';
import { ArrowRight, Activity, Zap, Layers } from 'lucide-react';

const AIFlowchart = ({ data, themeColor = 'var(--secondary)' }) => {
    if (!data || !data.nodes) return null;

    return (
        <div className="w-full bg-white/3 p-6 rounded-2xl border border-white/10 relative overflow-hidden group">
            {/* Background Decorative Element */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-8">
                    <div className="p-2 bg-indigo-500/20 rounded-lg">
                        <Activity size={18} className="text-indigo-400" />
                    </div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-white/70">Neural Logic Flow</h4>
                </div>

                <div className="flex flex-wrap items-start justify-center gap-8 md:gap-12 py-10">
                    {data.nodes.map((node, index) => (
                        <React.Fragment key={node.id}>
                            <div className="relative flex flex-col items-center">
                                {/* Node Card */}
                                <div
                                    className={`
                    w-36 h-24 md:w-44 md:h-28 flex flex-col items-center justify-center p-4 rounded-xl text-center
                    border transition-all duration-500 hover:scale-105 hover:shadow-2xl
                    ${node.type === 'source' ? 'bg-indigo-500/20 border-indigo-500/40' :
                                            node.type === 'asset' ? 'bg-emerald-500/20 border-emerald-500/40' :
                                                node.type === 'process' ? 'bg-amber-500/20 border-amber-500/40' :
                                                    node.type === 'multiplier' ? 'bg-purple-500/20 border-purple-500/40' :
                                                        'bg-white/10 border-white/20'}
                  `}
                                >
                                    <div className="mb-2">
                                        {node.type === 'source' && <Zap size={20} className="text-indigo-400" />}
                                        {(node.type === 'asset' || node.type === 'result') && <Layers size={20} className="text-emerald-400" />}
                                        {(node.type === 'process' || node.type === 'multiplier') && <Activity size={20} className="text-amber-400" />}
                                    </div>
                                    <span className="text-xs md:text-sm font-bold text-white leading-tight">
                                        {node.label}
                                    </span>
                                </div>

                                {/* Vertical label for node type */}
                                <span className="absolute -bottom-6 text-[10px] font-black uppercase tracking-tighter text-white/30">
                                    {node.type}
                                </span>

                                {/* Connection Arrow (if not last) */}
                                {index < data.nodes.length - 1 && (
                                    <div className="hidden md:flex absolute -right-8 top-1/2 -translate-y-1/2">
                                        <ArrowRight size={24} className="text-white/20 animate-pulse" />
                                    </div>
                                )}
                            </div>
                        </React.Fragment>
                    ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full bg-indigo-500 border-2 border-slate-900" />
                            <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-slate-900" />
                            <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold">+3</div>
                        </div>
                        <span className="text-xs text-white/40 font-medium">Synced with market live node</span>
                    </div>
                    <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 group">
                        INSIGHT DATA <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIFlowchart;
