import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import React from 'react';
import ReactDOM from 'react-dom';
var BulletStatus;

(function (BulletStatus) {
  BulletStatus['PENDING'] = 'pending';
  BulletStatus['RUNNING'] = 'running';
  BulletStatus['PAUSED'] = 'paused';
  BulletStatus['FINISHED'] = 'finished';
})(BulletStatus || (BulletStatus = {}));

var Bullet = /*#__PURE__*/ (function () {
  // 当前状态
  // 弹幕DOM元素
  // 速度
  // 目标挂载容器
  // 目标轨道
  // 弹幕行高
  // 是否全部出现
  // 暂停时距离右边的距离
  // 弹幕全部出现的计时器
  function Bullet(node, options) {
    var _this = this;

    _classCallCheck(this, Bullet);

    _defineProperty(this, 'status', BulletStatus.PENDING);

    _defineProperty(this, 'element', void 0);

    _defineProperty(this, 'speed', void 0);

    _defineProperty(this, 'targetContainer', void 0);

    _defineProperty(this, 'trackIndex', void 0);

    _defineProperty(this, 'rowHeight', void 0);

    _defineProperty(this, 'isTotalOut', false);

    _defineProperty(this, 'rightDistance', 0);

    _defineProperty(this, 'totalOutTimer', 0);

    this.speed = options.speed;
    this.targetContainer = options.targetContainer;
    this.trackIndex = options.trackIndex;
    this.rowHeight = options.rowHeight;
    var div = document.createElement('div');
    div.className = 'bullet-item';
    div.setAttribute(
      'style',
      'position: absolute;\n       line-height: 1.125;\n       user-select: none;\n       white-space: pre;\n       perspective: 500px;\n       will-change: transform;\n       pointer-events: none;'
    );
    div.style.opacity = String(options.opacity);
    var reactNode =
      typeof node === 'string'
        ? /*#__PURE__*/ React.createElement(
            'span',
            {
              className: 'bullet-item-text',
              style: {
                textShadow:
                  '#000 1px 0px 1px, #000 0px 1px 1px, #000 0px -1px 1px,#000 -1px 0px 1px',
                color: options.color || '#fff',
                fontSize: '25px',
              },
            },
            node
          )
        : node;
    ReactDOM.render(reactNode, div);
    this.element = div;
    options.targetContainer.appendChild(this.element);

    var _this$targetContainer = this.targetContainer.getBoundingClientRect(),
      width = _this$targetContainer.width;

    div.style.left = ''.concat(width, 'px');
    div.style.top = ''.concat(this.trackIndex * this.rowHeight, 'px');
    this.element.addEventListener('transitionend', function () {
      console.log('====transition end====');

      _this.destroy();

      _this.status = BulletStatus.FINISHED;
      _this.isTotalOut = false;
      options.onDestroy(options.trackIndex);
    });
  } // 根据弹幕当前位置计算出弹幕完全显示需要的时间，并在改时间后将弹幕状态设置为完全可见状态

  _createClass(Bullet, [
    {
      key: 'startTotalOutTimer',
      value: function startTotalOutTimer() {
        var _this2 = this;

        if (this.totalOutTimer) {
          return;
        }

        var _this$targetContainer2 = this.targetContainer.getBoundingClientRect(),
          left = _this$targetContainer2.left,
          width = _this$targetContainer2.width;

        var _this$element$getBoun = this.element.getBoundingClientRect(),
          bulletLeft = _this$element$getBoun.left;

        var notOutWidth =
          this.element.offsetWidth - (left + width - bulletLeft);

        if (notOutWidth <= 0) {
          return;
        } // 该条弹幕完全展示出所需的时间

        var totalOutTime = notOutWidth / this.speed;
        this.totalOutTimer = setTimeout(function () {
          console.log('====set is total out====');
          _this2.isTotalOut = true;
          _this2.totalOutTimer = 0;
        }, totalOutTime * 1000 + 500);
      }, // 清楚弹幕完全显示状态的计时器
    },
    {
      key: 'clearTotalOutTimer',
      value: function clearTotalOutTimer() {
        if (this.totalOutTimer) {
          clearTimeout(this.totalOutTimer);
          this.totalOutTimer = 0;
        }
      }, // 弹幕运行
    },
    {
      key: 'run',
      value: function run() {
        var _this$targetContainer3 = this.targetContainer.getBoundingClientRect(),
          width = _this$targetContainer3.width;

        this.element.style.transition = 'transform '.concat(
          (
            (width + this.element.scrollWidth - this.rightDistance) /
            this.speed
          ).toFixed(2),
          's linear'
        );
        this.element.style.transform = 'translate3d(-'.concat(
          width + this.element.scrollWidth,
          'px, 0, 0)'
        );
        this.status = BulletStatus.RUNNING;
        this.startTotalOutTimer();
      }, // 弹幕暂停
    },
    {
      key: 'pause',
      value: function pause() {
        var _this$targetContainer4 = this.targetContainer.getBoundingClientRect(),
          containerLeft = _this$targetContainer4.left,
          containeWidth = _this$targetContainer4.width;

        var _this$element$getBoun2 = this.element.getBoundingClientRect(),
          bulletLeft = _this$element$getBoun2.left;

        this.rightDistance = containeWidth - (bulletLeft - containerLeft);
        this.element.style.transform = 'translate3d(-'.concat(
          this.rightDistance,
          'px, 0, 0)'
        );
        this.element.style.transition = 'transform 0s linear 0s';
        this.status = BulletStatus.PAUSED;
        this.clearTotalOutTimer();
      }, // 销毁弹幕
    },
    {
      key: 'destroy',
      value: function destroy() {
        if (this.totalOutTimer) {
          clearTimeout(this.totalOutTimer);
        }

        this.element.remove();
      },
    },
    {
      key: 'isRunning',
      get: function get() {
        return this.status === BulletStatus.RUNNING;
      },
    },
    {
      key: 'isFinished',
      get: function get() {
        return this.status === BulletStatus.FINISHED;
      },
    },
  ]);

  return Bullet;
})();

export default Bullet;
