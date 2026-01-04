import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { theme } from "./theme";

export const MajorDetails: React.FC<{
  majorDetails: { title: string; features: string[]; motto: string; future: string[] };
  frame: number;
  duration: number;
}> = ({ majorDetails, frame, duration }) => {
  const currentFrame = useCurrentFrame();
  const fps = 30;

  // 左侧从 frame + 15 开始依次进场，间隔 8 帧；右侧在左侧最后一张出现稍后一点再开始
  const leftBaseOffset = 15;
  const itemInterval = 8;
  const leftLastStart = frame + leftBaseOffset + Math.max(0, majorDetails.features.length - 1) * itemInterval;
  const rightStartGap = 10; // 左侧结束后再等 10 帧，避免空档太久
  const rightStartFrame = leftLastStart + rightStartGap;

  const opacity = interpolate(currentFrame, [frame, frame + 20, frame + duration - 20, frame + duration], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (currentFrame < frame || currentFrame >= frame + duration) {
    return null;
  }

  return (
    <AbsoluteFill
      style={{
        opacity,
        padding: "80px 24px 60px",
        color: theme.palette.text.primary,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", height: "100%", maxWidth: 1000, margin: "0 auto" }}>
        {/* 专业头：竖屏上下结构 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginBottom: "48px",
            borderBottom: `2px solid ${theme.palette.divider}`,
            paddingBottom: "20px",
            gap: "16px",
          }}
        >
          <span
            style={{
              color: theme.palette.secondary.main,
              fontSize: "22px",
              letterSpacing: "4px",
            }}
          >
            专业蓝图 / MAJOR BLUEPRINT
          </span>
          <h2
            style={{
              fontSize: "64px",
              color: theme.palette.text.primary,
              margin: "0",
              textShadow: "0 0 24px rgba(124, 77, 255, 0.8)",
            }}
          >
            {majorDetails.title}
          </h2>
          <div
            style={{
              fontSize: "26px",
              color: theme.palette.secondary.light,
              fontStyle: "italic",
              textShadow: "0 0 16px rgba(244, 143, 177, 0.8)",
              maxWidth: 820,
            }}
          >
            “{majorDetails.motto}”
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "32px", flexGrow: 1 }}>
          {/* 上：核心特色（始终显示） */}
          <div>
            <h3 style={{ fontSize: "32px", marginBottom: "30px", color: theme.palette.primary.light, borderLeft: `5px solid ${theme.palette.primary.light}`, paddingLeft: "15px" }}>核心技能实训 ▷</h3>
            {majorDetails.features.map((f, i) => {
               const spr = spring({
                frame: currentFrame - (frame + leftBaseOffset + i * itemInterval),
                fps,
                config: { damping: 12 },
              });
              return (
                <div 
                  key={i} 
                  style={{ 
                    background: "linear-gradient(135deg, rgba(15,23,42,0.4), rgba(76,29,149,0.6))", 
                    padding: "25px 40px", 
                    marginBottom: "20px", 
                    borderRadius: "15px", 
                    fontSize: "28px",
                    borderLeft: `5px solid ${theme.palette.primary.main}`,
                    transform: `translateX(${(1-spr)*100}px)` ,
                    opacity: spr,
                    boxShadow: "0 0 20px rgba(124, 77, 255, 0.55)",
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(248,250,252,0.12)",
                  }}
                >
                  <span style={{ fontSize: "30px", color: theme.palette.secondary.main }}>🔹</span> {f}
                </div>
              );
            })}
          </div>

          {/* 下：职业发展方向（在左侧卡片结束后、短暂停顿后出现，整体包在面板里） */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {currentFrame >= rightStartFrame && (
              <div
                style={{
                  flex: 1,
                  background:
                    "linear-gradient(135deg, rgba(15,23,42,0.35), rgba(76,29,149,0.7))",
                  borderRadius: "26px",
                  padding: "32px 34px",
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: "0 0 24px rgba(15,23,42,0.9)",
                  backdropFilter: "blur(14px)",
                }}
              >
                <h3
                  style={{
                    fontSize: "32px",
                    marginBottom: "30px",
                    color: theme.palette.secondary.light,
                    borderLeft: `5px solid ${theme.palette.secondary.light}`,
                    paddingLeft: "15px",
                  }}
                >
                  职业发展方向 ▷
                </h3>
                {majorDetails.future.map((f, i) => {
                  const spr = spring({
                    frame: currentFrame - (rightStartFrame + i * itemInterval),
                    fps,
                    config: { damping: 12 },
                  });
                  return (
                    <div
                      key={i}
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(15,23,42,0.4), rgba(76,29,149,0.6))",
                        padding: "25px 40px",
                        marginBottom: "20px",
                        borderRadius: "15px",
                        fontSize: "26px",
                        borderLeft: `5px solid ${theme.palette.secondary.main}`,
                        transform: `translateX(${(1 - spr) * 100}px)` ,
                        opacity: spr,
                        boxShadow: "0 0 20px rgba(244, 143, 177, 0.55)",
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(248,250,252,0.12)",
                        textShadow: "0 0 10px rgba(236, 72, 153, 0.6)",
                      }}
                    >
                      <span style={{ fontSize: "30px", color: theme.palette.secondary.main }}>✨</span>
                      {f}
                    </div>
                  );
                })}
                <div
                  style={{
                    marginTop: "30px",
                    padding: "20px 24px",
                    background: "rgba(15,23,42,0.9)",
                    borderRadius: "12px",
                    fontSize: "18px",
                    color: theme.palette.text.secondary,
                    border: `1px dashed ${theme.palette.secondary.main}`,
                    boxShadow: "0 0 18px rgba(15,23,42,0.85)",
                  }}
                >
                  * 该专业连续5年就业率超98%，与300强企业深度合作
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
