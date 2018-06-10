import Container = PIXI.Container;
import {Arrow} from "../ObjectGame/Arrow";
import {Player} from "../Player";
import {Card} from "../ObjectGame/Card";
import Sprite = PIXI.Sprite;
import {Button} from "../IU/Button";
import * as gsap from "gsap"
import TweenMax = gsap.TweenMax;
import {isNullOrUndefined} from "util";
import {App} from "../Const/App";
import {viewGame} from "./viewGame";


/**
 * Created by Vu Tien Dai on 21/11/2017.
 */
export class BoardGame extends Container {
    data;
    atk = false;
    // count = 0
    cards: Card[];
    arrow: Arrow;
    player: Player;
    index_card: Card;
    index_attack: Card;
    privious: Card;
    last: Card;
    main_card: Card;
    btn_move: Button;
    btn_atk: Button;
    btn_dec: Button;
    target_context: Container;
    board_game: Container;
    ui_context: Container;

    constructor(data: Player) {
        super();

        this.cards = [];
        this.player = data;
        this.arrow = new Arrow();
        this.arrow.position.set(285, 110);
        this.addChild(this.arrow);
        this.board_game = new Container();
        this.board_game.position.set(260, 40)
        this.ui_context = new Container();
        this.target_context = new Container();
        this.target_context.visible = false;
        this.addChild(this.board_game, this.ui_context, this.target_context);

        this.createCardBoard();
        this.on("move_left", () => {
            this.player.emit("move_left", this.index_card.index)
        });
        this.on("move_right", () => {
            this.player.emit("move_right", this.index_card.index)
        });
        this.on("move_up", () => {
            this.player.emit("move_up", this.index_card.index)
        });
        this.on("move_down", () => {
            this.player.emit("move_down", this.index_card.index)
        });
        this.interactiveChildren = false;

    }

