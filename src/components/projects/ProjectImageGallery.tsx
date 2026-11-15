"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

type ProjectImageGalleryProps = {
  images: string[];
  projectName: string;
};

export function ProjectImageGallery({
  images,
  projectName,
}: ProjectImageGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [scrollState, setScrollState] = useState({
    hasOverflow: false,
    canScrollPrevious: false,
    canScrollNext: false,
  });
  const carouselRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const activeImage = images[activeImageIndex] ?? images[0];
  const previewImages = images
    .map((src, index) => ({ index, src }))
    .filter(({ index }) => index !== activeImageIndex);

  const updateScrollState = useCallback(() => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    const maximumScrollLeft = carousel.scrollWidth - carousel.clientWidth;
    const hasOverflow = maximumScrollLeft > 1;

    setScrollState({
      hasOverflow,
      canScrollPrevious: hasOverflow && carousel.scrollLeft > 1,
      canScrollNext:
        hasOverflow && carousel.scrollLeft < maximumScrollLeft - 1,
    });
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    updateScrollState();
    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(carousel);
    carousel.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      resizeObserver.disconnect();
      carousel.removeEventListener("scroll", updateScrollState);
    };
  }, [activeImageIndex, previewImages.length, updateScrollState]);

  if (!activeImage) {
    return null;
  }

  const scrollCarousel = (direction: "previous" | "next") => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    carousel.scrollBy({
      left: direction === "previous" ? -carousel.clientWidth * 0.8 : carousel.clientWidth * 0.8,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <section className="mt-14" aria-label={`${projectName} image gallery`}>
      <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] border border-white/50 bg-[#f6f7ef] shadow-[0_24px_80px_rgba(0,0,0,0.08)]">
        <Image
          key={activeImage}
          src={activeImage}
          alt={`${projectName} preview ${activeImageIndex + 1}`}
          fill
          priority
          className="object-cover"
          sizes="(min-width: 1280px) 80rem, 100vw"
        />
      </div>

      {previewImages.length > 0 && (
        <div className="relative mt-5">
          <div
            ref={carouselRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label={`${projectName} image previews`}
          >
            {previewImages.map(({ index, src }) => (
              <button
                key={`${src}-${index}`}
                type="button"
                onClick={() => setActiveImageIndex(index)}
                aria-label={`Show image ${index + 1} for ${projectName}`}
                className="group relative aspect-[16/10] w-[86%] shrink-0 snap-start overflow-hidden rounded-2xl border border-black/6 bg-[#f6f7ef] shadow-[0_16px_45px_rgba(0,0,0,0.05)] transition-[border-color,translate,scale] duration-150 ease-out hover:-translate-y-1 hover:border-primary/35 active:scale-[0.96] motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100 sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)]"
              >
                <Image
                  src={src}
                  alt={`${projectName} preview ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:group-hover:scale-100"
                  sizes="(min-width: 1024px) 27rem, (min-width: 640px) 50vw, 86vw"
                />
              </button>
            ))}
          </div>

          {scrollState.hasOverflow && (
            <>
              <button
                type="button"
                onClick={() => scrollCarousel("previous")}
                disabled={!scrollState.canScrollPrevious}
                aria-label="Show previous project images"
                className="absolute left-3 top-1/2 z-10 flex size-11 -translate-y-[calc(50%+0.5rem)] items-center justify-center rounded-full border border-black/10 bg-white/90 text-foreground shadow-[0_12px_32px_rgba(0,0,0,0.12)] backdrop-blur transition-[background-color,opacity,translate,scale] duration-150 ease-out hover:-translate-x-0.5 hover:bg-white active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-x-0 motion-reduce:hover:translate-x-0 motion-reduce:active:scale-100"
              >
                <ChevronLeft aria-hidden="true" className="size-5" />
              </button>

              <button
                type="button"
                onClick={() => scrollCarousel("next")}
                disabled={!scrollState.canScrollNext}
                aria-label="Show next project images"
                className="absolute right-3 top-1/2 z-10 flex size-11 -translate-y-[calc(50%+0.5rem)] items-center justify-center rounded-full border border-black/10 bg-white/90 text-foreground shadow-[0_12px_32px_rgba(0,0,0,0.12)] backdrop-blur transition-[background-color,opacity,translate,scale] duration-150 ease-out hover:translate-x-0.5 hover:bg-white active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-x-0 motion-reduce:hover:translate-x-0 motion-reduce:active:scale-100"
              >
                <ChevronRight aria-hidden="true" className="size-5" />
              </button>
            </>
          )}
        </div>
      )}
    </section>
  );
}
