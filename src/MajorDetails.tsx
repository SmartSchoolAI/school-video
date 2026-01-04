import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { theme } from "./theme";

export const MajorDetails: React.FC<{
  majorDetails: { title: string; features: string[]; motto: string; future: string[] };
  frame: number;
  duration: number;
}> = ({ majorDetails, frame, duration }) => {
  const currentFrame = useCurrentFrame();
  const fps = 30;

  const opacity = interpolate(currentFrame, [frame, frame + 20, frame + duration - 20, frame + duration], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (currentFrame < frame || currentFrame >= frame + duration) {
    return null;
  }

  return (
    <AbsoluteFill style={{ opacity, padding: "80px", color: theme.palette.text.primary }}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* 专业头 */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "60px", borderBottom: `2px solid ${theme.palette.divider}`, paddingBottom: "20px" }}>
          <div>
            <span style={{ color: theme.palette.secondary.main, fontSize: "24px", letterSpacing: "4px" }}>专业蓝图 / MAJOR BLUEPRINT</span>
            <h2 style={{ fontSize: "72px", color: theme.palette.text.primary, margin: "10px 0 0 0", textShadow: "0 0 24px rgba(124, 77, 255, 0.8)" }}>{majorDetails.title}</h2>
          </div>
          <div style={{ fontSize: "28px", color: theme.palette.secondary.light, fontStyle: "italic", textShadow: "0 0 16px rgba(244, 143, 177, 0.8)" }}>
            “{majorDetails.motto}”
          </div>
        </div>

        <div style={{ display: "flex", gap: "60px", flexGrow: 1 }}>
          {/* 左侧：核心特色 */}
          <div style={{ flex: 1.5 }}>
            <h3 style={{ fontSize: "32px", marginBottom: "30px", color: theme.palette.primary.light, borderLeft: `5px solid ${theme.palette.primary.light}`, paddingLeft: "15px" }}>核心技能实训 ▷</h3>
            {majorDetails.features.map((f, i) => {
               const spr = spring({
                frame: currentFrame - (frame + 15 + i * 8),
                fps,
                config: { damping: 12 },
              });
              return (
                <div 
                  key={i} 
                  style={{ 
                    background: "rgba(76, 29, 149, 0.65)", 
                    padding: "25px 40px", 
                    marginBottom: "20px", 
                    borderRadius: "15px", 
                    fontSize: "28px",
                    borderLeft: `5px solid ${theme.palette.primary.main}`,
                    transform: `translateX(${(1-spr)*100}px)`,
                    opacity: spr,
                    boxShadow: "0 0 26px rgba(124, 77, 255, 0.7)",
                    display: "flex",
                    alignItems: "center",
                    gap: "20px"
                  }}
                >
                  <span style={{ fontSize: "30px", color: theme.palette.secondary.main }}>🔹</span> {f}
                </div>
              );
            })}
          </div>

          {/* 右侧：就业前景 */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ background: "rgba(15, 23, 42, 0.9)", border: `1px solid ${theme.palette.divider}` , padding: "40px", borderRadius: "30px", flexGrow: 1, boxShadow: "0 0 26px rgba(15, 23, 42, 0.9)" }}>
              <h3 style={{ fontSize: "32px", marginBottom: "30px", color: theme.palette.secondary.light, borderLeft: `5px solid ${theme.palette.secondary.light}`, paddingLeft: "15px" }}>职业发展方向 ▷</h3>
              {majorDetails.future.map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "20px", fontSize: "24px", marginBottom: "25px", textShadow: "0 0 10px rgba(236, 72, 153, 0.5)" }}>
                  <div style={{ width: "12px", height: "12px", background: theme.palette.secondary.main, borderRadius: "50%", boxShadow: "0 0 10px rgba(244, 143, 177, 0.9)" }} />
                  {f}
                </div>
              ))}
              <div style={{ marginTop: "40px", padding: "20px", background: "rgba(15,23,42,0.9)", borderRadius: "10px", fontSize: "18px", color: theme.palette.text.secondary, border: `1px dashed ${theme.palette.secondary.main}` }}>
                * 该专业连续5年就业率超98%，与300强企业深度合作
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
