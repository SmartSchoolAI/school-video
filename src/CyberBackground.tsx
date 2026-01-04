import { AbsoluteFill, useCurrentFrame, interpolate, spring, staticFile, Img } from 'remotion';
import { theme } from './theme';

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

  // 背景渐变的“呼吸感”与位移动画（模拟 react-spring 那种柔和流动）
  const bgSpring = spring({
    frame,
    fps,
    // 更柔和一点：阻尼略大，刚度略小
    config: { damping: 20, stiffness: 32 },
  });

  // 降低振幅，让位移更细腻
  const waveX = Math.sin(frame / 90) * 8;
  const waveY = Math.cos(frame / 150) * 6;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.palette.background.main, overflow: 'hidden' }}>

      {/* 极光背景 - 科技紫 + 淡红 */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background:
            theme.palette.background.overlay,
        }}
      />

      {/* 动态梦幻极光流 - 深紫主层 */}
      <div 
        style={{
          position: 'absolute',
          width: '200%',
          height: '200%',
          background:
            'radial-gradient(ellipse at center, rgba(124, 77, 255, 0.32) 0%, transparent 70%)',
          top: `${-55 + waveY * 0.3}%`,
          left: `${-55 + waveX * 0.8}%`,
          filter: 'blur(95px)',
          transform: `scale(${1 + bgSpring * 0.08})`,
        }}
      />

      {/* 动态梦幻极光流 - 淡红副层 */}
      <div
        style={{
          position: 'absolute',
          width: '220%',
          height: '220%',
          background:
            'radial-gradient(ellipse at center, rgba(244, 143, 177, 0.26) 0%, transparent 75%)',
          bottom: `${-60 + waveY * 0.4}%`,
          right: `${-60 - waveX * 0.4}%`,
          filter: 'blur(110px)',
          mixBlendMode: 'screen',
          transform: `scale(${1.05 + bgSpring * 0.06})`,
        }}
      />

      {/* 动态网格面 - 浅蓝色线条 */}
      <div
        style={{
          position: 'absolute',
          width: '200%',
          height: '200%',
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 253, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 253, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          transform: `perspective(800px) rotateX(65deg) translateY(${(frame % 100) * 1}px)`,
          bottom: '-50%',
          left: '-50%',
          opacity: 0.7,
        }}
      />

      {/* 科技紫/淡红粒子 - 校园星光 */}
      {new Array(PARTICLE_COUNT).fill(0).map((_, i) => {
        const x = (i * 123) % 100;
        const y = (i * 67) % 100;
        const speed = 0.3 + (i % 6) * 0.1;
        const size = 1 + (i % 4);
        const opacity = 0.18 + (i % 5) * 0.14;
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
              backgroundColor:
                i % 3 === 0
                  ? theme.palette.primary.light
                  : i % 3 === 1
                  ? theme.palette.secondary.main
                  : theme.palette.accent.softBlue,
              borderRadius: '50%',
              opacity,
              boxShadow: '0 0 18px rgba(224, 64, 251, 0.9)',
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
          background: `linear-gradient(to bottom, transparent, ${theme.palette.primary.light}, transparent)`,
          boxShadow: '0 0 15px rgba(180, 124, 255, 0.9)',
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
          background: `linear-gradient(to bottom, transparent, ${theme.palette.secondary.main}, transparent)`,
          boxShadow: '0 0 15px rgba(244, 143, 177, 0.9)',
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
              border: '1px solid rgba(148, 163, 253, 0.3)',
              borderRadius: '50%',
              top: `${20 + i * 30}%`,
              left: `${10 + i * 40}%`,
              transform: `translate(${-50 + Math.cos(frame / 60 + i) * 30}px, ${Math.sin(frame / 60 + i) * 30}px)`,
              opacity: 0.2,
            }}
          />
        )
      })}

      {/* 额外的动态线条装饰：紫色/淡红霓虹线 */}
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <line 
          x1="0" y1="100" x2={`${interpolate(lineProgress, [0, 1], [0, 1920])}`} y2="100" 
          stroke={theme.palette.primary.light} strokeWidth="2" strokeDasharray="1000" strokeDashoffset={`${1000 - interpolate(lineProgress, [0, 1], [0, 1000])}`} 
          opacity="0.55" 
        />
        <line 
          x1="1920" y1="980" x2={`${1920 - interpolate(lineProgress, [0, 1], [0, 1920])}`} y2="980" 
          stroke={theme.palette.secondary.main} strokeWidth="2" strokeDasharray="1000" strokeDashoffset={`${1000 - interpolate(lineProgress, [0, 1], [0, 1000])}`} 
          opacity="0.55" 
        />
        <line 
          x1="100" y1="0" x2="100" y2={`${interpolate(lineProgress, [0, 1], [0, 1080])}`} 
          stroke={theme.palette.accent.softBlue} strokeWidth="2" strokeDasharray="1000" strokeDashoffset={`${1000 - interpolate(lineProgress, [0, 1], [0, 1000])}`} 
          opacity="0.55" 
        />
      </svg>

    </AbsoluteFill>
  );
};
