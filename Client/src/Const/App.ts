export class App {
    static readonly Host:string = 'http://192.168.0.109:3000/';
    // static readonly Host:string = 'http://localhost:3000/';
    // static readonly Domain:string = 'http://192.168.43.38/';
    static readonly Domain:string = 'http://localhost/';
    static readonly IsWeb:boolean =true;
    static readonly AssetDir = App.Host + 'asset/';
    static readonly AssetCard = App.Host + 'asset/Quanbai/';
    static width = 1200;
    static height =760;
    static W = App.width;
    static H =App.height;
    static Scale = 1;
}