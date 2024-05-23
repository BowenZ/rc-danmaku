import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
// import Danmaku from '../../src/index';
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
      maxRow: 3, // 弹幕最大轨道数，会根据容器高度自动计算，也可以手动赋值（此处设为0表示使用自动计算高度）
      minGapWidth: 30, //弹幕之前的最小间隔宽度，默认值20（单位px）
      // 每个弹幕进入时触发
      onBulletIn() {
        console.log('====bullet in====', danmakuIns.getRestAmount());
        // if (danmakuIns.getRestAmount() < 1) {
        //   danmakuIns.pushAll(['asdasd', 'qweqwe', 'zxczxc']);
        // }
      },
      // 每个弹幕消失时触发
      onBulletOut() {
        console.log('====bullet out====', danmakuIns.getRestAmount());
      },
      // 队列中的弹幕发送完时触发（每次发送弹幕都会检查，不管用何种方式发送，手动清空队列不会触发该事件）
      onQueueRunOut() {
        console.log('====queue run out====');
        // danmakuIns.pushAll(['123','456'])
      },
    });

    danmakuInsRef.current = danmakuIns;
  }, []);

  useEffect(() => {
    if (showColor) {
      colorRef.current = (
        document.querySelector('.color-piker') as HTMLInputElement
      ).value;
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
        立即发送随机文本（自动寻找空闲轨道，过多会重叠）
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
          立即发送
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
        立即发送react节点
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
      <button
        type="button"
        onClick={(): void => {
          if (danmakuInsRef.current) {
            danmakuInsRef.current.clearQueue();
          }
        }}
      >
        清空排队中的弹幕队列（已发送的不会被清，不会触发onQueueRunOut事件）
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
