import { AbsoluteFill, interpolate, spring, useCurrentFrame, Img } from "remotion";
import { theme } from "./theme";

export type Student = {
  id: string;
  name: string;
  major: string;
  class: string;
  admissionDate: string;
  quote: string;
  idPhoto: string;
  profile: { studentId: string; hometown: string; hobby: string };
  grades: { subject: string; score: number }[];
  skills: Record<string, number>;
  majorDetails: { title: string; features: string[]; motto: string; future: string[] };
};

export const StudentShowcase: React.FC<{
  students: Student[];
  frame: number;
  duration: number;
}> = ({ students, frame, duration }) => {
  const currentFrame = useCurrentFrame();
  const fps = 30;

  if (currentFrame < frame || currentFrame >= frame + duration) {
    return null;
  }

  const visibleStudents = students.slice(0, 4); // 最多展示 4 位，保证节奏紧凑
  const segment = duration / Math.max(visibleStudents.length, 1);

  return (
    <AbsoluteFill
      style={{
        padding: "60px 120px",
        color: theme.palette.text.primary,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {visibleStudents.map((stu, index) => {
        const segStart = frame + segment * index;
        const segEnd = segStart + segment;

        const localProgress = interpolate(
          currentFrame,
          [segStart, segStart + 10, segEnd - 15, segEnd],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const entrance = spring({
          frame: currentFrame - segStart,
          fps,
          config: { damping: 15, stiffness: 120 },
        });

        const avgScore = Math.round(
          stu.grades.reduce((sum, g) => sum + g.score, 0) / stu.grades.length
        );

        const score = Math.round(
          interpolate(
            currentFrame,
            [segStart + 5, segStart + 25],
            [0, avgScore],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          )
        );

        return (
          <div
            key={stu.id}
            style={{
              position: "absolute",
              opacity: localProgress,
              transform: `translateY(${(1 - entrance) * 40}px) scale(${0.9 + entrance * 0.1})`,
              transition: "opacity 0.3s",
              width: "100%",
              maxWidth: "1300px",
              display: "grid",
              gridTemplateColumns: "1.2fr 0.8fr",
              gap: "40px",
            }}
          >
            {/* 左侧：照片 + 基本信息 */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(24, 16, 48, 0.96), rgba(52, 21, 72, 0.98))",
                borderRadius: "32px",
                padding: "32px 40px",
                boxShadow: "0 18px 45px rgba(15,23,42,0.9)",
                border: "1px solid rgba(129, 140, 248, 0.7)",
                display: "flex",
                gap: "28px",
                alignItems: "center",
              }}
            >
              <div style={{ position: "relative" }}>
                <Img
                  src={stu.idPhoto}
                  alt={stu.name}
                  style={{
                    width: "170px",
                    height: "220px",
                    borderRadius: "24px",
                    border: `3px solid ${theme.palette.primary.main}`,
                    objectFit: "cover",
                    backgroundColor: "#020617",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "24px",
                    boxShadow: "inset 0 0 18px rgba(129, 140, 248, 0.7)",
                    pointerEvents: "none",
                  }}
                />
              </div>

              <div>
                <div
                  style={{
                    fontSize: "40px",
                    fontWeight: 800,
                    color: theme.palette.secondary.light,
                    marginBottom: "6px",
                  }}
                >
                  {stu.name}
                </div>
                <div style={{ fontSize: "18px", color: theme.palette.text.muted, marginBottom: "16px" }}>
                  NO.{stu.profile.studentId} · {stu.class}
                </div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "18px",
                    padding: "6px 16px",
                    borderRadius: "999px",
                    background:
                      "linear-gradient(120deg, rgba(124,77,255,0.95), rgba(236,72,153,0.9))",
                    color: theme.palette.text.primary,
                    marginBottom: "14px",
                  }}
                >
                  <span>录取专业</span>
                  <span style={{ fontWeight: 700 }}>{stu.major}</span>
                </div>

                <div style={{ fontSize: "16px", color: theme.palette.text.secondary, marginBottom: "6px" }}>
                  入学时间：{stu.admissionDate}
                </div>
                <div style={{ fontSize: "16px", color: theme.palette.text.secondary, opacity: 0.85 }}>
                  生源地：{stu.profile.hometown} · 爱好：{stu.profile.hobby}
                </div>

                <div
                  style={{
                    marginTop: "22px",
                    fontSize: "18px",
                    color: theme.palette.secondary.light,
                    fontStyle: "italic",
                  }}
                >
                  “{stu.quote}”
                </div>
              </div>
            </div>

            {/* 右侧：成绩计数器 + 关键词 */}
            <div
              style={{
                background: theme.palette.background.paper,
                borderRadius: "32px",
                padding: "30px 32px",
                border: "1px solid rgba(129, 140, 248, 0.5)",
                boxShadow: "0 18px 45px rgba(15,23,42,0.9)",
                color: theme.palette.text.primary,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "22px",
                    letterSpacing: "2px",
                    color: theme.palette.secondary.main,
                    marginBottom: "10px",
                  }}
                >
                  录取评测 · 综合成绩
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: "10px" }}>
                  <div style={{ fontSize: "60px", fontWeight: 800, lineHeight: 1 }}>
                    {score}
                  </div>
                  <div style={{ fontSize: "20px", marginBottom: "8px" }}>分</div>
                </div>
                <div style={{ fontSize: "13px", opacity: 0.8, marginTop: "6px" }}>
                  * 根据专业核心课程成绩动态生成
                </div>

                <div
                  style={{
                    fontSize: "13px",
                    opacity: 0.8,
                    height: "8px",
                    borderRadius: "999px",
                    background: "rgba(30, 64, 175, 0.55)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${Math.min(100, (score / 100) * 100)}%`,
                      height: "100%",
                      background:
                        "linear-gradient(90deg, #7C4DFF, #E040FB, #FF80AB)",
                      boxShadow: "0 0 16px rgba(224, 64, 251, 0.9)",
                    }}
                  />
                </div>
              </div>

              <div style={{ marginTop: "26px" }}>
                <div
                  style={{
                    fontSize: "18px",
                    color: theme.palette.text.secondary,
                    marginBottom: "10px",
                  }}
                >
                  未来方向
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {stu.majorDetails.future.map((f) => (
                    <span
                      key={f}
                      style={{
                        fontSize: "13px",
                        padding: "6px 12px",
                        borderRadius: "999px",
                        background: "rgba(109, 40, 217, 0.8)",
                        border: "1px solid rgba(196, 181, 253, 0.95)",
                        boxShadow: "0 0 12px rgba(129,140,248,0.8)",
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: "20px" }}>
                <div
                  style={{
                    fontSize: "16px",
                    color: theme.palette.text.secondary,
                    marginBottom: "8px",
                  }}
                >
                  专业亮点
                </div>
                <ul
                  style={{
                    listStyle: "disc",
                    paddingLeft: "18px",
                    fontSize: "13px",
                    color: theme.palette.text.secondary,
                    opacity: 0.9,
                  }}
                >
                  {stu.majorDetails.features.slice(0, 2).map((feat) => (
                    <li key={feat}>{feat}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
