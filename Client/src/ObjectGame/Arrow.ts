import Container = PIXI.Container;
import {App} from "../Const/App";
import {Button} from "../IU/Button";
/**
 * Created by Vu Tien Dai on 07/03/2018.
 */
export class Arrow extends Container {
    private up: Button;
    private down: Button;
    private right: Button;
    private left: Button;

    constructor() {
        super();
        this.up = new Button(40, -55, "", App.AssetCard + 'arrow.png');
        this.down = new Button(40, 595, "", App.AssetCard + 'arrow.png')
        this.right = new Button(500, 20, "", App.AssetCard + 'arrow.png')
        this.left = new Button(-20, 20, "", App.AssetCard + 'arrow.png')
        let size = new PIXI.Point(50, 50);
        this.up.setSize(size);
        this.down.setSize(size);
        this.right.setSize(size);
        this.left.setSize(size);
        this.up.anchor.set(0.5, 0);
        this.down.anchor.set(0.5, 0);
        this.right.anchor.set(0.5, 0);
        this.left.anchor.set(0.5, 0);
        this.up.rotation = Math.PI;
        this.down.rotation = 0;
        this.left.rotation = Math.PI / 2;
        this.right.rotation = -Math.PI / 2;
        this.alpha = 0;
        this.up.interactive = false;
        this.down.interactive = false;
        this.right.interactive = false;
        this.left.interactive = false;
        this.addChild(this.up, this.down, this.right, this.left);
        this.right.onClick = () => {
            this.parent.emit("move_right");
            this.alpha = 0;
            this.up.interactive = false;
            this.down.interactive = false;
            this.right.interactive = false;
            this.left.interactive = false;
        }
        this.left.onClick = () => {
            this.parent.emit("move_left");
            this.alpha = 0;
            this.up.interactive = false;
            this.down.interactive = false;
            this.right.interactive = false;
            this.left.interactive = false;
        }
        this.up.onClick = () => {
            this.parent.emit("move_up");
            this.alpha = 0;
            this.up.interactive = false;
            this.down.interactive = false;
            this.right.interactive = false;
            this.left.interactive = false;
        }
        this.down.onClick = () => {
            this.parent.emit("move_down");
            this.alpha = 0;
            this.up.interactive = false;
            this.down.interactive = false;
            this.right.interactive = false;
            this.left.interactive = false;
        }

    }

    setPos(value: number) {
        this.up.interactive = true;
        this.down.interactive = true;
        this.right.interactive = true;
        this.left.interactive = true;
        let row = Math.floor(value / 5);
        let col = value % 5;
        this.up.x = 40 + 100 * col;
        this.down.x = 40 + 100 * col;
        this.right.y = 10 + 130 * row;
        this.left.y = 10 + 130 * row;
        this.alpha = 1;
    }

    setClose = () => {
        this.alpha = 0;
        this.up.interactive = false;
        this.down.interactive = false;
        this.right.interactive = false;
        this.left.interactive = false;
    }

}