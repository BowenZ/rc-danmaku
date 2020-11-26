import _toConsumableArray from '@babel/runtime/helpers/esm/toConsumableArray';
import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import Bullet from './Bullet';

var Danmaku = /*#__PURE__*/ (function () {
  // 弹幕容器
  // 容器宽度
  // 容器高度
  // 弹幕轨道高度
  // 弹幕轨道数量
  // 弹幕速度
  // 弹幕透明度 0-1
  // 是否处于暂停中
  // 是否已被销毁
  // 当前展示的弹幕数组
  // 待发送的弹幕队列
  // 弹幕队列定时器
  function Danmaku(ele) {
    var _this = this,
      _options$rowHeight,
      _options$speed,
      _options$opacity;

    var options =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Danmaku);

    _defineProperty(this, 'container', null);

    _defineProperty(this, 'width', 0);

    _defineProperty(this, 'height', 0);

    _defineProperty(this, 'rowHeight', 40);

    _defineProperty(this, 'trackCount', 0);

    _defineProperty(this, 'speed', 100);

    _defineProperty(this, 'opacity', 1);

    _defineProperty(this, 'allPaused', false);

    _defineProperty(this, 'isDestroyed', false);

    _defineProperty(this, 'trackList', []);

    _defineProperty(this, 'queue', []);

    _defineProperty(this, 'queueTimer', 0);

    _defineProperty(this, 'visibilityChangeEventHandle', function () {
      console.log('====visibility change====', document.visibilityState);

      if (document.visibilityState === 'hidden') {
        _this.pause();
      } else {
        _this.resume();
      }
    });

    if (typeof ele === 'string') {
      this.container = document.querySelector(ele);

      if (!this.container) {
        throw new Error('container not found');
      }
    } else {
      this.container = ele;
    }

    this.rowHeight =
      (_options$rowHeight = options.rowHeight) !== null &&
      _options$rowHeight !== void 0
        ? _options$rowHeight
        : Danmaku.DEFAULT_ROW_HEIGHT;
    this.speed =
      (_options$speed = options.speed) !== null && _options$speed !== void 0
        ? _options$speed
        : Danmaku.DEFAULT_SPEED;
    this.opacity =
      (_options$opacity = options.opacity) !== null &&
      _options$opacity !== void 0
        ? _options$opacity
        : Danmaku.DEFAULT_OPACITY;
    this.container.classList.add(Danmaku.containerClassName);
    this.container.style.position = 'relative';
    this.container.style.overflow = 'hidden';

    var _this$container$getBo = this.container.getBoundingClientRect(),
      width = _this$container$getBo.width,
      height = _this$container$getBo.height;

    this.width = width;
    this.height = height;
    this.trackCount = Math.floor(height / this.rowHeight);
    this.trackList = Array(this.trackCount)
      .fill(null)
      .map(function () {
        return [];
      });
    console.log('====this.trackList====', this.trackList.length);
    document.addEventListener(
      'visibilitychange',
      this.visibilityChangeEventHandle
    );
  }

  _createClass(Danmaku, [
    {
      key: 'getTrackIndex',
      // 获取相对最空闲的弹幕轨道
      value: function getTrackIndex() {
        if (!this.trackList.length) {
          return 0;
        }

        var result = 0;
        var minCount = this.trackList[0].length;
        this.trackList.forEach(function (list, index) {
          var _list$filter = list.filter(function (bullet) {
              return !bullet.isTotalOut;
            }),
            length = _list$filter.length;

          if (length < minCount) {
            minCount = length;
            result = index;
          }
        });
        return result;
      },
      /**
       * 立即发送弹幕到屏幕上，自动寻找最空闲的轨道，若没有空闲轨道则可能有重叠弹幕
       * @param node 要发送的React组件或者文本
       */
    },
    {
      key: 'emit',
      value: function emit(node) {
        var _this2 = this;

        var options =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : {};

        if (!this.container || this.isDestroyed) {
          return;
        }

        var trackIndex = this.getTrackIndex();
        var bulletItem = new Bullet(node, {
          color: options.color,
          speed: this.speed,
          opacity: this.opacity,
          targetContainer: this.container,
          trackIndex: trackIndex,
          rowHeight: this.rowHeight,
          onDestroy: function onDestroy(targetTrackIndex) {
            _this2.trackList[targetTrackIndex] = _this2.trackList[
              targetTrackIndex
            ].filter(function (item) {
              return !item.isFinished;
            });
          },
        });
        this.trackList[trackIndex].push(bulletItem);

        if (!this.allPaused) {
          bulletItem.run();
        }
      }, // 是否有空闲轨道（该轨道发送弹幕时不会和上一条弹幕重叠）
    },
    {
      key: 'hasFreeTrack',
      value: function hasFreeTrack() {
        return this.trackList.some(function (bullets) {
          return (
            !bullets ||
            !bullets.length ||
            bullets[bullets.length - 1].isTotalOut
          );
        });
      },
      /**
       * 当有空闲弹幕轨道时，直接发送弹幕，效果通emit方法一样，
       * 若全部轨道都占用，则将弹幕暂存到队列中，待空闲后再依次放出
       * @param node
       */
    },
    {
      key: 'push',
      value: function push(node) {
        var options =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : {};

        if (this.isDestroyed) {
          return;
        }

        if (this.hasFreeTrack()) {
          this.emit(node, options);
        } else {
          this.queue.push({
            node: node,
            options: options,
          });
          this.startQueueTimer();
        }
      },
    },
    {
      key: 'pushAll',
      value: function pushAll(nodeArr) {
        var _this$queue;

        var options =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : {};

        if (this.isDestroyed) {
          return;
        }

        (_this$queue = this.queue).push.apply(
          _this$queue,
          _toConsumableArray(
            nodeArr.map(function (item) {
              return {
                node: item,
                options: options,
              };
            })
          )
        );

        this.startQueueTimer();
      }, // 清楚弹幕队列计时器
    },
    {
      key: 'clearQueueTimer',
      value: function clearQueueTimer() {
        if (this.queueTimer) {
          clearInterval(this.queueTimer);
          this.queueTimer = 0;
        }
      }, // 开始弹幕队列计时器，每次触发检查队列中是否有弹幕，若有的话就发送出来，没有则清楚计时
    },
    {
      key: 'startQueueTimer',
      value: function startQueueTimer() {
        var _this3 = this;

        if (this.queueTimer || this.allPaused || this.isDestroyed) {
          return;
        }

        this.queueTimer = setInterval(function () {
          if (_this3.queue.length > 0) {
            console.log('====queue run====');

            if (_this3.hasFreeTrack()) {
              var item = _this3.queue.shift();

              if (item) {
                _this3.emit(item.node, item.options);
              }
            }
          } else {
            console.log('====queue clear====');

            _this3.clearQueueTimer();
          }
        }, 200);
      },
      /**
       * pause
       */
    },
    {
      key: 'pause',
      value: function pause() {
        if (this.allPaused) {
          return;
        }

        this.allPaused = true;
        this.clearQueueTimer();
        this.trackList.forEach(function (list) {
          return list.forEach(function (item) {
            item.pause();
          });
        });
      },
      /**
       * resume
       */
    },
    {
      key: 'resume',
      value: function resume() {
        if (!this.allPaused || this.isDestroyed) {
          return;
        }

        this.allPaused = false;
        this.startQueueTimer();
        this.trackList.forEach(function (list) {
          return list.forEach(function (item) {
            item.run();
          });
        });
      },
      /**
       * destroy
       */
    },
    {
      key: 'destroy',
      value: function destroy() {
        if (this.container) {
          this.clearQueueTimer();
          this.trackList.forEach(function (list) {
            return list.forEach(function (item) {
              item.destroy();
            });
          });
          this.trackList = [];
          document.removeEventListener(
            'visibilitychange',
            this.visibilityChangeEventHandle
          );
          this.container.classList.remove(Danmaku.containerClassName);
          this.container = null;
          this.isDestroyed = true;
        }
      },
    },
  ]);

  return Danmaku;
})();

_defineProperty(Danmaku, 'DEFAULT_ROW_HEIGHT', 40);

_defineProperty(Danmaku, 'DEFAULT_SPEED', 100);

_defineProperty(Danmaku, 'DEFAULT_OPACITY', 1);

_defineProperty(Danmaku, 'containerClassName', 'danmaku-container');

export default Danmaku;
