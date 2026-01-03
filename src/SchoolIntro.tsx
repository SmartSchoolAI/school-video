import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';

const highlights = [
  { title: '省属全日制', desc: '隶属于广东省人力资源和社会保障厅', icon: '🏢' },
  { title: '国家重点', desc: '省属全日制国家重点高级技工院校', icon: '🌟' },
  { title: '现代化校园', desc: '占地16万平，设有3D打印、珠宝玉雕等实验室', icon: '🧪' },
  { title: '4A级生活', desc: '4A示范食堂、足球场、现代化学生宿舍', icon: '⚽' },
  { title: '产教融合', desc: '电子商务、室内设计等专业校办企业', icon: '🤝' },
  { title: '品牌创一流', desc: '管理打基础，质量为中心，品牌创一流', icon: '💎' },
];

export const SchoolIntro: React.FC<{ frame: number; duration: number }> = ({ frame, duration }) => {
  const currentFrame = useCurrentFrame();
  const fps = 30;

  const opacity = interpolate(
    currentFrame,
    [frame, frame + 20, frame + duration - 20, frame + duration],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

  if (currentFrame < frame || currentFrame >= frame + duration) {
    return null;
  }

  return (
    <AbsoluteFill
      style={{
        opacity,
        padding: '60px 80px',
        color: '#4a2b1a',
      }}
    >
      <h2
        style={{
          fontSize: '60px',
          textAlign: 'center',
          color: '#8b1a1a',
          marginBottom: '40px',
          textShadow: '0 0 14px rgba(139, 0, 0, 0.6)',
        }}
      >
        走进高新 · 领航未来
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '28px',
        }}
      >
        {highlights.map((item, i) => {
          const entry = frame + 10 + i * 5;
          const spr = spring({
            frame: currentFrame - entry,
            fps,
            config: { damping: 15 },
          });

          return (
            <div
              key={item.title}
              style={{
                background:
                  'linear-gradient(135deg, rgba(255, 248, 240, 0.96), rgba(255, 236, 210, 0.96))',
                backdropFilter: 'blur(20px)',
                borderRadius: '26px',
                padding: '26px',
                border: '1px solid rgba(184, 134, 11, 0.45)',
                transform: `scale(${spr}) translateY(${(1 - spr) * 25}px)`,
                opacity: spr,
                boxShadow: '0 14px 32px rgba(0,0,0,0.25)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '50px', marginBottom: '15px' }}>{item.icon}</div>
              <h3
                style={{
                  fontSize: '26px',
                  color: '#8b1a1a',
                  marginBottom: '8px',
                  letterSpacing: '2px',
                }}
              >
                {item.title}
              </h3>
              <p style={{ fontSize: '17px', lineHeight: '1.5', opacity: 0.9 }}>{item.desc}</p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
