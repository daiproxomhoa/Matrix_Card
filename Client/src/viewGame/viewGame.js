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
const util_1 = require("util");
/**
 * Created by Vu Tien Dai on 21/11/2017.
 */
var count = 0;
var screenfull = require('screenfull');
class viewGame {
    constructor() {
        this.function = () => {
            viewGame.app.renderer.resize(window.innerWidth, window.innerHeight);
            viewGame.app.stage.scale.set(window.innerWidth / App_1.App.W, window.innerHeight / App_1.App.H);
        };
        this.ReSize = () => {
            if (!App_1.App.IsWeb || screenfull.isFullScreen) {
                App_1.App.W = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                App_1.App.H = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                if (App_1.App.IsWeb) {
                    // let zoomBrowser = Math.round(window.devicePixelRatio * 100);
                    // if (zoomBrowser != 100) {
                    //     w = window.innerWidth;
                    //     h = window.innerHeight;
                    // } else {
                    //     w = window.screen.width;
                    //     h = window.screen.height;
                    // }
                }
            }
        };
        this.createLogin = () => {
            viewGame.login_broad = new LoginView_1.Login(this.player);
            viewGame.app.stage.addChild(viewGame.login_broad);
        };
        this.eventPlayer = () => {
            this.player.on("OK", this.onOK);
            this.player.on("NO", this.onNO);
        };
        this.onOK = () => {
            this.player.emit("getInfo");
            viewGame.app.stage.removeChild(viewGame.login_broad);
            this.createHall();
            this.eventHall();
            viewGame.Invite = new Invite_1.Invite(this.player);
            viewGame.app.stage.addChild(viewGame.Invite);
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
            viewGame.app.stage.addChild(viewGame.Hall);
        };
        this.onSetInfo = (data) => {
            this.player.id = data.id;
            this.player.username = data.name;
            this.player.avatar = data.avatar;
            this.player.sex = data.sex;
            this.player.gold = data.gold;
            console.log(data);
            viewGame.Hall.avatar.show(this.player.gold, this.player.sex, this.player.avatar, this.player.username, this.player.id);
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
            this.player.on("reset_turn", (data) => {
                viewGame.Game.emit("reset_turn", data);
            });
            this.player.on("setScore", (data) => {
                viewGame.Game.emit("setScore", data);
            });
            this.player.on("new_maincard", (data) => {
                viewGame.Game.emit("new_maincard", data);
            });
            this.player.on("Attack", (data) => {
                viewGame.Game.emit("Attack", data);
            });
            this.player.on("Die", (data) => {
                viewGame.Game.emit("Die", data);
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
                if (!util_1.isNullOrUndefined(data)) {
                    index = data;
                }
                viewGame.Game.boardGame.moveUp(index);
            });
            this.player.on("on_down", (data) => {
                let index = 0;
                if (!util_1.isNullOrUndefined(data)) {
                    index = data;
                }
                viewGame.Game.boardGame.moveDown(index);
            });
            this.player.on("your_turn", (data) => {
                let turn = 0;
                if (!util_1.isNullOrUndefined(data)) {
                    turn = data;
                }
                viewGame.Game.emit("your_turn", turn);
            });
            this.player.on("info_players", (data) => {
                viewGame.Game.emit("info_players", data);
            });
            this.player.on("detection", (data) => {
                viewGame.Game.emit("detection", data);
            });
            this.player.on("reset_game", (data) => {
                viewGame.Game.emit("reset_game", data);
            });
            this.player.on("ready_status", (data) => {
                viewGame.Game.emit("ready_status", data);
            });
            this.player.on("unready_status", (data) => {
                viewGame.Game.emit("unready_status", data);
            });
            this.player.on("do you want to restart", (data) => {
                Panel_1.Panel.showConfirmDialog("Đối phương muốn chơi lại", {
                    text: "Có",
                    action: () => {
                        this.player.emit("ok_restart", true);
                    }
                }, {
                    text: "Không",
                    action: () => {
                        this.player.emit("ok_restart", false);
                    }
                });
            });
            this.player.on("game not start", (data) => {
                Panel_1.Panel.showDialog("Game chưa bắt đầu !");
            });
            this.player.on("not restart", (data) => {
                Panel_1.Panel.showDialog("Có người không thống nhất !");
            });
        };
        this.eventHall = () => {
            this.player.on("setInfo", this.onSetInfo);
            this.player.on("join room success", () => {
                viewGame.Hall.visible = false;
                this.createGame();
                this.eventGame();
            });
            this.player.on("room list", viewGame.Hall.getRoomList);
            this.player.on("room full", () => {
                Panel_1.Panel.showMessageDialog("This room is full", () => {
                }, false);
            });
            this.player.on("enjoy", this.onEnjoy);
        };
        this.onEnjoy = (data) => {
            Panel_1.Panel.showConfirmDialog("Người chơi " + data.key + " muốn bạn chơi cùng ? ", {
                text: "Có",
                action: () => {
                    this.player.emit("join room", data.id);
                }
            }, {
                text: "Không",
                action: () => {
                }
            });
        };
        this.player = new Player_1.Player();
        if (!App_1.App.IsWeb) {
            this.ReSize();
            viewGame.app = new PIXI.Application(App_1.App.W, App_1.App.H);
            viewGame.app.stage.scale.set(App_1.App.W / App_1.App.width, App_1.App.H / App_1.App.height);
        }
        else {
            viewGame.app = new PIXI.Application(960, 620);
            // viewGame.app.stage.scale.set(960/App.W,620/App.H)
            var docelem = document.documentElement;
            if (docelem.requestFullscreen) {
                docelem.requestFullscreen();
            }
            else if (docelem.webkitRequestFullscreen) {
                docelem.webkitRequestFullscreen();
            }
            setTimeout(() => {
                viewGame.app.renderer.resize(window.innerWidth, window.innerHeight);
                viewGame.app.stage.scale.set(window.innerWidth / App_1.App.W, window.innerHeight / App_1.App.H);
                document.body.style.overflowY = "auto";
                document.body.style.overflowX = "hidden";
            }, 200);
            window.addEventListener("resize", this.function);
        }
        document.body.appendChild(viewGame.app.view);
        // window.addEventListener("resize", function() {
        //     viewGame.app.renderer.resize(window.innerWidth, window.innerHeight);
        //     viewGame.app.stage.scale.set(window.innerWidth/App.W,window.innerHeight/App.H)
        // });
        // document.addEventListener("keydown", keyDownTextField, false);
        // function keyDownTextField(e) {
        //     var keyCode = e.keyCode;
        //
        //     if(keyCode==122&& count ==0) {
        //         viewGame.app.renderer.resize(window.screen.width, window.screen.height);
        //         viewGame.app.stage.scale.set(window.screen.width/App.W,window.screen.height/App.H)
        //         count++
        //     } else if(keyCode==122&& count ==1) {
        //         viewGame.app.renderer.resize(960,620);
        //         viewGame.app.stage.scale.set(960/App.W,620/App.H)
        //         count =0;
        //     }
        // }
        document.body.appendChild(viewGame.app.view);
        viewGame.app.stage.addChild(Panel_1.Panel.panel);
        viewGame.Game = new Game_1.Game();
        viewGame.app.stage.addChild(viewGame.Game);
        this.createLogin();
        this.eventPlayer();
        viewGame.Setting = new Setting_1.Setting();
        viewGame.app.stage.addChild(viewGame.Setting);
        document.getElementById('canvas').addEventListener('pointerup', () => {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        });
    }
}
viewGame.sound = new Sound_1.Sound();
exports.viewGame = viewGame;
//# sourceMappingURL=viewGame.js.map