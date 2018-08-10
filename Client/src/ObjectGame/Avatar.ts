import Sprite = PIXI.Sprite;
import {viewGame} from "../viewGame/viewGame";
import {App} from "../Const/App";
import {NamePlayer} from "./NamePlayer";
import {isNullOrUndefined} from "util";
import Container = PIXI.Container;
import {clearTimeout} from "timers";
import {Card} from "./Card";
/**
 * Created by Vu Tien Dai on 19/08/2017.
 */
export class Avatar extends Container {
    private sex = true;
    username: NamePlayer;
    avatar: Sprite;
    dir: string;
    name: string = "";
    gold: number;
    id: number;
    keyroom: Sprite;
    turn_icon: Sprite;
    score: PIXI.Text;
    attack: Sprite;
    die: Sprite;
    yes: Sprite;
    no: Sprite;
    dec: Sprite;
    ready:Sprite;
    adnimate: Container;
    texture: Container;
    card: Card;

    constructor() {
        super();

    }

    show = (gold?: number, sex?: boolean, number ?: number, name?: string, id?: number,isReady?:boolean) => {

        if (!isNullOrUndefined(number && name && sex && gold && id)) {
            this.removeChildren();
            let rd = 0;
            if(isReady==true)
                rd =1;
            this.texture = new PIXI.Container();
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
            this.keyroom = PIXI.Sprite.fromImage(App.AssetDir + "Picture/Icon/crown.png");
            this.keyroom.alpha = 0;
            this.turn_icon = PIXI.Sprite.fromImage(App.AssetDir + "Picture/Icon/star_glow.png");
            this.turn_icon.position.set(230, 300);
            this.turn_icon.scale.set(0.2);
            this.turn_icon.alpha = 0;
            let style = new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 50,
                fontStyle: 'bold',
                fill: ['#fffaf5'],

            });
            this.score = new PIXI.Text("", style);
            this.score.position.set(265, 125);
            this.texture.addChild(this.username, this.avatar, this.keyroom, this.turn_icon, this.score);
            this.adnimate = new PIXI.Container()
            this.attack = PIXI.Sprite.fromImage(App.AssetDir + "Picture/Icon/Attack.png");
            this.die = PIXI.Sprite.fromImage(App.AssetDir + "Picture/Icon/die.png");
            this.attack.width = 150;
            this.attack.height = 150;
            this.die.width = 150;
            this.die.height = 150;
            this.attack.alpha = 0;
            this.die.alpha = 0;
            this.yes = PIXI.Sprite.fromImage(App.AssetDir + "Picture/Icon/yes.png");
            this.no = PIXI.Sprite.fromImage(App.AssetDir + "Picture/Icon/no.png");
            this.yes.width = 150;
            this.yes.height = 150;
            this.no.width = 150;
            this.no.height = 150;
            this.yes.alpha = 0;
            this.no.alpha = 0;
            this.dec = PIXI.Sprite.fromImage(App.AssetDir + "Picture/Icon/dectection.png");
            this.dec.alpha = 0;
            this.ready = PIXI.Sprite.fromImage(App.AssetDir + "Picture/Icon/ready.png");
            this.ready.alpha =rd;
            this.ready.position.set(-55, 130);
            this.adnimate.addChild(this.attack, this.die,this.yes, this.no,this.dec,this.ready)
            this.card = new Card();
            this.card.scale.set(0.5);
            this.card.alpha=0;
            this.card.position.set(35,180);
            this.adnimate.position.set(125, 125);
            this.addChild(this.texture, this.card, this.adnimate);
        }
        else if (isNullOrUndefined(number && name && sex) && !isNullOrUndefined(gold) && this.children.length > 0) {
            this.gold = gold;
            this.username.setName(this.name + " : " + this.gold);
        }
        else {
            this.removeChildren();
        }

    }
    setScore = (value) => {
        this.score.text = "" + value;

    }
    Attack = () => {
        this.dec.alpha = 0;
        this.yes.alpha = 0;
        this.yes.alpha = 0;
        this.no.alpha = 0
        this.die.alpha = 0;
        this.attack.alpha = 1;
        setTimeout(() => {
            let x = setInterval(() => {
                    if (this.attack.alpha > 0) {
                        this.attack.alpha = this.attack.alpha - 0.05
                    }
                    else {
                        clearInterval(x);
                    }
                }, 100
            );

        }, 5000)
    }
    Die = () => {
        this.dec.alpha = 0;
        this.die.alpha = 0;
        this.yes.alpha = 0;
        this.no.alpha = 0
        this.attack.alpha = 0;
        this.die.alpha = 1;
        setTimeout(() => {
            let x = setInterval(() => {
                    if (this.die.alpha > 0) {
                        this.die.alpha = this.die.alpha - 0.05
                    }
                    else {
                        clearInterval(x);
                    }
                }, 100
            );

        }, 5000)
    }
    Yes = () => {
        this.dec.alpha = 0;
        this.yes.alpha = 0;
        this.die.alpha = 0;
        this.attack.alpha = 0;
        this.no.alpha = 0;
        this.yes.alpha = 1;
        setTimeout(() => {
            let x = setInterval(() => {
                    if (this.yes.alpha > 0) {
                        this.yes.alpha = this.yes.alpha - 0.05
                    }
                    else {
                        clearInterval(x);
                    }
                }, 100
            );

        }, 5000)
    }
    No = () => {
        this.dec.alpha = 0;
        this.no.alpha = 0;
        this.die.alpha = 0;
        this.attack.alpha = 0;
        this.yes.alpha = 0;
        this.no.alpha = 1;
        setTimeout(() => {
            let x = setInterval(() => {
                if (this.no.alpha > 0) {
                    this.no.alpha = this.no.alpha - 0.05
                }
                else {
                    clearInterval(x);
                }
            }, 100);
        }, 5000)
    }
    Dec = () => {
        this.dec.alpha = 1;
        this.no.alpha = 0;
        this.die.alpha = 0;
        this.attack.alpha = 0;
        this.yes.alpha = 0;
        this.no.alpha = 0;
        setTimeout(() => {
            let x = setInterval(() => {
                if (this.dec.alpha > 0) {
                    this.dec.alpha = this.dec.alpha - 0.05
                }
                else {
                    clearInterval(x);
                }
            }, 100);
        }, 5000)
    }
    showCard=(value,bl?)=>{
        this.card.setValue(value);
        this.addChild(this.card);
        console.log(this.card.str);
        if(!bl) {
            setTimeout(() => {
                this.card.setValue();
            }, 50000);
        }
    }
    Ready=()=>{
        this.ready.alpha=1;
    }
    Unready=()=>{
        this.ready.alpha=0;
    }
    onClick: Function;
}