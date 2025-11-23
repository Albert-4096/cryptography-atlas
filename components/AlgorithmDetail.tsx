import React, { useState, useEffect } from 'react';
import { Algorithm } from '../types';
import { ArrowLeft, ExternalLink, Play, RotateCcw, Check, X, Lock, Unlock, Hash, Key } from 'lucide-react';

interface AlgorithmDetailProps {
  algorithm: Algorithm;
  onBack: () => void;
}

const AlgorithmDetail: React.FC<AlgorithmDetailProps> = ({ algorithm, onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'math' | 'demo'>('overview');
  
  // Demo State
  const [inputText, setInputText] = useState("Hello World");
  const [keyText, setKeyText] = useState("SecretKey123");
  const [outputText, setOutputText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [demoStep, setDemoStep] = useState(0);

  // Reset demo when algorithm changes
  useEffect(() => {
    setDemoStep(0);
    setOutputText("");
    setIsAnimating(false);
  }, [algorithm]);

  // Mock "Crypto" Functions for Demo
  const runDemo = () => {
    setIsAnimating(true);
    setDemoStep(0);
    
    let stepCount = 0;
    const maxSteps = 5;
    
    const interval = setInterval(() => {
        stepCount++;
        setDemoStep(stepCount);
        
        if (stepCount >= maxSteps) {
            clearInterval(interval);
            setIsAnimating(false);
            
            // Generate deterministic "fake" output based on input
            if (algorithm.category.includes("Hash")) {
                // Simple hash simulation
                let hash = 0;
                for (let i = 0; i < inputText.length; i++) {
                    hash = ((hash << 5) - hash) + inputText.charCodeAt(i);
                    hash |= 0;
                }
                setOutputText("0x" + Math.abs(hash).toString(16).padStart(64, '0'));
            } else if (algorithm.category.includes("Symmetric")) {
                setOutputText(btoa(inputText.split('').map((c, i) => String.fromCharCode(c.charCodeAt(0) ^ keyText.charCodeAt(i % keyText.length))).join('')));
            } else {
                 setOutputText("Operation Complete: " + btoa(inputText).substring(0, 16) + "...");
            }
        }
    }, 600);
  };

  const renderVisualizer = () => {
    // A generic visualizer that changes based on step
    return (
        <div className="mt-8 bg-gray-900 rounded-xl p-6 shadow-inner border border-gray-700 relative overflow-hidden h-64 flex flex-col items-center justify-center">
            {isAnimating ? (
                 <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center z-10 backdrop-blur-sm">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500 mb-2"></div>
                        <p className="text-primary-400 text-sm font-mono">Processing Round {demoStep}/5...</p>
                    </div>
                 </div>
            ) : outputText && (
                <div className="text-green-400 font-mono text-lg animate-pulse">
                    Complete
                </div>
            )}

            {/* Abstract Visualization Grid */}
            <div className="grid grid-cols-4 gap-2 opacity-60">
                {Array.from({ length: 16 }).map((_, i) => (
                    <div 
                        key={i} 
                        className={`w-8 h-8 rounded border border-gray-700 flex items-center justify-center text-xs font-mono transition-colors duration-300
                            ${isAnimating && (i + demoStep) % 3 === 0 ? 'bg-primary-600 text-white' : 'bg-gray-800 text-gray-500'}
                        `}
                    >
                        {isAnimating ? Math.floor(Math.random() * 255).toString(16).padStart(2,'0') : '00'}
                    </div>
                ))}
            </div>
            <p className="mt-4 text-xs text-gray-500 font-mono">State Matrix Transformation</p>
        </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg pb-20 pt-20">
      {/* Top Header for Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <button 
            onClick={onBack} 
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-4 transition-colors"
        >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Atlas
        </button>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{algorithm.name}</h1>
                    <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded text-xs font-semibold uppercase tracking-wide">
                        {algorithm.year_published}
                    </span>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">{algorithm.full_name}</p>
            </div>
            <a 
                href={algorithm.original_paper_url} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
            >
                Read Paper <ExternalLink className="w-4 h-4 ml-2" />
            </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Content */}
            <div className="lg:col-span-2 space-y-8">
                {/* Overview Card */}
                <div className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Abstract</h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {algorithm.abstract}
                    </p>
                </div>

                {/* Mathematical Foundation */}
                <div className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Mathematical Foundation</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{algorithm.mathematical_foundation.overview}</p>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-800 dark:text-gray-200 overflow-x-auto border-l-4 border-primary-500">
                        <ul className="space-y-2">
                            {algorithm.mathematical_foundation.formulas.map((formula, idx) => (
                                <li key={idx} className="flex gap-3">
                                    <span className="text-gray-400 select-none">{idx + 1}.</span>
                                    <span>{formula}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Example Walkthrough */}
                <div className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                     <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Step-by-Step Example</h2>
                     <div className="space-y-4">
                        {algorithm.example_walkthrough.steps.map((step: string, i: number) => (
                            <div key={i} className="flex items-start">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 flex items-center justify-center text-xs font-bold mt-0.5">
                                    {i + 1}
                                </div>
                                <p className="ml-3 text-sm text-gray-600 dark:text-gray-300">{step}</p>
                            </div>
                        ))}
                     </div>
                </div>

                {/* Properties Grid */}
                <div className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Properties</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <PropertyCard 
                            label="Quantum Resistant" 
                            value={algorithm.security_properties.quantum_resistant ? "Yes" : "No"} 
                            status={algorithm.security_properties.quantum_resistant ? "good" : "bad"} 
                        />
                        <PropertyCard 
                            label="NIST Status" 
                            value={algorithm.security_properties.nist_status} 
                            status={algorithm.security_properties.nist_status.includes("Approved") ? "good" : "neutral"} 
                        />
                         <PropertyCard 
                            label="Complexity" 
                            value={algorithm.mathematical_foundation.complexity_class} 
                            status="neutral" 
                        />
                         <PropertyCard 
                            label="Block Size" 
                            value={algorithm.specifications.block_size ? `${algorithm.specifications.block_size} bits` : "N/A"} 
                            status="neutral" 
                        />
                         <PropertyCard 
                            label="Rounds" 
                            value={algorithm.specifications.rounds || "N/A"} 
                            status="neutral" 
                        />
                         <PropertyCard 
                            label="Throughput" 
                            value={algorithm.performance.throughput_mbps ? `~${algorithm.performance.throughput_mbps} MB/s` : "N/A"} 
                            status="good" 
                        />
                    </div>
                </div>
            </div>

            {/* Right Column: Interactive Demo */}
            <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                    
                    {/* Interactive Box */}
                    <div className="bg-white dark:bg-dark-card rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden ring-1 ring-black/5">
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                                <Cpu className="w-4 h-4 mr-2 text-primary-500" />
                                Live Demo
                            </h3>
                            <div className="flex gap-1">
                                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                                <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                            </div>
                        </div>
                        
                        <div className="p-6 space-y-4">
                            {/* Input Field */}
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Input Data</label>
                                <textarea 
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-sm font-mono focus:ring-2 focus:ring-primary-500 focus:outline-none dark:text-white h-20 resize-none"
                                />
                            </div>

                            {/* Key Field (Conditional) */}
                            {!algorithm.category.includes("Hash") && (
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Secret Key / Params</label>
                                    <input 
                                        type="text"
                                        value={keyText}
                                        onChange={(e) => setKeyText(e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-sm font-mono focus:ring-2 focus:ring-primary-500 focus:outline-none dark:text-white"
                                    />
                                </div>
                            )}

                            {/* Action Button */}
                            <button 
                                onClick={runDemo}
                                disabled={isAnimating}
                                className={`w-full py-3 rounded-lg font-medium text-white shadow-md transition-all transform active:scale-95 flex items-center justify-center
                                    ${isAnimating ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400'}
                                `}
                            >
                                {isAnimating ? (
                                    <>Processing...</>
                                ) : (
                                    <>
                                        <Play className="w-4 h-4 mr-2 fill-current" />
                                        Run Algorithm
                                    </>
                                )}
                            </button>

                            {/* Output */}
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Output</label>
                                <div className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 h-24 overflow-y-auto font-mono text-xs text-green-400 break-all relative">
                                    {outputText || <span className="text-gray-600 italic">// Waiting for input...</span>}
                                </div>
                            </div>
                        </div>

                        {/* Visualization Component */}
                        <div className="px-6 pb-6">
                            {renderVisualizer()}
                        </div>
                    </div>

                    {/* Use Cases List */}
                    <div className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Real World Applications</h3>
                        <ul className="space-y-3">
                            {algorithm.use_cases.map((useCase, idx) => (
                                <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                    <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                    {useCase}
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

const PropertyCard = ({ label, value, status }: { label: string, value: string, status: 'good' | 'bad' | 'neutral' }) => {
    const getColor = () => {
        switch(status) {
            case 'good': return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-900/30';
            case 'bad': return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900/30';
            default: return 'text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700';
        }
    };

    return (
        <div className={`p-3 rounded-lg border ${getColor()}`}>
            <div className="text-xs opacity-70 mb-1 font-medium uppercase tracking-wider">{label}</div>
            <div className="font-semibold text-sm">{value}</div>
        </div>
    )
}

// Icons
const Cpu = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 14h3"/><path d="M1 9h3"/><path d="M1 14h3"/></svg>

export default AlgorithmDetail;