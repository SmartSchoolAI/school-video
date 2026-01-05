import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, staticFile } from 'remotion';
import { theme } from './theme';

export const FinalQuote: React.FC<{ frame: number; duration: number }> = ({ frame, duration }) => {
  const frameCurrent = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 基础淡入淡出
  const opacity = interpolate(
    frameCurrent,
    [frame, frame + 15, frame + duration - 15, frame + duration],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // 计算动画进场（每一行增加 5 帧的延迟）
  const getEntryStyle = (index: number) => {
    const delay = index * 5;
    const progress = spring({
      frame: frameCurrent - frame - delay,
      fps,
      config: { damping: 12, stiffness: 100 },
    });

    return {
      opacity: progress,
      transform: `translateX(${interpolate(progress, [0, 1], [100, 0])}px)`,
    };
  };

  if (frameCurrent < frame || frameCurrent >= frame + duration) return null;

  return (
    <AbsoluteFill
      style={{
        opacity,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px 50px',
        margin: 0,
        color: theme.palette.text.primary,
        fontFamily: 'sans-serif',
      }}
    >
      {/* 顶部标题 */}
      <h2
        style={{
          fontSize: '70px',
          textAlign: 'center',
          color: theme.palette.primary.light,
          marginTop: '0',
          marginBottom: '80px',
          textShadow: '0 0 24px rgba(124, 77, 255, 0.6)',
          letterSpacing: '8px',
        }}
      >
        欢迎报考 · 广东高新
      </h2>

      {/* 主卡片容器 */}
      <div
        style={{
          padding: '40px 40px',
          borderRadius: '50px',
          background: 'linear-gradient(160deg, rgba(30, 20, 60, 0.95), rgba(60, 20, 120, 0.95))',
          border: `2px solid rgba(255, 255, 255, 0.1)`,
          boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
          width: '90%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2
          style={{
            fontSize: '64px',
            fontStyle: 'italic',
            color: '#FFD700', // 金色点缀
            marginBottom: '40px',
            ...getEntryStyle(0),
          }}
        >
          “读高新高技，学高新技术”
        </h2>

        {/* 校训：使用边框和间距增强仪式感 */}
        <div
          style={{
            fontSize: '50px',
            fontWeight: 'bold',
            letterSpacing: '12px',
            padding: '10px 20px',
            borderBottom: `2px solid ${theme.palette.secondary.main}`,
            marginBottom: '50px',
            color: theme.palette.secondary.light,
            ...getEntryStyle(1),
          }}
        >
          厚德 · 强能 · 进取 · 创新
        </div>

        {/* 信息区块 */}
        <div style={{ textAlign: 'center', width: '100%' }}>
          <div
            style={{
              fontSize: '52px',
              fontWeight: '600',
              color: '#fff',
              marginBottom: '30px',
              ...getEntryStyle(2),
            }}
          >
            🚀 立即报名 · 开启高新技能人生！
          </div>

          <div
            style={{
              fontSize: '46px',
              marginBottom: '40px',
              ...getEntryStyle(4),
            }}
          >
            🌐 官方网站：www.gdjxzsb.com
          </div>

          <div
            style={{
              fontSize: '46px',
              marginBottom: '30px',
              backgroundColor: 'rgba(255,255,255,0.05)',
              padding: '10px 30px',
              borderRadius: '15px',
              display: 'inline-block',
              ...getEntryStyle(3),
            }}
          >
            📞 招生热线：<span style={{ color: theme.palette.primary.light }}>17701992275</span>
          </div>

          {/* 二维码占位优化 */}

          <div
            style={{
              marginTop: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              ...getEntryStyle(5), // 保持之前的动画逻辑
            }}
          >
            <div
              style={{
                width: '320px',    // 稍微调大了一点，更醒目
                height: '320px',
                backgroundColor: '#fff',
                borderRadius: '24px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 15px 40px rgba(0,0,0,0.4)',
                padding: '15px',   // 给二维码留一点白边，更美观
                overflow: 'hidden'
              }}
            >
              <img 
                src={staticFile("WechatQrcode.jpg")} 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '10px'
                }} 
                alt="Wechat QR Code"
              />
            </div>
            <div style={{ marginTop: '35px', marginBottom: '15px', fontSize: '32px', opacity: 0.7, letterSpacing: '2px' }}>
              扫描上方二维码 · 咨询详情
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};