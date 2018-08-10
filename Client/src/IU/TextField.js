"use strict";
/**
 * Created by Vu Tien Dai on 20/08/2017.
 */
/**
 * Created by Administrator on 26/02/2017.
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("pixi.js");
var Rectangle = PIXI.Rectangle;
const Input = require("./TextInput");
const App_1 = require("../Const/App");
class TextField extends PIXI.Container {
    constructor(x, y, size = 1, name) {
        super();
        this.size = size;
        this.focus = () => {
            this.input.focus();
        };
        this.blur = () => {
            this.input.blur();
        };
        this.getText = () => {
            return this.input.text;
        };
        this.setText = (text) => {
            this.input.setText(text);
        };
        let base = PIXI.BaseTexture.fromImage(App_1.App.AssetDir + "Picture/IU/textfield.png");
        let left = new PIXI.Sprite(new PIXI.Texture(base, new Rectangle(0, 0, 50, 127)));
        left.anchor.set(0, 0.5);
        let center = new PIXI.Sprite(new PIXI.Texture(base, new Rectangle(50, 0, 650, 127)));
        center.anchor.set(0, 0.5);
        let right = new PIXI.Sprite(new PIXI.Texture(base, new Rectangle(700, 0, 41, 127)));
        right.anchor.set(0, 0.5);
        this.addChild(left);
        this.addChild(center);
        center.width = center.width * size;
        center.x = 50;
        this.addChild(right);
        right.x = 50 + center.width;
        this.style = new PIXI.TextStyle({
            fontFamily: 'Segoe ui',
            fontSize: 42,
            fill: '#ffffff',
        });
        if (name) {
            this.displayName = new PIXI.Text(name);
            this.displayName.style = new PIXI.TextStyle({
                fontFamily: 'Myriad Pro Bold',
                fontSize: 52,
                fontWeight: 'bold',
                fill: '#613012',
            });
            this.displayName.y = -120;
            this.addChild(this.displayName);
        }
        this.x = x;
        this.y = y;
        this.x = x;
        this.y = y;
        this.style = new PIXI.TextStyle({
            fontFamily: 'Segoe ui',
            fontSize: 48,
            fill: '#ffffff',
        });
        this.input = new Input.PixiTextInput("", this.style);
        this.input.background = false;
        this.input.width = center.width;
        this.input.caretColor = 0xffffff;
        this.input.x = 20;
        this.input.y = -this.input.height / 2;
        this.addChild(this.input);
        // this.input.on("pointerdown", () => {
        //     console.log("Dm")
        //     let item: any = document.getElementById("textbox");
        //     item.focus();
        //     item.value = this.input.text;
        //     item.addEventListener("keydown", (e) => {
        //         if (e.keyCode == 13) {
        //             item.blur();
        //             window.scroll({
        //                 top: 0,
        //                 left: 0,
        //                 behavior: 'smooth'
        //             });
        //         }
        //         this.setText(item.value)
        //     });
        // }
        // );
    }
    set onEnterPress(fn) {
        this.input.onEnterPress = fn;
    }
    scaleSize(x, y) {
        this.width = this.width * x;
        this.height = this.height * y;
    }
    setSize(x, y) {
        this.width = x;
        this.height = y;
    }
}
exports.TextField = TextField;
//# sourceMappingURL=TextField.js.map