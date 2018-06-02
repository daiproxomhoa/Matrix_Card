"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sprite = PIXI.Sprite;
const App_1 = require("../Const/App");
const NamePlayer_1 = require("./NamePlayer");
const util_1 = require("util");
/**
 * Created by Vu Tien Dai on 19/08/2017.
 */
class Avatar extends Sprite {
    constructor() {
        super();
        this.sex = true;
        this.name = "";
        this.show = (gold, sex, number, name) => {
            if (!util_1.isNullOrUndefined(number && name && sex && gold)) {
                this.removeChildren();
                this.name = name;
                this.gold = gold;
                this.username = new NamePlayer_1.NamePlayer(this.name + " : " + this.gold);
                this.username.position.set(152, 325);
                this.sex = sex;
                if (this.sex == true) {
                    this.dir = "Picture/Icon/Male/";
                }
                else
                    this.dir = "Picture/Icon/Female/";
                this.avatar = PIXI.Sprite.fromImage(App_1.App.AssetDir + this.dir + number + ".png");
                this.avatar.scale.set(0.2);
                this.addChild(this.username, this.avatar);
            }
            else if (util_1.isNullOrUndefined(number && name && sex) && !util_1.isNullOrUndefined(gold) && this.children.length > 0) {
                this.gold = gold;
                this.username.setName(this.name + " : " + this.gold);
            }
            else {
                this.removeChildren();
            }
        };
    }
}
exports.Avatar = Avatar;
//# sourceMappingURL=Avatar.js.map