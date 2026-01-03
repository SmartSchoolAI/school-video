import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';

const awards = [
  "全国教育系统先进集体",
  "广东省职业教育先进单位",
  "广州市花都区技工院校技能大赛一等奖",
  "广东省电子商务专业技能竞赛金奖",
  "国家职业技能鉴定所优质服务奖",
  "广东省技工学校德育工作优秀奖",
  "广州市文明校园称号",
  "产教融合示范性实训基地"
];

export const HonorMilestones: React.FC<{ frame: number; duration: number }> = ({ frame, duration }) => {
  const currentFrame = useCurrentFrame();
  const fps = 30;

  const opacity = interpolate(currentFrame, [frame, frame + 20, frame + duration - 20, frame + duration], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  if (currentFrame < frame || currentFrame >= frame + duration) {
    return null;
  }

  return (
    <AbsoluteFill
      style={{
        opacity,
        padding: '70px 80px',
        color: '#4a2b1a',
      }}
    >
      <h2
        style={{
          fontSize: '56px',
          color: '#8b1a1a',
          textAlign: 'center',
          marginBottom: '50px',
          textShadow: '0 0 16px rgba(139, 0, 0, 0.65)',
        }}
      >
        学校荣耀 · 核心优势
      </h2>
      
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '18px',
        }}
      >
        {awards.map((award, i) => {
          const entry = frame + 20 + i * 8;
          const spr = spring({
            frame: currentFrame - entry,
            fps,
            config: { damping: 12 },
          });

          return (
            <div 
              key={i}
              style={{
                background:
                  'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 248, 230, 0.96))',
                padding: '16px 30px',
                borderRadius: '999px',
                border: '1px solid rgba(184, 134, 11, 0.5)',
                fontSize: '20px',
                transform: `translateX(${(1 - spr) * 140}px)`,
                opacity: spr,
                boxShadow: '0 10px 26px rgba(0, 0, 0, 0.28)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '26px' }}>🏅</span>
              {award}
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: '60px',
          textAlign: 'center',
          fontSize: '24px',
          fontStyle: 'italic',
          color: '#8b4513',
        }}
      >
        “厚德·强能·进取·创新 —— 以质量树品牌，以品牌创一流”
      </div>
    </AbsoluteFill>
  );
};
