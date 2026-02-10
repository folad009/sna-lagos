import React from 'react';
import { Member } from '../../types';
import { MapPin } from 'lucide-react';



export const MemberCard = ({
  member,
  onClick,
}: {
  member: Member;
  onClick: () => void;
  key?: React.Key;
}) => {
  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
    >
      <div className="relative h-80 overflow-hidden">
        <img
          src={member.avatar}
          alt={member.name}
          loading="lazy"
          className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
          <p className="text-white font-bold text-sm tracking-widest uppercase">
            View Portfolio
          </p>
        </div>
        <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-emerald-800 shadow-sm">
          {member.category}
        </div>
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold mb-2 group-hover:text-emerald-800 transition font-serif">
          {member.name}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-6 leading-relaxed">
          {member.bio}
        </p>
        <div className="flex items-center text-xs text-gray-400 font-bold uppercase tracking-wider">
          <MapPin size={14} className="mr-2 text-emerald-800" />
          {member.location}
        </div>
      </div>
    </div>
  );
};
