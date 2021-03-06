"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sprite = PIXI.Sprite;
const App_1 = require("../Const/App");
/**
 * Created by Vu Tien Dai on 21/11/2017.
 */
class Card extends Sprite {
    constructor(value, index) {
        super();
        this.count = 0;
        this.setValue = (value) => {
            let card;
            this.removeChildren();
            if (value) {
                let tr = '';
                if (Math.floor(value / 4) == 0) {
                    tr += '1';
                }
                else if (Math.floor(value / 4) == 1) {
                    tr += '2';
                }
                else if (Math.floor(value / 4) == 2) {
                    tr += '3';
                }
                else if (Math.floor(value / 4) == 3) {
                    tr += '4';
                }
                else if (Math.floor(value / 4) == 4) {
                    tr += '5';
                }
                else if (Math.floor(value / 4) == 5) {
                    tr += '6';
                }
                else if (Math.floor(value / 4) == 6) {
                    tr += '7';
                }
                else if (Math.floor(value / 4) == 7) {
                    tr += '8';
                }
                else if (Math.floor(value / 4) == 8) {
                    tr += '9';
                }
                else if (Math.floor(value / 4) == 9) {
                    tr += '10';
                }
                else if (Math.floor(value / 4) == 10) {
                    tr += '11';
                }
                else if (Math.floor(value / 4) == 11) {
                    tr += '12';
                }
                else if (Math.floor(value / 4) == 12) {
                    tr += '13';
                }
                if (value % 4 == 0) {
                    tr += 'ro';
                }
                else if (value % 4 == 1) {
                    tr += 'co';
                }
                else if (value % 4 == 2) {
                    tr += 'tep';
                }
                else if (value % 4 == 3) {
                    tr += 'bich';
                }
                this._str = tr;
                card = new PIXI.Sprite(PIXI.Texture.from(App_1.App.AssetCard + 'a_' + tr + '.png'));
            }
            else {
                card = new PIXI.Sprite(PIXI.Texture.from(App_1.App.AssetCard + 'mat-sau.png'));
            }
            card.anchor.set(0.5);
            this.addChild(card);
        };
        let card;
        if (value || index) {
            let x = 0;
            if (!isNaN(index)) {
                x = index;
            }
            this._index = x;
            let tr = '';
            if (Math.floor(value / 4) == 0) {
                tr += '1';
            }
            else if (Math.floor(value / 4) == 1) {
                tr += '2';
            }
            else if (Math.floor(value / 4) == 2) {
                tr += '3';
            }
            else if (Math.floor(value / 4) == 3) {
                tr += '4';
            }
            else if (Math.floor(value / 4) == 4) {
                tr += '5';
            }
            else if (Math.floor(value / 4) == 5) {
                tr += '6';
            }
            else if (Math.floor(value / 4) == 6) {
                tr += '7';
            }
            else if (Math.floor(value / 4) == 7) {
                tr += '8';
            }
            else if (Math.floor(value / 4) == 8) {
                tr += '9';
            }
            else if (Math.floor(value / 4) == 9) {
                tr += '10';
            }
            else if (Math.floor(value / 4) == 10) {
                tr += '11';
            }
            else if (Math.floor(value / 4) == 11) {
                tr += '12';
            }
            else if (Math.floor(value / 4) == 12) {
                tr += '13';
            }
            if (value % 4 == 0) {
                tr += 'ro';
            }
            else if (value % 4 == 1) {
                tr += 'co';
            }
            else if (value % 4 == 2) {
                tr += 'tep';
            }
            else if (value % 4 == 3) {
                tr += 'bich';
            }
            this._str = tr;
            card = new PIXI.Sprite(PIXI.Texture.from(App_1.App.AssetCard + 'a_' + tr + '.png'));
            this.stroke = new PIXI.Sprite(PIXI.Texture.from(App_1.App.AssetCard + 'stroke.png'));
            this.stroke.anchor.set(0.5);
            this.strokered = new PIXI.Sprite(PIXI.Texture.from(App_1.App.AssetCard + 'strokered.png'));
            this.strokered.anchor.set(0.5);
            this.strokegreen = new PIXI.Sprite(PIXI.Texture.from(App_1.App.AssetCard + 'strokegreen.png'));
            this.strokegreen.anchor.set(0.5);
            this.strokeblue = new PIXI.Sprite(PIXI.Texture.from(App_1.App.AssetCard + 'strokeblue.png'));
            this.strokeblue.anchor.set(0.5);
            this.startlight = new PIXI.Sprite(PIXI.Texture.from(App_1.App.AssetCard + 'startlight.png'));
            this.startlight.anchor.set(0.5);
            this.startlight.height = 148;
            this.startlight.width = 110;
            this.startlight.rotation = Math.PI;
            this.addChild(card, this.startlight, this.stroke, this.strokegreen, this.strokeblue, this.strokered);
            this.stroke.alpha = 0;
            this.strokered.alpha = 0;
            this.strokegreen.alpha = 0;
            this.strokeblue.alpha = 0;
            this.startlight.alpha = 0;
            this._value = value;
        }
        else {
            card = new PIXI.Sprite(PIXI.Texture.from(App_1.App.AssetCard + 'mat-sau.png'));
            this.addChild(card);
        }
        this.anchor.set(0.5);
        card.anchor.set(0.5);
        this.scale.set(0.8);
        this.interactive = true;
    }
    get str() {
        return this._str;
    }
    set str(value) {
        this._str = value;
    }
    get index() {
        return this._index;
    }
    set index(value) {
        this._index = value;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
    set setStroke(value) {
        this.strokered.alpha = 0;
        this.strokegreen.alpha = 0;
        this.strokeblue.alpha = 0;
        this.stroke.alpha = value;
    }
    set setStrokeRed(value) {
        this.stroke.alpha = 0;
        this.strokegreen.alpha = 0;
        this.strokeblue.alpha = 0;
        this.strokered.alpha = value;
    }
    set setStrokeGreen(value) {
        this.stroke.alpha = 0;
        this.strokered.alpha = 0;
        this.strokeblue.alpha = 0;
        this.strokegreen.alpha = value;
    }
    set setStrokeBlue(value) {
        this.stroke.alpha = 0;
        this.strokered.alpha = 0;
        this.strokegreen.alpha = 0;
        this.strokeblue.alpha = value;
    }
    set setStar(value) {
        this.startlight.alpha = value * 0.6;
    }
    set setMain(value) {
        this.startlight.alpha = value;
    }
}
exports.Card = Card;
//# sourceMappingURL=Card.js.map