    createCardBoard = () => {
        this.board_game.removeChildren();
        for (let i = 0; i < 25; i++) {
            let card = new Card();
            if (Math.floor(i / 5) == 0)
                card.position.set(100 * (i % 5) + 65, 80);
            else
                card.position.set(100 * (i % 5) + 65, 130 * Math.floor(i / 5) + 83);
            this.board_game.addChild(card)
        }
    }
    createCard = (data) => {
        this.createUI();
        this.board_game.removeChildren();
        this.cards = [];
        for (let i = 0; i < data.bobai.length; i++) {
            let card = new Card(data.bobai[i], i);
            if (data.bobai[i] == data.maincard) {
                card.setStar = 1;
                this.main_card = card;

            }
            if (Math.floor(i / 5) == 0)
                card.position.set(100 * (i % 5) + 65, 80);
            else
                card.position.set(100 * (i % 5) + 65, 130 * Math.floor(i / 5) + 83);
            this.cards.push(card);
            this.board_game.addChild(card);
            card.on('pointerdown', (event) => {
                this.data = event.data;
                if (this.atk == false) {
                    card.alpha = 0.7;
                    card.setStroke = 0;
                    this.board_game.setChildIndex(this.cards[card.index], this.board_game.children.length - 1);

                }

            })
                .on('pointerup', () => {
                    if (this.data == null)
                        return;
                    if (this.atk == false) {
                        card.setStroke = 1;
                        this.index_card = card;
                        if (!isNullOrUndefined(this.last) && this.last.index != card.index) {
                            this.last.setStroke = 0;
                        }
                        this.last = card;
                        card.alpha = 1;
                    }
                    else {
                        card.setStrokeRed = 1
                        this.index_attack = card;
                        if (!isNullOrUndefined(this.privious) && this.privious.index != card.index) {
                            this.privious.setStrokeGreen = 1;
                        }
                        this.privious = card;
                    }
                    this.data = null;

                })
                .on('pointerout', () => {
                    if (this.data == null)
                        return;
                    if (this.atk == false) {
                        card.setStroke = 0;
                        card.alpha = 1;
                        this.index_card = null;
                    }

                    this.data = null;
                })
        }

    }
    createUI = () => {
        this.btn_move = new Button(860, 310, "Move");
        let size = new PIXI.Point(120, 40);
        this.btn_move.setSize(size);
        let i = 0;
        let count1 = 0;
        let count2 = 0;
        let count3 = 0;
        this.btn_move.onClick = () => {
            if (!isNullOrUndefined(this.index_card) && i != this.index_card.index) {
                this.arrow.setPos(this.index_card.index);
                i = this.index_card.index;
                count1++;
                this.btn_atk.interactive = false;
                this.btn_dec.interactive = false;
                this.btn_atk.alpha = 0.7;
                this.btn_dec.alpha = 0.7;
            }
            else if (!isNullOrUndefined(this.index_card) && i == this.index_card.index && count1 == 1) {
                this.arrow.setClose();
                count1 = 0;
                this.btn_atk.interactive = true;
                this.btn_dec.interactive = true;
                this.btn_atk.alpha = 1;
                this.btn_dec.alpha = 1;
            }
            else if (!isNullOrUndefined(this.index_card) && i == this.index_card.index && count1 == 0) {
                this.arrow.setPos(this.index_card.index);
                i = this.index_card.index;
                count1++;
                this.btn_atk.interactive = false;
                this.btn_dec.interactive = false;
                this.btn_atk.alpha = 0.7;
                this.btn_dec.alpha = 0.7;
            }
            else {
                this.arrow.setClose();
                count1 = 0;
                this.btn_atk.interactive = true;
                this.btn_dec.interactive = true;
                this.btn_atk.alpha = 1;
                this.btn_dec.alpha = 1;
            }
            this.ui_context.visible = true;
        }
        this.btn_atk = new Button(995, 310, "Attack");
        this.btn_atk.setSize(size);
        this.btn_atk.onClick = () => {
            if (!isNullOrUndefined(this.main_card)) {
                this.arrow.setClose();
                if (!isNullOrUndefined(this.main_card) && count2 == 0) {
                    this.btn_move.interactive = false;
                    this.btn_dec.interactive = false;
                    this.btn_move.alpha = 0.7;
                    this.btn_dec.alpha = 0.7;
                    this.target_context.visible = true;
                    this.Attack(true);
                    count2++;
                }
                else {
                    this.index_attack = null;
                    for (let i = 0; i < this.cards.length; i++) {
                        this.cards[i].interactive = true;
                    }
                    this.atk = false;
                    this.btn_move.interactive = true;
                    this.btn_dec.interactive = true;
                    this.btn_move.alpha = 1;
                    this.btn_dec.alpha = 1;
                    this.target_context.visible = false;
                    this.Attack(false);
                    this.privious = null;
                    count2 = 0;
                }

            }
            this.ui_context.visible = true;
        }
        this.btn_dec = new Button(1130, 310, "Detection");
        this.btn_dec.setSize(size);
        this.btn_dec.onClick = () => {
            if (!isNullOrUndefined(this.index_card) && count3 == 0) {
                this.Attack(true);
                count3++;
            }
            else {
                for (let i = 0; i < this.cards.length; i++) {
                    this.cards[i].interactive = true;
                }
                count3 = 0;
            }
            this.ui_context.visible = true;
        }
        // target = new Button(1000, 355, "Go");
        // target.setSize(size);
        // target.interactive = false;
        // target.alpha = 0;
        // target.onClick = () => {
        //     if (!isNullOrUndefined(this.index_attack)) {
        //         for (let i = 0; i < this.cards.length; i++) {
        //             this.cards[i].interactive = true;
        //             this.cards[i].setStroke = 0;
        //             // this.player.emit("attack",this.index_attack.index);
        //         }
        //         console.log("attack : " + this.index_attack.str);
        //         this.btn_move.interactive = true;
        //         this.btn_dec.interactive = true;
        //         this.btn_move.alpha = 1;
        //         this.btn_dec.alpha = 1;
        //         target.interactive = false;
        //         target.alpha = 0;
        //         this.atk = false;
        //         this.privious = null;
        //         this.index_attack = null;
        //     }
        // }
        this.ui_context.addChild(this.btn_move, this.btn_atk, this.btn_dec);
    }
    onTarget = (data) => {
        this.target_context.removeChildren();
        for (let i = 0; i < data.length; i++) {
            if (data[i].id != this.player.id) {
                let target = new Button(860 + 135 * i, 355, data[i].name + " ");
                let size = new PIXI.Point(120, 40);
                target.setSize(size);
                target.onClick = () => {
                    if (!isNullOrUndefined(this.index_attack)) {
                        for (let i = 0; i < this.cards.length; i++) {
                            this.cards[i].interactive = true;
                            this.cards[i].setStroke = 0;

                        }
                        this.player.emit("attack", {id: data[i].id, index: this.index_attack.index});
                        console.log("attack : " + this.index_attack.str);
                        this.btn_move.interactive = true;
                        this.btn_dec.interactive = true;
                        this.btn_move.alpha = 1;
                        this.btn_dec.alpha = 1;
                        this.target_context.visible = false;
                        this.atk = false;
                        this.privious = null;
                        this.index_attack = null;
                    }
                }
                this.target_context.addChild(target);
            }
        }
    }
    Attack = (val) => {
        let value;
        if (val == true) {
            value = 1;
        }
        else {
            value = 0;
        }
        let row = Math.floor(this.main_card.index / 5);
        let col = this.main_card.index % 5;
        let i = this.main_card.index;
        let check = [];
        if (col != 0) {
            this.cards[i - 1].setStrokeGreen = value;
            check.push(i - 1);
        }
        if (col != 4) {
            this.cards[i + 1].setStrokeGreen = value;
            check.push(i + 1);
        }
        if (row != 0) {
            this.cards[i - 5].setStrokeGreen = value;
            check.push(i - 5);
        }
        if (row != 4) {
            this.cards[i + 5].setStrokeGreen = value;
            check.push(i + 5);
        }
        if (col != 0 && row != 0) {
            this.cards[i - 6].setStrokeGreen = value;
            check.push(i - 6);
        }
        if (col != 0 && row != 4) {
            this.cards[i + 4].setStrokeGreen = value;
            check.push(i + 4);
        }
        if (col != 4 && row != 0) {
            this.cards[i - 4].setStrokeGreen = value;
            check.push(i - 4);
        }
        if (col != 4 && row != 4) {
            this.cards[i + 6].setStrokeGreen = value;
            check.push(i + 6);
        }
        if (val == true) {
            for (let i = 0; i < this.cards.length; i++) {
                this.cards[i].interactive = false;
            }
            for (let j = 0; j < check.length; j++) {
                this.cards[check[j]].interactive = true;
            }
            this.atk = true;
        }
    }
    moveUp = (data: number) => {
        let row = Math.floor(data / 5);
        let col = data % 5;
        let temp;
        for (let i = col; i < 21 + col; i = i + 5) {
            if (i == col) {
                temp = this.cards[i];
                this.board_game.setChildIndex(this.cards[i], this.board_game.children.length - 1);
                TweenMax.to(this.cards[i], 1, {x: this.cards[i + 20].x, y: this.cards[i + 20].y});
            }

            else {
                TweenMax.to(this.cards[i], 0.8, {x: this.cards[i - 5].x, y: this.cards[i - 5].y});
                this.cards[i - 5] = this.cards[i];
                this.cards[i - 5].index = i - 5;
            }
        }
        temp.index = 20 + col;
        this.cards[20 + col] = temp;
        this.btn_atk.interactive = true;
        this.btn_dec.interactive = true;
        this.btn_atk.alpha = 1;
        this.btn_dec.alpha = 1;
        this.showCard();
        setTimeout(this.resetPos, 2000);
    }
    moveDown = (data: number) => {

        let row = Math.floor(data / 5);
        let col = data % 5;
        let length = data;
        let temp;
        let pos;
        for (let i = 20 + col; i > col - 1; i = i - 5) {
            if (i == 20 + col) {
                temp = this.cards[i];
                this.board_game.setChildIndex(this.cards[i], this.board_game.children.length - 1);
                TweenMax.to(this.cards[i], 1, {x: this.cards[col].x, y: this.cards[col].y});

            }
            else {
                TweenMax.to(this.cards[i], 0.8, {x: pos.x, y: pos.y});
            }
            if (i > col) {
                pos = this.cards[i].position;
                this.cards[i] = this.cards[i - 5];
                this.cards[i].index = i;
            }
        }


        this.cards[col] = temp;
        this.cards[col].index = col;
        this.btn_atk.interactive = true;
        this.btn_dec.interactive = true;
        this.btn_atk.alpha = 1;
        this.btn_dec.alpha = 1;
        this.showCard();
        setTimeout(this.resetPos, 2000);
    }
    moveRight = (data: number) => {
        let row = Math.floor(data / 5);
        let col = data % 5;
        let length = data;
        let temp;
        let pos;
        let x = length + 4 - col;
        for (let i = length + 4 - col; i > length - col - 1; i--) {

            if (i == length + 4 - col) {

                temp = this.cards[i];
                this.board_game.setChildIndex(this.cards[i], this.board_game.children.length - 1);
                TweenMax.to(this.cards[i], 1, {x: this.cards[i - 4].x, y: this.cards[i - 4].y});

            }
            else {
                TweenMax.to(this.cards[i], 0.8, {x: pos.x, y: pos.y});
            }
            if (i > length - col) {
                pos = this.cards[i].position;
                this.cards[i] = this.cards[i - 1];
                this.cards[i].index = i;
            }
        }


        this.cards[length - col] = temp;
        this.cards[length - col].index = length - col;
        this.btn_atk.interactive = true;
        this.btn_dec.interactive = true;
        this.btn_atk.alpha = 1;
        this.btn_dec.alpha = 1;
        setTimeout(this.resetPos, 2000);
    }
    moveLeft = (data: number) => {
        let row = Math.floor(data / 5);
        let col = data % 5;
        let length = data;
        let temp;
        for (let i = length - col; i < length + 5 - col; i++) {

            if (i == length - col) {
                temp = this.cards[i];
                this.board_game.setChildIndex(this.cards[i], this.board_game.children.length - 1);
                TweenMax.to(this.cards[i], 1, {x: this.cards[i + 4].x, y: this.cards[i + 4].y});
            }

            else {
                TweenMax.to(this.cards[i], 0.8, {x: this.cards[i - 1].x, y: this.cards[i - 1].y});
                this.cards[i - 1] = this.cards[i];
                this.cards[i - 1].index = i - 1;
            }
        }
        temp.index = length + 4 - col;
        this.cards[length + 4 - col] = temp;
        this.btn_atk.interactive = true;
        this.btn_dec.interactive = true;
        this.btn_atk.alpha = 1;
        this.btn_dec.alpha = 1;
        this.showCard();
        setTimeout(this.resetPos, 2000);
    }
    setMainCard = (data) => {
        for (let i = 0; i < this.cards.length; i++) {
            if (this.cards[i].value == data) {
                this.main_card.setStar = 0;
                this.main_card = this.cards[i];
                this.main_card.setStar = 1;
            }
        }

    }
    resetPos = () => {
        for (let i = 0; i < this.cards.length; i++) {
            if (Math.floor(this.cards[i].index / 5) == 0)
                this.cards[i].position.set(100 * (i % 5) + 65, 80);
            else
                this.cards[i].position.set(100 * (i % 5) + 65, 130 * Math.floor(i / 5) + 83);
        }
    }
    intactiveFalse = () => {
        this.index_card =null;
        this.interactiveChildren = false;
        this.ui_context.alpha = 0.7;
        this.target_context.visible = false;
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].setStroke = 0;
        }

    }
    intactiveTrue = () => {
        this.interactiveChildren = true;
        this.ui_context.alpha = 1;
        this.target_context.visible = false;
    }
    showCard=()=>{
        let x ="";
        for (let i=0 ;i<this.cards.length;i++){
            x += " "+this.cards[i].value;
        }
        console.log(x);
    }
    isConstant(array, value): boolean {
        for (let i = 0; i < array.length; i++) {
            if (array[i] == value) {
                return true;
            }
        }
        return false;
    }

}