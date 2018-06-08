"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Vu Tien Dai on 19/07/2017.
 */
const io = require("socket.io-client");
const App_1 = require("./Const/App");
class Player {
    constructor() {
        this._username = "";
        this._oppname = "";
        this.on = (event, callback) => {
            // this.socket.removeEventListener(event);
            this.socket.on(event, callback);
        };
        this.emit = (event, data) => {
            if (data)
                this._socket.emit(event, data);
            else
                this._socket.emit(event);
        };
        this.once = (event, callback) => {
            this.socket.removeEventListener(event);
            this.socket.once(event, callback);
        };
        this._socket = io(App_1.App.Host);
    }
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
    get username() {
        return this._username;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    set username(value) {
        this._username = value;
    }
    get oppname() {
        return this._oppname;
    }
    set oppname(value) {
        this._oppname = value;
    }
    get color() {
        return this._color;
    }
    set color(value) {
        this._color = value;
    }
    get oppsex() {
        return this._oppsex;
    }
    set oppsex(value) {
        this._oppsex = value;
    }
    get oppAvatar() {
        return this._oppAvatar;
    }
    set oppAvatar(value) {
        this._oppAvatar = value;
    }
    get oppGold() {
        return this._oppgold;
    }
    set oppGold(value) {
        this._oppgold = value;
    }
    get avatar() {
        return this._avatar;
    }
    set avatar(value) {
        this._avatar = value;
    }
    get sex() {
        return this._sex;
    }
    set sex(value) {
        this._sex = value;
    }
}
exports.Player = Player;
//# sourceMappingURL=Player.js.map