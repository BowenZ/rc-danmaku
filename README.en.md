# rc-danmaku

[![npm-version](https://badgen.net/npm/v/rc-danmaku)](https://www.npmjs.com/package/rc-danmaku)
[![github-stars](https://badgen.net/github/stars/BowenZ/rc-danmaku)](https://github.com/BowenZ/rc-danmaku)
[![bundlephobia](https://badgen.net/bundlephobia/min/rc-danmaku)](https://bundlephobia.com/result?p=rc-danmaku@latest)
![license](https://badgen.net/npm/license/rc-danmaku)

[中文 README](./README.md)

🚀 React Danmaku Component - Supports React 17/18 and TypeScript

> 🌟 Updated to support React 18
> 🐞 If you encounter issues, please submit an issue. For feature requests, please submit a pull request or provide feedback in the issue section.

## 🌰 Example Page

🔗 [https://bowenz.github.io/pages/rc-danmaku/](https://bowenz.github.io/pages/rc-danmaku/)

## 📦 Installation

`npm install rc-danmaku -S`

## 🚗 Quick Start

Copy the following code to get started (TypeScript version):

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
        Send Danmaku
      </button>
    </div>
  );
};

export default TestDanmaku;
```

## 📖 Documentation

### Creating an Instance

```tsx
// The first parameter is the danmaku container. It can be a string selector or a DOM element.
// The second parameter is an optional object containing danmaku configuration. All items are optional.
const danmakuIns = new Danmaku('.danmaku-wrapper', {
  rowHeight: 60, // Height of each danmaku track, default is 40 (in px)
  speed: 120, // Speed of danmaku, default is 100 (in px/s)
  opacity: 1, // Opacity of danmaku, default is 1, range 0-1
  maxRow: 0, // Maximum number of danmaku tracks. It is automatically calculated based on container height, but can be manually set (0 means auto calculation)
  minGapWidth: 30, // Minimum gap width between danmaku, default is 20 (in px)
  // Triggered when each danmaku enters
  onBulletIn() {
    console.log('====bullet in====');
  },
  // Triggered when each danmaku exits
  onBulletOut() {
    console.log('====bullet out====');
  },
  // Triggered when the queue of danmaku is empty (checked each time a danmaku is sent, regardless of the sending method; manually clearing the queue does not trigger this event)
  onQueueRunOut() {
    console.log('====queue run out====');
  },
});
```

### Instance Methods

After initialization, you can use instance methods to send danmaku:

```tsx
const danmakuIns = new Danmaku('.danmaku-wrapper');

// Send text
danmakuIns.push('test string');

// Send text with specified color
danmakuIns.push('test string', {
  color: 'red',
});

// Send React component
danmakuIns.push(<TestReactComponent />);

// Directly send text
// The difference between emit and push is that push will delay sending until there is space on the screen,
// while emit sends immediately regardless of screen space. The parameters are the same as push.
danmakuIns.emit('test string');

// Bulk send
danmakuIns.pushAll(['test1', 'test2', 'test3']);

// Pause
danmakuIns.pause();

// Resume
danmakuIns.resume();

// Destroy
danmakuIns.destroy();

// Check remaining number of danmaku in the queue
danmakuIns.getRestAmount();

// Clear the danmaku queue (sent danmaku will not be cleared, and this does not trigger the onQueueRunOut event)
danmakuIns.clearQueue();
```

### Full Usage Example

<details>
<summary>Click to expand</summary>

```tsx
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Danmaku from 'rc-danmaku';

const textArr = Array.from(
  'By analyzing the vertical and horizontal directions in the plane, we reduced the broad issue of danmaku overlap to a pursuit problem between adjacent danmaku in the track, eventually obtaining a scheduling strategy to mount candidate danmaku to suitable tracks'
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
    // The first parameter is the danmaku container. It can be a string selector or a DOM element.
    // The second parameter is an optional object containing danmaku configuration. All items are optional.
    const danmakuIns = new Danmaku('.danmaku-wrapper', {
      rowHeight: 60, // Height of each danmaku track, default is 40 (in px)
      speed: 120, // Speed of danmaku, default is 100 (in px/s)
      opacity: 1, // Opacity of danmaku, default is 1, range 0-1
      maxRow: 5, // Maximum number of danmaku tracks. It is automatically calculated based on container height, but can be manually set
      minGapWidth: 30, // Minimum gap width between danmaku, default is 20 (in px)
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
        <span>Opacity</span>
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
        <span>Colorful Danmaku:</span>
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
        Send Random Text (too many may overlap)
      </button>
      <div>
        <span>Input Text:</span>
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
          Send
        </button>
      </div>
      <button
        type="button"
        onClick={(): void => {
          if (danmakuInsRef.current) {
            danmakuInsRef.current.emit(<TestNode>React node</TestNode>);
          }
        }}
      >
        Send React Node
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
        Push Random Text to Queue (too many will not overlap, will delay sending)
      </button>
      <button
        type="button"
        onClick={(): void => {
          if (danmakuInsRef.current) {
            danmakuInsRef.current.push(<TestNode>React node</TestNode>);
          }
        }}
      >
        Push React Node to Queue (too many will not overlap, will delay sending)
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
        Randomly Push 20 Text Danmaku
      </button>
      <button
        type="button"
        onClick={(): void => {
          if (danmakuInsRef.current) {
            danmakuInsRef.current.pushAll(
              Array(20)
                .fill(null)
                .map(() => <TestNode>React node</TestNode>)
            );
          }
        }}
      >
        Randomly Push 20 React Nodes
      </button>
      <div>
        {isPaused ? (
          <span style={{ color: 'red' }}>Paused</span>
        ) : (
          <span style={{ color: 'green' }}>Running</span>
        )}
      </div>
      <div>
        <button
          type="button"
          onClick={(): void => {
            setIsPaused((p) => !p);
          }}
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
      </div>
      <button
        type="button"
        onClick={(): void => {
          if (danmakuInsRef.current) {
            danmakuInsRef.current.destroy();
            alert('The component has been destroyed. Any operations will be unresponsive. Please refresh the page to test again.');
          }
        }}
      >
        Destroy (Cannot send danmaku after destruction)
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

             