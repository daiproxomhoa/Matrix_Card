"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Button_1 = require("./Button");
const App_1 = require("../Const/App");
var Sprite = PIXI.Sprite;
const gsap = require("gsap");
var TweenMax = gsap.TweenMax;
var Back = gsap.Back;
/**
 * Created by Vu Tien Dai on 18/08/2017.
 */
class Invite extends Sprite {
    constructor(player) {
        super(PIXI.Texture.fromImage(App_1.App.AssetDir + "Picture/IU/panel.png"));
        this.getList = (guest) => {
            this.board.removeChildren();
            for (let i = 0; i < guest.length; i++) {
                let btn;
                if (guest.length < 6) {
                    if (i % 2 == 0)
                        btn = new Button_1.Button(-145, 110 * Math.floor(i / 2) - 75, guest[i].name, App_1.App.AssetDir + "Picture/IU/inviteArea.png");
                    else
                        btn = new Button_1.Button(145, 110 * Math.floor(i / 2) - 75, guest[i].name, App_1.App.AssetDir + "Picture/IU/inviteArea.png");
                    btn.setSize(new PIXI.Point(250, 80));
                }
                else {
                    if (i % 3 == 0)
                        btn = new Button_1.Button(-195, 70 * Math.floor(i / 3) - 80, guest[i].name, App_1.App.AssetDir + "Picture/IU/inviteArea.png");
                    else if (i % 3 == 1)
                        btn = new Button_1.Button(0, 70 * Math.floor(i / 3) - 80, guest[i].name, App_1.App.AssetDir + "Picture/IU/inviteArea.png");
                    else
                        btn = new Button_1.Button(195, 70 * Math.floor(i / 3) - 80, guest[i].name, App_1.App.AssetDir + "Picture/IU/inviteArea.png");
                    btn.setSize(new PIXI.Point(160, 60));
                }
                btn.onClick = () => {
                    this.player.emit("invited", { key: this.player.username, guest: guest[i].name });
                    btn.alpha = 0.5;
                    btn.interactive = false;
                };
                this.board.addChild(btn);
            }
        };
        this.show = () => {
            this.parent.setChildIndex(this, this.parent.children.length - 1);
            this.player.emit("getInviteList");
            this.visible = true;
            // viewGame.Game.interactiveChildren = false;
            // viewGame.Hall.interactiveChildren = false;
            TweenMax.to(this, 0.5, {
                x: 580,
                y: 320,
                ease: Back.easeOut
            });
        };
        this.player = player;
        this.width = 500;
        this.height = 300;
        this.anchor.set(0.5);
        this.position.set(500, -500);
        let closebtn = new Button_1.Button(320, -185, "", App_1.App.AssetDir + "Picture/IU/close_btn.png");
        closebtn.setSize(new PIXI.Point(120, 120));
        closebtn.onClick = () => {
            TweenMax.to(this, 0.5, { y: -500, ease: Back.easeIn });
            // setTimeout(() => viewGame.Game.interactiveChildren = true, 500);
            // setTimeout(() => viewGame.Hall.interactiveChildren = true, 500);
            setTimeout(() => this.visible = false, 500);
        };
        closebtn.anchor.set(0.5);
        this.board = new PIXI.Container();
        this.addChild(closebtn, this.board);
        this.player.emit("getInviteList");
        this.player.on("InviteList", this.getList);
    }
}
exports.Invite = Invite;
//# sourceMappingURL=Invite.js.map