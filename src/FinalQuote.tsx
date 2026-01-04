import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { theme } from './theme';

export const FinalQuote: React.FC<{ quote: string; frame: number; duration: number }> = ({ quote, frame, duration }) => {
  const currentFrame = useCurrentFrame();
  const opacity = interpolate(currentFrame, [frame, frame + 20, frame + duration - 20, frame + duration], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  if (currentFrame < frame || currentFrame >= frame + duration) {
    return null;
  }

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        opacity,
        color: theme.palette.text.primary,
      }}
    >
      <div 
        style={{
          padding: '40px 32px',
          borderRadius: '40px',
          background:
            'linear-gradient(135deg, rgba(24, 16, 48, 0.96), rgba(76, 29, 149, 0.98))',
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: '0 26px 60px rgba(15,23,42,0.95)',
          textAlign: 'center',
          maxWidth: 900,
          margin: '0 24px',
        }}
      >
        <h2
          style={{
            fontSize: '52px',
            fontStyle: 'italic',
            color: theme.palette.secondary.light,
            marginBottom: '24px',
            textShadow: '0 0 20px rgba(236,72,153,0.9)',
          }}
        >
          “{quote}”
        </h2>
        <div
          style={{
            fontSize: '24px',
            opacity: 0.9,
            letterSpacing: '4px',
            marginBottom: '26px',
          }}
        >
          梦想有多大，舞台就有多大
        </div>

        <div
          style={{
            marginTop: '10px',
            fontSize: '18px',
            lineHeight: 1.8,
          }}
        >
          <div>立即报名 · 开启你的技能人生！</div>
          <div style={{ marginTop: '10px', fontSize: '16px', opacity: 0.85 }}>
            招生热线：020-XXXX XXXX ｜ 官网：www.gdgxjg.edu.cn
          </div>
          <div style={{ marginTop: '4px', fontSize: '14px', opacity: 0.75 }}>
            （以上联系方式示意，可替换为真实电话 / 网址 / 二维码）
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
