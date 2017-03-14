namespace engine {
    export class DisplayObjectContainer extends DisplayObject {
        DisplayObjects: DisplayObject[] = [];
        constructor() {
            super();
        }
        addChild(child: DisplayObject) {
            if (this.DisplayObjects.indexOf(child) == -1) {
                this.DisplayObjects.push(child);
                child.parent = this;
            }
        }
        removeChild(child: DisplayObject) {
            var index = this.DisplayObjects.indexOf(child)
            if (index == -1)
                console.error("Do not find DisplayObject that you want to remove");
            else {
                this.DisplayObjects.splice(index);
            }
        }
        removeAllChild() {
            this.DisplayObjects = [];
        }
        render(canvas: CanvasRenderingContext2D) {
            for (var child of this.DisplayObjects) {
                child.draw(canvas);
            }
        }
        hitTest(x: number, y: number) {
            var resultChain: DisplayObject[] = [];
            for (var index = this.DisplayObjects.length - 1; index > -1; index--) {
                let child = this.DisplayObjects[index];
                if (child.touchEnable) {
                    var result = child.hitTest(x, y);
                    if (result != null)
                        resultChain.push(result);
                }
            }
            if (resultChain != null)
                resultChain.push(this);
            return resultChain;
        }
        dispatchEvent(event: Event) {
            this.DisplayObjects.forEach(child => {
                child.dispatchEvent(event);
            });
            this.listenerList.forEach(listen => {
                if (listen.type == event.type) {
                    listen.func();
                }
            });
        }
    }
}