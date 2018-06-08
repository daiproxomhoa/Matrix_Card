/**
 * Created by Vu Tien Dai on 19/07/2017.
 */
import * as io from "socket.io-client";
import {App} from "./Const/App";
export class Player {

    private _socket: SocketIOClient.Socket;
    private _username: string = "";
    private _oppname: string = "";
    private _oppAvatar: number
    private _oppsex: boolean;
    private _oppgold: number;
    private _color: boolean;
    private _sex;
    private _avatar: number;
    private _gold:number;
    private _id:number;
    constructor() {
        this._socket = io(App.Host);
    }
    on = (event: string, callback: any) => {
        // this.socket.removeEventListener(event);
        this.socket.on(event, callback);
    };

    emit = (event: string, data?: any) => {
        if (data) this._socket.emit(event, data);
        else this._socket.emit(event);

    };

    once = (event: string, callback: any) => {
        this.socket.removeEventListener(event);
        this.socket.once(event, callback);
    };

    get socket() {
        return this._socket;
    }

    set socket(value) {
        this._socket = value;
    }
    get gold() {
        return this._gold;
    }

    set gold(value) {
        this._gold = value;
    }

    get username(): string {
        return this._username;
    }
    get id(): number {
        return this._id;
    }
    set id(value) {
        this._id=value;
    }
    set username(value: string) {
        this._username = value;
    }

    get oppname(): string {
        return this._oppname;
    }

    set oppname(value: string) {
        this._oppname = value;
    }

    get color(): boolean {
        return this._color;
    }

    set color(value: boolean) {
        this._color = value;
    }
    get oppsex(): boolean {
        return this._oppsex;
    }

    set oppsex(value: boolean) {
        this._oppsex = value;
    }

    get oppAvatar(): number {
        return this._oppAvatar;
    }

    set oppAvatar(value: number) {
        this._oppAvatar = value;
    }
    get oppGold(): number {
        return this._oppgold;
    }

    set oppGold(value: number) {
        this._oppgold = value;
    }
    get avatar(): number {
        return this._avatar;
    }

    set avatar(value: number) {
        this._avatar = value;
    }

    get sex() {
        return this._sex;
    }

    set sex(value) {
        this._sex = value;
    }


}