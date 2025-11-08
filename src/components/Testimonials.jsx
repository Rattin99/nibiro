import Image from 'next/image';
import { row1Images } from '../data/testimonialImages';
import styles from './Testimonials.module.css';

const Testimonials = () => {
  // Duplicate the images for a seamless loop
  const allRow1Images = [...row1Images, ...row1Images];
  const allRow2Images = [...row1Images, ...row1Images];

  return (
    <div className="w-full overflow-hidden bg-sk-sand py-20 md:py-36">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-16 flex w-full flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-4 md:mt-2">
            <div className="h-[6px] w-[6px] bg-sk-sea-tint"></div>
            <p className="caption3 font-medium">TESTIMONIALS</p>
          </div>
          <h4 className="heading4 text-start md:text-end">
            Trusted by <br /> the community
          </h4>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2">
        {/* Row 1: Normal Scroll */}
        <div className="inline-flex w-full flex-nowrap gap-2 overflow-hidden">
          <div className={`flex items-center justify-center gap-4 md:justify-start [&_li]:mx-8 [&_img]:max-w-none ${styles.scrollerNormal}`}>
            {allRow1Images.map((src, index) => (
              <div key={`row1-${index}`} className="w-[400px] h-auto flex-shrink-0 rounded-lg shadow-md hover:outline hover:outline-sk-sea-tint">
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
          <div className={`flex items-center justify-center gap-4 md:justify-start [&_li]:mx-8 [&_img]:max-w-none ${styles.scrollerReverse}`}>
            {allRow2Images.map((src, index) => (
              <div key={`row2-${index}`} className="w-[400px] h-auto flex-shrink-0 rounded-lg shadow-md hover:outline hover:outline-sk-sea-tint">
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