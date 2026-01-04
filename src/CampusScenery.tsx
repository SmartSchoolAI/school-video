import { AbsoluteFill, Img, staticFile, useCurrentFrame, spring } from 'remotion';
import { theme } from './theme';

// 只取前 9 张图，做 3x3 校园风光九宫格
const IMAGES = [
  '01.jpg',
  '02.jpg',
  '03.jpg',
  '04.jpg',
  '05.jpg',
  '06.jpg',
  '07.jpg',
  '08.jpg',
  '09.jpg',
];

export const CampusScenery: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.palette.background.main,
        overflow: 'hidden',
        fontFamily:
          "'Noto Sans CJK SC', 'WenQuanYi Micro Hei', 'Microsoft YaHei', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* 顶部标题区域，风格对齐 StudentInfo 左侧卡片 */}
      <div
        style={{
          position: 'absolute',
          top: 50,
          left: 80,
          right: 80,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          color: theme.palette.text.primary,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              color: theme.palette.secondary.main,
              marginBottom: 6,
            }}
          >
            校园风光 · CAMPUS SCENERY
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              textShadow: '0 0 18px rgba(236,72,153,0.9)',
              transform: `translateY(${(1 - titleSpring) * -10}px)`,
              opacity: titleSpring,
            }}
          >
            广东省高新技术高级技工学校
          </div>
        </div>

        <div
          style={{
            fontSize: 16,
            color: theme.palette.text.secondary,
            textAlign: 'right',
            opacity: 0.9,
          }}
        >
          校园环境展示
          <br />
          Future Skills · Bright Campus
        </div>
      </div>

      {/* 中间：3x3 校园风光九宫格 */}
      <div
        style={{
          position: 'absolute',
          inset: '140px 80px 80px 80px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(3, 1fr)',
          gap: 18,
        }}
      >
        {IMAGES.map((img, i) => {
          const float = Math.sin((frame + i * 15) / 80) * 4;
          const imgSpring = spring({
            frame: frame - i * 5,
            fps,
            config: { damping: 18, stiffness: 80 },
          });

          return (
            <div
              key={img}
              style={{
                position: 'relative',
                borderRadius: 24,
                overflow: 'hidden',
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: '0 20px 40px rgba(15,23,42,0.9)',
                transform: `translateY(${float}px) scale(${0.98 + imgSpring * 0.04})`,
                transition: 'transform 0.3s ease',
                background:
                  'linear-gradient(135deg, rgba(24,16,48,0.9), rgba(52,21,72,0.95))',
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
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'radial-gradient(circle at 10% 0%, rgba(124,77,255,0.25) 0%, transparent 55%)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
