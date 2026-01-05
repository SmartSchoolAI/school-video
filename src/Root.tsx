import React from 'react';
import { Composition, AbsoluteFill, Series, Audio, staticFile } from "remotion";
import { theme } from "./theme";

// 导入所有业务组件
import { Cover } from "./Cover";
import { Intro } from "./Intro";
import { Honor } from "./Honor";
import { StudentInfo } from "./StudentInfo";
import { Majors } from "./Majors";
import { FinalQuote } from "./FinalQuote";
import { CyberBackground } from "./CyberBackground";
import { Campus } from "./Campus";

// 导入数据
import rawStudents from "./students.json";
import majorsData from './majors.json';

const FPS = 30;
const WIDTH = 1080;
const HEIGHT = 1920;

// --- 基础布局 ---
const BaseLayout: React.FC<{ children: React.ReactNode; withAudio?: boolean }> = ({ 
  children, 
  withAudio = false 
}) => (
  <AbsoluteFill style={{ backgroundColor: '#000', color: '#fff', overflow: 'hidden' }}>
    <CyberBackground />
    {withAudio && <Audio src={staticFile("welcome_music.mp3")} loop volume={0.6} />}
    
    <div style={{
      position: "absolute", bottom: "40px", width: "100%", display: "flex",
      justifyContent: "center", alignItems: "center", gap: "20px",
      color: theme.palette.text.secondary, fontSize: "32px", zIndex: 10,
    }}>
      <div style={{ width: "80px", height: "1px", background: `linear-gradient(to right, transparent, ${theme.palette.primary.light})` }} />
      广东省高新技术高级技工学校 | HIGH TECH
      <div style={{ width: "80px", height: "1px", background: `linear-gradient(to left, transparent, ${theme.palette.secondary.main})` }} />
    </div>
    {children}
  </AbsoluteFill>
);

// --- 核心映射函数：根据 ID 渲染对应的组件 ---
// 这样可以避免在 Props 中传递 JSX
const renderSection = (id: string, props: any) => {
  const { hero, currentMajors, duration } = props;
  switch (id) {
    case "Cover": return <Cover title="广东省高新技术高级技工学校" subtitle="未来之星，闪耀启航！" frame={0} duration={duration} />;
    case "Intro": return <Intro frame={0} duration={duration} />;
    case "Honor": return <Honor frame={0} duration={duration} />;
    case "Majors": return <Majors majors={currentMajors} frame={0} duration={duration} />;
    case "Campus": return <Campus />;
    case "StudentInfo": return <StudentInfo {...hero} frame={0} duration={duration} />;
    case "FinalQuote": return <FinalQuote frame={0} duration={duration} />;
    default: return null;
  }
};

// --- 片段配置数据 ---
const SECTION_CONFIG = [
  { id: "Cover", duration: FPS * 5 },
  { id: "Intro", duration: FPS * 10 },
  { id: "Honor", duration: FPS * 8 },
  { id: "Majors", duration: FPS * 8 },
  { id: "Campus", duration: 825 },
  { id: "StudentInfo", duration: FPS * 10 },
  { id: "FinalQuote", duration: FPS * 5 },
];

// --- 1. 完整视频组件 ---
const WholeVideo: React.FC<{ hero: any; currentMajors: any }> = ({ hero, currentMajors }) => (
  <BaseLayout withAudio={true}>
    <Series>
      {SECTION_CONFIG.map((s) => (
        <Series.Sequence key={s.id} durationInFrames={s.duration}>
          {renderSection(s.id, { hero, currentMajors, duration: s.duration })}
        </Series.Sequence>
      ))}
    </Series>
  </BaseLayout>
);

// --- 2. 分段视频组件 ---
const SingleSection: React.FC<{ id: string; duration: number; hero: any; currentMajors: any }> = ({ 
  id, duration, hero, currentMajors 
}) => (
  <BaseLayout withAudio={false}>
    <Series>
      <Series.Sequence durationInFrames={duration}>
        {renderSection(id, { hero, currentMajors, duration })}
      </Series.Sequence>
    </Series>
  </BaseLayout>
);

// --- 根入口 ---
export const RemotionRoot: React.FC = () => {
  const students = rawStudents as any[];
  const hero = students[0];
  const currentMajors = majorsData[0];
  
  const totalDuration = SECTION_CONFIG.reduce((acc, s) => acc + s.duration, 0);

  return (
    <>
      <Composition
        id="0-WholeVideo"
        component={WholeVideo}
        durationInFrames={totalDuration}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{ hero, currentMajors }}
      />

      {SECTION_CONFIG.map((seg, index) => (
        <Composition
          key={seg.id}
          id={`${index + 1}-${seg.id}`}
          component={SingleSection}
          durationInFrames={seg.duration}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
          defaultProps={{ 
            id: seg.id, 
            duration: seg.duration, 
            hero, 
            currentMajors 
          }}
        />
      ))}
    </>
  );
};