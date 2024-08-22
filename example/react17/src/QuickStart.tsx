import React, { useEffect, useRef } from 'react';
import Danmaku from 'rc-danmaku';

const TestDanmaku: React.FC = () => {
  const danmakuInsRef = useRef<Danmaku | null>(null);

  useEffect(() => {
    const danmakuIns = new Danmaku('.danmaku-wrapper');
    danmakuInsRef.current = danmakuIns;
  }, []);

  return (
    <div className="test-danmaku">
      <div
        className="danmaku-wrapper"
        style={{
          width: '300px',
          height: '200px',
          backgroundColor: '#000',
        }}
      />
      <button
        type="button"
        onClick={(): void => {
          if (danmakuInsRef.current) {
            danmakuInsRef.current.push('Hello World!');
          }
        }}
      >
        发送弹幕
      </button>
    </div>
  );
};

export default TestDanmaku;
