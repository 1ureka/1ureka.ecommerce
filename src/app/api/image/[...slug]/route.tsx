import { ImageResponse } from "next/og";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: { slug: string[] } }
) {
  const result = validSlugs(params.slug);
  if (typeof result === "string") {
    return NextResponse.json({
      status: 400,
      body: { message: result },
    });
  }

  const [width, height] = result;
  const res = new ImageResponse(<Image width={width} height={height} />, {
    width,
    height,
  });

  const blob = await res.blob();
  return new NextResponse(blob);
}

function Image({ width, height }: { width: number; height: number }) {
  const randomLinearGradient = `linear-gradient(45deg, #${Math.floor(
    Math.random() * 16777215
  ).toString(16)}, #${Math.floor(Math.random() * 16777215).toString(16)})`;

  const containerStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: randomLinearGradient,
  };

  const style = {
    background: randomLinearGradient,
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: `${Math.min(width, height) / 10}px`,
    width: "80%",
    height: "80%",
    borderRadius: `${Math.min(width, height) / 10}px`,
    filter: "brightness(0.8)",
  };
  return (
    <div style={containerStyle}>
      <div style={style}>
        {width} x {height}
      </div>
    </div>
  );
}

function validSlugs(slugs: string[]): [number, number] | string {
  if (slugs.length !== 2) {
    return "Invalid dimensions, must be width and height";
  }

  const [width, height] = slugs.map(Number);
  if (!Number.isInteger(width) || !Number.isInteger(height)) {
    return "width and height must be integers";
  }

  if (width < 1 || height < 1) {
    return "width and height must be greater than 0";
  }

  if (width > 1920 || height > 1080) {
    return "width and height must be less than 1920x1080";
  }

  return [width, height];
}
