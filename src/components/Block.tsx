import { Box, type BoxProps } from "@mui/material";
import { BoxM } from "./Motion";
import { createMotionVar } from "./MotionProps";

type BlockProps = {
  // custom props
  variant?: "outlined" | "contained";
  color?: string;
  decoration?: "both" | "left" | "right" | "none";
  SlotProps?: {
    childContainer?: React.ComponentProps<typeof BoxM> & {
      "data-mui-color-scheme"?: "dark" | "light";
    };
  };
  // inherit BoxProps
} & React.ComponentProps<typeof BoxM>;

const WIDTH = 35;
const STROKE = 2;

export default function Block({
  variant = "outlined",
  variants = createMotionVar({ delayChildren: 0.35 }),
  color = "divider",
  decoration = "both",
  sx,
  SlotProps,
  children,
  ...props
}: BlockProps) {
  const oulinedSx = {
    bgcolor: "content.layer1",

    border: `${STROKE}px solid`,
    borderColor: "content.layer2",

    outline: `${STROKE}px solid`,
    outlineColor: color,
    outlineOffset: -STROKE,
  };
  const containedSx = {
    bgcolor: color,
    border: `${STROKE}px solid transparent`,
  };

  const outerContainedSx = {
    border: "none",
    width: WIDTH - STROKE,
    height: WIDTH - STROKE,
  };
  const innerContainedSx = {
    outlineColor: "content.layer1",
    bgcolor: color,
  };

  return (
    <BoxM sx={{ position: "relative", ...sx }} variants={variants} {...props}>
      {/* for shadow */}
      <DecorationWrapper
        sx={{
          inset: 0,
          borderRadius: 1,
          boxShadow: 2,
        }}
      />

      <Box
        sx={{
          position: "relative",
          borderRadius: 1,
          height: 1,
          ...(variant === "outlined" ? oulinedSx : containedSx),
        }}
      >
        <BoxM
          {...SlotProps?.childContainer}
          sx={{ height: 1, py: 3, px: 4, ...SlotProps?.childContainer?.sx }}
        >
          {children}
        </BoxM>

        {/* for subtract */}
        <DecorationWrapper sx={{ overflow: "visible" }}>
          {(decoration === "both" || decoration === "left") && (
            <OuterDecoration
              sx={{
                left: 0,
                transform: "translateX(-50%)",
                border: "none",
              }}
            />
          )}
          {(decoration === "both" || decoration === "right") && (
            <OuterDecoration
              sx={{
                right: 0,
                transform: "translateX(50%)",
                border: "none",
              }}
            />
          )}
        </DecorationWrapper>

        {/* for subtract border line */}
        <DecorationWrapper sx={{ overflow: "hidden" }}>
          {(decoration === "both" || decoration === "left") && (
            <OuterDecoration
              sx={{
                left: 0,
                transform: "translateX(-50%)",
                borderColor: color,
                ...(variant === "contained" && outerContainedSx),
              }}
            />
          )}
          {(decoration === "both" || decoration === "right") && (
            <OuterDecoration
              sx={{
                right: 0,
                transform: "translateX(50%)",
                borderColor: color,
                ...(variant === "contained" && outerContainedSx),
              }}
            />
          )}
        </DecorationWrapper>

        {/* for deco */}
        <DecorationWrapper sx={{ overflow: "visible" }}>
          {(decoration === "both" || decoration === "left") && (
            <BoxM
              variants={createMotionVar({ from: { scale: 0, x: 0, y: -37.5 } })}
              sx={{
                position: "absolute",
                left: 0,
                display: "grid",
                placeItems: "center",
              }}
            >
              <InnerDecoration
                sx={{
                  outlineColor: color,
                  ...(variant === "contained" && innerContainedSx),
                }}
              />
            </BoxM>
          )}
          {(decoration === "both" || decoration === "right") && (
            <BoxM
              variants={createMotionVar({ from: { scale: 0, x: 0, y: -37.5 } })}
              sx={{
                position: "absolute",
                right: 0,
                display: "grid",
                placeItems: "center",
              }}
            >
              <InnerDecoration
                sx={{
                  outlineColor: color,
                  ...(variant === "contained" && innerContainedSx),
                }}
              />
            </BoxM>
          )}
        </DecorationWrapper>
      </Box>
    </BoxM>
  );
}

function DecorationWrapper({
  children,
  sx,
}: {
  children?: React.ReactNode;
  sx?: BoxProps["sx"];
}) {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: `-${STROKE}px`,
        display: "grid",
        placeItems: "center",
        pointerEvents: "none",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

function OuterDecoration({ sx }: { sx?: BoxProps["sx"] }) {
  return (
    <Box
      sx={{
        position: "absolute",
        width: WIDTH,
        height: WIDTH,
        borderRadius: WIDTH + 10,
        backgroundColor: "content.layer2",
        border: `${STROKE}px solid`,
        borderColor: "divider",
        ...sx,
      }}
    />
  );
}

function InnerDecoration({ sx }: { sx?: BoxProps["sx"] }) {
  return (
    <Box
      sx={{
        position: "absolute",
        width: WIDTH - 25,
        height: WIDTH - 25,
        borderRadius: WIDTH,
        backgroundColor: "content.layer1",
        outline: `${STROKE + 0.5}px solid`,
        outlineColor: "divider",
        ...sx,
      }}
    />
  );
}
