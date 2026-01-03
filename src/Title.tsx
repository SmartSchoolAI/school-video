import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';

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
      }}
    >
      <div style={{ display: 'flex', gap: '5px' }}>
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
                fontSize: '110px',
                fontWeight: 900,
                color: '#fff8e7',
                display: 'inline-block',
                transform: `scale(${charScale}) translateY(${float}px)`,
                opacity: charOpacity,
                textShadow:
                  '0 0 20px rgba(255, 215, 0, 0.85), 0 0 45px rgba(139, 0, 0, 0.65)',
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
          width: '800px',
          background:
            'linear-gradient(to right, transparent, #facc15, #fee9b2, #f97316, transparent)',
          marginTop: '40px',
          boxShadow: '0 0 28px rgba(250, 204, 21, 0.95)',
          transform: `scaleX(${scale})`,
        }}
      />

      {subtitle && (
        <div
          style={{
            marginTop: '40px',
            fontSize: '32px',
            letterSpacing: '6px',
            color: '#ffe4c4',
            textShadow: '0 0 12px rgba(139, 0, 0, 0.7)',
          }}
        >
          {subtitle}
        </div>
      )}
    </AbsoluteFill>
  );
};
