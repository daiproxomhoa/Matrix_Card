import "pixi.js"
import {App} from "../Const/App";
import Sprite = PIXI.Sprite;
import {Player} from "../Player";
import {Sound} from "../Const/Sound";
import {Login} from "./LoginView";
import {Panel} from "../IU/Panel";
import {Setting} from "../IU/Setting";
import {Invite} from "../IU/Invite";
import {Hall} from "./Hallview";
import {Game} from "./Game";
import {isNullOrUndefined} from "util";

/**
 * Created by Vu Tien Dai on 21/11/2017.
 */

var count = 0;
var screenfull = require('screenfull');
export class viewGame {
    player: Player;
    static sound: Sound = new Sound();
    static login_broad: Login;
    static Setting: Setting;
    static Invite: Invite;
    static Hall: Hall;
    static Game: Game;
    static app;

    constructor() {
        this.player = new Player();
        if (!App.IsWeb) {
            this.ReSize();
            viewGame.app = new PIXI.Application(App.W, App.H);
            viewGame.app.stage.scale.set(App.W / App.width, App.H / App.height);
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
                viewGame.app.renderer.resize(window.innerWidth, window.innerHeight)
                viewGame.app.stage.scale.set(window.innerWidth / App.W, window.innerHeight / App.H)
                document.body.style.overflowY = "auto"
                document.body.style.overflowX = "hidden"
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
        viewGame.app.stage.addChild(Panel.panel);
        viewGame.Game = new Game();
        viewGame.app.stage.addChild(viewGame.Game);
        this.createLogin();
        this.eventPlayer();
        viewGame.Setting = new Setting();
        viewGame.app.stage.addChild(viewGame.Setting);
        document.getElementById('canvas').addEventListener('pointerup',()=>{   window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })

        ;})
    }

    function = () => {
        viewGame.app.renderer.resize(window.innerWidth, window.innerHeight);
        viewGame.app.stage.scale.set(window.innerWidth / App.W, window.innerHeight / App.H)
    }
    ReSize = () => {
        if (!App.IsWeb || screenfull.isFullScreen) {
            App.W = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            App.H = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            if (App.IsWeb) {
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

    }
    createLogin = () => {
        viewGame.login_broad = new Login(this.player);
        viewGame.app.stage.addChild(viewGame.login_broad);
    }
    eventPlayer = () => {
        this.player.on("OK", this.onOK);
        this.player.on("NO", this.onNO);
    }
    onOK = () => {
        this.player.emit("getInfo");
        viewGame.app.stage.removeChild(viewGame.login_broad)
        this.createHall();
        this.eventHall();
        viewGame.Invite = new Invite(this.player);
        viewGame.app.stage.addChild(viewGame.Invite);
        viewGame.Hall.visible = true;
        this.player.emit("get room list");
        viewGame.sound.play_BG("Wait");
        clearTimeout(viewGame.login_broad.Connect);
    }
    onNO = () => {
        Panel.showMessageDialog("Nick đang đang nhập", () => {
        }, false);
    }
    createGame = () => {
        viewGame.Game.createAll(this.player);
    }
    createHall = () => {
        viewGame.Hall = new Hall(this.player);
        viewGame.Hall.visible = false;
        viewGame.app.stage.addChild(viewGame.Hall);
    }
    onSetInfo = (data: any) => {
        this.player.id = data.id;
        this.player.username = data.name;
        this.player.avatar = data.avatar;
        this.player.sex = data.sex;
        this.player.gold = data.gold;
        console.log(data);
        viewGame.Hall.avatar.show(this.player.gold, this.player.sex, this.player.avatar, this.player.username, this.player.id);
    }
    eventGame = () => {
        this.player.on("left_room_ok", () => {
            viewGame.Game.removeChildren();
            viewGame.Hall.visible = true;
        });
        this.player.on("chia_bai", (data) => {
            viewGame.Game.emit("chia_bai", data)
        });
        this.player.on("new message", (data: any) => {
            viewGame.Game.emit("new message", data);
        });
        this.player.on("keyroom", (data: any) => {
            viewGame.Game.emit("keyroom", data);
        });
        this.player.on("ok_ready", (data: any) => {
            viewGame.Game.emit("ok_ready", data);
        });
        this.player.on("player is not ready", (data: any) => {
            viewGame.Game.emit("player is not ready", data);
        });
        this.player.on("set_turn", (data) => {
            viewGame.Game.emit("set_turn", data);
        });
        this.player.on("reset_turn", (data) => {
            viewGame.Game.emit("reset_turn", data)
        });
        this.player.on("setScore", (data) => {
            viewGame.Game.emit("setScore", data)
        });
        this.player.on("new_maincard", (data) => {
            viewGame.Game.emit("new_maincard", data)
        });
        this.player.on("Attack", (data) => {
            viewGame.Game.emit("Attack", data)
        });
        this.player.on("Die", (data) => {
            viewGame.Game.emit("Die", data)
        });

        this.player.on("on_left", (data) => {
            let index = 0;
            if (!isNaN(data)) {
                index = data
            }
            viewGame.Game.boardGame.moveLeft(index);
        });
        this.player.on("on_right", (data) => {
            let index = 0;
            if (!isNaN(data)) {
                index = data
            }
            viewGame.Game.boardGame.moveRight(index);

        });
        this.player.on("on_up", (data) => {
            let index = 0;
            if (!isNullOrUndefined(data)) {
                index = data
            }
            viewGame.Game.boardGame.moveUp(index);

        });
        this.player.on("on_down", (data) => {
            let index = 0;
            if (!isNullOrUndefined(data)) {
                index = data
            }
            viewGame.Game.boardGame.moveDown(index);

        });
        this.player.on("your_turn", (data) => {
            let turn = 0;
            if (!isNullOrUndefined(data)) {
                turn = data
            }
            viewGame.Game.emit("your_turn", turn);
        })
        this.player.on("info_players", (data) => {
            viewGame.Game.emit("info_players", data)
        });
        this.player.on("detection", (data) => {
            viewGame.Game.emit("detection", data)
        });
        this.player.on("reset_game", (data) => {
            viewGame.Game.emit("reset_game", data)
        }); this.player.on("ready_status", (data) => {
            viewGame.Game.emit("ready_status", data)
        }); this.player.on("unready_status", (data) => {
            viewGame.Game.emit("unready_status", data)
        });
        this.player.on("do you want to restart", (data) => {
            Panel.showConfirmDialog("Đối phương muốn chơi lại",
                {
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
            Panel.showDialog("Game chưa bắt đầu !");
        });
        this.player.on("not restart", (data) => {
            Panel.showDialog("Có người không thống nhất !");
        });

    }
    eventHall = () => {
        this.player.on("setInfo", this.onSetInfo);
        this.player.on("join room success", () => {
            viewGame.Hall.visible = false;
            this.createGame();
            this.eventGame();
        });
        this.player.on("room list", viewGame.Hall.getRoomList);
        this.player.on("room full", () => {
            Panel.showMessageDialog("This room is full", () => {
            }, false);
        });
        this.player.on("enjoy", this.onEnjoy);
    }
    onEnjoy = (data: any) => {
        Panel.showConfirmDialog("Người chơi " + data.key + " muốn bạn chơi cùng ? ", {
            text: "Có",
            action: () => {
                this.player.emit("join room", data.id);
            }
        }, {
            text: "Không",
            action: () => {
            }
        })
    }

}
