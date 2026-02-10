import {useState, useEffect, useMemo, useRef} from 'react'
import { Member, Category } from '../types';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Search, Palette, X } from 'lucide-react';
import { CategoryMultiFilter } from '../components/ui/CategoryMultiFilter';
import { MemberCard } from '../components/ui/MemberCard';

const DirectoryView = ({ members, onSelectMember }: { members: Member[], onSelectMember: (m: Member) => void }) => {
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleCategory = (cat: Category) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const filtered = useMemo(() => {
    return members.filter(m => {
      const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(m.category);
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategories, members]);

  const suggestions = useMemo(() => {
    if (!search.trim()) return [];
    return members
      .filter(m => m.name.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 5);
  }, [search, members]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      <SectionHeading 
        title="Member Directory" 
        subtitle="Discover the incredible talent that defines the Lagos art scene. From veteran masters to emerging voices."
      />
      
      <div className="flex flex-col md:flex-row gap-6 mb-12 items-start md:items-center">
        <div className="relative flex-1 w-full" ref={suggestionRef}>
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={22} />
          <input 
            type="text"
            placeholder="Search by artist name..."
            className="w-full pl-14 pr-4 py-5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-800 transition shadow-sm font-medium"
            value={search}
            onFocus={() => setShowSuggestions(true)}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowSuggestions(true);
            }}
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-100 rounded-2xl shadow-2xl z-20 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2">
              {suggestions.map(member => (
                <button
                  key={member.id}
                  className="w-full text-left px-6 py-4 hover:bg-emerald-50 transition flex items-center space-x-4"
                  onClick={() => {
                    setSearch(member.name);
                    setShowSuggestions(false);
                  }}
                >
                  <img src={member.avatar} className="w-10 h-10 rounded-full object-cover border border-gray-100" alt={member.name} />
                  <div>
                    <p className="font-bold text-gray-800">{member.name}</p>
                    <p className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">{member.category}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <CategoryMultiFilter selected={selectedCategories} onToggle={toggleCategory} />

        {selectedCategories.length > 0 && (
          <button 
            onClick={() => setSelectedCategories([])}
            className="text-sm font-bold text-red-600 hover:text-red-700 transition"
          >
            Reset
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {selectedCategories.map(cat => (
          <span key={cat} className="flex items-center bg-emerald-50 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-bold border border-emerald-100">
            {cat}
            <button onClick={() => toggleCategory(cat)} className="ml-2.5 hover:text-emerald-900 transition-colors"><X size={14}/></button>
          </span>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map(member => (
            <MemberCard key={member.id} member={member} onClick={() => onSelectMember(member)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
          <Palette className="mx-auto text-gray-200 mb-6" size={80} />
          <h3 className="text-2xl font-bold text-gray-400 font-serif">No artists found in this category.</h3>
          <button onClick={() => { setSearch(''); setSelectedCategories([]); }} className="mt-6 text-emerald-800 font-bold underline">Reset all filters</button>
        </div>
      )}
    </div>
  );
};


export default DirectoryView