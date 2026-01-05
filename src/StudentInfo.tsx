import { AbsoluteFill, useCurrentFrame, interpolate, spring, Img } from "remotion";
import { theme } from "./theme";

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

  const opacity = interpolate(
    currentFrame,
    [frame, frame + 20, frame + duration - 20, frame + duration],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  if (currentFrame < frame || currentFrame >= frame + duration) {
    return null;
  }

  // 技能多边形
  const skillEntries = Object.entries(skills);
  const polygonPoints = skillEntries
    .map(([, val], i) => {
      const angle = (Math.PI * 2 * i) / skillEntries.length - Math.PI / 2;
      const r = (val / 100) * 120;
      return `${150 + Math.cos(angle) * r},${150 + Math.sin(angle) * r}`;
    })
    .join(" ");

  return (
    <AbsoluteFill
      style={{
        opacity,
        padding: "60px 32px 50px",
        color: theme.palette.text.primary,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          width: "100%",
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        {/* 左侧：科技紫档案卡 */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(24, 16, 48, 0.96), rgba(52, 21, 72, 0.98))",
            backdropFilter: "blur(30px)",
            borderRadius: "40px",
            border: "1px solid rgba(129, 140, 248, 0.7)",
            padding: "36px 40px",
            boxShadow: "0 20px 55px rgba(15, 23, 42, 0.95)",
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
                  border: `3px solid ${theme.palette.primary.main}`,
                  objectFit: "cover",
                  backgroundColor: "#020617",
                }}
                alt="Student"
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "24px",
                  boxShadow: "inset 0 0 32px rgba(129, 140, 248, 0.85)",
                  pointerEvents: "none",
                }}
              />
            </div>

            <div>
              <h2
                style={{
                  fontSize: "60px",
                  marginBottom: "5px",
                  color: theme.palette.secondary.light,
                  textShadow: "0 0 18px rgba(236, 72, 153, 0.9)",
                }}
              >
                {name}
              </h2>
              <p style={{ fontSize: "24px", color: theme.palette.text.muted }}>
                NO.{profile.studentId}
              </p>
              <div
                style={{
                  marginTop: "18px",
                  fontSize: "20px",
                  background: "rgba(76, 29, 149, 0.5)",
                  display: "inline-block",
                  padding: "6px 18px",
                  borderRadius: "999px",
                  color: theme.palette.text.primary,
                  border: `1px solid ${theme.palette.primary.light}`,
                }}
              >
                {major} / {className}
              </div>
              <div
                style={{
                  marginTop: "10px",
                  fontSize: "18px",
                  color: theme.palette.text.secondary,
                  opacity: 0.9,
                }}
              >
                入学时间：{admissionDate}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              fontSize: "32px",
            }}
          >
            <div
              style={{
                padding: "18px 20px",
                background: "rgba(15,23,42,0.9)",
                borderRadius: "18px",
                boxShadow: "inset 0 0 0 1px rgba(129, 140, 248, 0.9)",
                fontSize: "20px",
              }}
            >
              <div
                style={{
                  opacity: 0.8,
                  fontSize: "16px",
                  marginBottom: "6px",
                  color: theme.palette.text.muted,
                }}
              >
                出身校地
              </div>
              {profile.hometown}
            </div>
            <div
              style={{
                padding: "18px 20px",
                background: "rgba(15,23,42,0.9)",
                borderRadius: "18px",
                boxShadow: "inset 0 0 0 1px rgba(129, 140, 248, 0.9)",
                fontSize: "20px",
              }}
            >
              <div
                style={{
                  opacity: 0.8,
                  fontSize: "16px",
                  marginBottom: "6px",
                  color: theme.palette.text.muted,
                }}
              >
                特长爱好
              </div>
              {profile.hobby}
            </div>
          </div>

          {/* 雷达图区块 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "30px",
              gap: "30px",
            }}
          >
            <svg
              width="300"
              height="300"
              style={{ filter: "drop-shadow(0 0 14px rgba(129,140,248,0.9))" }}
            >
              <circle
                cx="150"
                cy="150"
                r="120"
                fill="rgba(15, 23, 42, 0.95)"
                stroke="rgba(129, 140, 248, 0.9)"
                strokeDasharray="5,5"
              />
              <polygon
                points={polygonPoints}
                fill="rgba(124, 77, 255, 0.55)"
                stroke={theme.palette.secondary.main}
                strokeWidth={2}
              />
            </svg>
            <div
              style={{ fontSize: "16px", lineHeight: "1.8", color: theme.palette.text.secondary }}
            >
              【多维能力模型评定】
              <br />
              <span style={{ color: theme.palette.secondary.light }}>
                ● 专业潜质均衡发展
              </span>
              <br />
              <span style={{ color: theme.palette.secondary.light }}>
                ● 项目实践能力 表现突出
              </span>
              <br />
              <span style={{ color: theme.palette.secondary.light }}>
                ● 未来成长空间 极具潜力
              </span>
            </div>
          </div>
        </div>

        {/* 下方：科技紫成绩单（毛玻璃稍微减弱一点） */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(15,23,42,0.55), rgba(76,29,149,0.75))",
            borderRadius: "40px",
            border: `1px solid ${theme.palette.divider}`,
            padding: "36px 40px",
            color: theme.palette.text.primary,
            boxShadow: "0 24px 46px rgba(15, 23, 42, 0.88)",
            backdropFilter: "blur(14px)",
          }}
        >
          <h3
            style={{
              fontSize: "30px",
              color: theme.palette.secondary.main,
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
                    fontSize: "32px",
                  }}
                >
                  <span>{g.subject}</span>
                  <span style={{ color: theme.palette.secondary.light }}>{g.score}</span>
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
                      background:
                        "linear-gradient(90deg, #7C4DFF, #E040FB, #FF80AB)",
                      boxShadow: "0 0 12px rgba(224, 64, 251, 0.9)",
                    }}
                  />
                </div>
              </div>
            );
          })}
          <div
            style={{
              marginTop: "34px",
              padding: "18px 20px",
              border: `1px dashed ${theme.palette.secondary.main}`,
              borderRadius: "18px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: theme.palette.text.secondary,
              }}
            >
              入学综合评分 95.5
            </p>
            <p style={{ fontSize: "14px", opacity: 0.7, marginTop: "8px" }}>
              恭喜通过高新智学评价体系认证
            </p>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
