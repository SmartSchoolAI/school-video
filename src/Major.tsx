import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { theme } from "./theme";

export const Major: React.FC<{
  major: { title: string; features: string[]; motto: string; future: string[] };
  frame: number;
  duration: number;
}> = ({ major, frame, duration }) => {
  const currentFrame = useCurrentFrame();
  const fps = 30;

  const leftBaseOffset = 15;
  const itemInterval = 8;
  const leftLastStart = frame + leftBaseOffset + Math.max(0, major.features.length - 1) * itemInterval;
  const rightStartFrame = leftLastStart + 10;

  const opacity = interpolate(currentFrame, [frame, frame + 15, frame + duration - 15, frame + duration], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity, padding: "65px 60px", color: theme.palette.text.primary }}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%", maxWidth: 1000, margin: "0 auto" }}>
        
        {/* 顶部标题区 */}
        <div style={{ textAlign: "center", marginBottom: "38px", borderBottom: `2px solid ${theme.palette.divider}`, paddingBottom: "20px" }}>
          <h2 style={{ fontSize: "64px", margin: "0", textShadow: "0 0 24px rgba(124, 77, 255, 0.8)" }}>{major.title}</h2>
          <div style={{ fontSize: "38px", color: theme.palette.secondary.light, fontStyle: "italic", marginTop: "10px" }}>“{major.motto}”</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "38px", flexGrow: 1, width: "100%" }}>
          {/* 核心技能区 */}
          <div style={{ width: "100%" }}>
            <h3 style={{ fontSize: "48px", marginBottom: "26px", color: theme.palette.primary.light, borderLeft: `5px solid ${theme.palette.primary.light}`, paddingLeft: "15px" }}>核心技能实训 ▷</h3>
            {major.features.map((f, i) => {
              const spr = spring({
                frame: Math.max(0, currentFrame - (frame + leftBaseOffset + i * itemInterval)),
                fps,
                config: { damping: 12 },
              });
              return (
                <div key={i} style={{ 
                  width: "100%", boxSizing: "border-box", // 关键修复：确保宽度始终100%
                  background: "linear-gradient(135deg, rgba(15,23,42,0.4), rgba(76,29,149,0.6))", 
                  padding: "25px 40px", marginBottom: "20px", borderRadius: "15px", fontSize: "38px",
                  borderLeft: `5px solid ${theme.palette.primary.main}`,
                  transform: `translateX(${(1 - spr) * 100}px)`, opacity: spr,
                  display: "flex", alignItems: "center", gap: "20px", backdropFilter: "blur(12px)"
                }}>
                  <span style={{ fontSize: "40px" }}>🔹</span> {f}
                </div>
              );
            })}
          </div>

          {/* 职业发展区 */}
          {currentFrame >= rightStartFrame && (
            <div style={{ background: "linear-gradient(135deg, rgba(15,23,42,0.35), rgba(76,29,149,0.7))", borderRadius: "26px", padding: "32px 34px", border: `1px solid ${theme.palette.divider}`, backdropFilter: "blur(14px)" }}>
              <h3 style={{ fontSize: "42px", marginBottom: "30px", color: theme.palette.secondary.light, borderLeft: `5px solid ${theme.palette.secondary.light}`, paddingLeft: "15px" }}>职业发展方向 ▷</h3>
              {major.future.map((f, i) => {
                const spr = spring({
                  frame: Math.max(0, currentFrame - (rightStartFrame + i * itemInterval)),
                  fps, config: { damping: 12 },
                });
                return (
                  <div key={i} style={{ 
                    width: "100%", boxSizing: "border-box", // 关键修复
                    background: "linear-gradient(135deg, rgba(15,23,42,0.4), rgba(76,29,149,0.6))", 
                    padding: "25px 40px", marginBottom: "20px", borderRadius: "15px", fontSize: "38px",
                    borderLeft: `5px solid ${theme.palette.secondary.main}`,
                    transform: `translateX(${(1 - spr) * 100}px)`, opacity: spr,
                    display: "flex", alignItems: "center", gap: "20px"
                  }}>
                    <span style={{ fontSize: "38px" }}>✨</span> {f}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};