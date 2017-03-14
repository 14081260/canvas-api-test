// enum EventType {
//     TouchDown,
//     TouchUp,
//     TouchMove,
//     TouchClick
// }

// class EventListenerService {
//     private static _instance: EventListenerService;
//     EventListenerlist: DisplayObject[] = [];

//     static get Instance() {
//         if (EventListenerService._instance == null) {
//             EventListenerService._instance = new EventListenerService();
//         }
//         return this._instance;
//     }
//     addListener(displayobject: DisplayObject) {
//         if (this.EventListenerlist.indexOf(displayobject) == -1)
//             this.EventListenerlist.push(displayobject);
//     }
//     removeListener(displayobject: DisplayObject) {
//         var index = this.EventListenerlist.indexOf(displayobject)
//         if (index == -1)
//             console.error("Do not find displayobject that you want to remove");
//         else {
//             this.EventListenerlist.splice(index);
//         }
//     }
//     removeAllListener() {
//         this.EventListenerlist = [];
//     }


//     static currentType: EventType;
//     static currentTarget: DisplayObject;
//     static stageX = 0;
//     static stageY = 0;
//     toDo() {
//         //console.log(this.EventListenerlist);
//         for (var i = 0; i <= this.EventListenerlist.length - 1; i++) {      //捕获
//             for (var listner of this.EventListenerlist[i].listenerList) {
//                 console.log("target+   " + listner.target)
//                 console.log("currentTarget+   " + EventListenerService.currentTarget)
//                 if (listner.target == EventListenerService.currentTarget) {
//                     if (listner.type == EventListenerService.currentType) {
//                         if (listner.isCatch) {
//                             listner.func();
//                             continue;
//                         }
//                     }
//                 }
//             }
//         }

//         for (var i = this.EventListenerlist.length - 1; i >= 0; i--) {      //冒泡
//             for (var listner of this.EventListenerlist[i].listenerList) {
//                 if (listner.target == EventListenerService.currentTarget) {
//                     if (listner.type == EventListenerService.currentType) {
//                         if (!listner.isCatch) {

//                             //console.log("2");
//                             listner.func();
//                             continue;
//                         }
//                     }
//                 }
//             }
//         }
//         // this.removeAllListener();
//     }
// }

// class MyTouchEvent {
//     type: EventType;
//     func: Function;
//     target: any;
//     isCatch: boolean = false;
//     constructor(type: EventType, func: Function, target: any, IsCatch?: boolean) {
//         this.type = type;
//         this.func = func;
//         this.target = target;
//         if (IsCatch != null)
//             this.isCatch = IsCatch;
//     }
// }