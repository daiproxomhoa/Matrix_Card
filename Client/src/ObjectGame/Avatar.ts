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
    name :string="";
    gold :number;

    constructor() {
        super();
    }

    show = (gold?:number,sex?:boolean,number ?: number, name?: string) => {

            if (!isNullOrUndefined(number && name && sex && gold)) {
                 this.removeChildren();
                this.name=name;
                this.gold=gold;
            this.username = new NamePlayer(this.name+" : "+this.gold);
            this.username.position.set(152, 325);
            this.sex = sex;
            if (this.sex == true) {
                this.dir = "Picture/Icon/Male/"
            }
            else
                this.dir = "Picture/Icon/Female/"
            this.avatar = PIXI.Sprite.fromImage(App.AssetDir + this.dir + number + ".png");
            this.avatar.scale.set(0.2);
            this.addChild(this.username, this.avatar);
        }
        else if(isNullOrUndefined(number && name && sex )&&!isNullOrUndefined(gold)&&this.children.length>0) {
                this.gold=gold;
                this.username.setName(this.name+" : "+this.gold);
        }
        else
            {
                this.removeChildren();
            }
    }
    onClick: Function;
}