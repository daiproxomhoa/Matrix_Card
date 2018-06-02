"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rectangle = PIXI.Rectangle;
const gsap = require("gsap");
var TweenMax = gsap.TweenMax;
const App_1 = require("../Const/App");
/**
 * Created by Administrator on 06/03/2017.
 */
class ScrollPane extends PIXI.Container {
    constructor(wid = 382, hei = 134, ...heads) {
        super();
        this.wid = wid;
        this.hei = hei;
        this.smooth = 6;
        this.lineBreak = 5;
        this.mouseOver = false;
        this.anim = false;
        this.lastline = 12;
        this.scroll = (e) => {
            if (this.content.height < this.height)
                return;
            if (this.mouseOver) {
                if (!this.anim) {
                    this.content.y += e.wheelDelta / this.smooth;
                }
                if (this.content.y + e.wheelDelta / this.smooth > this.height / 5 + this.head) {
                    this.anim = true;
                    TweenMax.to(this.content, 0.5, { y: this.head, onComplete: () => this.anim = false });
                    return;
                }
                if (this.content.y + e.wheelDelta / this.smooth < -((this.content.height - this.height + 10 + this.head) + this.height / 5)) {
                    this.anim = true;
                    TweenMax.to(this.content, 0.5, {
                        y: -(this.content.height - this.height + 80),
                        onComplete: () => this.anim = false
                    });
                    return;
                }
            }
        };
        this.onMouseDown = (e) => {
            this.pointerData = e.data;
            this.mouseY = e.data.global.y;
            this.oldPos = e.data.global.y;
        };
        this.onMouseMove = (e) => {
            if (this.content.height < this.height)
                return;
            if (this.pointerData != null) {
                let delta = App_1.App.IsWeb ? e.data.global.y - this.mouseY : (e.data.global.y - this.mouseY) / (App_1.App.W / App_1.App.width);
                if (Math.abs(e.data.global.y - this.oldPos) > 10)
                    this.interactiveChildren = false;
                this.mouseY = e.data.global.y;
                if (!this.anim) {
                    this.content.y += delta;
                }
                if (this.content.y + delta > this.height / 5 + this.head) {
                    this.anim = true;
                    TweenMax.to(this.content, 0.5, { y: this.head, onComplete: () => this.anim = false });
                    return;
                }
                if (this.content.y + delta < -((this.content.height - this.height + 10 + this.head) + this.height / 5)) {
                    this.anim = true;
                    TweenMax.to(this.content, 0.5, {
                        y: -(this.content.height - this.height + 80),
                        onComplete: () => this.anim = false
                    });
                    return;
                }
            }
        };
        this.onMouseUp = () => {
            this.pointerData = null;
            this.interactiveChildren = true;
            for (let child of this.content.children) {
                child.emit("pointerout");
            }
        };
        this.addChildrent = (child, pos = "left") => {
            if (child instanceof PIXI.Text) {
                child.style.wordWrap = true;
                child.style.wordWrapWidth = this.width - 30;
                child.style.fontSize = 12;
                child.style.fill = "#ffffff";
            }
            child.x = 15;
            if (pos == "center") {
                child.x = this.wid / 2;
            }
            child.y = this.lastline + this.lineBreak;
            this.lastline = child.y + child.height;
            this.content.addChild(child);
            if (child.y > this.height - 70) {
                this.content.y = -(child.y - this.height + 70);
            }
        };
        this.removeAllChild = () => {
            this.content.removeChildren();
        };
        this.moveToHead = () => {
            this.anim = true;
            let time = -this.content.y / this.height;
            if (time < 0)
                time = 0;
            TweenMax.to(this.content, time, { y: this.head, onComplete: () => this.anim = false });
        };
        let dx = wid - 22;
        let dy = hei - 24;
        let base;
        base = PIXI.BaseTexture.fromImage(App_1.App.AssetDir + "Picture/IU/scrollpane.png");
        let topLeft = new PIXI.Sprite(new PIXI.Texture(base, new Rectangle(0, 0, 10, 10)));
        topLeft.position.set(0, 0);
        let top = new PIXI.Sprite(new PIXI.Texture(base, new Rectangle(10, 0, 360, 10)));
        top.width = dx;
        top.position.set(10, 0);
        let topRight = new PIXI.Sprite(new PIXI.Texture(base, new Rectangle(370, 0, 12, 10)));
        topRight.position.set(dx + 10, 0);
        let left = new PIXI.Sprite(new PIXI.Texture(base, new Rectangle(0, 10, 10, 110)));
        left.height = dy;
        left.position.set(0, 10);
        let center = new PIXI.Sprite(new PIXI.Texture(base, new Rectangle(10, 10, 360, 110)));
        center.width = dx;
        center.height = dy;
        center.position.set(10, 10);
        let right = new PIXI.Sprite(new PIXI.Texture(base, new Rectangle(370, 10, 12, 110)));
        right.height = dy;
        right.position.set(dx + 10, 10);
        let bottomLeft = new PIXI.Sprite(new PIXI.Texture(base, new Rectangle(0, 120, 10, 14)));
        bottomLeft.position.set(0, dy + 10);
        let bottom = new PIXI.Sprite(new PIXI.Texture(base, new Rectangle(10, 120, 360, 14)));
        bottom.width = dx;
        bottom.position.set(10, dy + 10);
        let bottomRight = new PIXI.Sprite(new PIXI.Texture(base, new Rectangle(370, 120, 12, 14)));
        bottomRight.position.set(dx + 10, dy + 10);
        this.addChild(topLeft, top, topRight, left, center, right, bottomLeft, bottom, bottomRight);
        this.content = new PIXI.Container();
        let area = new PIXI.Graphics();
        if (heads.length != 0) {
            area.drawRect(-30, 50, dx + 80, dy - 40);
            this.content.hitArea = new PIXI.Rectangle(10, 40, dx, dy - 30);
            this.content.y = 20;
            this.head = 4;
        }
        else {
            area.drawRect(10, 10, dx, dy);
            this.content.hitArea = new PIXI.Rectangle(10, 10, dx, dy);
            this.head = 0;
        }
        this.addChild(this.content);
        this.addChild(area);
        this.content.mask = area;
        if (heads.length != 0) {
            let headContainer = new PIXI.Container();
            for (let i = 0; i < heads.length; i++) {
                let headI = new PIXI.Text(heads[i].name);
                headI.anchor.set(0.5);
                headI.style.fill = "#eeeeee";
                headI.style.fontFamily = "Myriad Pro Bold";
                headI.position.set(heads[i].position, 30);
                headContainer.addChild(headI);
            }
            this.addChild(headContainer);
        }
        this.interactive = true;
        this.on("pointerdown", this.onMouseDown);
        this.on("pointermove", this.onMouseMove);
        this.on("pointerup", this.onMouseUp);
        this.on("pointerupoutside", this.onMouseUp);
        this.on("pointerover", () => this.mouseOver = true);
        this.on("pointerout", () => this.mouseOver = false);
        document.addEventListener("mousewheel", this.scroll, false);
    }
}
exports.ScrollPane = ScrollPane;
//# sourceMappingURL=ScollPane.js.map