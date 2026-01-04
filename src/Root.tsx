import { Composition, AbsoluteFill, Series, Audio, staticFile } from "remotion";
import { Title } from "./Title";
import { SchoolIntro } from "./SchoolIntro";
import { HonorMilestones } from "./HonorMilestones";
import { StudentInfo } from "./StudentInfo";
import { MajorDetails } from "./MajorDetails";
import { FinalQuote } from "./FinalQuote";
import { CyberBackground } from "./CyberBackground";
import rawStudents from "./students.json";
import { StudentShowcase, type Student } from "./StudentShowcase";
import { theme } from "./theme";
import { CampusScenery } from "./CampusScenery";

export type AdmissionVideoProps = {
  // 主打一位“明星学生”的详细信息（沿用原有结构）
  name: string;
  major: string;
  class: string;
  admissionDate: string;
  quote: string;
  idPhoto: string;
  profile: { studentId: string; hometown: string; hobby: string };
  grades: { subject: string; score: number }[];
  skills: Record<string, number>;
  majorDetails: { title: string; features: string[]; motto: string; future: string[] };
  // 额外的明星学生，用于 30–45 秒“个性化高潮段落”
  extraStudents: Student[];
};

const FOOTER_TEXT = "广东省高新技术高级技工学校 | FUTURE SKILLS · BRIGHT FUTURE";

const fps = 30;

