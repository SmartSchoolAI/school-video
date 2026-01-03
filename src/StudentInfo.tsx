import { AbsoluteFill, useCurrentFrame, interpolate, spring, Img } from "remotion";

export const StudentInfo: React.FC<{
  name: string;
  major: string;
  class: string;
  admissionDate: string;
  idPhoto: string;
  profile: { studentId: string; hometown: string; hobby: string };
  grades: { subject: string; score: number }[];
  skills: Record<string, number>;
  frame: number;
  duration: number;
}> = ({ name, major, class: className, admissionDate, idPhoto, profile, grades, skills, frame, duration }) => {
  const currentFrame = useCurrentFrame();
  const fps = 30;

  const opacity = interpolate(currentFrame, [frame, frame + 20, frame + duration - 20, frame + duration], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (currentFrame < frame || currentFrame >= frame + duration) {
    return null;
  }

  // 技能多边形
  const skillEntries = Object.entries(skills);
  const polygonPoints = skillEntries.map(([, val], i) => {
    const angle = (Math.PI * 2 * i) / skillEntries.length - Math.PI / 2;
    const r = (val / 100) * 120;
    return `${150 + Math.cos(angle) * r},${150 + Math.sin(angle) * r}`;
  }).join(" ");

  return (
    <AbsoluteFill
      style={{
        opacity,
        padding: "60px 80px",
        color: "#4a2b1a",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "30px", height: "100%" }}>
        
        {/* 左侧：暖色纪念册风档案卡 */}
        <div 
          style={{ 
            background:
              "linear-gradient(135deg, rgba(255, 248, 240, 0.96), rgba(255, 236, 210, 0.98))",
            backdropFilter: "blur(30px)",
            borderRadius: "40px",
            border: "1px solid rgba(184, 134, 11, 0.45)",
            padding: "36px 40px",
            boxShadow: "0 20px 45px rgba(0, 0, 0, 0.28)",
          }}
        >
          <div style={{ display: "flex", gap: "30px", marginBottom: "40px" }}>
             <div style={{ position: "relative" }}>
                <Img 
                  src={idPhoto} 
                  style={{
                    width: "170px",
                    height: "230px",
                    borderRadius: "24px",
                    border: "3px solid #b8860b",
                    objectFit: "cover",
                    backgroundColor: "#fdf5e6",
                  }} 
                  alt="Student"
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "24px",
                    boxShadow: "inset 0 0 20px rgba(139, 0, 0, 0.45)",
                  }}
                />
             </div>
             <div>
                <h2
                  style={{
                    fontSize: "52px",
                    marginBottom: "5px",
                    color: "#8b1a1a",
                    textShadow: "0 0 10px rgba(139,0,0,0.6)",
                  }}
                >
                  {name}
                </h2>
                <p style={{ fontSize: "22px", color: "#a0522d" }}>NO.{profile.studentId}</p>
                <div
                  style={{
                    marginTop: "18px",
                    fontSize: "18px",
                    background: "rgba(139, 0, 0, 0.08)",
                    display: "inline-block",
                    padding: "6px 18px",
                    borderRadius: "999px",
                    color: "#7b1b1b",
                    border: "1px solid rgba(139, 0, 0, 0.3)",
                  }}
                >
                  {major} / {className}
                </div>
                <div
                  style={{
                    marginTop: "10px",
                    fontSize: "16px",
                    color: "#8b4513",
                    opacity: 0.9,
                  }}
                >
                  入学时间：{admissionDate}
                </div>
             </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", fontSize: "22px" }}>
             <div
               style={{
                 padding: "18px 20px",
                 background: "rgba(255,255,255,0.85)",
                 borderRadius: "18px",
                 boxShadow: "inset 0 0 0 1px rgba(210, 180, 140, 0.7)",
                 fontSize: "20px",
               }}
             >
                <div style={{ opacity: 0.65, fontSize: "15px", marginBottom: "6px" }}>出身校地</div>
                {profile.hometown}
             </div>
             <div
               style={{
                 padding: "18px 20px",
                 background: "rgba(255,255,255,0.85)",
                 borderRadius: "18px",
                 boxShadow: "inset 0 0 0 1px rgba(210, 180, 140, 0.7)",
                 fontSize: "20px",
               }}
             >
                <div style={{ opacity: 0.65, fontSize: "15px", marginBottom: "6px" }}>特长爱好</div>
                {profile.hobby}
             </div>
          </div>

          {/* 雷达图区块 */}
          <div style={{ display: "flex", alignItems: "center", marginTop: "30px", gap: "30px" }}>
              <svg width="300" height="300" style={{ filter: "drop-shadow(0 0 10px rgba(139,0,0,0.6))" }}>
                 <circle
                   cx="150"
                   cy="150"
                   r="120"
                   fill="rgba(255, 250, 240, 0.9)"
                   stroke="rgba(184, 134, 11, 0.6)"
                   strokeDasharray="5,5"
                 />
                 <polygon
                   points={polygonPoints}
                   fill="rgba(220, 38, 38, 0.4)"
                   stroke="#7f1d1d"
                   strokeWidth="2"
                 />
              </svg>
              <div style={{ fontSize: "16px", lineHeight: "1.8" }}>
                 【多维能力模型评定】<br/>
                 <span style={{ color: "#8b1a1a" }}>● 专业潜质均衡发展</span><br/>
                 <span style={{ color: "#8b1a1a" }}>● 项目实践能力 表现突出</span><br/>
                 <span style={{ color: "#8b1a1a" }}>● 未来成长空间 极具潜力</span>
              </div>
          </div>
        </div>

        {/* 右侧：暖色+科技混合成绩单 */}
        <div
          style={{
            background: "rgba(15, 23, 42, 0.9)",
            borderRadius: "40px",
            border: "1px solid rgba(248, 250, 252, 0.1)",
            padding: "36px 40px",
            color: "#f9fafb",
            boxShadow: "0 24px 50px rgba(15, 23, 42, 0.9)",
          }}
        >
          <h3
            style={{
              fontSize: "30px",
              color: "#facc15",
              marginBottom: "26px",
              textAlign: "center",
              letterSpacing: "4px",
            }}
          >
            录取评测报告
          </h3>
          {grades.map((g, i) => {
             const spr = spring({
               frame: currentFrame - (frame + 30 + i * 8),
               fps,
               config: { damping: 15 },
             });
             return (
               <div key={i} style={{ marginBottom: "25px" }}>
                 <div
                   style={{
                     display: "flex",
                     justifyContent: "space-between",
                     marginBottom: "8px",
                     fontSize: "20px",
                   }}
                 >
                    <span>{g.subject}</span>
                    <span style={{ color: "#fde68a" }}>{g.score}</span>
                 </div>
                 <div
                   style={{
                     width: "100%",
                     height: "8px",
                     background: "rgba(30,64,175,0.6)",
                     borderRadius: "999px",
                     overflow: "hidden",
                   }}
                 >
                    <div 
                      style={{ 
                        width: `${spr * g.score}%`, 
                        height: "100%", 
                        background: "linear-gradient(90deg, #facc15, #fb923c, #ef4444)",
                        boxShadow: "0 0 12px rgba(248, 250, 252, 0.9)",
                      }} 
                    />
                 </div>
               </div>
             )
          })}
          <div
            style={{
              marginTop: "34px",
              padding: "18px 20px",
              border: "1px dashed rgba(250, 204, 21, 0.8)",
              borderRadius: "18px",
              textAlign: "center",
            }}
          >
             <p style={{ fontSize: "22px", fontWeight: "bold", color: "#fef9c3" }}>入学综合评分 95.5</p>
             <p style={{ fontSize: "13px", opacity: 0.7, marginTop: "8px" }}>恭喜通过高新智学评价体系认证</p>
          </div>
        </div>

      </div>
    </AbsoluteFill>
  );
};
