"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../Utils.ts"/>
const Utils_1 = require("../Utils");
var Container = PIXI.Container;
/**
 * Created by Vu Tien Dai on 25/07/2017.
 */
class clock extends Container {
    constructor(player) {
        super();
        this.timedisplay = 3;
        this.timecount = 0;
        this.style = new PIXI.TextStyle({
            fontFamily: 'Cooper Black',
            fontSize: 90,
            fontStyle: 'italic',
            fill: ['#8F755C', '#8F755C'],
            stroke: '#000000',
            strokeThickness: 2
        });
        this.run = () => {
            this.countdown = setInterval(() => {
                if (this.timedisplay - this.timecount > -1) {
                    this.setTime(this.timedisplay - this.timecount);
                    this.timecount++;
                }
                else {
                    // if(viewGame.turn==viewGame.game_turn)
                    this.player.emit("End turn");
                    clearTimeout(this.countdown);
                }
            }, 1000);
        };
        this.restart = () => {
            clearTimeout(this.countdown);
            this.timecount = 0;
            this.run();
        };
        this.stop = () => {
            clearTimeout(this.countdown);
        };
        this.player = player;
        let watch = new PIXI.Sprite(Utils_1.Utils.Clock);
        this.time = new PIXI.Text("" + this.timedisplay + " ", this.style);
        this.time.position.set(70, 100);
        this.addChild(this.time, watch);
        this.scale.set(0.7);
    }
    setTime(number) {
        this._number = number;
        if (number > 9)
            this.time.text = "" + number + " ";
        else
            this.time.text = "0" + number + " ";
    }
    getTime() {
        return this.time;
    }
    setTimeDisplay(value) {
        this.timedisplay = value;
    }
}
exports.clock = clock;
//# sourceMappingURL=Clock.js.map