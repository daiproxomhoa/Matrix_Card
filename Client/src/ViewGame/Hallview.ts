import * as gsap from "gsap"
import {viewGame} from "./viewGame";
import Container = PIXI.Container;
import Sprite = PIXI.Sprite;
import {App} from "../Const/App";
import {Button} from "../IU/Button";
import {Panel} from "../IU/Panel";
import {Avatar} from "../ObjectGame/Avatar";
import TweenMax = gsap.TweenMax;
import {Player} from "../Player";
import {NamePlayer} from "../ObjectGame/NamePlayer";
import {game} from "../../Main";
/**
 * Created by Vu Tien Dai on 17/08/2017.
 */
export class Hall extends Container {
    roomList
    avatar;

    first: PIXI.Container;
    second: PIXI.Container;
    next: Button;
    contentRoom;
    player;

    constructor(player: Player) {
        super();
        this.player = player;
        let background = PIXI.Sprite.fromImage(App.AssetDir + 'Picture/Room/roomback.png');
        let gt;
        if (App.IsWeb) {
            gt = PIXI.Sprite.fromImage(App.AssetDir + "Picture/gioithieu.png");

        }
        else {
            gt = PIXI.Sprite.fromImage(App.AssetDir + "Picture/gioithieu1.png");
        }
        gt.position.set(4, 350);
        gt.width = 320;
        gt.height = 290;
        this.addChild(background, gt);
        background.width = App.width;
        background.height = App.height;
        // this.width = App.width;
        // this.height = App.height;
        this.run();

    }

    run = () => {
        this.player.socket.removeAllListeners();
        this.roomList = new PIXI.Container();
        this.roomList.position.set(405, 140);
        this.contentRoom = new PIXI.Container()
        this.first = new PIXI.Container();
        this.second = new PIXI.Container();
        this.first.position.set(0, 0);
        this.first.visible = true;
        this.second.position.set(0, -1200);
        this.second.visible = false;
        this.next = new Button(750, 140, "", App.AssetDir + "Picture/IU/next.png");
        this.next.setSize(new PIXI.Point(100, 100));
        let count = 0;
        this.next.onClick = () => {
            this.next.interactive = false;
            if (count == 0) {
                count = 1;
                this.first.interactiveChildren = false;
                TweenMax.to(this.first, 0.7, {x: 900, y: 0});
                setTimeout(() => {
                    this.first.position.set(0, -600);
                    this.first.visible = false;
                    this.second.visible = true;
                    TweenMax.to(this.second, 0.7, {x: 0, y: -570});
                    setTimeout(() => {
                        this.second.interactiveChildren = true
                        this.next.interactive = true;
                    }, 700);
                }, 750);
            }
            else if (count == 1) {
                count = 0;
                this.second.interactiveChildren = false;
                TweenMax.to(this.second, 0.7, {x: 900, y: -570});
                setTimeout(() => {
                    this.second.position.set(0, -1200);
                    this.first.visible = true;
                    this.second.visible = false;
                    TweenMax.to(this.first, 0.7, {x: 0, y: 0});
                    setTimeout(() => {
                        this.first.interactiveChildren = true;
                        this.next.interactive = true;
                    }, 700);
                }, 750);
            }

        }
        let area = new PIXI.Graphics();
        area.drawRect(-70, -135, 790, 565);
        this.contentRoom.addChild(this.first, this.second);
        this.roomList.addChild(this.contentRoom, area, this.next,);
        this.contentRoom.mask = area;
        this.contentRoom.hitArea = new PIXI.Rectangle(-60, -135, 760, 565);
        let refresh = new Button(395, 600, "", App.AssetDir + "Picture/IU/refreshbtn.png");
        refresh.setSize(new PIXI.Point(100, 50));
        refresh.onClick = () => {
            this.player.emit("get room list");
        }
        let setting = new Button(525, 600, "", App.AssetDir + "Picture/IU/setting.png");
        setting.setSize(new PIXI.Point(110, 50));
        setting.onClick = () => {
            viewGame.Setting.show();

        }
        this.avatar = new Avatar();
        this.avatar.position.set(15, 15);

        this.addChild(this.roomList, this.avatar, refresh, setting);
        this.eventForPlayer();
    }

    eventForPlayer = () => {
        this.player.socket.removeAllListeners();
        this.player.emit("get room list");
        this.player.once("room list", this.getRoomList);
        this.player.on("room full", () => {
            Panel.showMessageDialog("This room is full",() => { }, false);
        });


    }

    getRoomList = (rooms: any[]) => {
        this.first.removeChildren();
        this.second.removeChildren();
        for (let i = 0; i < rooms.length; i++) {
            let button = new BarItem(rooms[i]);
            if (i % 5 == 0)
                button.position.set(0, 190 * Math.floor(i / 5) - 45);
            else if (i % 5 == 1)
                button.position.set(160, 190 * Math.floor(i / 5) - 45);
            else if (i % 5 == 2)
                button.position.set(320, 190 * Math.floor(i / 5) - 45);
            else if (i % 5 == 3)
                button.position.set(480, 190 * Math.floor(i / 5) - 45);
            else
                button.position.set(640, 190 * Math.floor(i / 5) - 45);
            button.onClick = () => {
                this.player.emit("join room", rooms[i].id);
            };
            if (i < 15) {
                this.first.addChild(button);
            }
            else
                this.second.addChild(button);
        }
        this.next.interactive = true;
    }
}

class BarItem extends Button {
    public id: PIXI.Text;

    constructor(data: any) {
        super(0, 0, "", App.AssetDir + "Picture/Room/card.png   ");
        this.setSize(new PIXI.Point(120, 170));
        let style = new PIXI.TextStyle({
            fontFamily: 'Myriad Pro Bold',
            fontSize: 24,
            fontWeight: 'bold',
            fill: '#ffffff',
        });
        if (data.id < 10)
            this.id = new PIXI.Text("Room 0" + data.id, style);
        else
            this.id = new PIXI.Text("Room " + data.id, style);
        this.id.anchor.set(0.5);
        this.id.y = -70;

        for(let i=0;i<data.key.length;i++) {
            let player = new PIXI.Text("~"+data.key[i], style)
            player.anchor.set(0.5)
            player.y=-40+i*25;
            this.addChild(player);
        }
        let players = new PIXI.Text(data.key.length + "/4", style);
        players.anchor.set(0.5);
        players.y = 70;
        this.addChild(this.id, players);
    }
}