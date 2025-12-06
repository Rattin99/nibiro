"use client";
import React, { useState } from "react";
import {
  FaPaperPlane,
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";

const ContactForm = () => {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <div className="bg-white border-2 border-black rounded-xl p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] h-full relative overflow-hidden">
      {/* Decorative studs */}
      <div className="absolute top-4 right-4 flex gap-2">
        <div className="w-3 h-3 bg-red-500 rounded-full border border-black"></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full border border-black"></div>
      </div>

      <h3 className="text-gray-800 text-3xl font-black font-montserrat mb-2">
        Send a Message
      </h3>
      <p className="text-gray-800 mb-8">
        Got a question? We're all ears (and antennas).
      </p>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-gray-800 font-bold text-sm uppercase tracking-wide">
              Name
            </label>
            <input
              type="text"
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
              className={`w-full p-4 bg-neutral-50 text-gray-600 border-2 rounded-lg outline-none transition-all duration-300 ${
                focusedField === "name"
                  ? "border-black shadow-[4px_4px_0px_0px_#3b82f6] -translate-y-1"
                  : "border-neutral-200 focus:border-black"
              }`}
              placeholder="Your name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-gray-800 font-bold text-sm uppercase tracking-wide">
              Email
            </label>
            <input
              type="email"
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              className={`w-full p-4 bg-neutral-50 text-gray-600 border-2 rounded-lg outline-none transition-all duration-300 ${
                focusedField === "email"
                  ? "border-black shadow-[4px_4px_0px_0px_#ef4444] -translate-y-1"
                  : "border-neutral-200 focus:border-black"
              }`}
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-gray-800 font-bold text-sm uppercase tracking-wide">
            Subject
          </label>
          <select
            onFocus={() => setFocusedField("subject")}
            onBlur={() => setFocusedField(null)}
            className={`w-full p-4 bg-neutral-50 text-gray-600 border-2 rounded-lg outline-none transition-all duration-300 appearance-none cursor-pointer ${
              focusedField === "subject"
                ? "border-black shadow-[4px_4px_0px_0px_#eab308] -translate-y-1"
                : "border-neutral-200 focus:border-black"
            }`}
          >
            <option>General Inquiry</option>
            <option>Order Support</option>
            <option>Custom Commission</option>
            <option>Partnership</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-gray-800 font-bold text-sm uppercase tracking-wide">
            Message
          </label>
          <textarea
            rows={5}
            onFocus={() => setFocusedField("message")}
            onBlur={() => setFocusedField(null)}
            className={`w-full p-4 bg-neutral-50 text-gray-600 border-2 rounded-lg outline-none transition-all duration-300 resize-none ${
              focusedField === "message"
                ? "border-black shadow-[4px_4px_0px_0px_#22c55e] -translate-y-1"
                : "border-neutral-200 focus:border-black"
            }`}
            placeholder="Tell us everything..."
          ></textarea>
        </div>

        <button className="w-full py-4 bg-black text-white font-black text-lg uppercase tracking-widest rounded-lg flex items-center justify-center gap-3 hover:bg-neutral-800 transition-all duration-300 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.5)] active:translate-y-1 active:shadow-none">
          <FaPaperPlane className="text-sm" />
          Send Transmission
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
