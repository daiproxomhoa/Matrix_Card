"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const viewGame_1 = require("../viewGame/viewGame");
const App_1 = require("../Const/App");
var Sprite = PIXI.Sprite;
const gsap = require("gsap");
const Button_1 = require("./Button");
var TweenMax = gsap.TweenMax;
var Back = gsap.Back;
/**
 * Created by Vu Tien Dai on 18/08/2017.
 */
class Setting extends Sprite {
    constructor() {
        super(PIXI.Texture.fromImage(App_1.App.AssetDir + "Picture/IU/panel.png"));
        this.show = () => {
            this.parent.setChildIndex(this, this.parent.children.length - 1);
            this.visible = true;
            // viewGame.Game.interactiveChildren = false;
            // viewGame.Hall.interactiveChildren = false;
            TweenMax.to(this, 0.5, {
                x: 580,
                y: 320,
                ease: Back.easeOut
            });
        };
        this.anchor.set(0.5);
        this.x = -500;
        this.y = -500;
        this.width = 500;
        this.height = 300;
        this.messageBox = new PIXI.Container();
        this.buttonBox = new PIXI.Container();
        this.addChild(this.messageBox, this.buttonBox);
        this.showManagesDialog();
    }
    showManagesDialog() {
        this.textTB = PIXI.Sprite.fromImage(App_1.App.AssetDir + "Picture/IU/caidat.png");
        this.textTB.anchor.set(0.5);
        this.textTB.scale.set(0.4);
        this.textTB.position.y = -203;
        this.texture = PIXI.Texture.fromImage(App_1.App.AssetDir + "Picture/IU/panel.png");
        this.scale.set(0.7);
        this.y = -500;
        this.x = Math.random() * 1280;
        let text1 = PIXI.Sprite.fromImage(App_1.App.AssetDir + "Picture/IU/nhacnen.png");
        text1.anchor.set(0.5);
        text1.scale.set(0.4);
        text1.position.set(-100, -50);
        let text2 = PIXI.Sprite.fromImage(App_1.App.AssetDir + "Picture/IU/longtieng.png");
        text2.anchor.set(0.5);
        text2.scale.set(0.4);
        text2.position.set(-100, 50);
        this.messageBox.addChild(text1, text2, this.textTB);
        let button1 = new Button_1.Button(165, -70, "", App_1.App.AssetDir + "Picture/IU/tick.png");
        button1.setSize(new PIXI.Point(70, 70));
        let count = 0;
        button1.onClick = () => {
            if (count == 0) {
                viewGame_1.viewGame.sound.ALLMuteBG();
                button1.texture = PIXI.Texture.fromImage(App_1.App.AssetDir + "Picture/IU/square.png");
                count = 1;
            }
            else {
                count = 0;
                button1.texture = PIXI.Texture.fromImage(App_1.App.AssetDir + "Picture/IU/tick.png");
                viewGame_1.viewGame.sound.ALLStartBG();
            }
        };
        let button2 = new Button_1.Button(165, 30, "", App_1.App.AssetDir + "Picture/IU/tick.png");
        button2.setSize(new PIXI.Point(70, 70));
        let count2 = 0;
        button2.onClick = () => {
            if (count2 == 0) {
                viewGame_1.viewGame.sound.AllMuteVoice();
                button2.texture = PIXI.Texture.fromImage(App_1.App.AssetDir + "Picture/IU/square.png");
                count2 = 1;
            }
            else {
                count2 = 0;
                button2.texture = PIXI.Texture.fromImage(App_1.App.AssetDir + "Picture/IU/tick.png");
                viewGame_1.viewGame.sound.ALLStartVoice();
            }
        };
        let closebtn = new Button_1.Button(320, -185, "", App_1.App.AssetDir + "Picture/IU/close_btn.png");
        closebtn.setSize(new PIXI.Point(120, 120));
        closebtn.onClick = () => {
            TweenMax.to(this, 0.5, { y: -500, ease: Back.easeIn });
            // setTimeout(() => viewGame.Game.interactiveChildren = true, 500);
            // setTimeout(() => viewGame.Hall.interactiveChildren = true, 500);
            setTimeout(() => this.visible = false, 500);
        };
        closebtn.anchor.set(0.5);
        this.buttonBox.addChild(button1, button2, closebtn);
    }
}
exports.Setting = Setting;
//# sourceMappingURL=Setting.js.map