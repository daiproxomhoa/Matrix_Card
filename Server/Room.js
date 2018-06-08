"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Room {
    constructor(id, name) {
        this.users = [];
        this.ready = [];
        this.bobai = [];
        this.score = [0, 0, 0, 0];
        this.maincard = [];
        this.turn = 0;
        this.isPlaying = false;
        this.addUser = (user) => {
            if (this.users.length == 4)
                return false;
            this.users.push(user);
            user.idroom = this.id;
            user.isPlaying = true;
            user.socket.emit("join room success");
            this.checkInfo();
            if (this.users.length == 1) {
                this.key = user.id;
                user.emit("keyroom", true);
            }
            else {
                user.emit("keyroom", false);
            }
            user.on("ready", () => {
                if (this.key == user.id) {
                    this.ready.push(1);
                    if (this.ready.length == this.users.length && this.users.length > 1) {
                        this.startgame();
                    }
                    else {
                        this.ready.pop();
                        user.emit("player is not ready");
                    }
                }
                else {
                    this.ready.push(1);
                }
            });
            user.on("unready", () => {
                console.log("un ready");
                console.log(this.ready.length);
                if (this.ready.length > 0)
                    this.ready.pop();
            });
            user.on("disconnect", () => {
                let index = this.users.findIndex((element) => {
                    return element == user;
                });
                this.onUserLeft(index);
            }, false);
            user.on("left_room", () => {
                let index = this.users.findIndex((element) => {
                    return element == user;
                });
                this.onUserLeft(index);
                user.emit("left_room_ok");
            });
            // this.create_Card();
            // user.emit("start", {bobai: this.bobai, maincard: this.maincard.pop()});
            // console.log(this.maincard);
        };
        this.startgame = () => {
            this.isPlaying = true;
            this.ready = [];
            this.sort();
            this.create_Card();
            for (let i = 0; i < this.users.length; i++) {
                this.users[i].emit("ok_ready", i);
                this.users[i].emit('set_turn', i.toString());
                this.users[i].emit('chia_bai', { bobai: this.bobai, maincard: this.maincard[i] });
                this.users[i].emit('start_game');
                this.users[i].on("move_left", (data) => {
                    if (i == this.users.length - 1) {
                        this.turn = 0;
                    }
                    else {
                        this.turn++;
                    }
                    this.MoveLeft(data);
                    for (let i = 0; i < this.users.length; i++) {
                        this.users[i].emit("on_left", data);
                        this.users[i].emit("your_turn", this.turn.toString());
                    }
                });
                this.users[i].on("move_right", (data) => {
                    console.log(data);
                    if (i == this.users.length - 1) {
                        this.turn = 0;
                    }
                    else {
                        this.turn++;
                    }
                    this.MoveRight(data);
                    for (let j = 0; j < this.users.length; j++) {
                        this.users[j].emit("on_right", data);
                        this.users[i].emit("your_turn", this.turn.toString());
                    }
                });
                this.users[i].on("move_up", (data) => {
                    if (i == this.users.length - 1) {
                        this.turn = 0;
                    }
                    else {
                        this.turn++;
                    }
                    this.MoveUp(data);
                    for (let i = 0; i < this.users.length; i++) {
                        this.users[i].emit("on_up", data);
                        this.users[i].emit("your_turn", this.turn.toString());
                    }
                });
                this.users[i].on("move_down", (data) => {
                    if (i == this.users.length - 1) {
                        this.turn = 0;
                    }
                    else {
                        this.turn++;
                    }
                    this.MoveDown(data);
                    for (let i = 0; i < this.users.length; i++) {
                        this.users[i].emit("on_down", data);
                        this.users[i].emit("your_turn", this.turn.toString());
                    }
                });
            }
        };
        this.sort = () => {
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].id == this.key) {
                    this.users.splice(0, 0, this.users[i]);
                    this.users.splice(0, i + 1);
                    return;
                }
            }
        };
        this.create_Card = () => {
            this.bobai = [];
            this.maincard = [];
            for (let i = 0; i < 50; i++) {
                if (i % 4 == 1 || i % 4 == 3)
                    this.bobai.push(i);
            }
            for (let i = 0; i < 25; i++) {
                let x = Math.floor(Math.abs(Math.random() * 25));
                let y = Math.floor(Math.abs(Math.random() * 25));
                let a = this.bobai[x];
                this.bobai[x] = this.bobai[y];
                this.bobai[y] = a;
            }
            while (this.maincard.length < this.users.length) {
                let i = Math.floor(Math.abs(Math.random() * 25));
                if (this.isContant(this.bobai[i]) == false) {
                    this.maincard.push(this.bobai[i]);
                }
            }
        };
        this.getInfo = () => {
            let infoArr = [];
            for (let i = 0; i < this.users.length; i++) {
                infoArr.push({
                    id: this.users[i].id,
                    name: this.users[i].username,
                    avatar: this.users[i].avatarID,
                    gold: this.users[i].gold,
                    sex: this.users[i].sex,
                });
            }
            return infoArr;
        };
        this.checkInfo = () => {
            for (let i = 0; i < this.users.length; i++) {
                this.users[i].emit("info_players", this.getInfo());
            }
            // console.log("dagui");
        };
        this.MoveUp = (data) => {
            let row = Math.floor(data / 5);
            let col = data % 5;
            let temp;
            for (let i = col; i < 21 + col; i = i + 5) {
                if (i == col) {
                    temp = this.bobai[i];
                }
                else {
                    this.bobai[i - 5] = this.bobai[i];
                    this.bobai[i - 5] = i - 5;
                }
            }
            temp = 20 + col;
            this.bobai[20 + col] = temp;
        };
        this.MoveDown = (data) => {
            let row = Math.floor(data / 5);
            let col = data % 5;
            let length = data;
            let temp;
            for (let i = 20 + col; i > col - 1; i = i - 5) {
                if (i == 20 + col) {
                    temp = this.bobai[i];
                }
                if (i > col) {
                    this.bobai[i] = this.bobai[i - 5];
                    this.bobai[i] = i;
                }
            }
            this.bobai[col] = temp;
            this.bobai[col] = col;
        };
        this.MoveRight = (data) => {
            let row = Math.floor(data / 5);
            let col = data % 5;
            let length = data;
            let temp;
            for (let i = length + 4 - col; i > length - col - 1; i--) {
                if (i == length + 4 - col) {
                    temp = this.bobai[i];
                }
                if (i > length - col) {
                    this.bobai[i] = this.bobai[i - 1];
                    this.bobai[i] = i;
                }
            }
            this.bobai[length - col] = temp;
            this.bobai[length - col] = length - col;
        };
        this.MoveLeft = (data) => {
            let row = Math.floor(data / 5);
            let col = data % 5;
            let temp;
            let length = data;
            for (let i = length - col; i < length + 5 - col; i++) {
                if (i == length - col) {
                    temp = this.bobai[i];
                }
                else {
                    this.bobai[i - 1] = this.bobai[i];
                    this.bobai[i - 1] = i - 1;
                }
            }
            temp = length + 4 - col;
            this.bobai[length + 4 - col] = temp;
        };
        this.onUserLeft = (i) => {
            console.log("left room" + i);
            this.ready = [];
            this.users[i].isPlaying = false;
            this.users[i].idroom = null;
            this.users.splice(i, 1);
            this.checkInfo();
            if (this.users.length < 2) {
                this.isPlaying = false;
            }
        };
        this.isFull = () => {
            if (this.users.length >= 4 || this.isPlaying == true) {
                return true;
            }
            return false;
        };
        this.id = id;
        this.name = name;
        this.users = [];
        this.ready = [];
    }
    isContant(value) {
        for (let i = 0; i < this.maincard.length; i++) {
            if (this.maincard[i] == value) {
                return true;
            }
        }
        return false;
    }
    get getUsername() {
        let arr = [];
        for (let i = 0; i < this.users.length; i++) {
            arr.push(this.users[i].username);
        }
        return arr;
    }
}
exports.Room = Room;
//# sourceMappingURL=Room.js.map