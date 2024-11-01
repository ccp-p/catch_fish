import DataBus from "../dataBus.js";
const dataBus = new DataBus();
import Bullet from "./bullet.js";
const N = 3
let n =  0
export default class Cannon {
    constructor(options) {
        // 获取大炮的图片资源
        
        this.image = dataBus.resources['cannon1.png'];
        this.x = 552
        this.y = 740
        this.options = options || {}
        this.ang  = 0
        this.frame = 1
        this.ctx = dataBus.ctx;
        this._playAni = false
        this.width = this.image.img.naturalWidth;
        this.height = this.image.img.naturalHeight;
        // 将大炮添加到游戏对象列表
        dataBus.addActor(this);
    }

    update() {
        const a = this.x - this.options.mx
        const b = this.y - this.options.my
        const ang =this.ang = Math.atan2(b,a)  - Math.PI / 2
        if(this._playAni){
            this.play()
        }

      
    }
    
    play(){
        n++
        if(n===N){
            n = 0
            this.frame++
            if(this.frame === 5){
                this.frame = 0
                this._playAni = false
                this.shoot(); // 发射炮弹
            }
        }
    }

    shoot() {
        const bullet = new Bullet(this.x, this.y, this.ang);
        dataBus.addActor(bullet);
    }
  
    bindMove(e){
            this.options.mx = e.clientX- dataBus.canvas.offsetLeft;
            this.options.my = e.clientY - dataBus.canvas.offsetTop;
    }

    render() {
        const sw = this.width;
        const sh = this.height / 5;

        const dx = -sw / 2;
        const dy = -sh / 2;

        this.ctx.save();

        this.ctx.translate(this.x, this.y);

        this.ctx.rotate(this.ang);

        const sy = sh * this.frame; // 计算源图像的 Y 坐标

        this.ctx.drawImage(
            this.image.img,
            0, sy, sw, sh,    // 使用正确的源坐标和尺寸
            dx, dy, sw, sh
        );

        this.ctx.restore();
    }

    set playAni(value) {
        this._playAni = value;
        // 如果需要在设置 playAni 时执行额外操作，可以在这里添加代码
    }
    get playAni() {
        return this._playAni;
    }

}