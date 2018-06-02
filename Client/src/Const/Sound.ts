import {HowlerUtils} from "../HowlerUtils";
/**
 * Created by Vu Tien Dai on 17/08/2017.
 */
export class Sound {
    map;
    BG;
    voice;
    isRunBG = false;
    arr_last = [];
    isRunV = false;
    BG_run;

    constructor() {
        this.createAll();
        this.createBG();
        this.createVoice();
    }

    play_Voice = (url: string) => {
        if (this.isRunV)
            this.voice.get(url).play();
    }
    stop_Voice = (url: string) => {
        this.voice.get(url).stop_Voice();
    }
    play_BG = (url: string) => {
        if (this.isRunBG) {
                this.stop_BG();
            this.BG.get(url).play();
        }
    }
    stop_BG=()=>{
        this.BG.forEach((value, key) => {
           this.BG.get(key).pause();
        });
    }

    ALLMuteBG = () => {
        this.isRunBG = false;
        this.BG.forEach((value, key) => {
            if(this.BG.get(key).playing()==true){
                this.arr_last.push(this.BG.get(key))
            };
        });
        this.stop_BG();
    }
    ALLStartBG = () => {
        for (let i = 0; i < this.arr_last.length; i++) {
            this.arr_last[i].play();
        }
        this.arr_last=[];
    }
    AllMuteVoice = () => {
        this.isRunV = false;
        this.voice.forEach((value, key) => {
            this.voice.get(key).stop();
        });
    }
    ALLStartVoice = () => {
        this.isRunV = true;
    }
    createAll = () => {
        this.map = new Map([
            ["Wait", HowlerUtils.QueenGarden],
            ["Play", HowlerUtils.Orbis],
            ["Login", HowlerUtils.Login],
            ["HetGio", HowlerUtils.HetGio],
            ["AnQuan", HowlerUtils.AnQuan],
            ["ConGa", HowlerUtils.ConGa],
            ["An", HowlerUtils.An],
            ["HaiNha", HowlerUtils.HaiNha],
            ["Hazz", HowlerUtils.Hazz],
            ["DiDau", HowlerUtils.DiDau],
            ["Othua", HowlerUtils.Othua],
            ["TQKV", HowlerUtils.TQKV],
            ["TQBR", HowlerUtils.TQBR],
            ["TRBT", HowlerUtils.TRBT],
            ["Stone", HowlerUtils.Stone],
            ["MouseClick", HowlerUtils.MouseClick],
            ["TrungLon",HowlerUtils.TrungLon]
        ]);
    }
    createBG = () => {
        this.BG = new Map([
            ["Wait", HowlerUtils.QueenGarden],
            ["Play", HowlerUtils.Orbis],
            ["Login", HowlerUtils.Login],
        ])
    }

    createVoice = () => {
        this.voice = new Map([
            ["HetGio", HowlerUtils.HetGio],
            ["AnQuan", HowlerUtils.AnQuan],
            ["ConGa", HowlerUtils.ConGa],
            ["An", HowlerUtils.An],
            ["HaiNha", HowlerUtils.HaiNha],
            ["Hazz", HowlerUtils.Hazz],
            ["DiDau", HowlerUtils.DiDau],
            ["Othua", HowlerUtils.Othua],
            ["TQKV", HowlerUtils.TQKV],
            ["TQBR", HowlerUtils.TQBR],
            ["TRBT", HowlerUtils.TRBT],
            ["Stone", HowlerUtils.Stone],
            ["MouseClick", HowlerUtils.MouseClick],
            ["TrungLon",HowlerUtils.TrungLon],
            ["Hoa",HowlerUtils.Hoa]
        ])
    }
}