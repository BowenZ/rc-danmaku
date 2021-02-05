# rc-danmaku

[![npm-version](https://badgen.net/npm/v/rc-danmaku)](https://www.npmjs.com/package/rc-danmaku)
[![github-stars](https://badgen.net/github/stars/BowenZ/rc-danmaku)](https://github.com/BowenZ/rc-danmaku)
[![bundlephobia](https://badgen.net/bundlephobia/min/rc-danmaku)](https://bundlephobia.com/result?p=rc-danmaku@latest)
![license](https://badgen.net/npm/license/rc-danmaku)

🚀 React 弹幕组件 - 基于 React 17 和 TypeScript4 开发

> 自用开发，若发现问题欢迎提 issue，有功能需求欢迎提 pr 或者在 issue 中反馈
> 建议 package.json 中版本号锁定为安装时版本（因为目前为止还是自用开发，可能某次更新会对之前版本有影响，如果以后用的人多了，会考虑更加谨慎正规的更新）

## 🌰 示例页面

🔗 [https://bowenz.github.io/pages/rc-danmaku/](https://bowenz.github.io/pages/rc-danmaku/)

## 📦 安装

`npm install rc-danmaku -S`

## 🚗 快速开始

复制下方代码可以直接使用（代码 TypeScript 版本）

```tsx
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
```

## 📖 文档

### 创建实例

```tsx
// 第一个参数是弹幕容器，可以传string类型的选择器，或者直接传dom元素
// 第二个object类型的参数是可选参数，包含弹幕配置，里边的所有项均不是必填项
const danmakuIns = new Danmaku('.danmaku-wrapper', {
  rowHeight: 60, // 弹幕轨道高度，默认40（单位px）
  speed: 120, // 弹幕速度，默认100（单位px/s）
  opacity: 1, // 弹幕透明度，默认为1，范围 0-1
  maxRow: 0, // 弹幕最大轨道数，会根据容器高度自动计算，也可以手动赋值（此处设为0表示使用自动计算高度）
  minGapWidth: 30, //弹幕之前的最小间隔宽度，默认值20（单位px）
});
```

### 实例方法

初始化后，可调用实例方法发送弹幕

```tsx
const danmakuIns = new Danmaku('.danmaku-wrapper');

// 发送文本
danmakuIns.push('test string');

// 发送指定颜色的文本
danmakuIns.push('test string', {
  color: 'red',
});

// 发送React组件
danmakuIns.push(<TestReactComponent />);

// 直接发送文本
// emit与push的区别是，push会在屏幕中没有空闲位置时暂不发送，等有空位时再发送，
// emit会不管有没有空位直接发送，传参规则和push完全一样
danmakuIns.emit('test string');

// 批量发送
danmakuIns.pushAll(['test1', 'test2', 'test3']);

// 暂停
danmakuIns.pause();

// 继续
danmakuIns.resume();

// 销毁
danmakuIns.destroy();
```

### 完整使用代码示例

<details>
<summary>展开查看</summary>

```tsx
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Danmaku from 'rc-danmaku';

const textArr = Array.from(
  '通过对平面中竖直和水平方向的分析我们将宽泛的弹幕重叠问题收敛为轨道中相邻弹幕两两之间的追及问题最终获得了将候选弹幕挂载到合适轨道中的调度策略'
);

function getRandomIndex(length: number): number {
  return Math.floor(Math.random() * length);
}

function getRandomText(): string {
  const length = Math.floor(Math.random() * 19) + 1;
  return Array(length)
    .fill(null)
    .map(() => {
      return textArr[getRandomIndex(textArr.length)];
    })
    .join('');
}

const TestDanmaku: React.FC = () => {
  const danmakuInsRef = useRef<Danmaku | null>(null);
  const [showColor, setShowColor] = useState(false);
  const colorRef = useRef('');
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // 第一个参数是弹幕容器，可以传string类型的选择器，或者直接传dom元素
    // 第二个object类型的参数是可选参数，包含弹幕配置，里边的所有项均不是必填项
    const danmakuIns = new Danmaku('.danmaku-wrapper', {
      rowHeight: 60, // 弹幕轨道高度，默认40（单位px）
      speed: 120, // 弹幕速度，默认100（单位px/s）
      opacity: 1, // 弹幕透明度，默认为1，范围 0-1
      maxRow: 5, // 弹幕最大轨道数，会根据容器高度自动计算，也可以手动赋值
      minGapWidth: 30, //弹幕之前的最小间隔宽度，默认值20（单位px）
    });
    danmakuInsRef.current = danmakuIns;
  }, []);

  useEffect(() => {
    if (showColor) {
      colorRef.current = (document.querySelector(
        '.color-piker'
      ) as HTMLInputElement).value;
    }
  }, [showColor]);

  useEffect(() => {
    if (danmakuInsRef.current) {
      if (isPaused) {
        danmakuInsRef.current.pause();
      } else {
        danmakuInsRef.current.resume();
      }
    }
  }, [isPaused]);
  return (
    <Wrapper className="test-danmaku">
      <div className="danmaku-wrapper" />
      <div>
        <span>透明度</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          onChange={(e): void => {
            if (danmakuInsRef.current) {
              const { value } = e.target;
              danmakuInsRef.current.opacity = Number(value);
            }
          }}
        />
      </div>
      <div>
        <span>彩色弹幕：</span>
        <input
          type="checkbox"
          onChange={(e): void => {
            const { checked } = e.target;
            setShowColor(checked);
          }}
        />
        &nbsp;&nbsp;&nbsp;
        <input
          className="color-piker"
          type="color"
          defaultValue="#ff0000"
          style={{
            visibility: showColor ? 'visible' : 'hidden',
          }}
          onChange={(e): void => {
            const { value } = e.target;
            colorRef.current = value;
          }}
        />
      </div>
      <button
        type="button"
        onClick={(): void => {
          if (danmakuInsRef.current) {
            danmakuInsRef.current.emit(getRandomText(), {
              color: showColor ? colorRef.current : undefined,
            });
          }
        }}
      >
        发送随机文本（过多会重叠）
      </button>
      <div>
        <span>输入文本：</span>
        <input type="text" className="danmaku-text-input" />
        <button
          type="button"
          onClick={(): void => {
            if (danmakuInsRef.current) {
              const $input = document.querySelector(
                '.danmaku-text-input'
              ) as HTMLInputElement;
              if ($input.value && $input.value.trim()) {
                danmakuInsRef.current.emit($input.value, {
                  color: showColor ? colorRef.current : undefined,
                });
              }

              $input.value = '';
              $input.focus();
            }
          }}
        >
          发送
        </button>
      </div>
      <button
        type="button"
        onClick={(): void => {
          if (danmakuInsRef.current) {
            danmakuInsRef.current.emit(<TestNode>react node</TestNode>);
          }
        }}
      >
        发送react节点
      </button>
      <button
        type="button"
        onClick={(): void => {
          if (danmakuInsRef.current) {
            danmakuInsRef.current.push(getRandomText(), {
              color: showColor ? colorRef.current : undefined,
            });
          }
        }}
      >
        推送随机文字到发送队列（过多不会重叠，会延迟发送）
      </button>
      <button
        type="button"
        onClick={(): void => {
          if (danmakuInsRef.current) {
            danmakuInsRef.current.push(<TestNode>react node</TestNode>);
          }
        }}
      >
        推送React节点到发送队列（过多不会重叠，会延迟发送）
      </button>
      <button
        type="button"
        onClick={(): void => {
          if (danmakuInsRef.current) {
            danmakuInsRef.current.pushAll(
              Array(20)
                .fill(null)
                .map(() => getRandomText()),
              {
                color: showColor ? colorRef.current : undefined,
              }
            );
          }
        }}
      >
        随机推送20条文字弹幕
      </button>
      <button
        type="button"
        onClick={(): void => {
          if (danmakuInsRef.current) {
            danmakuInsRef.current.pushAll(
              Array(20)
                .fill(null)
                .map(() => <TestNode>react node</TestNode>)
            );
          }
        }}
      >
        随机推送20条React节点
      </button>
      <div>
        {isPaused ? (
          <span style={{ color: 'red' }}>暂停中</span>
        ) : (
          <span style={{ color: 'green' }}>运行中</span>
        )}
      </div>
      <div>
        <button
          type="button"
          onClick={(): void => {
            setIsPaused((p) => !p);
          }}
        >
          {isPaused ? '继续' : '暂停'}
        </button>
      </div>
      <button
        type="button"
        onClick={(): void => {
          if (danmakuInsRef.current) {
            danmakuInsRef.current.destroy();
            alert('组件已经被销毁，任何操作将会无相应，重新刷新页面再测吧');
          }
        }}
      >
        销毁（销毁后无法再发送弹幕）
      </button>
    </Wrapper>
  );
};

export default TestDanmaku;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  height: calc(100vh - 45px);
  input[type='text'] {
    padding: 0.2em;
    width: 150px;
    max-width: 150px;
  }
  button {
    outline: none;
    appearance: none;
    padding: 0.2em 1.45em;
    margin: 0.1em;
    border: 0.15em solid #cccccc;
    color: #000000;
    background-color: #cccccc;
    &:hover {
      border-color: #7a7a7a;
    }
    &:active {
      background-color: #999999;
    }
  }
  .danmaku-wrapper {
    width: 90%;
    height: 60vw;
    max-height: 500px;
    background-color: #000;
  }
`;

const TestNode = styled.div`
  width: 100px;
  height: 30px;
  background: linear-gradient(90deg, pink, red);
  border-radius: 20px;
  color: #fff;
  line-height: 30px;
  text-align: center;
`;
```

</details>
