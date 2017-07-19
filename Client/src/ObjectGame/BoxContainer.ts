import Container = PIXI.Container;
import {runInThisContext} from "vm";
import {Utils} from "../Utils";
import {Player} from "./Player";
/**
 * Created by Vu Tien Dai on 22/06/2017.
 */
export class Box extends Container {

    public text;
    constructor(number,type?) {
        super();
        this.createBox(type);
        this.createNumber(this,number);
        if(type==1)
            this.text.position.set(20,20);
        if(type==0)
            this.text.position.set(20,80);
        if(type==6)
            this.text.position.set(63,50);
    }

    createBox(type ?) {
        let spirte;
        if (type == 0) {
            spirte = new PIXI.Sprite(Utils.Round1);
        }
        else if (type == 6) {
            spirte = new PIXI.Sprite(Utils.Round2);
        }
        else if (type==1) {
            spirte = new PIXI.Sprite(Utils.Home);
        }
        else {
            spirte = new PIXI.Sprite(Utils.Square);
        }
        spirte.scale.set(0.5);
        this.addChild(spirte);

    }

    createNumber(box: Container,number ) {
        var style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 20,
            fontStyle: 'italic',
            fill: ['#BE3A11', '#FF902E'], // gradient
            stroke: '#000000',
            strokeThickness: 2,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 2,
            wordWrap: true,
            wordWrapWidth: 440
        });
        this.text = new PIXI.Text(''+number, style)
        this.text.x = 55;
        this.text.y = 50;
        box.addChild(this.text);
    }

    public  setText(text){
        var style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 20,
            fontStyle: 'italic',
            fill: ['#BE3A11', '#FF902E'], // gradient
            stroke: '#000000',
            strokeThickness: 2,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 2,
            wordWrap: true,
            wordWrapWidth: 440
        });
        this.text.text=''+text ;

    }
}