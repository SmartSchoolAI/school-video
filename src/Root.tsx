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

const AdmissionLetterComp: React.FC<AdmissionVideoProps> = (props) => {
  const fps = 30;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1a0f08",
        fontFamily: "Microsoft YaHei, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <CyberBackground />
      
      {/* 背景音乐 */}
      <Audio src={staticFile("welcome_music.mp3")} loop volume={0.6} />

      {/* 梦幻暖金页脚 */}
      <div 
        style={{ 
          position: "absolute", 
          bottom: "30px", 
          width: "100%", 
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          color: "rgba(255, 222, 173, 0.9)",
          fontSize: "18px",
          letterSpacing: "3px",
          zIndex: 10,
          textShadow: "0 0 10px rgba(255, 215, 0, 0.6)",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "1px",
            background: "linear-gradient(to right, transparent, #f5deb3)",
          }}
        />
        {FOOTER_TEXT}
        <div
          style={{
            width: "80px",
            height: "1px",
            background: "linear-gradient(to left, transparent, #f5deb3)",
          }}
        />
      </div>

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
          <MajorDetails majorDetails={props.majorDetails} frame={0} duration={fps * 8} />
        </Series.Sequence>

        {/* 5. 个人电子档案：主打明星学生档案 (31–41秒 / 10秒) */}
        <Series.Sequence durationInFrames={fps * 10}>
          <StudentInfo 
            {...props}
            frame={0} 
            duration={fps * 10}
          />
        </Series.Sequence>

        {/* 6. 明星学生群像：5位学生轮播卡片 (41–50秒 / 9秒) */}
        <Series.Sequence durationInFrames={fps * 9}>
          <StudentShowcase students={props.extraStudents} frame={0} duration={fps * 9} />
        </Series.Sequence>

        {/* 7. 号召行动与结语 (50–55秒 / 5秒) */}
        <Series.Sequence durationInFrames={fps * 5}>
          <FinalQuote 
            quote={props.quote} 
            frame={0} 
            duration={fps * 5} 
          />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};

export const RemotionRoot: React.FC = () => {
  const students = rawStudents as Student[];
  const hero = students[0];

  return (
    <Composition
      id="AdmissionLetter"
      component={AdmissionLetterComp}
      durationInFrames={30 * 55} // 总计约55秒
      fps={30}
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
        // 5 位明星学生用于轮播展示
        extraStudents: students.slice(0, 5),
      }}
    />
  );
};
