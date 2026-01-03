import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

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
        color: '#4a2b1a',
      }}
    >
      <div 
        style={{
          padding: '50px 90px',
          borderRadius: '40px',
          background:
            'linear-gradient(135deg, rgba(255, 248, 240, 0.97), rgba(255, 236, 210, 0.98))',
          border: '1px solid rgba(184, 134, 11, 0.6)',
          boxShadow: '0 26px 60px rgba(0,0,0,0.35)',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontSize: '52px',
            fontStyle: 'italic',
            color: '#8b1a1a',
            marginBottom: '24px',
            textShadow: '0 0 16px rgba(139,0,0,0.6)',
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
