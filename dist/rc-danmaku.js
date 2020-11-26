(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory(require('react'), require('react-dom'));
  else if (typeof define === 'function' && define.amd)
    define(['react', 'react-dom'], factory);
  else if (typeof exports === 'object')
    exports['rc-danmaku'] = factory(require('react'), require('react-dom'));
  else root['rc-danmaku'] = factory(root['React'], root['ReactDOM']);
})(
  window,
  function (__WEBPACK_EXTERNAL_MODULE__0__, __WEBPACK_EXTERNAL_MODULE__1__) {
    return /******/ (function (modules) {
      // webpackBootstrap
      /******/ // The module cache
      /******/ var installedModules = {}; // The require function
      /******/
      /******/ /******/ function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/ if (installedModules[moduleId]) {
          /******/ return installedModules[moduleId].exports;
          /******/
        } // Create a new module (and put it into the cache)
        /******/ /******/ var module = (installedModules[moduleId] = {
          /******/ i: moduleId,
          /******/ l: false,
          /******/ exports: {},
          /******/
        }); // Execute the module function
        /******/
        /******/ /******/ modules[moduleId].call(
          module.exports,
          module,
          module.exports,
          __webpack_require__
        ); // Flag the module as loaded
        /******/
        /******/ /******/ module.l = true; // Return the exports of the module
        /******/
        /******/ /******/ return module.exports;
        /******/
      } // expose the modules object (__webpack_modules__)
      /******/
      /******/
      /******/ /******/ __webpack_require__.m = modules; // expose the module cache
      /******/
      /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
      /******/
      /******/ /******/ __webpack_require__.d = function (
        exports,
        name,
        getter
      ) {
        /******/ if (!__webpack_require__.o(exports, name)) {
          /******/ Object.defineProperty(exports, name, {
            enumerable: true,
            get: getter,
          });
          /******/
        }
        /******/
      }; // define __esModule on exports
      /******/
      /******/ /******/ __webpack_require__.r = function (exports) {
        /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
          /******/ Object.defineProperty(exports, Symbol.toStringTag, {
            value: 'Module',
          });
          /******/
        }
        /******/ Object.defineProperty(exports, '__esModule', { value: true });
        /******/
      }; // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
      /******/
      /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function (
        value,
        mode
      ) {
        /******/ if (mode & 1) value = __webpack_require__(value);
        /******/ if (mode & 8) return value;
        /******/ if (
          mode & 4 &&
          typeof value === 'object' &&
          value &&
          value.__esModule
        )
          return value;
        /******/ var ns = Object.create(null);
        /******/ __webpack_require__.r(ns);
        /******/ Object.defineProperty(ns, 'default', {
          enumerable: true,
          value: value,
        });
        /******/ if (mode & 2 && typeof value != 'string')
          for (var key in value)
            __webpack_require__.d(
              ns,
              key,
              function (key) {
                return value[key];
              }.bind(null, key)
            );
        /******/ return ns;
        /******/
      }; // getDefaultExport function for compatibility with non-harmony modules
      /******/
      /******/ /******/ __webpack_require__.n = function (module) {
        /******/ var getter =
          module && module.__esModule
            ? /******/ function getDefault() {
                return module['default'];
              }
            : /******/ function getModuleExports() {
                return module;
              };
        /******/ __webpack_require__.d(getter, 'a', getter);
        /******/ return getter;
        /******/
      }; // Object.prototype.hasOwnProperty.call
      /******/
      /******/ /******/ __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      }; // __webpack_public_path__
      /******/
      /******/ /******/ __webpack_require__.p = ''; // Load entry module and return exports
      /******/
      /******/
      /******/ /******/ return __webpack_require__((__webpack_require__.s = 2));
      /******/
    })(
      /************************************************************************/
      /******/ [
        /* 0 */
        /***/ function (module, exports) {
          module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

          /***/
        },
        /* 1 */
        /***/ function (module, exports) {
          module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

          /***/
        },
        /* 2 */
        /***/ function (module, __webpack_exports__, __webpack_require__) {
          'use strict';
          // ESM COMPAT FLAG
          __webpack_require__.r(__webpack_exports__);

          // EXPORTS
          __webpack_require__.d(__webpack_exports__, 'default', function () {
            return /* reexport */ src_Danmaku;
          });

          // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
          function _arrayLikeToArray(arr, len) {
            if (len == null || len > arr.length) len = arr.length;

            for (var i = 0, arr2 = new Array(len); i < len; i++) {
              arr2[i] = arr[i];
            }

            return arr2;
          }
          // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js

          function _arrayWithoutHoles(arr) {
            if (Array.isArray(arr)) return _arrayLikeToArray(arr);
          }
          // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js
          function _iterableToArray(iter) {
            if (
              typeof Symbol !== 'undefined' &&
              Symbol.iterator in Object(iter)
            )
              return Array.from(iter);
          }
          // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js

          function _unsupportedIterableToArray(o, minLen) {
            if (!o) return;
            if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            if (n === 'Object' && o.constructor) n = o.constructor.name;
            if (n === 'Map' || n === 'Set') return Array.from(o);
            if (
              n === 'Arguments' ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return _arrayLikeToArray(o, minLen);
          }
          // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
          function _nonIterableSpread() {
            throw new TypeError(
              'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
            );
          }
          // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js

          function _toConsumableArray(arr) {
            return (
              _arrayWithoutHoles(arr) ||
              _iterableToArray(arr) ||
              _unsupportedIterableToArray(arr) ||
              _nonIterableSpread()
            );
          }
          // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError('Cannot call a class as a function');
            }
          }
          // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ('value' in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
              _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            return Constructor;
          }
          // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
          function _defineProperty(obj, key, value) {
            if (key in obj) {
              Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true,
              });
            } else {
              obj[key] = value;
            }

            return obj;
          }
          // EXTERNAL MODULE: external {"root":"React","commonjs2":"react","commonjs":"react","amd":"react"}
          var external_root_React_commonjs2_react_commonjs_react_amd_react_ = __webpack_require__(
            0
          );
          var external_root_React_commonjs2_react_commonjs_react_amd_react_default = /*#__PURE__*/ __webpack_require__.n(
            external_root_React_commonjs2_react_commonjs_react_amd_react_
          );

          // EXTERNAL MODULE: external {"root":"ReactDOM","commonjs2":"react-dom","commonjs":"react-dom","amd":"react-dom"}
          var external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_ = __webpack_require__(
            1
          );
          var external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_default = /*#__PURE__*/ __webpack_require__.n(
            external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_
          );

          // CONCATENATED MODULE: ./src/Bullet.tsx

          var BulletStatus;

          (function (BulletStatus) {
            BulletStatus['PENDING'] = 'pending';
            BulletStatus['RUNNING'] = 'running';
            BulletStatus['PAUSED'] = 'paused';
            BulletStatus['FINISHED'] = 'finished';
          })(BulletStatus || (BulletStatus = {}));

          var Bullet_Bullet = /*#__PURE__*/ (function () {
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
                  ? /*#__PURE__*/ external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement(
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
              external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_default.a.render(
                reactNode,
                div
              );
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

                  this.rightDistance =
                    containeWidth - (bulletLeft - containerLeft);
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

          /* harmony default export */ var src_Bullet = Bullet_Bullet;
          // CONCATENATED MODULE: ./src/Danmaku.tsx

          var Danmaku_Danmaku = /*#__PURE__*/ (function () {
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
                arguments.length > 1 && arguments[1] !== undefined
                  ? arguments[1]
                  : {};

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
                console.log(
                  '====visibility change====',
                  document.visibilityState
                );

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
                (_options$speed = options.speed) !== null &&
                _options$speed !== void 0
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
                  var bulletItem = new src_Bullet(node, {
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

          _defineProperty(Danmaku_Danmaku, 'DEFAULT_ROW_HEIGHT', 40);

          _defineProperty(Danmaku_Danmaku, 'DEFAULT_SPEED', 100);

          _defineProperty(Danmaku_Danmaku, 'DEFAULT_OPACITY', 1);

          _defineProperty(
            Danmaku_Danmaku,
            'containerClassName',
            'danmaku-container'
          );

          /* harmony default export */ var src_Danmaku = Danmaku_Danmaku;
          // CONCATENATED MODULE: ./src/index.ts

          /***/
        },
        /******/
      ]
    );
  }
);
