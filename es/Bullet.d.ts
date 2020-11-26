import React from 'react';
declare enum BulletStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  PAUSED = 'paused',
  FINISHED = 'finished',
}
declare class Bullet {
  status: BulletStatus;
  element: HTMLElement;
  speed: number;
  targetContainer: HTMLElement;
  trackIndex: number;
  rowHeight: number;
  isTotalOut: boolean;
  private rightDistance;
  private totalOutTimer;
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
  );
  private startTotalOutTimer;
  private clearTotalOutTimer;
  run(): void;
  pause(): void;
  destroy(): void;
  get isRunning(): boolean;
  get isFinished(): boolean;
}
export default Bullet;
