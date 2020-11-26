import React from 'react';
import ReactDOM from 'react-dom';

enum BulletStatus {
  // 等待中
  PENDING = 'pending',
  // 运行中
  RUNNING = 'running',
  // 暂停中
  PAUSED = 'paused',
  // 已完成
  FINISHED = 'finished',
}

class Bullet {
  // 当前状态
  status: BulletStatus = BulletStatus.PENDING;

  // 弹幕DOM元素
  element: HTMLElement;

  // 速度
  speed: number;

  // 目标挂载容器
  targetContainer: HTMLElement;

  // 目标轨道
  trackIndex: number;

  // 弹幕行高
  rowHeight: number;

  // 是否全部出现
  public isTotalOut = false;

  // 暂停时距离右边的距离
  private rightDistance = 0;

  // 弹幕全部出现的计时器
  private totalOutTimer = 0;

  constructor(
    node: React.ReactElement | string,
    options: {
      color?: string;
      speed: number;
      opacity: number;
      targetContainer: HTMLElement;
      trackIndex: number;
      rowHeight: number;
      onDestroy(trackIndex: number): void;
    }
  ) {
    this.speed = options.speed;
    this.targetContainer = options.targetContainer;
    this.trackIndex = options.trackIndex;
    this.rowHeight = options.rowHeight;
    const div = document.createElement('div');
    div.className = 'bullet-item';
    div.setAttribute(
      'style',
      `position: absolute;
       line-height: 1.125;
       user-select: none;
       white-space: pre;
       perspective: 500px;
       will-change: transform;
       pointer-events: none;`
    );
    div.style.opacity = String(options.opacity);

    const reactNode =
      typeof node === 'string' ? (
        <span
          className="bullet-item-text"
          style={{
            textShadow:
              '#000 1px 0px 1px, #000 0px 1px 1px, #000 0px -1px 1px,#000 -1px 0px 1px',
            color: options.color || '#fff',
            fontSize: '25px',
          }}
        >
          {node}
        </span>
      ) : (
        node
      );

    ReactDOM.render(reactNode, div);

    this.element = div;

    options.targetContainer.appendChild(this.element);

    const { width } = this.targetContainer.getBoundingClientRect();
    div.style.left = `${width}px`;
    div.style.top = `${this.trackIndex * this.rowHeight}px`;

    this.element.addEventListener('transitionend', () => {
      console.log('====transition end====');
      this.destroy();
      this.status = BulletStatus.FINISHED;
      this.isTotalOut = false;
      options.onDestroy(options.trackIndex);
    });
  }

  // 根据弹幕当前位置计算出弹幕完全显示需要的时间，并在改时间后将弹幕状态设置为完全可见状态
  private startTotalOutTimer(): void {
    if (this.totalOutTimer) {
      return;
    }
    const { left, width } = this.targetContainer.getBoundingClientRect();
    const { left: bulletLeft } = this.element.getBoundingClientRect();
    const notOutWidth = this.element.offsetWidth - (left + width - bulletLeft);

    if (notOutWidth <= 0) {
      return;
    }

    // 该条弹幕完全展示出所需的时间
    const totalOutTime = notOutWidth / this.speed;

    this.totalOutTimer = setTimeout(() => {
      console.log('====set is total out====');
      this.isTotalOut = true;
      this.totalOutTimer = 0;
    }, totalOutTime * 1000 + 500);
  }

  // 清楚弹幕完全显示状态的计时器
  private clearTotalOutTimer(): void {
    if (this.totalOutTimer) {
      clearTimeout(this.totalOutTimer);
      this.totalOutTimer = 0;
    }
  }

  // 弹幕运行
  public run(): void {
    const { width } = this.targetContainer.getBoundingClientRect();
    this.element.style.transition = `transform ${(
      (width + this.element.scrollWidth - this.rightDistance) /
      this.speed
    ).toFixed(2)}s linear`;
    this.element.style.transform = `translate3d(-${
      width + this.element.scrollWidth
    }px, 0, 0)`;
    this.status = BulletStatus.RUNNING;
    this.startTotalOutTimer();
  }

  // 弹幕暂停
  public pause(): void {
    const {
      left: containerLeft,
      width: containeWidth,
    } = this.targetContainer.getBoundingClientRect();
    const { left: bulletLeft } = this.element.getBoundingClientRect();
    this.rightDistance = containeWidth - (bulletLeft - containerLeft);
    this.element.style.transform = `translate3d(-${this.rightDistance}px, 0, 0)`;
    this.element.style.transition = 'transform 0s linear 0s';
    this.status = BulletStatus.PAUSED;
    this.clearTotalOutTimer();
  }

  // 销毁弹幕
  public destroy(): void {
    if (this.totalOutTimer) {
      clearTimeout(this.totalOutTimer);
    }
    ReactDOM.unmountComponentAtNode(this.element);
    this.element.remove();
  }

  public get isRunning(): boolean {
    return this.status === BulletStatus.RUNNING;
  }

  public get isFinished(): boolean {
    return this.status === BulletStatus.FINISHED;
  }
}

export default Bullet;
