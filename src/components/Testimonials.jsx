import Image from "next/image";
import { row1Images } from "../data/testimonialImages";
import styles from "./Testimonials.module.css";

const Testimonials = () => {
  // Duplicate the images for a seamless loop
  const allRow1Images = [...row1Images, ...row1Images];
  const allRow2Images = [...row1Images, ...row1Images];

  return (
    <div className="w-full overflow-hidden bg-[#171618] py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-16 flex w-full flex-col gap-8 md:flex-row md:items-center md:justify-center">
          <h2 className="text-5xl md:text-6xl font-bold text-center">
            Trusted by the community
          </h2>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2">
        {/* Row 1: Normal Scroll */}
        <div className="inline-flex w-full flex-nowrap gap-2 overflow-hidden">
          <div
            className={`flex items-center justify-center gap-4 md:justify-start [&_li]:mx-8 [&_img]:max-w-none ${styles.scrollerNormal}`}
          >
            {allRow1Images.map((src, index) => (
              <div
                key={`row1-${index}`}
                className="w-[400px] h-auto flex-shrink-0 rounded-lg shadow-md hover:outline hover:outline-sk-sea-tint"
              >
                <Image
                  src={src}
                  alt={`Testimonial review screenshot ${index + 1}`}
                  width={400}
                  height={300} // Adjust height as needed
                  className="rounded-md object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Reverse Scroll */}
        <div className="inline-flex w-full flex-nowrap gap-2 overflow-hidden">
          <div
            className={`flex items-center justify-center gap-4 md:justify-start [&_li]:mx-8 [&_img]:max-w-none ${styles.scrollerReverse}`}
          >
            {allRow2Images.map((src, index) => (
              <div
                key={`row2-${index}`}
                className="w-[400px] h-auto flex-shrink-0 rounded-lg shadow-md hover:outline hover:outline-sk-sea-tint"
              >
                <Image
                  src={src}
                  alt={`Testimonial review screenshot ${index + 1}`}
                  width={400}
                  height={300} // Adjust height as needed
                  className="rounded-md object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