const BaseLayout: React.FC<{ children: React.ReactNode; withAudio?: boolean }> = ({
  children,
  withAudio = true,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.palette.background.main,
        // 优先使用支持中日韩的字体，避免在 CI（Ubuntu）环境中中文变成方框
        fontFamily:
          "'Noto Sans CJK SC', 'WenQuanYi Micro Hei', 'Microsoft YaHei', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <CyberBackground />

      {/* 背景音乐（可选，分段渲染时关闭，避免拼接后重复播放） */}
      {withAudio && <Audio src={staticFile("welcome_music.mp3")} loop volume={0.6} />}

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
          fontSize: "18px",
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
const AdmissionLetterComp: React.FC<AdmissionVideoProps> = (props) => {
  return (
    <BaseLayout withAudio>
      <Series>
        {/* 1. 开场：校名与主题 (0–5秒) */}
        <Series.Sequence durationInFrames={fps * 5}>
          <Title
            title="广东省高新技术高级技工学校"
            subtitle="未来之星，闪耀启航！"
            frame={0}
            duration={fps * 5}
          />
        </Series.Sequence>

        {/* 2. 校园概览：环境与设施 (5–15秒 / 10秒) */}
        <Series.Sequence durationInFrames={fps * 10}>
          <SchoolIntro frame={0} duration={fps * 10} />
        </Series.Sequence>

        {/* 3. 核心优势与荣耀 (15–23秒 / 8秒) */}
        <Series.Sequence durationInFrames={fps * 8}>
          <HonorMilestones frame={0} duration={fps * 8} />
        </Series.Sequence>

        {/* 4. 专业梦想蓝图：主打明星学生 (23–31秒 / 8秒) */}
        <Series.Sequence durationInFrames={fps * 8}>
          <MajorDetails
            majorDetails={props.majorDetails}
            frame={0}
            duration={fps * 8}
          />
        </Series.Sequence>

        {/* 5. 个人电子档案：主打明星学生档案 (31–41秒 / 10秒) */}
        <Series.Sequence durationInFrames={fps * 10}>
          <StudentInfo {...props} frame={0} duration={fps * 10} />
        </Series.Sequence>

        {/* 6. 明星学生群像：5位学生轮播卡片 (41–50秒 / 9秒) */}
        <Series.Sequence durationInFrames={fps * 9}>
          <StudentShowcase
            students={props.extraStudents}
            frame={0}
            duration={fps * 9}
          />
        </Series.Sequence>

        {/* 7. 号召行动与结语 (50–55秒 / 5秒) */}
        <Series.Sequence durationInFrames={fps * 5}>
          <FinalQuote quote={props.quote} frame={0} duration={fps * 5} />
        </Series.Sequence>
      </Series>
    </BaseLayout>
  );
};

// 优化渲染：只包含“学校固定部分”的 Intro+School 段（0–31 秒）
const AdmissionLetterIntroComp: React.FC<{ hero: Student }> = ({ hero }) => {
  return (
    <BaseLayout withAudio={false}>
      <Series>
        <Series.Sequence durationInFrames={fps * 5}>
          <Title
            title="广东省高新技术高级技工学校"
            subtitle="未来之星，闪耀启航！"
            frame={0}
            duration={fps * 5}
          />
        </Series.Sequence>

        <Series.Sequence durationInFrames={fps * 10}>
          <SchoolIntro frame={0} duration={fps * 10} />
        </Series.Sequence>

        <Series.Sequence durationInFrames={fps * 8}>
          <HonorMilestones frame={0} duration={fps * 8} />
        </Series.Sequence>

        <Series.Sequence durationInFrames={fps * 8}>
          <MajorDetails
            majorDetails={hero.majorDetails}
            frame={0}
            duration={fps * 8}
          />
        </Series.Sequence>
      </Series>
    </BaseLayout>
  );
};

// 优化渲染：只包含“学生档案”段（31–41 秒）
const AdmissionLetterStudentComp: React.FC<AdmissionVideoProps> = (props) => {
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
const AdmissionMajorDetailsComp: React.FC<{ majorDetails: AdmissionVideoProps["majorDetails"] }> = ({
  majorDetails,
}) => {
  return (
    <BaseLayout withAudio={false}>
      <Series>
        <Series.Sequence durationInFrames={fps * 8}>
          <MajorDetails majorDetails={majorDetails} frame={0} duration={fps * 8} />
        </Series.Sequence>
      </Series>
    </BaseLayout>
  );
};

// 优化渲染：只包含“明星群像 + 结语”段（41–55 秒）
const AdmissionLetterOutroComp: React.FC<{ extraStudents: Student[]; quote: string }> = ({
  extraStudents,
  quote,
}) => {
  return (
    <BaseLayout withAudio={false}>
      <Series>
        <Series.Sequence durationInFrames={fps * 9}>
          <StudentShowcase students={extraStudents} frame={0} duration={fps * 9} />
        </Series.Sequence>

        <Series.Sequence durationInFrames={fps * 5}>
          <FinalQuote quote={quote} frame={0} duration={fps * 5} />
        </Series.Sequence>
      </Series>
    </BaseLayout>
  );
};

export const RemotionRoot: React.FC = () => {
  // JSON 中的 skills 字段结构会被 TypeScript 推断为联合类型，这里通过 unknown 中转
  // 明确告诉编译器：该数组在运行时符合 Student 结构
  const students = rawStudents as unknown as Student[];
  const hero = students[0];

  const extraStudents = students.slice(0, 5);

  return (
    <>
      {/* 原始完整版本，用于 Studio 预览或全量渲染 */}
      <Composition
        id="AdmissionLetter"
        component={AdmissionLetterComp}
        durationInFrames={fps * 55}
        fps={fps}
        width={1920}
        height={1080}
        defaultProps={{
          name: hero.name,
          major: hero.major,
          class: hero.class,
          admissionDate: hero.admissionDate,
          quote: hero.quote,
          idPhoto: hero.idPhoto,
          profile: hero.profile,
          grades: hero.grades,
          skills: hero.skills,
          majorDetails: hero.majorDetails,
          extraStudents,
        }}
      />

      {/* 分段渲染用的 Intro 片段（0–31 秒） */}
      <Composition
        id="AdmissionLetterIntro"
        component={AdmissionLetterIntroComp}
        durationInFrames={fps * 31}
        fps={fps}
        width={1920}
        height={1080}
        defaultProps={{ hero }}
      />

      {/* 分段渲染用的 Student 片段（31–41 秒） */}
      <Composition
        id="AdmissionLetterStudent"
        component={AdmissionLetterStudentComp}
        durationInFrames={fps * 10}
        fps={fps}
        width={1920}
        height={1080}
        defaultProps={{
          name: hero.name,
          major: hero.major,
          class: hero.class,
          admissionDate: hero.admissionDate,
          quote: hero.quote,
          idPhoto: hero.idPhoto,
          profile: hero.profile,
          grades: hero.grades,
          skills: hero.skills,
          majorDetails: hero.majorDetails,
          extraStudents,
        }}
      />

      {/* 分段渲染用的 Outro 片段（41–55 秒） */}
      <Composition
        id="AdmissionLetterOutro"
        component={AdmissionLetterOutroComp}
        durationInFrames={fps * 14}
        fps={fps}
        width={1920}
        height={1080}
        defaultProps={{ extraStudents, quote: hero.quote }}
      />

      {/* 只包含专业蓝图的独立片段（例如：电子商务 (现代商务方向)） */}
      <Composition
        id="AdmissionMajorDetails"
        component={AdmissionMajorDetailsComp}
        durationInFrames={fps * 8}
        fps={fps}
        width={1920}
        height={1080}
        defaultProps={{ majorDetails: hero.majorDetails }}
      />

      {/* 只包含“汽车维修专业蓝图”的独立片段 */}
      <Composition
        id="AdmissionMajorDetailsAuto"
        component={AdmissionMajorDetailsComp}
        durationInFrames={fps * 8}
        fps={fps}
        width={1920}
        height={1080}
        defaultProps={{ majorDetails: students[1].majorDetails }}
      />

      {/* 校园风景展示独立视频（基于 public/01-10.jpg） */}
      <Composition
        id="CampusScenery"
        component={CampusScenery}
        durationInFrames={fps * 30}
        fps={fps}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
