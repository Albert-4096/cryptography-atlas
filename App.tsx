import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import AlgorithmGrid from './components/AlgorithmGrid';
import AlgorithmDetail from './components/AlgorithmDetail';
import { ALGORITHMS } from './constants';
import { Algorithm } from './types';

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Check localStorage or system preference
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('theme');
        if (saved) return saved === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [selectedAlgoName, setSelectedAlgoName] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Apply dark mode class to html element
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Filter Algorithms
  const filteredAlgorithms = useMemo(() => {
    return ALGORITHMS.filter(algo => {
      const matchesSearch = 
        algo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        algo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        algo.use_cases.some(uc => uc.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = activeCategory === "All" || algo.category.includes(activeCategory);

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const selectedAlgorithm = ALGORITHMS.find(a => a.name === selectedAlgoName);

  const categories = ["All", "Symmetric", "Asymmetric", "Hash", "Key Exchange"];

  return (
    <div className="min-h-screen transition-colors duration-300">
      <Navbar 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        goHome={() => setSelectedAlgoName(null)}
      />

      {selectedAlgorithm ? (
        <AlgorithmDetail 
            algorithm={selectedAlgorithm} 
            onBack={() => setSelectedAlgoName(null)} 
        />
      ) : (
        <main className="pb-20">
            {/* Hero Section */}
            <div className="relative bg-white dark:bg-dark-bg overflow-hidden border-b border-gray-200 dark:border-gray-800">
                <div className="absolute inset-0 z-0">
                    {/* Abstract animated background */}
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-200/50 dark:bg-primary-900/20 rounded-full blur-3xl animate-pulse-slow"></div>
                    <div className="absolute top-40 -left-20 w-72 h-72 bg-purple-200/50 dark:bg-purple-900/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
                        Understand the Cryptography <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-400 dark:to-purple-400">
                            That Powers the Internet
                        </span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
                        Interactive visualizations of the algorithms securing your data. Explore AES, RSA, SHA-256 and more in stunning detail.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <button 
                            onClick={() => document.getElementById('grid')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary-600 hover:bg-primary-700 md:text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                        >
                            Start Exploring
                        </button>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="sticky top-16 z-40 bg-gray-50/90 dark:bg-dark-bg/90 backdrop-blur border-b border-gray-200 dark:border-gray-800 py-4" id="grid">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto space-x-2 scrollbar-hide">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                                activeCategory === cat 
                                    ? 'bg-primary-600 text-white shadow-md' 
                                    : 'bg-white dark:bg-dark-card text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <AlgorithmGrid 
                algorithms={filteredAlgorithms} 
                onSelect={setSelectedAlgoName} 
            />
        </main>
      )}
    </div>
  );
}

export default App;