import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";

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
    <AbsoluteFill style={{ opacity, padding: "80px", color: "white" }}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* 专业头 */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "60px", borderBottom: "2px solid rgba(0, 191, 255, 0.3)", paddingBottom: "20px" }}>
          <div>
            <span style={{ color: "#00bfff", fontSize: "24px", letterSpacing: "4px" }}>专业蓝图 / MAJOR BLUEPRINT</span>
            <h2 style={{ fontSize: "72px", color: "#fff", margin: "10px 0 0 0", textShadow: "0 0 20px rgba(0, 191, 255, 0.6)" }}>{majorDetails.title}</h2>
          </div>
          <div style={{ fontSize: "28px", color: "#87cefa", fontStyle: "italic", textShadow: "0 0 10px rgba(135, 206, 250, 0.4)" }}>
            “{majorDetails.motto}”
          </div>
        </div>

        <div style={{ display: "flex", gap: "60px", flexGrow: 1 }}>
          {/* 左侧：核心特色 */}
          <div style={{ flex: 1.5 }}>
            <h3 style={{ fontSize: "32px", marginBottom: "30px", color: "#00bfff", borderLeft: "5px solid #00bfff", paddingLeft: "15px" }}>核心技能实训 ▷</h3>
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
                    background: "rgba(0, 191, 255, 0.1)", 
                    padding: "25px 40px", 
                    marginBottom: "20px", 
                    borderRadius: "15px", 
                    fontSize: "28px",
                    borderLeft: "5px solid #00bfff",
                    transform: `translateX(${(1-spr)*100}px)`,
                    opacity: spr,
                    boxShadow: "0 0 20px rgba(0, 191, 255, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    gap: "20px"
                  }}
                >
                  <span style={{ fontSize: "30px", color: "#00bfff" }}>🔹</span> {f}
                </div>
              );
            })}
          </div>

          {/* 右侧：就业前景 */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ background: "rgba(0, 191, 255, 0.05)", border: "1px solid rgba(0, 191, 255, 0.2)", padding: "40px", borderRadius: "30px", flexGrow: 1, boxShadow: "0 0 20px rgba(0, 191, 255, 0.1)" }}>
              <h3 style={{ fontSize: "32px", marginBottom: "30px", color: "#87cefa", borderLeft: "5px solid #87cefa", paddingLeft: "15px" }}>职业发展方向 ▷</h3>
              {majorDetails.future.map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "20px", fontSize: "24px", marginBottom: "25px", textShadow: "0 0 5px rgba(135, 206, 250, 0.2)" }}>
                  <div style={{ width: "12px", height: "12px", background: "#87cefa", borderRadius: "50%", boxShadow: "0 0 8px #87cefa" }} />
                  {f}
                </div>
              ))}
              <div style={{ marginTop: "40px", padding: "20px", background: "rgba(255,255,255,0.05)", borderRadius: "10px", fontSize: "18px", color: "rgba(255,255,255,0.5)", border: "1px dashed rgba(0, 191, 255, 0.3)" }}>
                * 该专业连续5年就业率超98%，与300强企业深度合作
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
