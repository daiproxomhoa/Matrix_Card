"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../Utils.ts"/>
var Sprite = PIXI.Sprite;
const Utils_1 = require("../Utils");
const App_1 = require("../Const/App");
/**
 * Created by Vu Tien Dai on 16/08/2017.
 */
class Wait extends Sprite {
    constructor() {
        super();
        this.run = () => {
            this.visible = true;
            if (!App_1.App.IsWeb) {
                this.loop = setInterval(() => {
                    setTimeout(() => {
                        this.removeChildAt(1);
                        this.wait = PIXI.Sprite.fromImage(App_1.App.AssetDir + 'Picture/wait1.png');
                        this.addChild(this.wait);
                        this.wait.x = 300;
                        this.wait.y = 6;
                    }, 750);
                    setTimeout(() => {
                        this.removeChildAt(1);
                        this.wait = PIXI.Sprite.fromImage(App_1.App.AssetDir + 'Picture/wait2.png');
                        this.addChild(this.wait);
                        this.wait.x = 300;
                        this.wait.y = 6;
                    }, 1500);
                    setTimeout(() => {
                        this.removeChildAt(1);
                        this.wait = PIXI.Sprite.fromImage(App_1.App.AssetDir + 'Picture/wait3.png');
                        this.addChild(this.wait);
                        this.wait.x = 300;
                        this.wait.y = 6;
                    }, 2250);
                }, 2250);
            }
            else {
                this.loop = setInterval(() => {
                    setTimeout(() => {
                        this.wait.text = "Đợi người chơi .";
                    }, 750);
                    setTimeout(() => {
                        this.wait.text = "Đợi người chơi . .";
                    }, 1500);
                    setTimeout(() => {
                        this.wait.text = "Đợi người chơi . . .";
                    }, 2250);
                }, 2250);
            }
        };
        this.stop = () => {
            this.visible = false;
            clearInterval(this.loop);
        };
        if (App_1.App.IsWeb) {
            this.wait = new PIXI.Text("Đợi người chơi .");
            this.wait.style = new PIXI.TextStyle({
                fontFamily: 'UTM French Vanilla',
                fontSize: 60,
                stroke: '#d33b00',
                strokeThickness: 2,
                fontWeight: 'bold',
                fill: '#ffc47d',
                align: "center",
                wordWrap: true,
                wordWrapWidth: 500
            });
        }
        else {
            this.wait = PIXI.Sprite.fromImage(App_1.App.AssetDir + 'Picture/wait1.png');
        }
        this.wait.x = 300;
        this.wait.y = 6;
        this.table = new PIXI.Sprite(Utils_1.Utils.WaitBack);
        this.table.width = 950;
        this.table.height = 80;
        this.table.alpha = 0.9;
        this.addChild(this.table, this.wait);
        this.run();
    }
}
exports.Wait = Wait;
//# sourceMappingURL=Wait.js.map