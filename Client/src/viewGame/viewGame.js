"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("pixi.js");
const App_1 = require("../Const/App");
const BoardGame_1 = require("./BoardGame");
const Player_1 = require("../Player");
const Sound_1 = require("../Const/Sound");
const LoginView_1 = require("./LoginView");
const Panel_1 = require("../IU/Panel");
const Setting_1 = require("../IU/Setting");
const Invite_1 = require("../IU/Invite");
const Hallview_1 = require("./Hallview");
/**
 * Created by Vu Tien Dai on 21/11/2017.
 */
class viewGame {
    constructor() {
        this.createLogin = () => {
            viewGame.login_broad = new LoginView_1.Login(this.player);
            this.app.stage.addChild(viewGame.login_broad);
        };
        this.eventPlayer = () => {
            this.player.on("OK", this.onOK);
            this.player.on("NO", this.onNO);
        };
        this.onOK = () => {
            this.player.emit("getInfo");
            viewGame.login_broad.visible = false;
            this.createHall();
            this.eventGame();
            viewGame.Invite = new Invite_1.Invite(this.player);
            this.app.stage.addChild(viewGame.Invite);
            viewGame.Hall.visible = true;
            this.player.emit("get room list");
            viewGame.sound.play_BG("Wait");
            clearTimeout(viewGame.login_broad.Connect);
        };
        this.onNO = () => {
            Panel_1.Panel.showMessageDialog("Nick đang đang nhập", () => {
            }, false);
        };
        this.createGame = () => {
            viewGame.Game = new BoardGame_1.BoardGame(this.player);
            // viewGame.Game.position.set(280, 60);
            this.app.stage.addChildAt(viewGame.Game, 2);
        };
        this.createHall = () => {
            viewGame.Hall = new Hallview_1.Hall(this.player);
            viewGame.Hall.visible = false;
            this.app.stage.addChild(viewGame.Hall);
        };
        this.onSetInfo = (data) => {
            this.player.id = data.id;
            this.player.username = data.name;
            this.player.avatar = data.avatar;
            this.player.sex = data.sex;
            this.player.gold = data.gold;
            console.log(data);
            viewGame.Hall.avatar.show(this.player.gold, this.player.sex, this.player.avatar, this.player.username);
        };
        this.eventGame = () => {
            this.player.on("setInfo", this.onSetInfo);
            this.player.on("start", viewGame.Game.createCard);
        };
        this.player = new Player_1.Player();
        this.app = new PIXI.Application(App_1.App.W, App_1.App.H, { backgroundColor: 0xffffff });
        document.body.appendChild(this.app.view);
        // card.scale.set(0.8);
        // let board = new  boardchess();
        // board.position.set(50,50)
        // this.app.stage.addChild(board);
        //
        // let backgroud = PIXI.Sprite.fromImage(App.AssetDir + 'Picture/background.jpg');
        // backgroud.width = App.width
        // backgroud.height = App.height;
        // this.app.stage.addChild(backgroud,card);
        this.app.stage.addChild(Panel_1.Panel.panel);
        this.createLogin();
        this.eventPlayer();
        viewGame.Setting = new Setting_1.Setting();
        this.app.stage.addChild(viewGame.Setting);
        this.createGame();
        this.player.on("start", viewGame.Game.createCard);
    }
}
viewGame.sound = new Sound_1.Sound();
exports.viewGame = viewGame;
//# sourceMappingURL=viewGame.js.map