import React from "react";

const steps = [
  {
    number: "01",
    title: "Upload & Describe",
    desc: "Share your photos and tell us the vibe. Realistic? Chibi? Cyber-enhanced?",
  },
  {
    number: "02",
    title: "Digital Sculpting",
    desc: "Our artists craft a detailed 3D model. You get a preview to approve.",
  },
  {
    number: "03",
    title: "High-Fidelity Print",
    desc: "Printed layer by layer using premium resin or PLA materials.",
  },
  {
    number: "04",
    title: "Shipment",
    desc: "Securely packed and sent from our Dhaka HQ to your doorstep.",
  },
];

const ProcessSteps = () => {
  return (
    <div className="px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[100rem] mx-auto items-stretch">
        {steps.map((step, index) => (
          <div key={index} className="relative group h-full">
            <div className="bg-white border-2 border-black p-6 rounded-xl relative z-10 transition-transform duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col h-full">
              <div className="w-16 h-16 bg-black text-white text-2xl font-black rounded-lg flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_#ef4444]">
                {step.number}
              </div>

              <h3 className="text-gray-800 text-xl font-bold mb-3 font-montserrat">
                {step.title}
              </h3>
              <p className="text-neutral-700 leading-relaxed flex-grow">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessSteps;
