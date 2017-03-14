var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var engine;
(function (engine) {
    var Event = (function () {
        function Event(type, bubbles, cancelable) {
            this.bubbles = false;
            this.cancelable = false;
            this.type = type;
            if (bubbles != null)
                this.bubbles = bubbles;
            if (cancelable != null)
                this.cancelable = cancelable;
        }
        return Event;
    }());
    Event.ENTER_FRAME = "enterframe";
    engine.Event = Event;
    var MyTouchEvent = (function (_super) {
        __extends(MyTouchEvent, _super);
        function MyTouchEvent(x, y, type) {
            var _this = _super.call(this, type) || this;
            _this.x = x;
            _this.y = y;
            return _this;
            // this.type = type;
        }
        return MyTouchEvent;
    }(Event));
    // type: string;
    MyTouchEvent.TouchDown = "touchdown";
    MyTouchEvent.TouchUp = "touchup";
    MyTouchEvent.TouchClick = "touchclick";
    engine.MyTouchEvent = MyTouchEvent;
    var EventListen = (function () {
        function EventListen(type, func, isCapture) {
            this.isCapture = false;
            this.type = type;
            this.func = func;
            if (isCapture != null)
                this.isCapture = isCapture;
        }
        return EventListen;
    }());
    engine.EventListen = EventListen;
})(engine || (engine = {}));
var engine;
(function (engine) {
    var Ticker = (function () {
        function Ticker() {
            this.ticker_Listeners = [];
        }
        Object.defineProperty(Ticker, "Instance", {
            get: function () {
                if (Ticker._instance == null) {
                    Ticker._instance = new Ticker();
                }
                return Ticker._instance;
            },
            enumerable: true,
            configurable: true
        });
        Ticker.prototype.register = function (listener) {
            if (this.ticker_Listeners.indexOf(listener) == -1)
                this.ticker_Listeners.push(listener);
        };
        Ticker.prototype.unregister = function (listener) {
            var index = this.ticker_Listeners.indexOf(listener);
            if (index == -1)
                console.error("Do not find listener which you want to remove in Ticker");
            else
                this.ticker_Listeners.splice(index);
        };
        Ticker.prototype.clear = function () {
            this.ticker_Listeners = [];
        };
        Ticker.prototype.notify = function (deltaTime) {
            this.ticker_Listeners.forEach(function (listener) {
                listener(deltaTime);
            });
        };
        return Ticker;
    }());
    engine.Ticker = Ticker;
})(engine || (engine = {}));
var math;
(function (math) {
    var Point = (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        return Point;
    }());
    math.Point = Point;
    var Rectangle = (function () {
        function Rectangle() {
            this.x = 0;
            this.y = 0;
            this.width = 1;
            this.height = 1;
        }
        Rectangle.prototype.isPointInRectangle = function (point) {
            if (point.x >= this.x &&
                point.x <= (this.x + this.width) &&
                point.y >= this.y &&
                point.y <= (this.y + this.height)) {
                return true;
            }
            else {
                return false;
            }
        };
        return Rectangle;
    }());
    math.Rectangle = Rectangle;
    function pointAppendMatrix(point, m) {
        var x = m.a * point.x + m.c * point.y + m.tx;
        var y = m.b * point.x + m.d * point.y + m.ty;
        return new Point(x, y);
    }
    math.pointAppendMatrix = pointAppendMatrix;
    /**
     * 使用伴随矩阵法求逆矩阵
     * http://wenku.baidu.com/view/b0a9fed8ce2f0066f53322a9
     */
    function invertMatrix(m) {
        var a = m.a;
        var b = m.b;
        var c = m.c;
        var d = m.d;
        var tx = m.tx;
        var ty = m.ty;
        var determinant = a * d - b * c;
        var result = new Matrix(1, 0, 0, 1, 0, 0);
        if (determinant == 0) {
            throw new Error("no invert");
        }
        determinant = 1 / determinant;
        var k = result.a = d * determinant;
        b = result.b = -b * determinant;
        c = result.c = -c * determinant;
        d = result.d = a * determinant;
        result.tx = -(k * tx + c * ty);
        result.ty = -(b * tx + d * ty);
        return result;
    }
    math.invertMatrix = invertMatrix;
    function matrixAppendMatrix(m1, m2) {
        var result = new Matrix();
        result.a = m1.a * m2.a + m1.b * m2.c;
        result.b = m1.a * m2.b + m1.b * m2.d;
        result.c = m2.a * m1.c + m2.c * m1.d;
        result.d = m2.b * m1.c + m1.d * m2.d;
        result.tx = m2.a * m1.tx + m2.c * m1.ty + m2.tx;
        result.ty = m2.b * m1.tx + m2.d * m1.ty + m2.ty;
        return result;
    }
    math.matrixAppendMatrix = matrixAppendMatrix;
    var PI = Math.PI;
    var HalfPI = PI / 2;
    var PacPI = PI + HalfPI;
    var TwoPI = PI * 2;
    var DEG_TO_RAD = Math.PI / 180;
    var Matrix = (function () {
        function Matrix(a, b, c, d, tx, ty) {
            if (a === void 0) { a = 1; }
            if (b === void 0) { b = 0; }
            if (c === void 0) { c = 0; }
            if (d === void 0) { d = 1; }
            if (tx === void 0) { tx = 0; }
            if (ty === void 0) { ty = 0; }
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
        }
        Matrix.prototype.toString = function () {
            return "(a=" + this.a + ", b=" + this.b + ", c=" + this.c + ", d=" + this.d + ", tx=" + this.tx + ", ty=" + this.ty + ")";
        };
        Matrix.prototype.updateFromDisplayObject = function (x, y, scaleX, scaleY, rotation) {
            this.tx = x;
            this.ty = y;
            var skewX, skewY;
            skewX = skewY = rotation / 180 * Math.PI;
            var u = Math.cos(skewX);
            var v = Math.sin(skewX);
            this.a = Math.cos(skewY) * scaleX;
            this.b = Math.sin(skewY) * scaleX;
            this.c = -v * scaleY;
            this.d = u * scaleY;
        };
        return Matrix;
    }());
    math.Matrix = Matrix;
})(math || (math = {}));
var engine;
(function (engine) {
    var DisplayObject = (function () {
        function DisplayObject() {
            this.x = 0;
            this.y = 0;
            this.scaleX = 1;
            this.scaleY = 1;
            this.rotation = 0; //360度角度值
            this.alpha = 1; //绝对透明度
            this.width = 0;
            this.height = 0;
            this.parent = null;
            this.localAlpha = 1; //控制渲染的透明度
            this.matrix = new math.Matrix();
            this.localMatrix = new math.Matrix();
            this.touchEnable = false;
            this.listenerList = [];
        }
        DisplayObject.prototype.draw = function (canvas) {
            //每次画更新修改信息
            this.matrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
            if (this.parent) {
                this.localAlpha = this.alpha * this.parent.localAlpha;
                this.localMatrix = math.matrixAppendMatrix(this.matrix, this.parent.localMatrix);
            }
            else {
                this.localAlpha = this.alpha;
                this.localMatrix = this.matrix;
            }
            this.updateMatrix(canvas);
            this.render(canvas);
            // console.log("localAlpha        "+this.localAlpha);
            // console.log("globalAlpha       "+this.globalAlpha);
            this.resetMatrix(canvas);
        };
        DisplayObject.prototype.updateMatrix = function (canvas) {
            canvas.globalAlpha = this.localAlpha;
            canvas.setTransform(this.localMatrix.a, this.localMatrix.b, this.localMatrix.c, this.localMatrix.d, this.localMatrix.tx, this.localMatrix.ty);
            //canvas.translate(0,0);
            // console.log(this.localMatrix.toString());
        };
        DisplayObject.prototype.resetMatrix = function (canvas) {
            canvas.globalAlpha = 1;
            canvas.setTransform(1, 0, 0, 0, 1, 0);
        };
        //picture
        //  |---containner
        //          |-----stage
        DisplayObject.prototype.$dispatchPropagationEvent = function (Chain, touchEvent, isCapture) {
            if (this.touchEnable == true) {
                if (isCapture) {
                    var captureDisplayObjects = Chain;
                    captureDisplayObjects.reverse();
                    captureDisplayObjects.forEach(function (displayObject) {
                        displayObject.listenerList.forEach(function (listen) {
                            if (touchEvent.type == listen.type && listen.isCapture)
                                listen.func();
                        });
                    });
                    Chain.reverse(); //再次反转过来
                }
                var bubbleDisplayObjects = Chain;
                bubbleDisplayObjects.forEach(function (displayObject) {
                    displayObject.listenerList.forEach(function (listen) {
                        if (touchEvent.type == listen.type && !listen.isCapture)
                            listen.func();
                    });
                });
            }
        };
        DisplayObject.prototype.dispatchEvent = function (event) {
            this.listenerList.forEach(function (listen) {
                if (listen.type == event.type) {
                    listen.func();
                }
            });
        };
        DisplayObject.prototype.addEventListener = function (type, func, IsCatch) {
            // if(type==MyTouchEvent.ENTER_FRAME){
            //     Disobject_Frames.Instance.register(func);
            // }
            var EventListener = new engine.EventListen(type, func, IsCatch);
            if (this.listenerList.indexOf(EventListener) == -1)
                this.listenerList.push(EventListener);
        };
        DisplayObject.prototype.removeEventListener = function (type, func, IsCatch) {
            // if(type==MyTouchEvent.ENTER_FRAME){
            //     Disobject_Frames.Instance.register(func);
            // }
            var EventListener = new engine.EventListen(type, func, IsCatch);
            var index = this.listenerList.indexOf(EventListener);
            if (index == -1)
                console.error("Cannot find that you want to remove event");
            this.listenerList.splice(index);
        };
        return DisplayObject;
    }());
    engine.DisplayObject = DisplayObject;
})(engine || (engine = {}));
var engine;
(function (engine) {
    var DisplayObjectContainer = (function (_super) {
        __extends(DisplayObjectContainer, _super);
        function DisplayObjectContainer() {
            var _this = _super.call(this) || this;
            _this.DisplayObjects = [];
            return _this;
        }
        DisplayObjectContainer.prototype.addChild = function (child) {
            if (this.DisplayObjects.indexOf(child) == -1) {
                this.DisplayObjects.push(child);
                child.parent = this;
            }
        };
        DisplayObjectContainer.prototype.removeChild = function (child) {
            var index = this.DisplayObjects.indexOf(child);
            if (index == -1)
                console.error("Do not find DisplayObject that you want to remove");
            else {
                this.DisplayObjects.splice(index);
            }
        };
        DisplayObjectContainer.prototype.removeAllChild = function () {
            this.DisplayObjects = [];
        };
        DisplayObjectContainer.prototype.render = function (canvas) {
            for (var _i = 0, _a = this.DisplayObjects; _i < _a.length; _i++) {
                var child = _a[_i];
                child.draw(canvas);
            }
        };
        DisplayObjectContainer.prototype.hitTest = function (x, y) {
            var resultChain = [];
            for (var index = this.DisplayObjects.length - 1; index > -1; index--) {
                var child = this.DisplayObjects[index];
                if (child.touchEnable) {
                    var result = child.hitTest(x, y);
                    if (result != null)
                        resultChain.push(result);
                }
            }
            if (resultChain != null)
                resultChain.push(this);
            return resultChain;
        };
        DisplayObjectContainer.prototype.dispatchEvent = function (event) {
            this.DisplayObjects.forEach(function (child) {
                child.dispatchEvent(event);
            });
            this.listenerList.forEach(function (listen) {
                if (listen.type == event.type) {
                    listen.func();
                }
            });
        };
        return DisplayObjectContainer;
    }(engine.DisplayObject));
    engine.DisplayObjectContainer = DisplayObjectContainer;
})(engine || (engine = {}));
var engine;
(function (engine) {
    var Stage = (function (_super) {
        __extends(Stage, _super);
        function Stage(context2d) {
            var _this = _super.call(this) || this;
            _this.DisplayObjects = [];
            _this.Isinstance = false;
            if (Stage.instance != null)
                console.error("Stage is INSTANCE");
            Stage.context2d = context2d;
            Stage.instance = _this;
            return _this;
        }
        Stage.getInstance = function () {
            if (Stage.instance == null) {
                Stage.instance = new Stage(Stage.context2d);
            }
            return Stage.instance;
        };
        return Stage;
    }(engine.DisplayObjectContainer));
    engine.Stage = Stage;
})(engine || (engine = {}));
var engine;
(function (engine) {
    var Bitmap = (function (_super) {
        __extends(Bitmap, _super);
        function Bitmap() {
            var _this = _super.call(this) || this;
            _this.img = null;
            _this.isLoaded = false;
            _this._src = "";
            _this.img = document.createElement("img");
            return _this;
        }
        Object.defineProperty(Bitmap.prototype, "src", {
            set: function (value) {
                this._src = value;
                this.isLoaded = false;
                /**image没有读取，不起作用*/
                // this.width = this.img.naturalWidth;
                // this.height = this.img.naturalHeight;
            },
            enumerable: true,
            configurable: true
        });
        Bitmap.prototype.render = function (canvas) {
            var _this = this;
            if (this.isLoaded) {
                canvas.drawImage(this.img, 0, 0, this.img.width, this.img.height);
                // canvas.drawImage(this.img, 0, 0, this.width, this.height);
            }
            else {
                this.img.src = this._src;
                if (this.width == 0)
                    this.width = this.img.naturalWidth;
                if (this.height == 0)
                    this.height = this.img.naturalHeight;
                this.img.onload = function () {
                    // canvas.drawImage(this.img, 0, 0, this.img.width, this.img.height);
                    // canvas.drawImage(this.img, this.x, this.y, this.img.width, this.img.height);
                    _this.isLoaded = true;
                };
            }
            // console.log("Bitmap:" + this.width);
            // console.log(this.img.naturalWidth);
            // console.log(this.scaleX);
        };
        Bitmap.prototype.hitTest = function (x, y) {
            var invertLocalMatrix = math.invertMatrix(this.localMatrix);
            var point = new math.Point(x, y);
            var pointInLocalMatrix = math.pointAppendMatrix(point, invertLocalMatrix);
            var rect = new math.Rectangle();
            rect.x = 0;
            rect.y = 0;
            // rect.width = this.img.width;
            // rect.height = this.img.height;
            rect.width = this.width;
            rect.height = this.height;
            if (rect.isPointInRectangle(pointInLocalMatrix))
                return this;
            else
                return null;
        };
        return Bitmap;
    }(engine.DisplayObject));
    engine.Bitmap = Bitmap;
})(engine || (engine = {}));
var engine;
(function (engine) {
    var TextField = (function (_super) {
        __extends(TextField, _super);
        function TextField() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.text = "";
            _this.color = "";
            _this.fontSize = 10;
            _this.fontName = "";
            return _this;
        }
        TextField.prototype.render = function (canvas) {
            canvas.fillStyle = this.color;
            canvas.globalAlpha = this.localAlpha;
            // console.log("textfield"+this.alpha);
            canvas.font = this.fontSize.toString() + "px " + this.fontName.toString();
            canvas.fillText(this.text, this.x, this.y + this.fontSize);
        };
        TextField.prototype.hitTest = function (x, y) {
            var rect = new math.Rectangle();
            rect.x = rect.y = 0;
            rect.width = this.text.length * 20;
            rect.height = this.fontSize;
            var point = new math.Point(x, y);
            var invertLocalMatrix = math.invertMatrix(this.localMatrix);
            var pointInLocalMatrix = math.pointAppendMatrix(point, invertLocalMatrix);
            if (rect.isPointInRectangle(pointInLocalMatrix))
                return this;
            else
                return null;
        };
        return TextField;
    }(engine.DisplayObject));
    engine.TextField = TextField;
})(engine || (engine = {}));
var engine;
(function (engine) {
    function run(canvas) {
        // var canvas = document.getElementById("context") as HTMLCanvasElement;
        var context2d = canvas.getContext("2d");
        var stage = new engine.Stage(context2d);
        var lastNow = Date.now();
        var enterFrame = function (callback) {
            var now = Date.now();
            var deltaTime = now - lastNow;
            eventDispose();
            engine.Ticker.Instance.notify(deltaTime);
            context2d.clearRect(0, 0, canvas.width, canvas.height);
            context2d.save();
            stage.draw(context2d);
            context2d.restore();
            lastNow = now;
            window.requestAnimationFrame(enterFrame);
            ;
        };
        window.requestAnimationFrame(enterFrame);
        //事件处理机制
        function eventDispose() {
            var event = new engine.Event(engine.Event.ENTER_FRAME);
            stage.dispatchEvent(event);
        }
        //MyTouchEvent的相应机制
        window.onmousedown = function (down) {
            var downX = down.x - 3;
            var downY = down.y - 3;
            var touchEvent = new engine.MyTouchEvent(downX, downY, engine.MyTouchEvent.TouchDown);
            var downChain = stage.hitTest(downX, downY);
            stage.$dispatchPropagationEvent(downChain, touchEvent, true);
            // stage.dispatchEvent(downChain, touchEvent);
            window.onmouseup = function (up) {
                var upX = down.x - 3;
                var upY = down.y - 3;
                var upChain = stage.hitTest(upX, upY);
                if (downChain[0] == upChain[0]) {
                    var touchEvent = new engine.MyTouchEvent(downX, downY, engine.MyTouchEvent.TouchClick);
                    var ChickChain = stage.hitTest(upX, upY);
                    stage.$dispatchPropagationEvent(ChickChain, touchEvent, true);
                    // stage.dispatchEvent(ChickChain, touchEvent);
                }
                stage.$dispatchPropagationEvent(upChain, touchEvent, true);
                // stage.dispatchEvent(upChain, touchEvent);
            };
        };
        return stage;
    }
    engine.run = run;
})(engine || (engine = {}));
//# sourceMappingURL=engine.js.map