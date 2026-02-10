import React, {useState} from 'react'
import { SectionHeading } from '../components/ui/SectionHeading';
import { CATEGORIES } from '../data/mockData';
import { ArrowLeft, Save } from 'lucide-react';


const EditProfileView = ({ user, onBack }: { user: any, onBack: () => void }) => {
  const [saving, setSaving] = useState(false);
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      onBack();
    }, 1000);
  };

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={onBack} className="flex items-center text-gray-500 hover:text-emerald-800 mb-8 font-semibold transition group"><ArrowLeft size={20} className="mr-2 transition-transform group-hover:-translate-x-1" /> Back to Dashboard</button>
        <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-gray-100">
          <SectionHeading title="Edit Profile Details" subtitle="Update your professional information and portfolio to attract collectors." />
          <form onSubmit={handleSave} className="space-y-8 mt-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Full Professional Name</label>
                <input type="text" defaultValue={user.name} className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-800 focus:outline-none transition-all shadow-sm"/>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Primary Category</label>
                <select className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-800 focus:outline-none transition-all shadow-sm bg-white">
                  {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Artist Statement / Bio</label>
              <textarea rows={6} className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-800 focus:outline-none transition-all shadow-sm" placeholder="Write about your artistic journey..."></textarea>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Public Contact Email</label>
                <input type="email" defaultValue={user.email} className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-800 focus:outline-none transition-all shadow-sm"/>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Studio Location</label>
                <input type="text" placeholder="e.g. Victoria Island, Lagos" className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-800 focus:outline-none transition-all shadow-sm"/>
              </div>
            </div>
            <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
              <button type="button" onClick={onBack} className="text-gray-500 font-bold hover:text-gray-800 transition-colors">Cancel Changes</button>
              <button type="submit" disabled={saving} className="bg-emerald-800 text-white px-10 py-4 rounded-xl font-bold flex items-center space-x-2 shadow-lg hover:bg-emerald-900 transition-all hover:scale-105 active:scale-95">
                {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <><Save size={18} /><span>Save Profile Changes</span></>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileView