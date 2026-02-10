import React, { useState } from "react";
import { Member } from "@/src/types";
import {
  AtSign,
  User,
  Mail,
  MessageSquare,
  X,
  Send,
  Check,
} from "lucide-react";

export const ContactModal = ({
  isOpen,
  onClose,
  member,
}: {
  isOpen: boolean;
  onClose: () => void;
  member: Member;
}) => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  if (!isOpen) return null;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setTimeout(() => {
        setSent(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        className="bg-white rounded-[2.5rem] w-full max-w-lg p-10 shadow-2xl relative animate-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-gray-400 hover:text-gray-600 transition p-2"
        >
          <X size={24} />
        </button>
        <div className="mb-10 text-center">
          <div className="w-16 h-16 bg-emerald-800 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
            <Mail size={32} />
          </div>
          <h3 className="text-3xl font-bold font-serif">
            Contact {member.name.split(" ")[0]}
          </h3>
          <p className="text-gray-500 mt-2 text-sm">
            Send a direct inquiry for commissions or exhibitions.
          </p>
        </div>
        {sent ? (
          <div className="py-12 text-center animate-in fade-in slide-in-from-bottom-4">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={40} />
            </div>
            <h4 className="text-2xl font-bold mb-2">Message Sent!</h4>
            <p className="text-gray-500">
              Your inquiry has been successfully delivered to the artist.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs uppercase tracking-widest mb-2 bg-emerald-50/50 w-fit px-3 py-1.5 rounded-lg border border-emerald-100">
              <AtSign size={14} />
              <span>To: {member.email}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">
                  Your Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                    size={16}
                  />
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-100 focus:ring-2 focus:ring-emerald-800 outline-none transition-all shadow-sm bg-gray-50/50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">
                  Your Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                    size={16}
                  />
                  <input
                    required
                    type="email"
                    placeholder="john@example.com"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-100 focus:ring-2 focus:ring-emerald-800 outline-none transition-all shadow-sm bg-gray-50/50"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">
                Subject
              </label>
              <input
                required
                type="text"
                placeholder="Inquiry regarding your latest work"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-100 focus:ring-2 focus:ring-emerald-800 outline-none transition-all shadow-sm bg-gray-50/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">
                Your Message
              </label>
              <div className="relative">
                <MessageSquare
                  className="absolute left-4 top-4 text-gray-300"
                  size={16}
                />
                <textarea
                  required
                  rows={4}
                  placeholder="Tell the artist about your interest..."
                  className="w-full pl-11 pr-4 py-4 rounded-xl border border-gray-100 focus:ring-2 focus:ring-emerald-800 outline-none transition-all shadow-sm bg-gray-50/50 resize-none"
                />
              </div>
            </div>
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-emerald-800 text-white py-4 rounded-2xl font-bold hover:bg-emerald-900 transition-all shadow-xl hover:shadow-emerald-900/30 flex items-center justify-center space-x-2 active:scale-[0.98]"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <Send size={18} />
                  <span>Send Direct Message</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
