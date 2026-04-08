"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const UNIVERSITIES = [
  {
    src: "/images/tu-berlin.jpg",
    name: "Technische Universität Berlin",
  },
  {
    src: "/images/tu-m.jpg",
    name: "Technische Universität München",
  },
  {
    src: "/images/tu-darmstadt.jpg",
    name: "Technische Universität Darmstadt",
  },
  {
    src: "/images/show_picture.jpg",
    name: "RWTH Aachen University",
  },
  {
    src: "/images/stuttgart.jpg",
    name: "University of Stuttgart",
  },
  {
    src: "/images/giuberlin.jpeg",
    name: "GIU Berlin — German International University, Campus Berlin",
  },
] as const;

const n = UNIVERSITIES.length;
/** [clone of last, ...all, clone of first] for infinite forward/back wrap */
const EXTENDED_SLIDES = [
  { ...UNIVERSITIES[n - 1], key: "clone-last" as const },
  ...UNIVERSITIES.map((u, i) => ({ ...u, key: `slide-${i}` as const })),
  { ...UNIVERSITIES[0], key: "clone-first" as const },
] as const;

const slideCount = EXTENDED_SLIDES.length;
const slidePercent = 100 / slideCount;

function captionForSlideIndex(slideIndex: number) {
  if (slideIndex === 0) return UNIVERSITIES[n - 1];
  if (slideIndex === n + 1) return UNIVERSITIES[0];
  return UNIVERSITIES[slideIndex - 1];
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

const arrowBtnClass =
  "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-brand-navy/90 text-white shadow-md backdrop-blur-[2px] transition-colors hover:bg-brand-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/70 md:h-12 md:w-12";

const trackTransitionClass =
  "flex h-full ease-out transition-transform duration-500 motion-reduce:transition-none motion-reduce:duration-0";

export function StudyUniversitiesCarousel() {
  const [slideIndex, setSlideIndex] = useState(1);
  const [instantJump, setInstantJump] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const skipTransitionEnd = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    function update() {
      setReduceMotion(mq.matches);
    }
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  /** Without CSS transitions, snap off clone slides immediately */
  useLayoutEffect(() => {
    if (!reduceMotion) return;
    if (slideIndex === n + 1) {
      setSlideIndex(1);
    } else if (slideIndex === 0) {
      setSlideIndex(n);
    }
  }, [slideIndex, reduceMotion]);

  const showPrev = useCallback(() => {
    setSlideIndex((s) => (s >= 1 ? s - 1 : s));
  }, []);

  const showNext = useCallback(() => {
    setSlideIndex((s) => (s <= n ? s + 1 : s));
  }, []);

  function handleTransitionEnd(e: React.TransitionEvent) {
    if (e.propertyName !== "transform") return;
    if (skipTransitionEnd.current) {
      skipTransitionEnd.current = false;
      return;
    }
    if (reduceMotion) return;

    if (slideIndex === n + 1) {
      skipTransitionEnd.current = true;
      setInstantJump(true);
      setSlideIndex(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setInstantJump(false);
        });
      });
    } else if (slideIndex === 0) {
      skipTransitionEnd.current = true;
      setInstantJump(true);
      setSlideIndex(n);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setInstantJump(false);
        });
      });
    }
  }

  const current = captionForSlideIndex(slideIndex);

  const trackClass = instantJump
    ? "flex h-full"
    : trackTransitionClass;

  return (
    <div className="mx-auto w-full max-w-4xl lg:max-w-5xl">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-brand-navy/10 bg-brand-navy/[0.04] shadow-md md:aspect-[16/9] md:rounded-3xl">
        <div
          className={trackClass}
          style={{
            width: `${slideCount * 100}%`,
            transform: `translateX(-${slideIndex * slidePercent}%)`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {EXTENDED_SLIDES.map((uni, i) => (
            <div
              key={uni.key}
              className="relative h-full shrink-0"
              style={{ width: `${slidePercent}%` }}
            >
              <Image
                src={uni.src}
                alt={uni.name}
                fill
                sizes="(max-width: 768px) 100vw, 48rem"
                className="object-cover"
                priority={i === 1}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={showPrev}
          className={`${arrowBtnClass} left-2 md:left-3`}
          aria-label="Previous university"
        >
          <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" />
        </button>
        <button
          type="button"
          onClick={showNext}
          className={`${arrowBtnClass} right-2 md:right-3`}
          aria-label="Next university"
        >
          <ChevronRight className="h-6 w-6 md:h-7 md:w-7" />
        </button>
      </div>

      <p
        className="mt-4 text-center text-xl font-semibold text-brand-navy md:text-2xl"
        aria-live="polite"
      >
        {current.name}
      </p>
    </div>
  );
}
