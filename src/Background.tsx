import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, Easing } from 'remotion';
import { theme } from './theme';

const PARTICLE_COUNT = 80;

export const Background: React.FC<{ imgSrc?: string }> = ({ imgSrc }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // --- 1. 严格递增的淡出逻辑 ---
  const FADE_OUT_DURATION = 60; // 2秒淡出
  const fadeOutStart = durationInFrames - FADE_OUT_DURATION;
  const fadeOutEnd = durationInFrames - 5; // 预留5帧空白

  // 透明度控制：从 1 变为 0
  // 注意：inputRange [fadeOutStart, fadeOutEnd] 是递增的
  const imageOpacity = interpolate(
    frame,
    [fadeOutStart, fadeOutEnd],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.33, 1, 0.68, 1),
    }
  );

  // 缩放控制：从 1 变为 1.08
  const imageScale = interpolate(
    frame,
    [fadeOutStart, fadeOutEnd],
    [1, 1.08],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.quad),
    }
  );

  // 模糊控制：从 0 变为 20
  const imageBlur = interpolate(
    frame,
    [fadeOutStart, fadeOutEnd],
    [0, 20],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // --- 2. 背景装饰动画 (保持原样) ---
  const lineProgress = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  const bgSpring = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 32 },
  });

  const waveX = Math.sin(frame / 90) * 8;
  const waveY = Math.cos(frame / 150) * 6;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.palette.background.main, overflow: 'hidden' }}>
      
      {/* 极光背景层 */}
      <div style={{ position: 'absolute', inset: 0, background: theme.palette.background.overlay }} />

      {/* 动态极光流 */}
      <div style={{
          position: 'absolute', width: '200%', height: '200%',
          background: 'radial-gradient(ellipse at center, rgba(124, 77, 255, 0.32) 0%, transparent 70%)',
          top: `${-55 + waveY * 0.3}%`, left: `${-55 + waveX * 0.8}%`,
          filter: 'blur(95px)', transform: `scale(${1 + bgSpring * 0.08})`,
        }}
      />
      <div style={{
          position: 'absolute', width: '220%', height: '220%',
          background: 'radial-gradient(ellipse at center, rgba(244, 143, 177, 0.26) 0%, transparent 75%)',
          bottom: `${-60 + waveY * 0.4}%`, right: `${-60 - waveX * 0.4}%`,
          filter: 'blur(110px)', mixBlendMode: 'screen', transform: `scale(${1.05 + bgSpring * 0.06})`,
        }}
      />

      {/* 网格系统 */}
      <div style={{
          position: 'absolute', width: '200%', height: '200%',
          backgroundImage: `linear-gradient(to right, rgba(148, 163, 253, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 253, 0.12) 1px, transparent 1px)`,
          backgroundSize: '100px 100px', transform: `perspective(800px) rotateX(65deg) translateY(${(frame % 100) * 1}px)`,
          bottom: '-50%', left: '-50%', opacity: 0.7,
        }}
      />

      {/* 粒子装饰 */}
      {new Array(PARTICLE_COUNT).fill(0).map((_, i) => (
        <div key={i} style={{
            position: 'absolute', left: `${(i * 123) % 100}%`, top: `${((i * 67) % 100) + frame * (0.3 + (i % 6) * 0.1) % 100}%`,
            transform: `translateX(${Math.sin((frame + i * 10) / 40) * 20}px)`,
            width: `${1 + (i % 4)}px`, height: `${1 + (i % 4)}px`,
            backgroundColor: i % 3 === 0 ? theme.palette.primary.light : i % 3 === 1 ? theme.palette.secondary.main : theme.palette.accent.softBlue,
            borderRadius: '50%', opacity: 0.18 + (i % 5) * 0.14, boxShadow: '0 0 18px rgba(224, 64, 251, 0.9)',
          }}
        />
      ))}

      {/* --- 3. 图片展示层：修复报错后的淡出逻辑 --- */}
      {imgSrc && (
        <AbsoluteFill style={{ 
          justifyContent: 'center', 
          alignItems: 'center',
          opacity: imageOpacity,
          transform: `scale(${imageScale})`,
          filter: `blur(${imageBlur}px)`,
        }}>
          <Img 
            src={imgSrc} 
            style={{ 
              maxHeight: '75%', 
              borderRadius: '16px', 
              boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.1)'
            }} 
          />
        </AbsoluteFill>
      )}

      {/* 侧边流光线条 */}
      <div style={{ position: 'absolute', left: '60px', top: '0', bottom: '0', width: '1px', background: `linear-gradient(to bottom, transparent, ${theme.palette.primary.light}, transparent)`, opacity: 0.45 }} />
      <div style={{ position: 'absolute', right: '60px', top: '0', bottom: '0', width: '1px', background: `linear-gradient(to bottom, transparent, ${theme.palette.secondary.main}, transparent)`, opacity: 0.45 }} />

      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <line x1="0" y1="114" x2={`${interpolate(lineProgress, [0, 1], [0, 1920])}`} y2="114" stroke={theme.palette.primary.light} strokeWidth="2" opacity="0.55" />
      </svg>
    </AbsoluteFill>
  );
};