import Sprite = PIXI.Sprite;
import {viewGame} from "../viewGame/viewGame";
import {App} from "../Const/App";
import {NamePlayer} from "./NamePlayer";
import {isNullOrUndefined} from "util";
/**
 * Created by Vu Tien Dai on 19/08/2017.
 */
export class Avatar extends Sprite {
    private sex = true;
    username: NamePlayer;
    avatar: Sprite;
    dir: string;
    name: string = "";
    gold: number;
    id:number;
    keyroom:Sprite;
    turn_icon:Sprite;
    constructor() {
        super();
    }

    show = (gold?: number, sex?: boolean, number ?: number, name?: string,id?:number) => {

        if (!isNullOrUndefined(number && name && sex && gold&&id)) {
            this.removeChildren();
            this.id = id;
            this.name = name;
            this.gold = gold;
            this.username = new NamePlayer(this.name + " : " + this.gold);
            this.username.position.set(152, 325);
            this.sex = sex;
            if (this.sex == true) {
                this.dir = "Picture/Icon/Male/"
            }
            else
                this.dir = "Picture/Icon/Female/"
            this.avatar = PIXI.Sprite.fromImage(App.AssetDir + this.dir + number + ".png");
            this.avatar.scale.set(0.2);
            this.keyroom = PIXI.Sprite.fromImage(App.AssetDir +"Picture/Icon/crown.png");
            this.keyroom.alpha=0;
            this.turn_icon =PIXI.Sprite.fromImage(App.AssetDir +"Picture/Icon/star_glow.png");
            this.turn_icon.position.set(230,300);
            this.turn_icon.scale.set(0.2);
            this.turn_icon.alpha=0;
            this.addChild(this.username, this.avatar,this.keyroom,this.turn_icon);
        }
        else if (isNullOrUndefined(number && name && sex) && !isNullOrUndefined(gold) && this.children.length > 0) {
            this.gold = gold;
            this.username.setName(this.name + " : " + this.gold);
        }
        else {
            this.removeChildren();
        }
    }

    onClick: Function;
}