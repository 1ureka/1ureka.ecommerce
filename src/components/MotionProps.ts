import { Variants } from "framer-motion";

interface MotionProps {
  variants?: Variants;
  [key: string]: unknown;
}
export const createMotionProps = (props?: {
  delay?: number;
  stagger?: number;
}): MotionProps => ({
  variants: {
    animate: {
      transition: {
        delayChildren: props?.delay ?? 0.15,
        staggerChildren: props?.stagger ?? 0.15,
      },
    },
  },
  initial: "initial",
  animate: "animate",
});
export const createMotionVar = (props?: {
  delayChildren?: number;
  staggerChildren?: number;
  from?: { opacity?: number; y?: number; x?: number; scale?: number };
}): Variants => ({
  initial: {
    opacity: props?.from?.opacity ?? 0,
    x: props?.from?.x ?? 0,
    y: props?.from?.y ?? 65,
    scale: props?.from?.scale ?? 0.9,
    transition: { duration: 0 },
  },
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 16,
      staggerChildren: props?.staggerChildren ?? 0.15,
      delayChildren: props?.delayChildren ?? 0.15,
    },
  },
});

//
//
// Carousels
//
//
export const carouselsVar = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.5,
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.5,
    },
  },
};
export const carouselsImageVar = {
  initial: {
    opacity: 0,
    scale: 1.1,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", bounce: 0, duration: 1 },
  },
  exit: {
    opacity: 0,
    scale: 1.1,
    transition: { type: "spring", bounce: 0, duration: 1 },
  },
};
export const carouselsSlidesVar = {
  initial: {
    opacity: 0,
    x: "30%",
  },
  animate: {
    opacity: 1,
    x: "0%",
    transition: { type: "spring", bounce: 0, duration: 1 },
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: { type: "spring", bounce: 0, duration: 1 },
  },
};
export const carouselsOriginVar = {
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", bounce: 0, duration: 1.5 },
  },
  hide: {
    opacity: 0,
    scale: 1.1,
    transition: { type: "spring", bounce: 0 },
  },
};
