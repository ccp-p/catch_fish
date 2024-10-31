
import DataBus from "../dataBus.js";
const dataBus = new DataBus();
export default class Pipe {
    constructor() {
        this.image1 = dataBus.resources.pipe_down;
        this.image2 = dataBus.resources.pipe_up;
        this.width = this.image1.width;
        this.height = this.image1.height;
       
        this.x1= dataBus.canvas.width;
        this.y1 =0 
        this.w1 = this.image1.width;
        this.h1 = Math.floor(Math.random() * (300 - 200 +1)) + 200;
        this.door = Math.floor(Math.random() * (1060 - 100 +1)) + 100;

        this.y2 = this.h1 + this.door;
        this.h2 = dataBus.canvas.height - this.y2 -dataBus.resources.land.height;

        this.sy1 = this.image1.height - this.h1;

       this.noPass= true

        dataBus.addActor(this);
    }
    update() {
        this.x1 -= dataBus.speed;
        if (this.x1 <= -this.width) {
          this.die()
          console.log('dataBus.actors.length',dataBus.actors.length)
        }
              // 更新碰撞检测盒
        // 小鸟的检测盒
        const birdl = dataBus.bird.x + 6
        const birdR = dataBus.bird.x + 40
        const birdT = dataBus.bird.y + 10
        const birdB = dataBus.bird.y + 40
                // 管子的检测盒
        this.lx = this.x1
        this.rX = this.x1 + this.width

        this.tY1 = this.h1
        this.by2 = this.y2
        if (birdR >= this.lx && birdl <= this.rX  &&  (birdT <= this.tY1 || birdB >= this.by2 )) {
            console.log("game over")
            dataBus.scence = 2
        } 
        if(birdl > this.rX && this.noPass){
            dataBus.score++
            this.noPass = false
        }
    }
    render() {
        dataBus.ctx.drawImage(this.image1, 0, this.sy1, this.w1, this.h1, this.x1, this.y1, this.w1, this.h1);
        dataBus.ctx.drawImage(this.image2, 0, 0, this.w1, this.h2, this.x1, this.y2, this.w1, this.h2);

    }
    die(){
        // filter
        dataBus.actors = dataBus.actors.filter(item => item !== this)
    }
}