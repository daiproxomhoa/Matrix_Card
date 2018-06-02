///<reference path="../Utils.ts"/>
import Sprite = PIXI.Sprite;
import {Utils} from "../Utils";
import {App} from "../Const/App";
/**
 * Created by Vu Tien Dai on 16/08/2017.
 */
export class Wait extends Sprite {
    private wait;
    private table;
    private loop;

    constructor() {
        super();
        if (App.IsWeb) {
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
        } else {
            this.wait = PIXI.Sprite.fromImage(App.AssetDir + 'Picture/wait1.png');
        }
        this.wait.x = 300;
        this.wait.y = 6;
        this.table = new PIXI.Sprite(Utils.WaitBack);
        this.table.width = 950;
        this.table.height = 80;
        this.table.alpha = 0.9;
        this.addChild(this.table, this.wait);
        this.run();
    }

    run = () => {
        this.visible = true;
        if (!App.IsWeb) {
            this.loop = setInterval(() => {
                setTimeout(() => {
                    this.removeChildAt(1);
                    this.wait = PIXI.Sprite.fromImage(App.AssetDir + 'Picture/wait1.png')
                    this.addChild(this.wait);
                    this.wait.x = 300;
                    this.wait.y = 6;
                }, 750)
                setTimeout(() => {
                    this.removeChildAt(1);
                    this.wait = PIXI.Sprite.fromImage(App.AssetDir + 'Picture/wait2.png')
                    this.addChild(this.wait);
                    this.wait.x = 300;
                    this.wait.y = 6;
                }, 1500)
                setTimeout(() => {
                    this.removeChildAt(1);
                    this.wait = PIXI.Sprite.fromImage(App.AssetDir + 'Picture/wait3.png')
                    this.addChild(this.wait);
                    this.wait.x = 300;
                    this.wait.y = 6;
                }, 2250)
            }, 2250);
        }
        else {
            this.loop = setInterval(() => {
                setTimeout(() => {
                    this.wait.text = "Đợi người chơi ."
                }, 750)
                setTimeout(() => {
                    this.wait.text = "Đợi người chơi . ."
                }, 1500)
                setTimeout(() => {
                    this.wait.text = "Đợi người chơi . . ."
                }, 2250)

            }, 2250);
        }
    }
    stop = () => {
        this.visible = false;
        clearInterval(this.loop);
    }

}