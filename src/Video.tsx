
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";

export const MyVideo = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 12 } });
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div style={{
      flex: 1,
      backgroundColor: "#000",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      <h1 style={{
        color: "#f5f5f7",
        fontSize: 80,
        fontWeight: 600,
        letterSpacing: "-0.03em",
        transform: `scale(${scale})`,
        opacity: opacity,
        textAlign: "center",
        padding: "0 40px"
      }}>
        Simples. Poderoso. Profissional.
      </h1>
    </div>
  );
};
