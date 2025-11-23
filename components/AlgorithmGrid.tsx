import React from 'react';
import { Algorithm } from '../types';
import { ChevronRight, Shield, Cpu, Key, Hash, Search } from 'lucide-react';

interface AlgorithmGridProps {
  algorithms: Algorithm[];
  onSelect: (id: string) => void;
}

const AlgorithmGrid: React.FC<AlgorithmGridProps> = ({ algorithms, onSelect }) => {
  const getIcon = (category: string) => {
    if (category.includes("Symmetric")) return <Shield className="w-5 h-5" />;
    if (category.includes("Asymmetric")) return <Key className="w-5 h-5" />;
    if (category.includes("Hash")) return <Hash className="w-5 h-5" />;
    return <Cpu className="w-5 h-5" />;
  };

  const getBadgeColor = (category: string) => {
    if (category.includes("Symmetric")) return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    if (category.includes("Asymmetric")) return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
    if (category.includes("Hash")) return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
  };

  if (algorithms.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">No algorithms found</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">Try adjusting your search query or filters.</p>
          </div>
      )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 max-w-7xl mx-auto">
      {algorithms.map((algo) => (
        <div 
          key={algo.name}
          onClick={() => onSelect(algo.name)}
          className="group relative bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl hover:scale-[1.02] hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
        >
          <div className="p-6 flex-1">
            <div className="flex justify-between items-start mb-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeColor(algo.category)}`}>
                {getIcon(algo.category)}
                <span className="ml-1.5">{algo.category.split(' ')[0]}</span>
              </span>
              <span className="text-xs text-gray-400 font-mono border border-gray-200 dark:border-gray-700 rounded px-1.5 py-0.5">
                {algo.year_published}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {algo.name}
            </h3>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {algo.abstract}
            </p>

            <div className="space-y-2 mb-4">
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <span className="w-20 font-semibold">Security:</span>
                    <span className={algo.security_properties.quantum_resistant ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"}>
                        {algo.security_properties.quantum_resistant ? "Quantum Safe" : "Classical Only"}
                    </span>
                </div>
                 <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <span className="w-20 font-semibold">Uses:</span>
                    <span className="truncate">{algo.use_cases[0]}</span>
                </div>
            </div>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center group-hover:bg-primary-50 dark:group-hover:bg-primary-900/10 transition-colors">
            <span className="text-sm font-medium text-primary-600 dark:text-primary-400">Explore Algorithm</span>
            <ChevronRight className="w-4 h-4 text-primary-600 dark:text-primary-400 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlgorithmGrid;