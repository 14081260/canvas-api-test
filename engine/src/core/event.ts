namespace engine {
     export class Event {
        type: string;
        target: any
        bubbles = false;
        cancelable = false;
        static ENTER_FRAME = "enterframe";
        public static DATE: string;
        constructor(type: string, bubbles?: boolean, cancelable?: boolean) {
            this.type = type;
            if (bubbles != null)
                this.bubbles = bubbles;
            if (cancelable != null)
                this.cancelable = cancelable;
        }

    }
    export class MyTouchEvent extends Event{//点击事件响应
        x: number;
        y: number;
        // type: string;

        static TouchDown = "touchdown";
        static TouchUp = "touchup";
        static TouchClick = "touchclick";
        constructor(x: number, y: number, type: string) {
            super(type);
            this.x = x;
            this.y = y;
            // this.type = type;
        }
    }
    export class EventListen {//DisplayObject中储存
        type: string;
        func: Function;
        isCapture: boolean = false;
        constructor(type: string, func: Function, isCapture?: boolean) {
            this.type = type;
            this.func = func;
            if (isCapture != null)
                this.isCapture = isCapture;
        }
    }

}