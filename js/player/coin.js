import DataBus from '../dataBus.js';
const dataBus = new DataBus();

export default class Coin {
    constructor(type,x, y) {
        this.x = x;
        this.y = y;
        this.destX = 200; // 左下角的 x 坐标
        this.type = type;
        this.destY = dataBus.canvas.height - 60; // 左下角的 y 坐标
        this.image = dataBus.resources[`coinAni${type}.png`];
        this.width = this.image.img.naturalWidth;
        this.height = this.image.img.naturalHeight;
        this.ctx = dataBus.ctx;
        this.frameIndex = 0; // 帧索引
        this.isAlive = true;
        this.zIndex = 1;
        this.speed = 20;
    }
   
    update() {
        // 计算移动方向
        const dx = this.destX - this.x;
        const dy = this.destY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.speed) {
            this.isAlive = false;
        } else {
            this.x += (dx / distance) * this.speed;
            this.y += (dy / distance) * this.speed;
        }
        // 更新帧索引
        this.frameIndex = (this.frameIndex + 1) % 10;
        
    }

    render() {
        //  帧动画 从上到下10个小金币所以一个金币的高度是整个图片的1/10
       const sh = this.height / 10
       const sy = sh * this.frameIndex;
         this.ctx.drawImage(
              this.image.img,
              0, sy, this.width, sh,
              this.x, this.y, this.width, sh
         );
    }
}
