import Socket = SocketIO.Socket;
import {User} from "./User";
import {isNullOrUndefined} from "util";
export class Room {
    id: number;
    users = [];
    ready = [];
    bobai = [];
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
        this.ready = [];
    }


    addUser = (user: User) => {
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
            user.emit("keyroom", false)
        }
        user.on("ready", () => {
            if (this.key == user.id) {
                this.ready.push(1)
                if (this.ready.length == this.users.length && this.users.length > 1) {
                    this.startgame();

                }
                else {
                    this.ready.pop();
                    user.emit("player is not ready");
                }
            }
            else {
                this.ready.push(1)
            }
        })
        user.on("unready", () => {
            if (this.ready.length > 0)
                this.ready.pop();
        })
        user.on("disconnect", () => {
            let index = this.users.findIndex((element): boolean => {
                return element == user;
            });
            this.onUserLeft(index);

        }, false);
        user.on("left_room", () => {

            let index = this.users.findIndex((element): boolean => {
                return element == user;
            });
            this.onUserLeft(index);
            user.emit("left_room_ok");
            console.log()
            if (index == this.turn) {
                if (index == this.users.length) {
                    this.turn = 0;
                    for (let j = 0; j < this.users.length; j++) {
                        this.users[j].emit("reset_turn", j.toString());
                        this.users[j].emit("your_turn", this.turn);
                    }
                }

            }

        });
        user.on("send message", (msg: string) => {
            console.log(this.users.length);
            for (let j = 0; j < this.users.length; j++) {
                this.users[j].emit("new message", {playername: user.getUserName, message: msg});
            }
        });

        // this.create_Card();
        // user.emit("start", {bobai: this.bobai, maincard: this.maincard.pop()});
        // console.log(this.maincard);
    }
    startgame = () => {
        this.isPlaying = true;
        this.ready = [];
        this.sort();
        this.create_Card();
        for (let i = 0; i < this.users.length; i++) {
            this.users[i].emit("ok_ready", i);
            this.users[i].emit('set_turn', {turn: i.toString(), id: this.users[0].id});
            this.users[i].emit('chia_bai', {bobai: this.bobai, maincard: this.maincard[i]});
            this.users[i].emit('start_game');
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
                console.log("data "+data.index);
                console.log("bai "+ this.bobai[data.index]);
                this.Attack(data);
                if (this.turn == this.users.length - 1) {
                    this.turn = 0;
                } else {
                    this.turn++;
                }
                let index = 0;
                if (!isNaN(data)) {
                    index = data
                }
                for (let j = 0; j < this.users.length; j++) {
                    this.users[j].emit("your_turn", this.turn.toString());
                }
            });
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
            let j = 0;
            if (this.isContant(this.bobai[i]) == false) {
                this.maincard.push(this.bobai[i]);
                this.mainid.push(this.users[j].id);
            }
            j++;
        }
    }
    isContant(value): boolean {
        for (let i = 0; i < this.maincard.length; i++) {
            if (this.maincard[i] == value) {
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
                key: this.key
            });
        }
        return infoArr
    }
    checkInfo = () => {
        for (let i = 0; i < this.users.length; i++) {
            this.users[i].emit("info_players", this.getInfo());
        }
        // console.log("dagui");

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
            if (i== 20 + col) {
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
    Attack = (data) => {
        let row = Math.floor(data.index / 5);
        let col = data.index % 5;
        let i = data.index;
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
            ;
            check.push(i + 4);
        }
        if (col != 4 && row != 0) {
            check.push(i - 4);
        }
        if (col != 4 && row != 4) {
            check.push(i + 6);
        }

        for (let j = 0; j < check.length; j++) {
            if (this.bobai[check[j]] == data.index) {
                // for (let i = 0; i < this.maincard.length; i++) {
                //     if (this.maincard[i] == this.bobai[check[j]] && this.mainid[i] == data.id) {
                //         console.log("ban trung roi" + data.id);
                //         break;
                //     }
                // }
                console.log("ban trung roi" + data.id);
            }
        }

    }
    onUserLeft = (i: number) => {
        if (i >= 0) {
            this.ready = [];
            this.users[i].isPlaying = false;
            this.users[i].idroom = null;
            this.users.splice(i, 1);
            this.checkInfo();
            if (this.users.length < 2) {
                this.isPlaying = false;
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

}