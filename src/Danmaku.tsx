import React from 'react';
import Bullet from './Bullet';

type BulletNodeType = React.ReactElement | string;

type OptionsType = {
  rowHeight?: number;
  speed?: number;
  opacity?: number;
};

type EmitOptionsType = {
  color?: string;
};

class Danmaku {
  static DEFAULT_ROW_HEIGHT = 40;

  static DEFAULT_SPEED = 100;

  static DEFAULT_OPACITY = 1;

  // 弹幕容器
  private container: HTMLElement | null = null;

  // 容器宽度
  width = 0;

  // 容器高度
  height = 0;

  // 弹幕轨道高度
  rowHeight = 40;

  // 弹幕轨道数量
  trackCount = 0;

  // 弹幕速度
  speed = 100;

  // 弹幕透明度 0-1
  opacity = 1;

  // 是否处于暂停中
  allPaused = false;

  // 是否已被销毁
  isDestroyed = false;

  // 当前展示的弹幕数组
  private trackList: Array<Array<Bullet>> = [];

  // 待发送的弹幕队列
  private queue: Array<{
    node: BulletNodeType;
    options?: EmitOptionsType;
  }> = [];

  // 弹幕队列定时器
  private queueTimer = 0;

  static containerClassName = 'danmaku-container';

  constructor(ele: string | HTMLElement, options: OptionsType = {}) {
    if (typeof ele === 'string') {
      this.container = document.querySelector(ele);
      if (!this.container) {
        throw new Error('container not found');
      }
    } else {
      this.container = ele;
    }
    this.rowHeight = options.rowHeight ?? Danmaku.DEFAULT_ROW_HEIGHT;
    this.speed = options.speed ?? Danmaku.DEFAULT_SPEED;
    this.opacity = options.opacity ?? Danmaku.DEFAULT_OPACITY;

    this.container.classList.add(Danmaku.containerClassName);
    this.container.style.position = 'relative';
    this.container.style.overflow = 'hidden';

    const { width, height } = this.container.getBoundingClientRect();
    this.width = width;
    this.height = height;
    this.trackCount = Math.floor(height / this.rowHeight);
    this.trackList = Array(this.trackCount)
      .fill(null)
      .map(() => []);
    console.log('====this.trackList====', this.trackList.length);

    document.addEventListener(
      'visibilitychange',
      this.visibilityChangeEventHandle
    );
  }

  private visibilityChangeEventHandle = (): void => {
    console.log('====visibility change====', document.visibilityState);
    if (document.visibilityState === 'hidden') {
      this.pause();
    } else {
      this.resume();
    }
  };

  // 获取相对最空闲的弹幕轨道
  private getTrackIndex(): number {
    if (!this.trackList.length) {
      return 0;
    }
    let result = 0;
    let minCount = this.trackList[0].length;
    this.trackList.forEach((list, index) => {
      const { length } = list.filter((bullet) => !bullet.isTotalOut);
      if (length < minCount) {
        minCount = length;
        result = index;
      }
    });
    return result;
  }

  /**
   * 立即发送弹幕到屏幕上，自动寻找最空闲的轨道，若没有空闲轨道则可能有重叠弹幕
   * @param node 要发送的React组件或者文本
   */
  public emit(node: BulletNodeType, options: EmitOptionsType = {}): void {
    if (!this.container || this.isDestroyed) {
      return;
    }
    const trackIndex = this.getTrackIndex();
    const bulletItem = new Bullet(node, {
      color: options.color,
      speed: this.speed,
      opacity: this.opacity,
      targetContainer: this.container,
      trackIndex,
      rowHeight: this.rowHeight,
      onDestroy: (targetTrackIndex): void => {
        this.trackList[targetTrackIndex] = this.trackList[
          targetTrackIndex
        ].filter((item) => !item.isFinished);
      },
    });

    this.trackList[trackIndex].push(bulletItem);

    if (!this.allPaused) {
      bulletItem.run();
    }
  }

  // 是否有空闲轨道（该轨道发送弹幕时不会和上一条弹幕重叠）
  private hasFreeTrack(): boolean {
    return this.trackList.some(
      (bullets) =>
        !bullets || !bullets.length || bullets[bullets.length - 1].isTotalOut
    );
  }

  /**
   * 当有空闲弹幕轨道时，直接发送弹幕，效果通emit方法一样，
   * 若全部轨道都占用，则将弹幕暂存到队列中，待空闲后再依次放出
   * @param node
   */
  public push(node: BulletNodeType, options: EmitOptionsType = {}): void {
    if (this.isDestroyed) {
      return;
    }
    if (this.hasFreeTrack()) {
      this.emit(node, options);
    } else {
      this.queue.push({
        node,
        options,
      });
      this.startQueueTimer();
    }
  }

  public pushAll(
    nodeArr: Array<BulletNodeType>,
    options: EmitOptionsType = {}
  ): void {
    if (this.isDestroyed) {
      return;
    }
    this.queue.push(
      ...nodeArr.map((item) => ({
        node: item,
        options,
      }))
    );
    this.startQueueTimer();
  }

  // 清楚弹幕队列计时器
  private clearQueueTimer(): void {
    if (this.queueTimer) {
      clearInterval(this.queueTimer);
      this.queueTimer = 0;
    }
  }

  // 开始弹幕队列计时器，每次触发检查队列中是否有弹幕，若有的话就发送出来，没有则清楚计时
  private startQueueTimer(): void {
    if (this.queueTimer || this.allPaused || this.isDestroyed) {
      return;
    }
    this.queueTimer = setInterval(() => {
      if (this.queue.length > 0) {
        console.log('====queue run====');
        if (this.hasFreeTrack()) {
          const item = this.queue.shift();
          if (item) {
            this.emit(item.node, item.options);
          }
        }
      } else {
        console.log('====queue clear====');
        this.clearQueueTimer();
      }
    }, 200);
  }

  /**
   * pause
   */
  public pause(): void {
    if (this.allPaused) {
      return;
    }
    this.allPaused = true;
    this.clearQueueTimer();
    this.trackList.forEach((list) =>
      list.forEach((item) => {
        item.pause();
      })
    );
  }

  /**
   * resume
   */
  public resume(): void {
    if (!this.allPaused || this.isDestroyed) {
      return;
    }
    this.allPaused = false;
    this.startQueueTimer();
    this.trackList.forEach((list) =>
      list.forEach((item) => {
        item.run();
      })
    );
  }

  /**
   * destroy
   */
  public destroy(): void {
    if (this.container) {
      this.clearQueueTimer();
      this.trackList.forEach((list) =>
        list.forEach((item) => {
          item.destroy();
        })
      );
      this.trackList = [];
      document.removeEventListener(
        'visibilitychange',
        this.visibilityChangeEventHandle
      );
      this.container.classList.remove(Danmaku.containerClassName);
      this.container = null;
      this.isDestroyed = true;
    }
  }
}

export default Danmaku;
