"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HowlerUtils_1 = require("../HowlerUtils");
/**
 * Created by Vu Tien Dai on 17/08/2017.
 */
class Sound {
    constructor() {
        this.isRunBG = false;
        this.arr_last = [];
        this.isRunV = false;
        this.play_Voice = (url) => {
            if (this.isRunV)
                this.voice.get(url).play();
        };
        this.stop_Voice = (url) => {
            this.voice.get(url).stop_Voice();
        };
        this.play_BG = (url) => {
            if (this.isRunBG) {
                this.stop_BG();
                this.BG.get(url).play();
            }
        };
        this.stop_BG = () => {
            this.BG.forEach((value, key) => {
                this.BG.get(key).pause();
            });
        };
        this.ALLMuteBG = () => {
            this.isRunBG = false;
            this.BG.forEach((value, key) => {
                if (this.BG.get(key).playing() == true) {
                    this.arr_last.push(this.BG.get(key));
                }
                ;
            });
            this.stop_BG();
        };
        this.ALLStartBG = () => {
            for (let i = 0; i < this.arr_last.length; i++) {
                this.arr_last[i].play();
            }
            this.arr_last = [];
        };
        this.AllMuteVoice = () => {
            this.isRunV = false;
            this.voice.forEach((value, key) => {
                this.voice.get(key).stop();
            });
        };
        this.ALLStartVoice = () => {
            this.isRunV = true;
        };
        this.createAll = () => {
            this.map = new Map([
                ["Wait", HowlerUtils_1.HowlerUtils.QueenGarden],
                ["Play", HowlerUtils_1.HowlerUtils.Orbis],
                ["Login", HowlerUtils_1.HowlerUtils.Login],
                ["HetGio", HowlerUtils_1.HowlerUtils.HetGio],
                ["AnQuan", HowlerUtils_1.HowlerUtils.AnQuan],
                ["ConGa", HowlerUtils_1.HowlerUtils.ConGa],
                ["An", HowlerUtils_1.HowlerUtils.An],
                ["HaiNha", HowlerUtils_1.HowlerUtils.HaiNha],
                ["Hazz", HowlerUtils_1.HowlerUtils.Hazz],
                ["DiDau", HowlerUtils_1.HowlerUtils.DiDau],
                ["Othua", HowlerUtils_1.HowlerUtils.Othua],
                ["TQKV", HowlerUtils_1.HowlerUtils.TQKV],
                ["TQBR", HowlerUtils_1.HowlerUtils.TQBR],
                ["TRBT", HowlerUtils_1.HowlerUtils.TRBT],
                ["Stone", HowlerUtils_1.HowlerUtils.Stone],
                ["MouseClick", HowlerUtils_1.HowlerUtils.MouseClick],
                ["TrungLon", HowlerUtils_1.HowlerUtils.TrungLon]
            ]);
        };
        this.createBG = () => {
            this.BG = new Map([
                ["Wait", HowlerUtils_1.HowlerUtils.QueenGarden],
                ["Play", HowlerUtils_1.HowlerUtils.Orbis],
                ["Login", HowlerUtils_1.HowlerUtils.Login],
            ]);
        };
        this.createVoice = () => {
            this.voice = new Map([
                ["HetGio", HowlerUtils_1.HowlerUtils.HetGio],
                ["AnQuan", HowlerUtils_1.HowlerUtils.AnQuan],
                ["ConGa", HowlerUtils_1.HowlerUtils.ConGa],
                ["An", HowlerUtils_1.HowlerUtils.An],
                ["HaiNha", HowlerUtils_1.HowlerUtils.HaiNha],
                ["Hazz", HowlerUtils_1.HowlerUtils.Hazz],
                ["DiDau", HowlerUtils_1.HowlerUtils.DiDau],
                ["Othua", HowlerUtils_1.HowlerUtils.Othua],
                ["TQKV", HowlerUtils_1.HowlerUtils.TQKV],
                ["TQBR", HowlerUtils_1.HowlerUtils.TQBR],
                ["TRBT", HowlerUtils_1.HowlerUtils.TRBT],
                ["Stone", HowlerUtils_1.HowlerUtils.Stone],
                ["MouseClick", HowlerUtils_1.HowlerUtils.MouseClick],
                ["TrungLon", HowlerUtils_1.HowlerUtils.TrungLon],
                ["Hoa", HowlerUtils_1.HowlerUtils.Hoa]
            ]);
        };
        this.createAll();
        this.createBG();
        this.createVoice();
    }
}
exports.Sound = Sound;
//# sourceMappingURL=Sound.js.map