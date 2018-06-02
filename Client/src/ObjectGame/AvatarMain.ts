import Sprite = PIXI.Sprite;
import {Avatar} from "./Avatar";
import {Button} from "../IU/Button";
/**
 * Created by Vu Tien Dai on 20/08/2017.
 */
export class AvataMain extends Avatar {
    constructor() {
        super();
        this .on("pointerdown",()=>{
            this.scale.set(1.05);
        }).on("pointerup",this.process);


    }
    process=()=>{
        this.scale.set(1);
    }

}