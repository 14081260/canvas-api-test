namespace engine {
    export type Disobject_Frames_Listener_Type = (deltaTime: number) => void;
    export class Disobject_Frames {
        private static _instance: Disobject_Frames;
        static get Instance() {
            if (Disobject_Frames._instance == null) {
                Disobject_Frames._instance = new Disobject_Frames();
            }
            return Disobject_Frames._instance;
        }

        Disobject_Frames_Listeners: Disobject_Frames_Listener_Type[] = []

        register(listener: Disobject_Frames_Listener_Type) {
            if (this.Disobject_Frames_Listeners.indexOf(listener) == -1)
                this.Disobject_Frames_Listeners.push(listener);
        }
        unregister(listener: Disobject_Frames_Listener_Type) {
            var index = this.Disobject_Frames_Listeners.indexOf(listener);
            if (index == -1)
                console.error("Do not find listener which you want to remove in Ticker");
            else
                this.Disobject_Frames_Listeners.splice(index);
        }
        clear() {
            this.Disobject_Frames_Listeners = [];
        }
        notify(deltaTime: number) {
            this.Disobject_Frames_Listeners.forEach(listener => {
                listener(deltaTime);
            });
        }
    }
}