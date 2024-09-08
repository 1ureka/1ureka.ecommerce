"use client";

import { Children, cloneElement, useRef } from "react";
import { useMotionValue, useSpring, useTransform, motion } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { Box, Stack, type BoxProps } from "@mui/material";
import { StackM, TypographyM } from "@/components/Motion";

export type DockProps = {
  magnification?: number;
  distance?: number;
  children: React.ReactNode;
};

export type DockItemProps = {
  magnification?: number;
  distance?: number;
  mouseY?: MotionValue<number>;
  children?: React.ReactNode;
} & ({ isStatic: true; title?: never } | { isStatic?: false; title: string });

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const DockSx: BoxProps["sx"] = {
  position: "relative",
  alignItems: "center",
  gap: 1.5,
  bgcolor: "content.layer1",
  px: 1.5,
  py: 2.5,
  borderRadius: "0 8px 8px 0",
  outline: "2px solid",
  outlineColor: "divider",
  boxShadow: 2,
};

export function Dock({
  children,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
}: DockProps) {
  const mouseY = useMotionValue(Infinity);

  const renderChildren = () => {
    return Children.map(children, (child: unknown) => {
      return cloneElement(child as React.ReactElement, {
        mouseY: mouseY,
        magnification: magnification,
        distance: distance,
      });
    });
  };

  return (
    <StackM
      onMouseMove={(e) => mouseY.set(e.pageY)}
      onMouseLeave={() => mouseY.set(Infinity)}
      sx={DockSx}
    >
      {renderChildren()}
      <Decoration />
    </StackM>
  );
}

export function DockItem({
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseY,
  children,
  isStatic = false,
  title,
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  if (!mouseY) throw new Error("DockItem must be a child of Dock");

  const distanceCalc = useTransform(mouseY, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };

    return val - bounds.y - bounds.height / 2;
  });

  const heightSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [40, magnification, 40]
  );

  const height = useSpring(heightSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  if (isStatic) return children;

  return (
    <motion.div
      ref={ref}
      className="dock-item"
      whileHover="hover"
      style={{
        height,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      {children}
      <TypographyM
        variant="caption"
        sx={{ height: 0, opacity: 0, fontSize: "0.5rem" }}
        variants={{
          initial: { scale: 0.5 },
          hover: { opacity: 1, scale: 1.6 },
        }}
      >
        {title?.toLowerCase()}
      </TypographyM>
    </motion.div>
  );
}

function Decoration() {
  const sx: BoxProps["sx"] = {
    width: 15,
    height: 15,
    borderRadius: 1,
    bgcolor: "content.layer1",
    outline: "3px solid",
    outlineColor: "divider",
    boxShadow: 1,
  };

  return (
    <Stack sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          translate: "0 -100%",
          px: 2.5,
          py: 2,
        }}
      >
        <Box sx={sx} />
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          translate: "0 100%",
          px: 2.5,
          py: 2,
        }}
      >
        <Box sx={sx} />
      </Box>
    </Stack>
  );
}
