"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Room_1 = require("./Room");
// /**
//  * Created by Vu Tien Dai on 01/08/2017.
//  */
class Manages {
    constructor() {
        this.addUser = (user) => {
            if (this.isOnline(user.username) == false) {
                this.users.push(user);
                user.emit("OK");
                this.initPlayerEvent(user);
            }
            else {
                user.emit("NO");
            }
        };
        this.initPlayerEvent = (user) => {
            user.on("getInviteList", () => {
                user.emit("InviteList", this.getInvite());
            });
            user.on("getInfo", () => {
                user.emit("setInfo", { id: user._id, name: user.username, avatar: user.avatarID, sex: user.sex, gold: user.gold });
            });
            user.on("join room", (roomID) => {
                let findRoom = false;
                for (let i = 0; i < this.rooms.length; i++) {
                    if (this.rooms[i].id == roomID) {
                        findRoom = true;
                        if (this.rooms[i].isFull() == false) {
                            this.rooms[i].addUser(user);
                        }
                        else
                            user.emit("room full");
                        break;
                    }
                }
                if (!findRoom)
                    user.emit("cannot find room");
            });
            user.on("disconnect", () => {
                user.isPlaying = null;
                user.idroom = null;
                let index = this.users.findIndex((element) => {
                    return element == user;
                });
                user.socket.broadcast.emit("room list", this.getRoomList());
                this.users.splice(index, 1);
            }, false);
            user.on("invited", (data) => {
                for (let i = 0; i < this.users.length; i++) {
                    if (this.users[i].username == data.guest) {
                        console.log("Moi ");
                        this.users[i].emit("enjoy", { key: data.key, id: user.idroom });
                        break;
                    }
                }
            });
            user.on("get room list", () => {
                user.emit("room list", this.getRoomList());
                user.socket.broadcast.emit("room list", this.getRoomList());
            });
        };
        this.isOnline = (userName) => {
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].username == userName)
                    return true;
            }
            return false;
        };
        this.getInvite = () => {
            let invite = [];
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].isPlaying == false)
                    invite.push({ name: this.users[i].username });
            }
            return invite;
        };
        this.getRoomList = () => {
            let roomArr = [];
            for (let i = 0; i < this.rooms.length; i++) {
                let arr = this.rooms[i].getUsername;
                roomArr.push({
                    id: this.rooms[i].id,
                    key: arr,
                });
            }
            return roomArr;
        };
        this.users = [];
        this.rooms = [];
        for (let i = 0; i < 30; i++) {
            this.rooms.push(new Room_1.Room(i + 1, "Room " + i));
        }
    }
}
exports.Manages = Manages;
//
// } 
//# sourceMappingURL=Manages.js.map