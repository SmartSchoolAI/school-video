import { AbsoluteFill, Img, staticFile, useCurrentFrame, spring, interpolate } from 'remotion';
import { theme } from './theme';
import { Background } from './Background';

const IMAGES = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg'];

export const Campus: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 30;

  // 延长展示时间到 3 秒让视觉更舒适，如果你坚持 2 秒，请改回 fps * 2
  const framesPerImage = fps * 3; 
  const totalImages = IMAGES.length;
  const currentIndex = Math.floor(frame / framesPerImage) % totalImages;

  // 顶部标题动画
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 100 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: theme.palette.background.main, overflow: 'hidden' }}>
      <Background />

      {/* 顶部：标题 + 导航 */}
      <div style={{ position: 'absolute', top: 20, left: 80, right: 80, color: theme.palette.text.primary, zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: 30, letterSpacing: 4, color: theme.palette.secondary.main, marginBottom: 8 }}>
              校园风光 · CAMPUS SCENERY
            </div>
            <div style={{ fontSize: 46, fontWeight: 700, textShadow: '0 0 18px rgba(236,72,153,0.9)', transform: `translateY(${(1 - titleSpring) * -10}px)`, opacity: titleSpring }}>
              广东省高新技术高级技工学校
            </div>
          </div>
        </div>

        {/* 导航圆点 */}
        <div style={{ marginTop: 26, display: 'flex', justifyContent: 'center', gap: 18 }}>
          {IMAGES.map((_, i) => {
            const active = i === currentIndex;
            return (
              <div key={i} style={{
                width: 52, height: 52, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: active ? 32 : 28, fontWeight: 600, lineHeight: 1,
                color: active ? theme.palette.text.primary : theme.palette.text.secondary,
                background: active ? 'linear-gradient(135deg, #7C4DFF, #E040FB, #FF80AB)' : 'rgba(15,23,42,0.85)',
                border: active ? '1px solid rgba(248,250,252,0.8)' : `1px solid ${theme.palette.divider}`,
                boxShadow: active ? '0 8px 16px rgba(224,64,251,0.5)' : '0 0 8px rgba(15,23,42,0.8)',
                transform: active ? 'translateY(-4px) scale(1.15)' : 'translateY(0) scale(1)',
                transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
              }}>
                {i + 1}
              </div>
            );
          })}
        </div>
      </div>

      {/* 图片展示区域：核心优化逻辑 */}
      <div style={{ position: 'absolute', top: 160, left: 50, right: 50, bottom: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
        {IMAGES.map((img, i) => {
          // 计算每一张图自己的时间起点
          const startFrame = i * framesPerImage;
          const relativeFrame = frame - startFrame;

          // 关键：为了实现交叉淡入淡出，我们需要让图片在“不属于”它的时间内也渲染（提前15帧入场，延迟15帧退场）
          if (relativeFrame < -15 || relativeFrame > framesPerImage + 15) return null;

          // 1. 透明度：[隐藏 -> 出现 -> 保持 -> 消失]
          const opacity = interpolate(
            relativeFrame,
            [-15, 0, framesPerImage, framesPerImage + 15],
            [0, 1, 1, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );

          // 2. 呼吸感：缓慢放大的缩放
          const scale = interpolate(
            relativeFrame,
            [0, framesPerImage],
            [1, 1.1], // 在展示期间缓慢从 1 倍放大到 1.1 倍
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );

          // 3. 入场位移：弹簧效果
          const spr = spring({
            frame: relativeFrame,
            fps,
            config: { damping: 20, stiffness: 60 },
          });
          const translateY = (1 - spr) * 20;

          return (
            <div
              key={img}
              style={{
                position: 'absolute',
                width: '85%',
                height: '82%',
                borderRadius: 32,
                overflow: 'hidden',
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                opacity: opacity,
                transform: `translateY(${translateY}px) scale(${scale})`,
                zIndex: i === currentIndex ? 2 : 1,
              }}
            >
              <Img
                src={staticFile(img)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  backgroundColor: '#020617',
                }}
              />
              {/* 遮罩：让底部文字或背景更深邃 */}
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.3) 100%)', pointerEvents: 'none' }} />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};