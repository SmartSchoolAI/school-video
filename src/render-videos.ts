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
    console.log(`正在为 ${student.name} 生成【超高清・科技感】录取通知书视频...`);

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
      outputLocation: `out/${student.id}-${student.major}-${student.name}.mp4`,
      inputProps,
      codec: 'h264',
    });

    console.log(`✅ 视频已生成: out/${student.id}-${student.major}-${student.name}.mp4`);
  }
};

start();
