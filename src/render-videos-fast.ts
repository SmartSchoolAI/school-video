import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import path from 'path';
import { execSync } from 'child_process';
import fs from 'fs';
import students from './students.json';

const INTRO_ID = 'AdmissionLetterIntro';
const STUDENT_ID = 'AdmissionLetterStudent';
const OUTRO_ID = 'AdmissionLetterOutro';

const ensureOutDir = () => {
  const outDir = path.join(process.cwd(), 'out');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
};

const concatVideos = (parts: string[], output: string) => {
  const listFile = path.join(process.cwd(), 'out', `__concat_${Date.now()}.txt`);
  const content = parts
    .map((p) => `file '${p.replace(/'/g, "'\\''")}'`)
    .join('\n');
  fs.writeFileSync(listFile, content, 'utf-8');

  const ffmpegCmd = `ffmpeg -y -f concat -safe 0 -i "${listFile}" -c copy "${output}"`;
  try {
    console.log('▶ 正在使用 ffmpeg 拼接视频:', ffmpegCmd);
    execSync(ffmpegCmd, { stdio: 'inherit' });
  } finally {
    fs.unlinkSync(listFile);
  }
};

const addBackgroundAudio = (input: string, output: string) => {
  const audioPath = path.join(process.cwd(), 'public', 'welcome_music.mp3');
  // 使用视频原始时长作为 BGM 时长（通过 -shortest 截断或循环）
  const ffmpegCmd =
    `ffmpeg -y -i "${input}" -stream_loop -1 -i "${audioPath}" ` +
    `-c:v copy -c:a aac -shortest -map 0:v:0 -map 1:a:0 "${output}"`;
  console.log('▶ 正在为最终视频叠加背景音乐:', ffmpegCmd);
  execSync(ffmpegCmd, { stdio: 'inherit' });
};

const start = async () => {
  console.log('正在打包 Remotion 项目（分段渲染模式）...');
  const bundled = await bundle({
    entryPoint: path.join(process.cwd(), 'src/index.ts'),
  });

  ensureOutDir();

  console.log('▶ 选择 Intro / Student / Outro 片段 Composition...');
  const introComp = await selectComposition({
    serveUrl: bundled,
    id: INTRO_ID,
  });
  const studentComp = await selectComposition({
    serveUrl: bundled,
    id: STUDENT_ID,
  });
  const outroComp = await selectComposition({
    serveUrl: bundled,
    id: OUTRO_ID,
  });

  const introPath = path.join('out', '_intro-base.mp4');
  const outroPath = path.join('out', '_outro-base.mp4');

  console.log('▶ 渲染通用 Intro 片段（只执行一次）...');
  const introStart = Date.now();
  await renderMedia({
    composition: introComp,
    serveUrl: bundled,
    outputLocation: introPath,
    codec: 'h264',
  });
  const introSeconds = ((Date.now() - introStart) / 1000).toFixed(1);
  console.log(`⏱ Intro 片段渲染耗时 ${introSeconds} 秒`);

  console.log('▶ 渲染通用 Outro 片段（只执行一次）...');
  const outroStart = Date.now();
  await renderMedia({
    composition: outroComp,
    serveUrl: bundled,
    outputLocation: outroPath,
    codec: 'h264',
  });
  const outroSeconds = ((Date.now() - outroStart) / 1000).toFixed(1);
  console.log(`⏱ Outro 片段渲染耗时 ${outroSeconds} 秒`);

  for (const student of students) {
    console.log(`\n▶ 正在为 ${student.name} 生成【快速版】录取通知书视频...`);
    const startTime = Date.now();

    const inputProps = {
      ...student,
      extraStudents: (students as any[]).slice(0, 5),
    };

    const tempStudentPath = path.join('out', `_student-${student.id}.mp4`);

    const studentStart = Date.now();
    await renderMedia({
      composition: studentComp,
      serveUrl: bundled,
      outputLocation: tempStudentPath,
      inputProps,
      codec: 'h264',
    });
    const studentSeconds = ((Date.now() - studentStart) / 1000).toFixed(1);

    const tempConcatPath = path.join(
      'out',
      `${student.id}-${student.major}-${student.name}-fast-video-only.mp4`,
    );

    const concatStart = Date.now();
    concatVideos(
      [path.resolve(introPath), path.resolve(tempStudentPath), path.resolve(outroPath)],
      path.resolve(tempConcatPath),
    );
    const concatSeconds = ((Date.now() - concatStart) / 1000).toFixed(1);

    // 拼接完成后，再叠加一次全程背景音乐，避免分段时音频重复播放
    const finalPath = path.join(
      'out',
      `${student.id}-${student.major}-${student.name}-fast.mp4`,
    );

    const audioStart = Date.now();
    addBackgroundAudio(path.resolve(tempConcatPath), path.resolve(finalPath));
    const audioSeconds = ((Date.now() - audioStart) / 1000).toFixed(1);

    const endTime = Date.now();
    const seconds = ((endTime - startTime) / 1000).toFixed(1);

    console.log(`✅ 快速版视频已生成: ${finalPath}`);
    console.log(
      `⏱ 本次视频生成总耗时 ${seconds} 秒（其中 Student 段渲染 ${studentSeconds} 秒，拼接视频 ${concatSeconds} 秒，叠加音频 ${audioSeconds} 秒，不含首次 Intro/Outro 渲染）`,
    );
  }
};

start().catch((err) => {
  console.error('❌ 渲染过程中发生错误:', err);
  process.exit(1);
});
