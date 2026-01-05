import React from 'react';
import { Composition, AbsoluteFill, Series, Audio, staticFile } from "remotion";
import { theme } from "./theme";

// 1. 导入业务组件
import { Cover } from "./Cover";
import { Intro } from "./Intro";
import { Honor } from "./Honor";
import { StudentInfo } from "./StudentInfo";
import { Majors } from "./Majors";
import { FinalQuote } from "./FinalQuote";
import { Background } from "./Background";
import { Campus } from "./Campus";

// 2. 导入数据和新建立的配置文件
import rawStudents from "./students.json";
import majorsData from './majors.json';
import videoConfig from './config.json'; // 导入刚才创建的 JSON

// 解构配置项
const { settings, sections } = videoConfig;
const { fps, width, height, audioPath, footerText } = settings;

// --- 基础布局组件 ---
const BaseLayout: React.FC<{ 
  children: React.ReactNode; 
  withAudio?: boolean;
  showFooter?: boolean;
}> = ({ children, withAudio = false, showFooter = true }) => (
  <AbsoluteFill style={{ backgroundColor: '#000', color: '#fff', overflow: 'hidden' }}>

    <Background />

    {withAudio && <Audio src={staticFile(audioPath)} loop volume={0.6} />}
    
    {showFooter && (
      <div style={{
        position: "absolute", bottom: "40px", width: "100%", display: "flex",
        justifyContent: "center", alignItems: "center", gap: "20px",
        color: theme.palette.text.secondary, fontSize: "32px", zIndex: 10,
      }}>
        <div style={{ width: "80px", height: "1px", background: `linear-gradient(to right, transparent, ${theme.palette.primary.light})` }} />
        {footerText}
        <div style={{ width: "80px", height: "1px", background: `linear-gradient(to left, transparent, ${theme.palette.secondary.main})` }} />
      </div>
    )}

    {children}

  </AbsoluteFill>
);

// --- 组件映射引擎：根据 JSON 的 ID 匹配 React 组件 ---
const RenderEngine = ({ sectionId, duration, data }: { sectionId: string, duration: number, data: any }) => {
  const { hero, currentMajors } = data;
  
  const componentMap: Record<string, JSX.Element> = {
    "Cover": <Cover data={videoConfig['Cover']} frame={0} duration={duration} />,
    "Intro": <Intro frame={0} duration={duration} />,
    "Honor": <Honor frame={0} duration={duration} />,
    "Majors": <Majors majors={currentMajors} frame={0} duration={duration} />,
    "Campus": <Campus />,
    "StudentInfo": <StudentInfo {...hero} frame={0} duration={duration} />,
    "FinalQuote": <FinalQuote frame={0} duration={duration} />
  };

  return componentMap[sectionId] || null;
};

// --- 完整视频容器 ---
const WholeVideo: React.FC<{ hero: any; currentMajors: any }> = ({ hero, currentMajors }) => (
  <AbsoluteFill>
    <Series>
      {sections.map((s) => (
        <Series.Sequence key={s.id} durationInFrames={s.durationFrames}>
          <BaseLayout showFooter={s.showFooter}>
            <RenderEngine sectionId={s.id} duration={s.durationFrames} data={{ hero, currentMajors }} />
          </BaseLayout>
        </Series.Sequence>
      ))}
    </Series>
    <Audio src={staticFile(audioPath)} loop volume={0.6} />
  </AbsoluteFill>
);

// --- 单独分段容器 ---
const SingleSection: React.FC<{ section: any; hero: any; currentMajors: any }> = ({ section, hero, currentMajors }) => (
  <BaseLayout showFooter={section.showFooter}>
    <Series>
      <Series.Sequence durationInFrames={section.durationFrames}>
        <RenderEngine sectionId={section.id} duration={section.durationFrames} data={{ hero, currentMajors }} />
      </Series.Sequence>
    </Series>
  </BaseLayout>
);

// --- Remotion 根入口 ---
export const RemotionRoot: React.FC = () => {
  const hero = (rawStudents as any[])[0];
  const currentMajors = majorsData[0];
  
  // 从 JSON 自动计算总时长
  const totalDuration = sections.reduce((acc, s) => acc + s.durationFrames, 0);

  return (
    <>
      {/* 1. 完整视频预览与渲染 */}
      <Composition
        id="0-WholeVideo"
        component={WholeVideo}
        durationInFrames={totalDuration}
        fps={fps}
        width={width}
        height={height}
        defaultProps={{ hero, currentMajors }}
      />

      {/* 2. 根据 JSON 自动生成所有分段 Composition */}
      {sections.map((seg, index) => (
        <Composition
          key={seg.id}
          id={`${index + 1}-${seg.id}`}
          component={SingleSection}
          durationInFrames={seg.durationFrames}
          fps={fps}
          width={width}
          height={height}
          defaultProps={{ 
            section: seg,
            hero, 
            currentMajors 
          }}
        />
      ))}
    </>
  );
};