import { Composition, AbsoluteFill, Series, Audio, staticFile } from "remotion";
import { Cover } from "./Cover";
import { Intro } from "./Intro";
import { Honor } from "./Honor";
import { StudentInfo } from "./StudentInfo";
import { Majors } from "./Majors";
import { FinalQuote } from "./FinalQuote";
import { CyberBackground } from "./CyberBackground";
import rawStudents from "./students.json";
import { theme } from "./theme";
import { Campus } from "./Campus";

import students from './students.json';
import majors from './majors.json';


const FOOTER_TEXT = "广东省高新技术高级技工学校 | HIGH TECH";

const fps = 30;

const mp3_audio_path = "welcome_music.mp3";

const BaseLayout: React.FC<{
  children: React.ReactNode;
  withAudio?: boolean;
}> = ({ children, withAudio = false }) => {
  return (
    <AbsoluteFill
      style={{
        fontFamily:
          "'Noto Sans CJK SC', 'WenQuanYi Micro Hei', 'Microsoft YaHei', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <CyberBackground />
      {/* 背景音乐（可选，分段渲染时关闭，避免拼接后重复播放） */}
      {withAudio && (
        <Audio src={staticFile(mp3_audio_path)} loop volume={0.6} />
      )}
      {/* 科技紫 + 淡红页脚 */}
      <div
        style={{
          position: "absolute",
          bottom: "30px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          color: theme.palette.text.secondary,
          fontSize: "32px",
          letterSpacing: "3px",
          zIndex: 10,
          textShadow: "0 0 10px rgba(124, 77, 255, 0.8)",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "1px",
            background: `linear-gradient(to right, transparent, ${theme.palette.primary.light})`,
          }}
        />
        {FOOTER_TEXT}
        <div
          style={{
            width: "80px",
            height: "1px",
            background: `linear-gradient(to left, transparent, ${theme.palette.secondary.main})`,
          }}
        />
      </div>
      {children}
    </AbsoluteFill>
  );
};

// 原始完整版本：用于 Remotion Studio 预览（保留完整结构）
const WholeVideo: React.FC<any> = (props) => {
  const students = rawStudents as unknown as any[];
  console.log("props", props)
  const majors = props.majors;

  return (
    <BaseLayout withAudio={false}>
      <Series>
        {/* 1. 开场：校名与主题 (0–5秒) */}
        <Series.Sequence durationInFrames={fps * 5}>
          <Cover
            title="广东省高新技术高级技工学校"
            subtitle="未来之星，闪耀启航！"
            frame={0}
            duration={fps * 5}
          />
        </Series.Sequence>
        {/* 2. 校园概览：环境与设施 (5–15秒 / 10秒) */}
        <Series.Sequence durationInFrames={fps * 10}>
          <Intro frame={0} duration={fps * 10} />
        </Series.Sequence>
        {/* 3. 核心优势与荣耀 */}
        <Series.Sequence durationInFrames={fps * 8}>
          <Honor frame={0} duration={fps * 8} />
        </Series.Sequence>
        {/* 5. 专业梦想蓝图：汽车维修专业介绍 */}
        <Series.Sequence durationInFrames={fps * 8}>
          <Majors
            majors={majors[0]}
            frame={0}
            duration={fps * 8}
          />
        </Series.Sequence>
        {/* 6. 校园风景独立段落 */}
        <Series.Sequence durationInFrames={825}>
          <Campus />
        </Series.Sequence>
        {/* 7. 个人电子档案：主打明星学生档案 */}
        <Series.Sequence durationInFrames={fps * 10}>
          <StudentInfo {...props} frame={0} duration={fps * 10} />
        </Series.Sequence>
        {/* 9. 号召行动与结语 */}
        <Series.Sequence durationInFrames={fps * 5}>
          <FinalQuote frame={0} duration={fps * 5} />
        </Series.Sequence>
      </Series>
    </BaseLayout>
  );
};

// Intro 拆分：仅开场 Title 页面
const IntroTitleComp: React.FC = () => {
  return (
    <BaseLayout withAudio={false}>
      <Series>
        <Series.Sequence durationInFrames={fps * 5}>
          <Cover
            title="广东省高新技术高级技工学校"
            subtitle="未来之星，闪耀启航！"
            frame={0}
            duration={fps * 5}
          />
        </Series.Sequence>
      </Series>
    </BaseLayout>
  );
};

// Intro 拆分：仅 Intro 页面
const IntroSchoolComp: React.FC = () => {
  return (
    <BaseLayout withAudio={false}>
      <Series>
        <Series.Sequence durationInFrames={fps * 10}>
          <Intro frame={0} duration={fps * 10} />
        </Series.Sequence>
      </Series>
    </BaseLayout>
  );
};

// Intro 拆分：仅 Honor 页面
const IntroHonorComp: React.FC = () => {
  return (
    <BaseLayout withAudio={false}>
      <Series>
        <Series.Sequence durationInFrames={fps * 8}>
          <Honor frame={0} duration={fps * 8} />
        </Series.Sequence>
      </Series>
    </BaseLayout>
  );
};

// 优化渲染：只包含“学生档案”段（31–41 秒）
const StudentComp: React.FC<any> = (props) => {
  return (
    <BaseLayout withAudio={false}>
      <Series>
        <Series.Sequence durationInFrames={fps * 10}>
          <StudentInfo {...props} frame={0} duration={fps * 10} />
        </Series.Sequence>
      </Series>
    </BaseLayout>
  );
};

// 新增：只包含“专业蓝图（电子商务等专业介绍）”的专业片段
// 方便单独渲染某个专业介绍，例如 “电子商务 (现代商务方向)”
const majorsComp: React.FC<{
  majors: any["majors"];
}> = ({ majors }) => {
  return (
    <BaseLayout withAudio={false}>
      <Series>
        <Series.Sequence durationInFrames={fps * 8}>
          <Majors
            majors={majors}
            frame={0}
            duration={fps * 8}
          />
        </Series.Sequence>
      </Series>
    </BaseLayout>
  );
};

// 优化渲染：只包含“结语”段（41–55 秒）
const LetterOutroComp: React.FC<{
  quote: string;
}> = ({ quote }) => {
  return (
    <BaseLayout withAudio={false}>
      <Series>
        <Series.Sequence durationInFrames={fps * 5}>
          <FinalQuote frame={0} duration={fps * 5} />
        </Series.Sequence>
      </Series>
    </BaseLayout>
  );
};

export const RemotionRoot: React.FC = () => {
  // JSON 中的 skills 字段结构会被 TypeScript 推断为联合类型，这里通过 unknown 中转
  // 明确告诉编译器：该数组在运行时符合 Student 结构
  const students = rawStudents as unknown as any[];
  const hero = students[0];
  const extraStudents = students.slice(0, 5);

  return (
    <>
      {/* 原始完整版本，用于 Studio 预览或全量渲染 */}
      <Composition
        id="0-WholeVideo"
        component={WholeVideo}
        durationInFrames={2205}
        fps={fps}
        width={1080}
        height={1920}
        defaultProps={{
          name: hero.name,
          major: hero.major,
          class: hero.class,
          quote: hero.quote,
          idPhoto: hero.idPhoto,
          profile: hero.profile,
          grades: hero.grades,
          skills: hero.skills,
          majors: hero.majors,
          extraStudents,
        }}
      />
      {/* 分段渲染用的 Intro 片段（0–31 秒） */}
      {/* Intro 拆分：仅 Title 页面 */}
      <Composition
        id="1-Cover"
        component={IntroTitleComp}
        durationInFrames={fps * 5}
        fps={fps}
        width={1080}
        height={1920}
        defaultProps={{}}
      />
      {/* Intro 拆分：仅 Intro 页面 */}
      <Composition
        id="2-Intro"
        component={IntroSchoolComp}
        durationInFrames={fps * 10}
        fps={fps}
        width={1080}
        height={1920}
        defaultProps={{}}
      />
      {/* Intro 拆分：仅 Honor 页面 */}
      <Composition
        id="3-Honor"
        component={IntroHonorComp}
        durationInFrames={fps * 8}
        fps={fps}
        width={1080}
        height={1920}
        defaultProps={{}}
      />
      {/* Intro 拆分：仅 majors 页面 */}
      {/* 分段渲染用的 Student 片段（31–41 秒） */}
      <Composition
        id="7-StudentInfo"
        component={StudentComp}
        durationInFrames={fps * 10}
        fps={fps}
        width={1080}
        height={1920}
        defaultProps={{
          name: hero.name,
          major: hero.major,
          class: hero.class,
          quote: hero.quote,
          idPhoto: hero.idPhoto,
          profile: hero.profile,
          grades: hero.grades,
          skills: hero.skills,
          majors: hero.majors,
          extraStudents,
        }}
      />
      {/* 只包含“汽车维修专业蓝图”的独立片段 */}
      <Composition
        id="5-Majors"
        component={majorsComp}
        durationInFrames={fps * 8}
        fps={fps}
        width={1080}
        height={1920}
        defaultProps={{majors: majors[0]}}
      />
      {/* 校园风景展示独立视频（基于 public/01-10.jpg） */}
      <Composition
        id="6-Campus"
        component={Campus}
        durationInFrames={825}
        fps={fps}
        width={1080}
        height={1920}
        defaultProps={{}}
      />
      {/* 分段渲染用的 Outro 片段（41–44 秒） */}
      <Composition
        id="10-FinalQuote"
        component={LetterOutroComp}
        durationInFrames={fps * 3}
        fps={fps}
        width={1080}
        height={1920}
        defaultProps={{ quote: hero.quote }}
      />
    </>
  );
};
