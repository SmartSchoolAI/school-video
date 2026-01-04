import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import path from 'path';

const COMP_ID = 'CampusScenery';

const start = async () => {
  console.log('正在打包 Remotion 项目（校园风景展示）...');
  const bundled = await bundle({
    entryPoint: path.join(process.cwd(), 'src/index.ts'),
  });

  const comp = await selectComposition({
    serveUrl: bundled,
    id: COMP_ID,
  });

  const startTime = Date.now();

  await renderMedia({
    composition: comp,
    serveUrl: bundled,
    outputLocation: 'out/campus-scenery.mp4',
    codec: 'h264',
  });

  const seconds = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`✅ 校园风景展示视频已生成: out/campus-scenery.mp4`);
  console.log(`⏱ 渲染耗时 ${seconds} 秒`);
};

start().catch((err) => {
  console.error('❌ 渲染校园风景视频时发生错误:', err);
  process.exit(1);
});

