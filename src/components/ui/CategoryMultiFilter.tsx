import {useState} from 'react';
import { Category } from '@/src/types';
import { CATEGORIES } from '@/src/data/mockData';
import { Filter, ChevronRight } from 'lucide-react';


export const CategoryMultiFilter = ({ selected, onToggle }: { selected: Category[], onToggle: (cat: Category) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between min-w-[240px] px-6 py-4 bg-white border border-gray-200 rounded-2xl text-gray-700 font-bold hover:border-emerald-300 transition shadow-sm"
      >
        <span className="flex items-center">
          <Filter size={18} className="mr-3 text-emerald-800" />
          {selected.length === 0 ? "All Categories" : `${selected.length} Selected`}
        </span>
        <ChevronRight size={18} className={`transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
          <div className="absolute left-0 top-full mt-3 w-full bg-white border border-gray-100 rounded-2xl shadow-2xl z-20 py-3 overflow-hidden animate-in fade-in slide-in-from-top-2">
            {CATEGORIES.map(cat => (
              <label 
                key={cat}
                className="flex items-center px-4 py-3.5 hover:bg-emerald-50 cursor-pointer transition"
              >
                <input 
                  type="checkbox"
                  className="w-5 h-5 rounded border-gray-300 text-emerald-800 focus:ring-emerald-800 mr-4"
                  checked={selected.includes(cat)}
                  onChange={() => onToggle(cat)}
                />
                <span className={`text-sm font-bold ${selected.includes(cat) ? 'text-emerald-800' : 'text-gray-600'}`}>{cat}</span>
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
};