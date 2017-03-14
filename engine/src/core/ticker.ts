namespace engine {
    export type ticker_Listener_Type = (deltaTime: number) => void;
    export class Ticker {
        private static _instance: Ticker;
        static get Instance() {
            if (Ticker._instance == null) {
                Ticker._instance = new Ticker();
            }
            return Ticker._instance;
        }

        ticker_Listeners: ticker_Listener_Type[] = []

        register(listener: ticker_Listener_Type) {
            if (this.ticker_Listeners.indexOf(listener) == -1)
                this.ticker_Listeners.push(listener);
        }
        unregister(listener: ticker_Listener_Type) {
            var index = this.ticker_Listeners.indexOf(listener);
            if (index == -1)
                console.error("Do not find listener which you want to remove in Ticker");
            else
                this.ticker_Listeners.splice(index);
        }
        clear() {
            this.ticker_Listeners = [];
        }
        notify(deltaTime: number) {
            this.ticker_Listeners.forEach(listener => {
                listener(deltaTime);
            });
            
        }
    }
}