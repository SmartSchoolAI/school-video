import { AbsoluteFill, useCurrentFrame, interpolate, spring, staticFile, Img } from 'remotion';

const PARTICLE_COUNT = 80;

export const CyberBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 30;

  // SVG 线条生长动画
  const lineProgress = spring({
    frame: frame,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#130c0a', overflow: 'hidden' }}>
      {/* 底部背景图 */}
      <Img 
        src={staticFile("school_bg.jpg")}
        style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: 0.28 }}
        alt="School Background"
      />

      {/* 极光背景 - 暖金 + 深蓝 */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 20% 0%, rgba(255, 215, 0, 0.32) 0%, transparent 45%),\
             radial-gradient(circle at 80% 100%, rgba(220, 38, 38, 0.4) 0%, transparent 50%),\
             radial-gradient(circle at 50% 50%, #0b1220 0%, #020617 95%)',
        }}
      />

      {/* 动态梦幻极光流 */}
      <div 
        style={{
          position: 'absolute',
          width: '200%',
          height: '200%',
          background:
            'radial-gradient(ellipse at center, rgba(250, 204, 21, 0.25) 0%, transparent 70%)',
          top: '-50%',
          left: `${-50 + Math.sin(frame / 50) * 10}%`,
          filter: 'blur(95px)',
        }}
      />

      {/* 动态网格面 - 浅蓝色线条 */}
      <div
        style={{
          position: 'absolute',
          width: '200%',
          height: '200%',
          backgroundImage: `
            linear-gradient(to right, rgba(248, 250, 252, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(248, 250, 252, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          transform: `perspective(800px) rotateX(65deg) translateY(${(frame % 100) * 1}px)`,
          bottom: '-50%',
          left: '-50%',
          opacity: 0.7,
        }}
      />

      {/* 暖色粒子 - 校园星光 & 适度科技感 */}
      {new Array(PARTICLE_COUNT).fill(0).map((_, i) => {
        const x = (i * 123) % 100;
        const y = (i * 67) % 100;
        const speed = 0.3 + (i % 6) * 0.1;
        const size = 1 + (i % 4);
        const opacity = 0.2 + (i % 5) * 0.15;
        const drift = Math.sin((frame + i * 10) / 40) * 20;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${(y + frame * speed) % 100}%`,
              transform: `translateX(${drift}px)`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: i % 2 === 0 ? '#facc15' : '#fb923c',
              borderRadius: '50%',
              opacity,
              boxShadow: '0 0 18px rgba(250, 204, 21, 0.8)',
            }}
          />
        );
      })}

      {/* 两侧流光线条 */}
      <div 
        style={{
          position: 'absolute',
          left: '60px',
          top: '0',
          bottom: '0',
          width: '1px',
          background: 'linear-gradient(to bottom, transparent, #facc15, transparent)',
          boxShadow: '0 0 15px rgba(250, 204, 21, 0.9)',
          opacity: 0.45,
        }}
      />
      <div 
        style={{
          position: 'absolute',
          right: '60px',
          top: '0',
          bottom: '0',
          width: '1px',
          background: 'linear-gradient(to bottom, transparent, #facc15, transparent)',
          boxShadow: '0 0 15px rgba(250, 204, 21, 0.9)',
          opacity: 0.45,
        }}
      />

      {/* 浮动的梦幻气泡 */}
      {[0, 1, 2].map((_, i) => {
        return (
          <div 
            key={i}
            style={{
              position: 'absolute',
              width: '400px',
              height: '400px',
              border: '1px solid rgba(248, 250, 252, 0.12)',
              borderRadius: '50%',
              top: `${20 + i * 30}%`,
              left: `${10 + i * 40}%`,
              transform: `translate(${-50 + Math.cos(frame / 60 + i) * 30}px, ${Math.sin(frame / 60 + i) * 30}px)`,
              opacity: 0.2,
            }}
          />
        )
      })}

      {/* 额外的动态线条装饰：适度保留科技感 */}
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <line 
          x1="0" y1="100" x2={`${interpolate(lineProgress, [0, 1], [0, 1920])}`} y2="100" 
          stroke="#facc15" strokeWidth="2" strokeDasharray="1000" strokeDashoffset={`${1000 - interpolate(lineProgress, [0, 1], [0, 1000])}`} 
          opacity="0.55" 
        />
        <line 
          x1="1920" y1="980" x2={`${1920 - interpolate(lineProgress, [0, 1], [0, 1920])}`} y2="980" 
          stroke="#fb923c" strokeWidth="2" strokeDasharray="1000" strokeDashoffset={`${1000 - interpolate(lineProgress, [0, 1], [0, 1000])}`} 
          opacity="0.55" 
        />
        <line 
          x1="100" y1="0" x2="100" y2={`${interpolate(lineProgress, [0, 1], [0, 1080])}`} 
          stroke="#e5e7eb" strokeWidth="2" strokeDasharray="1000" strokeDashoffset={`${1000 - interpolate(lineProgress, [0, 1], [0, 1000])}`} 
          opacity="0.55" 
        />
      </svg>

    </AbsoluteFill>
  );
};
