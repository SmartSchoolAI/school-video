import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { theme } from './theme';

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
        padding: '70px 32px 60px',
        color: theme.palette.text.primary,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div style={{ width: '100%', maxWidth: 900 }}>
        <h2
          style={{
            fontSize: '48px',
            color: theme.palette.primary.light,
            textAlign: 'center',
            marginBottom: '40px',
            textShadow: '0 0 24px rgba(124, 77, 255, 0.95)',
          }}
        >
          学校荣耀 · 核心优势
        </h2>
        
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '16px',
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
                  'linear-gradient(135deg, rgba(24, 16, 48, 0.95), rgba(76, 29, 149, 0.98))',
                padding: '16px 26px',
                borderRadius: '999px',
                border: '1px solid rgba(180, 124, 255, 0.9)',
                fontSize: '20px',
                transform: `translateX(${(1 - spr) * 120}px)`,
                opacity: spr,
                boxShadow: '0 16px 40px rgba(15, 23, 42, 0.95)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                justifyContent: 'flex-start',
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
            marginTop: '40px',
            textAlign: 'center',
            fontSize: '22px',
            fontStyle: 'italic',
            color: theme.palette.secondary.light,
          }}
        >
          “厚德·强能·进取·创新 —— 以质量树品牌，以品牌创一流”
        </div>
      </div>
    </AbsoluteFill>
  );
};
