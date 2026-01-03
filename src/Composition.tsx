import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from 'remotion';

export const AdmissionVideo = ({ name, major }: { name: string; major: string }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. 文字进入动画：使用弹簧效果 (Spring)
  const entrance = spring({
    frame,
    fps,
    config: { damping: 10 },
  });

  // 2. 背景缩放动画
  const scale = interpolate(frame, [0, 300], [1, 1.2]);

  return (
    <AbsoluteFill style={{ backgroundColor: 'white', overflow: 'hidden' }}>
      {/* 学校背景图 */}
      <div style={{ transform: `scale(${scale})`, width: '100%', height: '100%' }}>
        <img 
          src="https://www.gdjxzsb.com/skin/images/banner2.jpg" // 替换为真实的学校大门照片
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(139, 0, 0, 0.4)' }} />
      </div>

      {/* 动态内容容器 */}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', color: 'white' }}>
        <div style={{ transform: `scale(${entrance})`, textAlign: 'center' }}>
          <h1 style={{ fontSize: 80, marginBottom: 20 }}>录取通知书</h1>
          <div style={{ height: 4, width: 200, backgroundColor: '#ffd700', margin: '0 auto 40px' }} />
          
          <h2 style={{ fontSize: 60 }}>
            <span style={{ color: '#ffd700' }}>{name}</span> 同学
          </h2>
          
          <p style={{ fontSize: 40, marginTop: 20 }}>
            恭喜被 <span style={{ fontWeight: 'bold' }}>{major}</span> 专业录取
          </p>
        </div>
      </AbsoluteFill>

      {/* 校徽 Corner */}
      <div style={{ position: 'absolute', top: 50, left: 50 }}>
        <h3 style={{ color: 'white', fontSize: 24 }}>广东省高新技术高级技工学校</h3>
      </div>
    </AbsoluteFill>
  );
};