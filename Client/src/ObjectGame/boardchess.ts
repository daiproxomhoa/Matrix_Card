import Sprite = PIXI.Sprite;
import board = PIXI.Graphics;
/**
 * Created by Vu Tien Dai on 04/04/2018.
 */

export  class boardchess extends Sprite{
    private  w=560;
    private  h=630;
    private  edge=70;
    constructor(){
        super();
        const board = new PIXI.Graphics();
        board.position.set(0,0);
        board.lineStyle(3, 0x000000);
        board.moveTo(0,0)
        board.lineTo(this.w,0)
        board.lineTo(this.w,this.h)
        board.lineTo(0,this.h)
        board.lineTo(0,0)
      for(let i=1;i<9;i++){
          board.lineStyle(1, 0x000000);
          board.moveTo(0,this.edge*i)
          board.lineTo(this.w,this.edge*i)
      }
        // for(let i=1;i<8;i++){
        //     board.lineStyle(1, 0x000000);
        //     board.moveTo(this.edge*i,0)
        //     board.lineTo(this.,this.edge*i)
        // }
        this.addChild(board);
    }
}