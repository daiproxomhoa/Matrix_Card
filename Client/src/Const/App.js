"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class App {
}
App.Host = 'http://192.168.0.109:3000/';
// static readonly Host:string = 'http://localhost:3000/';
// static readonly Domain:string = 'http://192.168.43.38/';
App.Domain = 'http://localhost/';
App.IsWeb = true;
App.AssetDir = App.Host + 'asset/';
App.AssetCard = App.Host + 'asset/Quanbai/';
App.width = 1200;
App.height = 760;
App.W = App.width;
App.H = App.height;
App.Scale = 1;
exports.App = App;
//# sourceMappingURL=App.js.map