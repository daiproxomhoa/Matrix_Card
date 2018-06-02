import Container = PIXI.Container;
import Sprite = PIXI.Sprite;
/**
 * Created by Vu Tien Dai on 16/08/2017.
 */
export class NamePlayer extends Sprite {
    style  = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 30,
        fontStyle: 'bold',
        fill: ['#cfffac'],

    });
    private name_player;
    constructor(player: string) {
        super();
        this.name_player = new PIXI.Text("" + player ,this.style);
        this.name_player.anchor.set(0.5);
        this.addChild(this.name_player);
    }

    setName = (name_player: string) => {
            this.name_player.text = name_player+"" ;
    }
}