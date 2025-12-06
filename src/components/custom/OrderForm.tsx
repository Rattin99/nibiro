"use client";
import React, { useState, ChangeEvent } from "react";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";

const styles = [
  { id: "realistic", label: "Hyper Realistic", emoji: "🧑" },
  { id: "cartoon", label: "Cartoon / Bobblehead", emoji: "🤪" },
  { id: "voxel", label: "Voxel / 8-Bit", emoji: "👾" },
  { id: "cyber", label: "Cyberpunk Enhanced", emoji: "🤖" },
];

const OrderForm = () => {
  const [selectedStyle, setSelectedStyle] = useState("realistic");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);

      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white border-2 border-black rounded-xl p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative max-w-4xl mx-auto">
      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        {/* Style Selection */}
        <div>
          <label className="block text-gray-800 font-bold text-lg mb-4">
            1. Choose Your Style
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {styles.map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => setSelectedStyle(style.id)}
                className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all duration-200 ${
                  selectedStyle === style.id
                    ? "border-black bg-blue-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-1"
                    : "border-neutral-200 hover:border-black bg-neutral-50"
                }`}
              >
                <span className="text-4xl">{style.emoji}</span>
                <span className=" text-gray-800 font-bold text-sm text-center leading-tight">
                  {style.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Prompt Input */}
        <div>
          <label className="block font-bold text-lg text-gray-800 mb-4">
            2. Describe Your Vision
          </label>
          <textarea
            className="w-full h-32 p-4 border-2 border-black rounded-lg bg-neutral-50 focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_#3b82f6] transition-shadow resize-none font-mono text-base text-neutral-800"
            placeholder="E.g., Make me look like a Jedi Knight but with my cat on my shoulder. The cat should have robot wings..."
          ></textarea>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-gray-800 font-bold text-lg mb-4">
            3. Upload References
          </label>
          <div className="border-2 border-dashed border-black rounded-lg p-8 bg-neutral-50 text-center hover:bg-blue-50 transition-colors relative">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <FaCloudUploadAlt className="mx-auto text-5xl text-neutral-600 mb-2" />
            <p className="font-bold text-neutral-800">
              Click or Drag & Drop Photos Here
            </p>
            <p className="text-base text-neutral-700">
              Multiple angles help us model better.
            </p>
          </div>

          {/* Previews */}
          {previews.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-4">
              {previews.map((src, idx) => (
                <div
                  key={idx}
                  className="relative w-24 h-24 border-2 border-black rounded-md overflow-hidden group"
                >
                  <img
                    src={src}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeFile(idx)}
                    className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-gray-800 block font-bold mb-2">Name</label>
            <input
              type="text"
              className="w-full p-3 border-2 border-black rounded-lg bg-neutral-50 focus:shadow-[4px_4px_0px_0px_#3b82f6] outline-none text-neutral-800"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="text-gray-800 block font-bold mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 border-2 border-black rounded-lg bg-neutral-50 focus:shadow-[4px_4px_0px_0px_#3b82f6] outline-none text-neutral-800"
              placeholder="you@example.com"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button className="w-full py-4 bg-black text-white font-black text-xl uppercase tracking-widest rounded-lg border-2 border-transparent hover:bg-red-600 hover:border-black hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-200">
          Request Quote
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
