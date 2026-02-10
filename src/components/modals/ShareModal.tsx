import { useState } from "react";
import {
  Twitter,
  Facebook,
  MessageCircle,
  Linkedin,
  X,
  Share2,
  Check,
  Copy,
} from "lucide-react";
import { Member } from "@/src/types";

export const ShareModal = ({
  isOpen,
  onClose,
  member,
}: {
  isOpen: boolean;
  onClose: () => void;
  member: Member;
}) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = window.location.href;
  const shareText = `Check out ${member.name}'s portfolio on the Society of Nigerian Artists (Lagos) Directory.`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  const platforms = [
    {
      name: "Twitter",
      icon: <Twitter size={20} />,
      color: "bg-black text-white",
      link: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "Facebook",
      icon: <Facebook size={20} />,
      color: "bg-[#1877F2] text-white",
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "WhatsApp",
      icon: <MessageCircle size={20} />,
      color: "bg-[#25D366] text-white",
      link: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={20} />,
      color: "bg-[#0077B5] text-white",
      link: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
  ];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        className="bg-white rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl relative animate-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition p-2"
        >
          <X size={24} />
        </button>
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-800 mx-auto mb-4">
            <Share2 size={32} />
          </div>
          <h3 className="text-2xl font-bold font-serif">
            Share Artist Profile
          </h3>
          <p className="text-gray-500 mt-2 text-sm">
            Help spread the word about {member.name}'s work.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {platforms.map((p) => (
            <a
              key={p.name}
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className={`${p.color} flex items-center justify-center space-x-2 py-4 rounded-2xl font-bold transition hover:opacity-90 active:scale-95 text-sm`}
            >
              {p.icon}
              <span>{p.name}</span>
            </a>
          ))}
        </div>
        <div className="relative group">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2 ml-1">
            Profile Link
          </p>
          <div className="flex items-center bg-gray-50 border border-gray-100 rounded-2xl p-2 pl-4">
            <input
              readOnly
              value={shareUrl}
              className="bg-transparent text-gray-500 text-xs flex-1 outline-none font-medium truncate pr-2"
            />
            <button
              onClick={copyToClipboard}
              className="bg-white text-emerald-800 p-3 rounded-xl shadow-sm border border-gray-100 hover:bg-emerald-50 transition flex items-center justify-center group-active:scale-95"
            >
              {copied ? (
                <Check size={18} className="text-emerald-600" />
              ) : (
                <Copy size={18} />
              )}
            </button>
          </div>
          {copied && (
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-emerald-600 animate-in fade-in slide-in-from-top-1">
              Link Copied!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
