import DataBus from '../dataBus.js';
const dataBus = new DataBus();

export default class Coin {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.destX = 50; // 左下角的 x 坐标
        this.destY = dataBus.canvas.height - 50; // 左下角的 y 坐标
        this.image = dataBus.resources['coinAni1.png'];
        this.width = this.image.img.naturalWidth;
        this.height = this.image.img.naturalHeight;
        this.ctx = dataBus.ctx;
        this.isAlive = true;
        this.zIndex = 2;
        this.speed = 5;
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
    }

    render() {
        
        this.ctx.drawImage(
            this.image.img,
            this.x - this.width / 2, this.y - this.height / 2,
            this.width, this.height
        );
    }
}
