"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sprite = PIXI.Sprite;
/**
 * Created by Vu Tien Dai on 16/08/2017.
 */
class NamePlayer extends Sprite {
    constructor(player) {
        super();
        this.style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 30,
            fontStyle: 'bold',
            fill: ['#cfffac'],
        });
        this.setName = (name_player) => {
            this.name_player.text = name_player + "";
        };
        this.name_player = new PIXI.Text("" + player, this.style);
        this.name_player.anchor.set(0.5);
        this.addChild(this.name_player);
    }
}
exports.NamePlayer = NamePlayer;
//# sourceMappingURL=NamePlayer.js.map