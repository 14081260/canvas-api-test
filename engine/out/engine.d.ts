declare namespace engine {
    class Event {
        type: string;
        target: any;
        bubbles: boolean;
        cancelable: boolean;
        static ENTER_FRAME: string;
        static DATE: string;
        constructor(type: string, bubbles?: boolean, cancelable?: boolean);
    }
    class MyTouchEvent extends Event {
        x: number;
        y: number;
        static TouchDown: string;
        static TouchUp: string;
        static TouchClick: string;
        constructor(x: number, y: number, type: string);
    }
    class EventListen {
        type: string;
        func: Function;
        isCapture: boolean;
        constructor(type: string, func: Function, isCapture?: boolean);
    }
}
declare namespace engine {
    type ticker_Listener_Type = (deltaTime: number) => void;
    class Ticker {
        private static _instance;
        static readonly Instance: Ticker;
        ticker_Listeners: ticker_Listener_Type[];
        register(listener: ticker_Listener_Type): void;
        unregister(listener: ticker_Listener_Type): void;
        clear(): void;
        notify(deltaTime: number): void;
    }
}
declare namespace math {
    class Point {
        x: number;
        y: number;
        constructor(x: number, y: number);
    }
    class Rectangle {
        x: number;
        y: number;
        width: number;
        height: number;
        isPointInRectangle(point: Point): boolean;
    }
    function pointAppendMatrix(point: Point, m: Matrix): Point;
    /**
     * 使用伴随矩阵法求逆矩阵
     * http://wenku.baidu.com/view/b0a9fed8ce2f0066f53322a9
     */
    function invertMatrix(m: Matrix): Matrix;
    function matrixAppendMatrix(m1: Matrix, m2: Matrix): Matrix;
    class Matrix {
        constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);
        a: number;
        b: number;
        c: number;
        d: number;
        tx: number;
        ty: number;
        toString(): string;
        updateFromDisplayObject(x: number, y: number, scaleX: number, scaleY: number, rotation: number): void;
    }
}
declare namespace engine {
    interface Drawable {
        draw(canvas: CanvasRenderingContext2D): any;
    }
    interface HitTestable {
        hitTest(x: number, y: number): any;
    }
    abstract class DisplayObject implements Drawable, HitTestable {
        x: number;
        y: number;
        scaleX: number;
        scaleY: number;
        rotation: number;
        alpha: number;
        width: number;
        height: number;
        parent: DisplayObject;
        protected localAlpha: number;
        matrix: math.Matrix;
        protected localMatrix: math.Matrix;
        constructor();
        draw(canvas: CanvasRenderingContext2D): void;
        updateMatrix(canvas: CanvasRenderingContext2D): void;
        resetMatrix(canvas: CanvasRenderingContext2D): void;
        abstract render(canvas: CanvasRenderingContext2D): any;
        abstract hitTest(x: number, y: number): any;
        touchEnable: boolean;
        $dispatchPropagationEvent(Chain: DisplayObject[], touchEvent: MyTouchEvent, isCapture?: boolean): void;
        dispatchEvent(event: Event): void;
        listenerList: EventListen[];
        addEventListener(type: string, func: Function, IsCatch?: boolean): void;
        removeEventListener(type: string, func: Function, IsCatch?: boolean): void;
    }
}
declare namespace engine {
    class DisplayObjectContainer extends DisplayObject {
        DisplayObjects: DisplayObject[];
        constructor();
        addChild(child: DisplayObject): void;
        removeChild(child: DisplayObject): void;
        removeAllChild(): void;
        render(canvas: CanvasRenderingContext2D): void;
        hitTest(x: number, y: number): DisplayObject[];
        dispatchEvent(event: Event): void;
    }
}
declare namespace engine {
    class Stage extends DisplayObjectContainer {
        DisplayObjects: DisplayObject[];
        private static instance;
        static context2d: CanvasRenderingContext2D;
        private Isinstance;
        constructor(context2d: CanvasRenderingContext2D);
        static getInstance(): Stage;
    }
}
declare namespace engine {
    class Bitmap extends DisplayObject {
        img: HTMLImageElement;
        private isLoaded;
        constructor();
        private _src;
        src: string;
        render(canvas: CanvasRenderingContext2D): void;
        hitTest(x: number, y: number): this;
    }
}
declare namespace engine {
    class TextField extends DisplayObject {
        text: string;
        color: string;
        fontSize: number;
        fontName: string;
        render(canvas: CanvasRenderingContext2D): void;
        hitTest(x: number, y: number): this;
    }
}
declare namespace engine {
    function run(canvas: HTMLCanvasElement): Stage;
}
