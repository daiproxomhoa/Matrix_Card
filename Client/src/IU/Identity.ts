import Container = PIXI.Container;
import {Button} from "./Button";
import {App} from "../Const/App";
/**
 * Created by Vu Tien Dai on 19/08/2017.
 */
export class Identity extends Container {
    get sex(): boolean {
        return this._sex;
    }
    checkMale: Button;
    checkFeMale: Button;
    private _sex = true;
    private style = new PIXI.TextStyle({
        fontFamily: 'Segoe UI',
        fontSize: 42,
        fill: '#1f1f1f',
    });

    constructor() {
        super();
        this.create();
    }

    create = () => {
        this.checkMale = new Button(0, 0, "", App.AssetDir + "Picture/IU/radiobtn1.png");
        this.checkMale.setSize(new PIXI.Point(50, 50));
        this.checkMale.onClick = () => {
            if (this._sex == false) {
                this._sex =true;
                this.checkMale.texture=PIXI.Texture.fromImage(App.AssetDir + "Picture/IU/radiobtn1.png");
                this.checkFeMale.texture=PIXI.Texture.fromImage(App.AssetDir + "Picture/IU/radiobtn2.png");
            }
        }
        let male = new PIXI.Text("Male", this.style);
        this.checkFeMale = new Button(210, 0, "", App.AssetDir + "Picture/IU/radiobtn2.png");
        this.checkFeMale.setSize(new PIXI.Point(50, 50));
        this.checkFeMale.onClick = () => {
            if (this._sex == true) {
                this._sex =false;
                this.checkMale.texture=PIXI.Texture.fromImage(App.AssetDir + "Picture/IU/radiobtn2.png");
                this.checkFeMale.texture=PIXI.Texture.fromImage(App.AssetDir + "Picture/IU/radiobtn1.png");
            }
        }
        let female = new PIXI.Text("FeMale", this.style);
        male.position.set(45,-18);
        female.position.set(252,-18);
        this.addChild(this.checkMale, this.checkFeMale, male, female)
        this.scale.set(0.7);
    }
}