import React from 'react';
import Bullet from './Bullet';

type BulletNodeType = React.ReactElement | string;

type OptionsType = {
  // 弹幕轨道高度
  rowHeight?: number;
  // 弹幕速度
  speed?: number;
  // 弹幕初始透明度
  opacity?: number;
  // 弹幕最大轨道数
  maxRow?: number;
  // 弹幕之前的最小间隔宽度
  minGapWidth?: number;
  // 弹幕入场回调
  onBulletIn?: () => void;
  // 弹幕出场回调
  onBulletOut?: () => void;
  // 队列中的弹幕全部已经发出的回调
  onQueueRunOut?: () => void;
};

type EmitOptionsType = {
  color?: string;
};

class Danmaku {
  static DEFAULT_ROW_HEIGHT = 40;

  static DEFAULT_SPEED = 100;

  static DEFAULT_OPACITY = 1;

  static DEFAULT_GAP_WIDTH = 20;

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

  // 弹幕之前的最小间隔宽度
  minGapWidth = 0;

  // 是否处于暂停中
  allPaused = false;

  // 是否已被销毁
  isDestroyed = false;

  private options: OptionsType | Record<string, never> = {};

  // 当前展示的弹幕数组
  private trackList: Array<Array<Bullet>> = [];

  // 待发送的弹幕队列
  private queue: Array<{
    node: BulletNodeType;
    options?: EmitOptionsType;
  }> = [];

  private isRunningWhenPageHide = true;

  static containerClassName = 'danmaku-container';

  constructor(ele: string | HTMLElement, options: OptionsType = {}) {
    Danmaku.optionsParamsCheck(options);
    if (typeof ele === 'string') {
      this.container = document.querySelector(ele);
      if (!this.container) {
        throw new Error('container not found');
      }
    } else {
      this.container = ele;
    }
    this.options = options;
    this.rowHeight = options.rowHeight ?? Danmaku.DEFAULT_ROW_HEIGHT;
    this.speed = options.speed ?? Danmaku.DEFAULT_SPEED;
    this.opacity = options.opacity ?? Danmaku.DEFAULT_OPACITY;
    this.minGapWidth = options.minGapWidth ?? Danmaku.DEFAULT_GAP_WIDTH;

    this.container.classList.add(Danmaku.containerClassName);
    this.container.style.position = 'relative';
    this.container.style.overflow = 'hidden';

    const { width, height } = this.container.getBoundingClientRect();
    this.width = width;
    this.height = height;
    this.trackCount = Math.floor(height / this.rowHeight);
    if (options.maxRow && options.maxRow > 0) {
      this.trackCount = Math.min(options.maxRow, this.trackCount);
    }
    console.log('====trackCount====', this.trackCount);
    this.trackList = Array(this.trackCount)
      .fill(null)
      .map(() => []);
    console.log('====this.trackList====', this.trackList.length);

    document.addEventListener(
      'visibilitychange',
      this.visibilityChangeEventHandle
    );
  }

  // 工具方法，数字是否大于0
  static numberIsGreaterThanZero = (number: number | undefined): boolean => {
    return number !== undefined && number >= 0;
  };

  // 检查参数是否合法
  static optionsParamsCheck(options: OptionsType = {}): void {
    (['rowHeight', 'speed', 'opacity', 'maxRow', 'minGapWidth'] as Array<
      keyof OptionsType
    >).forEach((item) => {
      if (
        typeof options[item] === 'number' &&
        !Danmaku.numberIsGreaterThanZero(options[item] as number)
      ) {
        throw new Error(`rc-danmaku: ${item} 必须大于等于0`);
      }
    });
  }

  // 页面不可见时暂停弹幕滚动
  private visibilityChangeEventHandle = (): void => {
    if (document.visibilityState === 'hidden') {
      this.isRunningWhenPageHide = !this.allPaused;
      if (!this.allPaused) {
        this.pause();
      }
    } else if (this.isRunningWhenPageHide && this.allPaused) {
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
      minGapWidth: this.minGapWidth,
      onTotalOut: (): void => {
        this.popBulletToFreeTrack();
      },
      onDestroy: (targetTrackIndex): void => {
        this.trackList[targetTrackIndex] = this.trackList[
          targetTrackIndex
        ].filter((item) => !item.isFinished);
        this.options.onBulletOut?.();
      },
    });

    this.trackList[trackIndex].push(bulletItem);

    if (!this.allPaused) {
      bulletItem.run();
      this.options.onBulletIn?.();
    }

    if (this.getRestAmount() === 0) {
      this.options.onQueueRunOut?.();
    }
  }

  // 是否有空闲轨道（该轨道发送弹幕时不会和上一条弹幕重叠）
  private hasFreeTrack(): boolean {
    return this.trackList.some(
      (bullets) =>
        !bullets || !bullets.length || bullets[bullets.length - 1].isTotalOut
    );
  }

  // 如果队列中还有弹幕并且有空闲的轨道，则弹出
  private popBulletToFreeTrack(): void {
    if (this.queue.length > 0 && this.hasFreeTrack()) {
      console.log('====queue run====');
      const item = this.queue.shift();
      if (item) {
        this.emit(item.node, item.options);
        this.popBulletToFreeTrack();
      }
    }
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
    }
  }

  // 推送一个弹幕数组
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
    this.popBulletToFreeTrack();
  }

  /**
   * pause
   */
  public pause(): void {
    if (this.allPaused) {
      return;
    }
    this.allPaused = true;
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

  /**
   * 获取剩余还没发出的弹幕数量
   */
  public getRestAmount(): number {
    return this.queue.length;
  }

  /**
   * 清空弹幕队列（只能清空排队中还未发出的弹幕）
   */
  public clearQueue(): void {
    this.queue = [];
  }
}

export default Danmaku;
