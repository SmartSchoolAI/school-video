import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { theme } from './theme';

export const Title: React.FC<{ title: string; subtitle?: string; frame: number; duration: number }> = ({
  title,
  subtitle,
  frame,
  duration,
}) => {
  const currentFrame = useCurrentFrame();
  const fps = 30;

  const opacity = interpolate(currentFrame, [frame, frame + 20, frame + duration - 20, frame + duration], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = spring({
    frame: currentFrame - frame,
    fps,
    config: { damping: 12 },
  });

  // 分离字符以进行粒子汇聚效果模拟
  const characters = title.split('');

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        opacity,
        flexDirection: 'column',
        padding: '0 40px',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '5px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          maxWidth: '100%',
        }}
      >
        {characters.map((char, i) => {
          const charEntryFrame = frame + i * 3;
          const charOpacity = interpolate(currentFrame, [charEntryFrame, charEntryFrame + 15], [0, 1]);
          const charScale = spring({
            frame: currentFrame - charEntryFrame,
            fps,
            config: { stiffness: 100 },
          });
          const float = Math.sin((currentFrame + i * 5) / 10) * 5;

          return (
            <span
              key={i}
              style={{
                fontSize: '80px',
                fontWeight: 900,
                color: theme.palette.text.primary,
                display: 'inline-block',
                transform: `scale(${charScale}) translateY(${float}px)`,
                opacity: charOpacity,
                textShadow:
                  '0 0 24px rgba(124, 77, 255, 0.95), 0 0 60px rgba(244, 143, 177, 0.75)',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Microsoft YaHei"',
              }}
            >
              {char}
            </span>
          );
        })}
      </div>
      
      {/* 底部光流 */}
      <div 
        style={{
          height: '2px',
          width: '80%',
          maxWidth: '800px',
          background:
            'linear-gradient(to right, transparent, #7C4DFF, #E040FB, #FF80AB, transparent)',
          marginTop: '40px',
          boxShadow: '0 0 32px rgba(124, 77, 255, 0.95)',
          transform: `scaleX(${scale})`,
        }}
      />

      {subtitle && (
        <div
          style={{
            marginTop: '40px',
            fontSize: '32px',
            letterSpacing: '6px',
            color: theme.palette.text.secondary,
            textShadow: '0 0 14px rgba(236, 72, 153, 0.9)',
          }}
        >
          {subtitle}
        </div>
      )}
    </AbsoluteFill>
  );
};
