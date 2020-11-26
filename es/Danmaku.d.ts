import React from 'react';
declare type BulletNodeType = React.ReactElement | string;
declare type OptionsType = {
  rowHeight?: number;
  speed?: number;
  opacity?: number;
};
declare type EmitOptionsType = {
  color?: string;
};
declare class Danmaku {
  static DEFAULT_ROW_HEIGHT: number;
  static DEFAULT_SPEED: number;
  static DEFAULT_OPACITY: number;
  private container;
  width: number;
  height: number;
  rowHeight: number;
  trackCount: number;
  speed: number;
  opacity: number;
  allPaused: boolean;
  isDestroyed: boolean;
  private trackList;
  private queue;
  private queueTimer;
  static containerClassName: string;
  constructor(ele: string | HTMLElement, options?: OptionsType);
  private visibilityChangeEventHandle;
  private getTrackIndex;
  /**
   * 立即发送弹幕到屏幕上，自动寻找最空闲的轨道，若没有空闲轨道则可能有重叠弹幕
   * @param node 要发送的React组件或者文本
   */
  emit(node: BulletNodeType, options?: EmitOptionsType): void;
  private hasFreeTrack;
  /**
   * 当有空闲弹幕轨道时，直接发送弹幕，效果通emit方法一样，
   * 若全部轨道都占用，则将弹幕暂存到队列中，待空闲后再依次放出
   * @param node
   */
  push(node: BulletNodeType, options?: EmitOptionsType): void;
  pushAll(nodeArr: Array<BulletNodeType>, options?: EmitOptionsType): void;
  private clearQueueTimer;
  private startQueueTimer;
  /**
   * pause
   */
  pause(): void;
  /**
   * resume
   */
  resume(): void;
  /**
   * destroy
   */
  destroy(): void;
}
export default Danmaku;
