"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("pixi.js");
const App_1 = require("../Const/App");
const Player_1 = require("../Player");
const Sound_1 = require("../Const/Sound");
const LoginView_1 = require("./LoginView");
const Panel_1 = require("../IU/Panel");
const Setting_1 = require("../IU/Setting");
const Invite_1 = require("../IU/Invite");
const Hallview_1 = require("./Hallview");
const Game_1 = require("./Game");
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
            this.app.stage.removeChild(viewGame.login_broad);
            this.createHall();
            this.eventHall();
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
            viewGame.Game.createAll(this.player);
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
            this.player.on("left_room_ok", () => {
                viewGame.Game.removeChildren();
                viewGame.Hall.visible = true;
            });
            this.player.on("chia_bai", (data) => {
                viewGame.Game.emit("chia_bai", data);
            });
            this.player.on("new message", (data) => {
                viewGame.Game.emit("new message", data);
            });
            this.player.on("keyroom", (data) => {
                viewGame.Game.emit("keyroom", data);
            });
            this.player.on("ok_ready", (data) => {
                viewGame.Game.emit("ok_ready", data);
            });
            this.player.on("player is not ready", (data) => {
                viewGame.Game.emit("player is not ready", data);
            });
            this.player.on("set_turn", (data) => {
                viewGame.Game.emit("set_turn", data);
            });
            this.player.on("on_left", (data) => {
                let index = 0;
                if (!isNaN(data)) {
                    index = data;
                }
                viewGame.Game.boardGame.moveLeft(index);
            });
            this.player.on("on_right", (data) => {
                let index = 0;
                if (!isNaN(data)) {
                    index = data;
                }
                viewGame.Game.boardGame.moveRight(index);
            });
            this.player.on("on_up", (data) => {
                let index = 0;
                if (!isNaN(data)) {
                    index = data;
                }
                viewGame.Game.boardGame.moveUp(index);
            });
            this.player.on("on_down", (data) => {
                let index = 0;
                if (!isNaN(data)) {
                    index = data;
                }
                viewGame.Game.boardGame.moveDown(index);
            });
            this.player.on("your_turn", (data) => {
                // let turn = 0;
                // if (!isNaN(data)) {
                //     turn = data
                // }
                viewGame.Game.emit("your_turn", data);
            });
            this.player.on("info_players", (data) => {
                viewGame.Game.emit("info_players", data);
            });
        };
        this.eventHall = () => {
            this.player.on("setInfo", this.onSetInfo);
            this.player.on("join room success", () => {
                viewGame.Hall.visible = false;
                this.createGame();
                this.eventGame();
            });
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
        viewGame.Game = new Game_1.Game();
        this.app.stage.addChild(viewGame.Game);
        this.createLogin();
        this.eventPlayer();
        viewGame.Setting = new Setting_1.Setting();
        this.app.stage.addChild(viewGame.Setting);
    }
}
viewGame.sound = new Sound_1.Sound();
exports.viewGame = viewGame;
//# sourceMappingURL=viewGame.js.map