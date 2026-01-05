import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import path from 'path';
import students from './students.json';

const start = async () => {
  console.log('正在打包高端版 Remotion 项目...');
  const bundled = await bundle({
    entryPoint: path.join(process.cwd(), 'src/index.ts'),
  });

  const compositionId = 'AdmissionLetter';

  for (const student of students) {
    console.log(`正在为 ${student.major} 生成【超高清・科技感】学校宣传视频...`);

    const startTime = Date.now();

    const inputProps = {
      ...student,
    };

    const composition = await selectComposition({
      serveUrl: bundled,
      id: compositionId,
      inputProps,
    });

    await renderMedia({
      composition,
      serveUrl: bundled,
      outputLocation: `out/${student.major}.mp4`,
      inputProps,
      codec: 'h264',
    });

    const endTime = Date.now();
    const seconds = ((endTime - startTime) / 1000).toFixed(1);

    console.log(`✅ 视频已生成: out/${student.major}.mp4`);
    console.log(`⏱ 本次视频生成耗时 ${seconds} 秒`);
  }
};

start();
