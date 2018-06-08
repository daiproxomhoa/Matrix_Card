import "pixi.js"
import {App} from "../Const/App";
import Sprite = PIXI.Sprite;
import {BoardGame} from "./BoardGame";
import {Player} from "../Player";
import {Sound} from "../Const/Sound";
import {Login} from "./LoginView";
import {Panel} from "../IU/Panel";
import {Setting} from "../IU/Setting";
import {Invite} from "../IU/Invite";
import {Hall} from "./Hallview";
import {Game} from "./Game";

/**
 * Created by Vu Tien Dai on 21/11/2017.
 */
export class viewGame {
    app;
    player: Player;
    static sound: Sound = new Sound();
    static login_broad: Login;
    static Setting: Setting;
    static Invite: Invite;
    static Hall: Hall;
    static Game: Game;

    constructor() {
        this.player = new Player();
        this.app = new PIXI.Application(App.W, App.H, {backgroundColor: 0xffffff});
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
        this.app.stage.addChild(Panel.panel);
        viewGame.Game = new Game();
        this.app.stage.addChild(viewGame.Game);
        this.createLogin();
        this.eventPlayer();
        viewGame.Setting = new Setting();
        this.app.stage.addChild(viewGame.Setting);
    }

    createLogin = () => {
        viewGame.login_broad = new Login(this.player);
        this.app.stage.addChild(viewGame.login_broad);
    }
    eventPlayer = () => {
        this.player.on("OK", this.onOK);
        this.player.on("NO", this.onNO);
    }
    onOK = () => {
        this.player.emit("getInfo");
        this.app.stage.removeChild(viewGame.login_broad)
        this.createHall();
        this.eventHall();
        viewGame.Invite = new Invite(this.player);
        this.app.stage.addChild(viewGame.Invite);
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
        this.app.stage.addChild(viewGame.Hall);
    }
    onSetInfo = (data: any) => {
        this.player.id = data.id;
        this.player.username = data.name;
        this.player.avatar = data.avatar;
        this.player.sex = data.sex;
        this.player.gold = data.gold;
        console.log(data);
        viewGame.Hall.avatar.show(this.player.gold, this.player.sex, this.player.avatar, this.player.username);
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
        this.player.on("on_up",  (data) => {
            let index = 0;
            if (!isNaN(data)) {
                index = data
            }
            viewGame.Game.boardGame.moveUp(index);

        });
        this.player.on("on_down",  (data) => {
            let index = 0;
            if (!isNaN(data)) {
                index = data
            }
            viewGame.Game.boardGame.moveDown(index);

        });
        this.player.on("your_turn", (data) => {
            // let turn = 0;
            // if (!isNaN(data)) {
            //     turn = data
            // }
            viewGame.Game.emit("your_turn", data);
        })
        this.player.on("info_players", (data) => {
            viewGame.Game.emit("info_players", data)
        });

    }
    eventHall = () => {
        this.player.on("setInfo", this.onSetInfo);
        this.player.on("join room success", () => {
            viewGame.Hall.visible = false;
            this.createGame();
            this.eventGame();
        });
    }
}
