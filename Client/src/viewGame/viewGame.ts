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
    static Game: BoardGame ;
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
        this.createLogin();
        this.eventPlayer();
        viewGame.Setting = new Setting();
        this.app.stage.addChild(viewGame.Setting);
        this.createGame();
        this.player.on("start",viewGame.Game.createCard)
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
        viewGame.login_broad.visible = false;

        this.createHall();
        this.eventGame();
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
        viewGame.Game= new BoardGame(this.player);
        // viewGame.Game.position.set(280, 60);
        this.app.stage.addChildAt(viewGame.Game,2);

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
        this.player.gold =data.gold;
        console.log(data);
        viewGame.Hall.avatar.show(this.player.gold,this.player.sex, this.player.avatar, this.player.username);
    }
    eventGame=()=>{
        this.player.on("setInfo", this.onSetInfo);
        this.player.on("start",viewGame.Game.createCard)
    }

}