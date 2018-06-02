"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Vu Tien Dai on 11/08/2017.
 */
const howler = require("howler");
var Howl = howler.Howl;
const App_1 = require("./Const/App");
class HowlerUtils {
}
HowlerUtils.QueenGarden = new Howl({
    src: [App_1.App.AssetDir + 'SoundTrack/QueenGarden.mp3'],
    loop: true,
    volume: 0.15
});
HowlerUtils.Orbis = new Howl({
    src: [App_1.App.AssetDir + 'SoundTrack/Orbis.mp3'],
    loop: true,
    volume: 0.15
});
HowlerUtils.HetGio = new Howl({
    src: [App_1.App.AssetDir + 'SoundTrack/Game/hetgio.mp3'],
    volume: 0.5
});
HowlerUtils.AnQuan = new Howl({
    src: [App_1.App.AssetDir + 'SoundTrack/Game/anquan.m4a'],
    volume: 0.5
});
HowlerUtils.ConGa = new Howl({
    src: [App_1.App.AssetDir + 'SoundTrack/Game/conga.m4a'],
    volume: 0.5
});
HowlerUtils.An = new Howl({
    src: [App_1.App.AssetDir + 'SoundTrack/Game/An.m4a'],
    volume: 0.5
});
HowlerUtils.HaiNha = new Howl({
    src: [App_1.App.AssetDir + 'SoundTrack/Game/Hainha.m4a'],
    volume: 0.5
});
HowlerUtils.DiDau = new Howl({
    src: [App_1.App.AssetDir + 'SoundTrack/Game/didauroi.m4a'],
    volume: 0.5
});
HowlerUtils.Hazz = new Howl({
    src: [App_1.App.AssetDir + 'SoundTrack/Game/haz.m4a'],
    volume: 0.5
});
HowlerUtils.Othua = new Howl({
    src: [App_1.App.AssetDir + 'SoundTrack/Game/othuaa.m4a'],
    volume: 0.5
});
HowlerUtils.Hoa = new Howl({
    src: [App_1.App.AssetDir + 'SoundTrack/Game/hoa.mp3'],
    volume: 0.5
});
HowlerUtils.TQKV = new Howl({
    src: [App_1.App.AssetDir + 'SoundTrack/Game/TQKV.m4a'],
    volume: 0.5
});
HowlerUtils.TQBR = new Howl({
    src: [App_1.App.AssetDir + 'SoundTrack/Game/TQBR.m4a'],
    volume: 0.5
});
HowlerUtils.TRBT = new Howl({
    src: [App_1.App.AssetDir + 'SoundTrack/Game/TRBT.m4a'],
    volume: 0.5
});
HowlerUtils.TrungLon = new Howl({
    src: [App_1.App.AssetDir + 'SoundTrack/Game/trunglon.m4a'],
    volume: 0.5
});
HowlerUtils.Stone = new Howl({
    src: [App_1.App.AssetDir + 'SoundTrack/Stone.wav'],
    volume: 0.7
});
HowlerUtils.Login = new Howl({
    src: [App_1.App.AssetDir + 'SoundTrack/LoginMaple.mp3'],
    volume: 1.5,
    loop: true
});
HowlerUtils.MouseClick = new Howl({
    src: [App_1.App.AssetDir + 'SoundTrack/Mouse.aif'],
    volume: 2
});
exports.HowlerUtils = HowlerUtils;
//# sourceMappingURL=HowlerUtils.js.map