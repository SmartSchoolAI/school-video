import { AbsoluteFill, Img, staticFile, useCurrentFrame, spring, interpolate } from 'remotion';
import { theme } from './theme';
import { CyberBackground } from './CyberBackground';

// 9 张图，对应导航 1~9
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

  // 每张图展示 2 秒
  const framesPerImage = fps * 2;
  const totalImages = IMAGES.length;
  const currentIndex = Math.floor(frame / framesPerImage) % totalImages;
  const localFrame = frame % framesPerImage;

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
      {/* 背景与其它场景保持一致：同样使用 CyberBackground */}
      <CyberBackground />

      {/* 顶部：标题 + 图片导航圆点（1~9） */}
      <div
        style={{
          position: 'absolute',
          top: 50,
          left: 80,
          right: 80,
          color: theme.palette.text.primary,
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
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

        {/* 导航圆点：1~9，对应每张图片 */}
        <div
          style={{
            marginTop: 26,
            display: 'flex',
            justifyContent: 'center',
            gap: 18,
          }}
        >
          {IMAGES.map((_, i) => {
            const active = i === currentIndex;
            return (
              <div
                key={i}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: active ? 32 : 28,
                  fontWeight: 600,
                  lineHeight: 1, 
                  color: active
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                  background: active
                    ? 'linear-gradient(135deg, #7C4DFF, #E040FB, #FF80AB)'
                    : 'rgba(15,23,42,0.85)',
                  border: active
                    ? '1px solid rgba(248,250,252,0.8)'
                    : `1px solid ${theme.palette.divider}`,
                  boxShadow: active
                    ? '0 8px 16px rgba(224,64,251,0.5)'
                    : '0 0 8px rgba(15,23,42,0.8)',
                  // 核心改动：用 translateY(-4px) 抵消下沉感，scale 控制放大
                  transform: active 
                    ? 'translateY(-1px) scale(1.1)' 
                    : 'translateY(0) scale(1)',
                  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                }}
              >
                {i + 1}
              </div>
            );
          })}
        </div>
      </div>

      {/* 下方：单张图片区域，根据导航每秒切换一张，入场方式各不相同 */}
      <div
        style={{
          position: 'absolute',
          top: 180,
          left: 50,
          right: 50,
          bottom: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
        }}
      >
        {IMAGES.map((img, i) => {
          const isActive = i === currentIndex;
          // 入场动画：根据索引选择不同的方向/旋转
          const enterSpring = spring({
            frame: isActive ? localFrame : 0,
            fps,
            // 调高阻尼，降低刚度，让过渡更平缓
            config: { damping: 20, stiffness: 70 },
          });

          const baseOpacity = isActive
            ? interpolate(localFrame, [0, framesPerImage * 0.4], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })
            : 0;

          let translateX = 0;
          let translateY = 0;
          let rotate = 0;

          switch (i % 5) {
            case 0:
              translateX = (1 - enterSpring) * -40; // 左侧轻微滑入
              break; // 左侧滑入
            case 1:
              translateX = (1 - enterSpring) * 40; // 右侧轻微滑入
              break; // 右侧滑入
            case 2:
              translateY = (1 - enterSpring) * -30; // 顶部轻微滑入
              break; // 顶部滑入
            case 3:
              translateY = (1 - enterSpring) * 30; // 底部轻微滑入
              break; // 底部滑入
            case 4:
              rotate = (1 - enterSpring) * 4; // 轻微旋转
              break; // 轻微旋转入场
          }

          const scale = 0.97 + enterSpring * 0.05;

          return (
            <div
              key={img}
              style={{
                position: 'absolute',
                width: '85%',          // 缩小图片显示区域，避免接近导航条
                height: '82%',
                borderRadius: 32,
                overflow: 'hidden',
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: '0 24px 50px rgba(15,23,42,0.95)',
                background:
                  'linear-gradient(135deg, rgba(24,16,48,0.96), rgba(52,21,72,0.98))',
                opacity: baseOpacity,
                transform: `translate(${translateX}px, ${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
                transition: 'transform 0.2s linear',
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
