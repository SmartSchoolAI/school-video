import React from 'react';
import { Series } from "remotion";
import { Major } from "./Major"; // 假设你的单一专业文件名是 Major.tsx
import majorsData from "./majors.json";

export const MajorsList: React.FC<{
  majors: any[];
  frame: number;
  duration: number;
}> = ({ majors, frame, duration }) => {
  // 1. 获取所有专业数据
  const allMajors = majors; 
  
  // 2. 计算每个专业的停留时长
  // 如果总时长是 duration (比如 FPS * 40)，5个专业每个就是 duration / 5
  const singleMajorDuration = Math.floor(duration / allMajors.length);

  return (
    <Series>
      {allMajors.map((major, index) => {
        return (
          <Series.Sequence 
            key={index} 
            durationInFrames={singleMajorDuration}
          >
            <Major 
              major={major} 
              frame={0} // 在 Series.Sequence 内部，当前帧是从 0 开始计算的
              duration={singleMajorDuration} 
            />
          </Series.Sequence>
        );
      })}
    </Series>
  );
};