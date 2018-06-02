"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class App {
}
// static readonly Host:string = 'http://192.168.43.38/';
App.Host = 'http://localhost:3000/';
// static readonly Domain:string = 'http://192.168.43.38/';
App.Domain = 'http://localhost/';
App.IsWeb = true;
App.AssetDir = App.Host + 'asset/';
App.AssetCard = App.Host + 'asset/Quanbai/';
App.width = 1200;
App.height = 760;
App.W = App.width;
App.H = App.height;
exports.App = App;
//# sourceMappingURL=App.js.map