"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Avatar_1 = require("./Avatar");
/**
 * Created by Vu Tien Dai on 20/08/2017.
 */
class AvataMain extends Avatar_1.Avatar {
    constructor() {
        super();
        this.process = () => {
            this.scale.set(1);
        };
        this.on("pointerdown", () => {
            this.scale.set(1.05);
        }).on("pointerup", this.process);
    }
}
exports.AvataMain = AvataMain;
//# sourceMappingURL=AvatarMain.js.map