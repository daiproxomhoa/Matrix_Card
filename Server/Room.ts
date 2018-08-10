import Socket = SocketIO.Socket;
import {User} from "./User";
import {isNullOrUndefined} from "util";
import Manager = SocketIOClient.Manager;
export class Room {
    id: number;
    users = [];
    ready = [];
    bobai = [];
    restart = [];
    asking = false;
    score = [0, 0, 0, 0];
    maincard = [];
    mainid = []
    name: string;
    turn: number = 0;
    isPlaying = false;
    key: number;


    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.users = [];
    }


    addUser = (user: User) => {
        user.ready = false;
        if (this.users.length == 4)
            return false;
        this.users.push(user);
        user.idroom = this.id;
        user.isPlaying = true;
        user.socket.emit("join room success");
        this.setInfo();
        if (this.users.length == 1) {
            this.key = user.id;
            user.emit("keyroom", true);
        }
        else {
            user.emit("keyroom", false)
        }
        user.on("ready", () => {
            user.ready = true;
            console.log(user.username, user.ready)
            if (this.key == user.id) {
                if (this.countReady() == this.users.length && this.users.length > 1) {
                    this.startgame();

                }
                else {
                    user.ready = false;
                    user.emit("player is not ready");
                }
            }
            else {
                for (let j = 0; j < this.users.length; j++) {
                    this.users[j].emit("ready_status", user.id);
                }
            }
        })
        user.on("unready", () => {
            user.ready = false;
            console.log("Du ma" + user.username, user.ready)
            for (let j = 0; j < this.users.length; j++) {
                this.users[j].emit("unready_status", user.id);
            }
        })
        user.on("disconnect", () => {
            let index = this.users.findIndex((element): boolean => {
                return element == user;
            });
            this.onUserLeft(index);
            for (let j = 0; j < this.users.length; j++) {
                this.users[j].emit("reset_turn", j.toString());
            }
            if (index == this.turn) {
                if (index == this.users.length) {
                    this.turn = 0;
                    for (let j = 0; j < this.users.length; j++) {
                        this.users[j].emit("your_turn", this.turn);
                    }
                }

            }

        }, false);
        user.on("left_room", () => {
            let index = this.users.findIndex((element): boolean => {
                return element == user;
            });
            this.onUserLeft(index);
            user.emit("left_room_ok");
            for (let j = 0; j < this.users.length; j++) {
                this.users[j].emit("reset_turn", j.toString());
            }
            // console.log(index + "  " + this.users.length);
            if (index == this.turn) {
                if (index == this.users.length) {
                    this.turn = 0;
                }
                for (let j = 0; j < this.users.length; j++) {
                    this.users[j].emit("your_turn", this.turn);
                }

            }


        });
        user.on("send message", (msg: string) => {
            for (let j = 0; j < this.users.length; j++) {
                this.users[j].emit("new message", {playername: user.getUserName, message: msg});
            }
        });
        user.on("want reset game", () => {

            if (this.asking == false) {
                if (this.isPlaying == false) {
                    user.emit("game not start");
                }
                else {
                    this.restart.push(1)
                    this.asking = true;
                    for (let j = 0; j < this.users.length; j++) {
                        if (user.id != this.users[j].id)
                            this.users[j].emit("do you want to restart");
                    }
                }
            }
        });
    }
    startgame = () => {
        this.isPlaying = true;
        this.ready = [];
        this.sort();
        this.setInfo();
        this.create_Card();
        for (let i = 0; i < this.users.length; i++) {
            this.users[i].emit("ok_ready", i);
            this.users[i].emit('set_turn', {turn: i.toString(), id: this.users[0].id});
            this.users[i].emit('chia_bai', {bobai: this.bobai, maincard: this.maincard[i]});
            this.users[i].emit('start_game');
            this.users[i].on("ok_restart", (data) => {
                if (this.asking == true) {
                    if (data == true) {
                        this.restart.push(1);
                        if (this.restart.length == this.users.length) {
                            for (let a = 0; a < this.users.length; a++) {
                                this.users[a].emit("setScore", this.score);
                            }
                            for (let a = 0; a < this.users.length; a++) {
                                this.users[a].emit("reset_game", this.maincard);
                            }
                            this.setKey();
                            this.isPlaying = false;
                            this.turn = 0;
                            this.score = [0, 0, 0, 0];
                            this.asking = false;
                            this.restart = [];
                        }
                    }
                    else {
                        for (let a = 0; a < this.users.length; a++) {
                            if (a != i)
                                this.users[a].emit("not restart", this.maincard);
                        }
                    }
                }
            });
            this.users[i].on("move_left", (data) => {
                if (this.turn >= this.users.length - 1) {
                    this.turn = 0;
                } else {
                    this.turn++;
                }
                let index = 0;
                if (!isNaN(data)) {
                    index = data
                }
                this.MoveLeft(index);
                for (let j = 0; j < this.users.length; j++) {
                    this.users[j].emit("on_left", data);
                    this.users[j].emit("your_turn", this.turn.toString());
                }

            })
            this.users[i].on("move_right", (data) => {
                if (this.turn >= this.users.length - 1) {
                    this.turn = 0;
                } else {
                    this.turn++;
                }
                let index = 0;
                if (!isNaN(data)) {
                    index = data
                }
                this.MoveRight(index);
                for (let j = 0; j < this.users.length; j++) {
                    this.users[j].emit("on_right", data);
                    this.users[j].emit("your_turn", this.turn.toString());
                }
            })
            this.users[i].on("move_up", (data) => {
                if (this.turn >= this.users.length - 1) {
                    this.turn = 0;
                } else {
                    this.turn++;
                }
                let index = 0;
                if (!isNaN(data)) {
                    index = data
                }
                this.MoveUp(index);
                for (let j = 0; j < this.users.length; j++) {
                    this.users[j].emit("on_up", data);
                    this.users[j].emit("your_turn", this.turn.toString());
                }
            })
            this.users[i].on("move_down", (data) => {
                if (this.turn >= this.users.length - 1) {
                    this.turn = 0;
                } else {
                    this.turn++;
                }
                let index = 0;
                if (!isNaN(data)) {
                    index = data
                }
                this.MoveDown(index);
                for (let j = 0; j < this.users.length; j++) {
                    this.users[j].emit("on_down", data);
                    this.users[j].emit("your_turn", this.turn.toString());
                }
            })
            this.users[i].on("attack", (data) => {

                for (let i1 = 0; i1 < this.users.length; i1++) {
                    this.users[i1].emit("Attack", {id: this.users[i].id, index_atk: data.index_atk});
                }
                this.Attack(data, i);
                if (this.isPlaying == true) {
                    if (this.turn == this.users.length - 1) {
                        this.turn = 0;
                    } else {
                        this.turn++;
                    }
                    for (let j = 0; j < this.users.length; j++) {
                        this.users[j].emit("your_turn", this.turn.toString());
                    }
                }
            });
            this.users[i].on("detection", (data) => {
                this.Detection(data, this.users[i].id);
                if (this.turn == this.users.length - 1) {
                    this.turn = 0;
                } else {
                    this.turn++;
                }
                for (let j = 0; j < this.users.length; j++) {
                    this.users[j].emit("your_turn", this.turn.toString());
                }
            })
        }


    }
    sort = () => {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id == this.key) {
                this.users.splice(0, 0, this.users[i]);
                this.users.splice(0, i + 1);
                return;
            }
        }
    }
    create_Card = () => {
        this.bobai = [];
        this.maincard = [];
        this.mainid = [];
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
            if (this.isContant(this.bobai[i], this.maincard) == false) {
                this.maincard.push(this.bobai[i]);
            }
        }
        for (let i = 0; i < this.users.length; i++) {
            this.mainid.push(this.users[i].id);
        }
    }

    isContant(value, data): boolean {
        for (let i = 0; i < data.length; i++) {
            if (data[i] == value) {
                return true;
            }
        }
        return false;
    }

    getInfo = () => {
        let infoArr = [];
        for (let i = 0; i < this.users.length; i++) {

            infoArr.push({
                id: this.users[i].id,
                name: this.users[i].username,
                avatar: this.users[i].avatarID,
                gold: this.users[i].gold,
                sex: this.users[i].sex,
                key: this.key,
                isReady: this.users[i].ready
            });
        }

        return infoArr
    }
    setInfo = () => {
        for (let i = 0; i < this.users.length; i++) {
            this.users[i].emit("info_players", this.getInfo());
        }
    }
    setKey = () => {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id == this.key) {
                this.users[i].emit("keyroom", true);
            }
            else {
                this.users[i].emit("keyroom", false);
            }
        }
    }
    MoveUp = (data) => {
        let row = Math.floor(data / 5);
        let col = data % 5;
        let temp;
        for (let i = col; i < 21 + col; i = i + 5) {
            if (i == col) {
                temp = this.bobai[i];
            }
            else {
                this.bobai[i - 5] = this.bobai[i];
            }
        }
        this.bobai[20 + col] = temp;
    }
    MoveDown = (data) => {
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

            }
        }
        this.bobai[col] = temp;
    }
    MoveRight = (data) => {
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
            }
        }
        this.bobai[length - col] = temp;
    }
    MoveLeft = (data) => {

        let col = data % 5;
        let temp;
        let length = data;
        for (let i = length - col; i < length + 5 - col; i++) {
            if (i == length - col) {
                temp = this.bobai[i];
            }

            else {
                this.bobai[i - 1] = this.bobai[i];
            }
        }
        this.bobai[length + 4 - col] = temp;

    }
    Detection = (data, user) => {
        // console.log("data" + data.index_dec);
        let row = Math.floor(data.index_dec / 5);
        let col = data.index_dec % 5;
        let i = data.index_dec;
        let check = [];
        if (col != 0) {
            check.push(i - 1);
        }
        if (col != 4) {
            check.push(i + 1);
        }
        if (row != 0) {
            check.push(i - 5);
        }
        if (row != 4) {
            check.push(i + 5);
        }
        if (col != 0 && row != 0) {
            check.push(i - 6);
        }
        if (col != 0 && row != 4) {
            check.push(i + 4);
        }
        if (col != 4 && row != 0) {
            check.push(i - 4);
        }
        if (col != 4 && row != 4) {
            check.push(i + 6);
        }
        let check2 = [0, 0, 0, 0];
        if (this.bobai[data.index_main] == data.value_main && this.bobai[data.index_dec] == data.value_dec) {
            for (let i = 0; i < check.length; i++) {
                if (this.isContant(this.bobai[check[i]], this.maincard) == true) {
                    let index = this.maincard.findIndex((element): boolean => {
                        return element == this.bobai[check[i]];
                    });
                    check2[index] = this.mainid[index];
                }
            }
        }
        for (let j = 0; j < this.users.length; j++) {
            this.users[j].emit("detection", {arr: check2, id: user, index_dec: data.index_dec});
        }
    }
    Attack = (data, user) => {
        let row = Math.floor(data.index_main / 5);
        let col = data.index_main % 5;
        let i = data.index_main;
        let check = [];
        if (col != 0) {
            check.push(i - 1);
        }
        if (col != 4) {
            check.push(i + 1);
        }
        if (row != 0) {
            check.push(i - 5);
        }
        if (row != 4) {
            check.push(i + 5);
        }
        if (col != 0 && row != 0) {
            check.push(i - 6);
        }
        if (col != 0 && row != 4) {
            check.push(i + 4);
        }
        if (col != 4 && row != 0) {
            check.push(i - 4);
        }
        if (col != 4 && row != 4) {
            check.push(i + 6);
        }
        if (this.bobai[data.index_main] == data.value_main) {
            for (let j = 0; j < check.length; j++) {
                if (this.bobai[check[j]] == data.value_atk && check[j] == data.index_atk) {
                    for (let i = 0; i < this.maincard.length; i++) {
                        if (this.maincard[i] == this.bobai[check[j]] && this.mainid[i] == data.id) {
                            this.score[user]++;
                            for (let y = 0; y < this.users.length; y++) {
                                this.users[y].emit("Die", {id: this.users[i].id, value: this.maincard[i]});
                            }
                            if (this.score[user] < 2) {
                                let check = true;
                                while (check) {
                                    let rd = Math.floor(Math.abs(Math.random() * 25));
                                    if (this.isContant(this.bobai[rd], this.maincard) == false) {
                                        this.maincard[i] = this.bobai[rd];
                                        check = false;
                                    }
                                }
                                this.users[i].emit("new_maincard", this.maincard[i]);
                                for (let a = 0; a < this.users.length; a++) {
                                    this.users[a].emit("setScore", this.score);
                                }
                            }
                            else {
                                for (let a = 0; a < this.users.length; a++) {
                                    this.users[a].emit("setScore", this.score);
                                }
                                for (let a = 0; a < this.users.length; a++) {
                                    this.users[a].emit("reset_game", this.maincard);
                                }
                                this.setKey();
                                this.isPlaying = false;
                                this.turn = 0;
                                this.score = [0, 0, 0, 0];
                            }

                            return;
                        }

                    }
                }
            }
        }

    }
    onUserLeft = (i: number) => {
        if (i >= 0) {
            if (this.users[i].id == this.key) {
                if (i == this.users.length - 1) {
                    this.key = this.users[0].id;
                }
                else {
                    this.key = this.users[i + 1].id;
                }
            }
            this.users[i].isPlaying = false;
            this.users[i].idroom = null;
            this.users[i].ready = false;
            this.users.splice(i, 1);
            this.mainid.splice(i, 1);
            this.maincard.splice(i, 1);
            this.score.splice(i, 1);
            this.setInfo();
            if (this.users.length == 1) {
                this.users[0].emit("reset_game", this.maincard);
                this.users[0].ready = false;
                this.setKey();
                this.isPlaying = false;
                this.turn = 0;
                this.score = [0, 0, 0, 0];
            }
        }
    }
    isFull = () => {
        if (this.users.length >= 4 || this.isPlaying == true) {
            return true;
        }
        return false;
    }

    get getUsername(): any {
        let arr = [];
        for (let i = 0; i < this.users.length; i++) {
            arr.push(this.users[i].username);
        }

        return arr;

    }

    countReady = () => {
        let count = 0
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].ready == false)
                count++;
        }
        return count;
    }
}