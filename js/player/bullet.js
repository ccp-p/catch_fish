import DataBus from "../dataBus.js";
import Net from './net.js';
const dataBus = new DataBus();

export default class Bullet {
    constructor(cannonLevel, x, y, angle) {
        this.x = x;
        this.y = y;
        this.speed = 10; // 炮弹速度
        this.angle = angle;
        this.direction = this.angle - Math.PI / 2; // 添加方向属性
        this.level = cannonLevel;
        this.image = dataBus.resources[`bullet${this.level}.png`]; // 根据等级加载子弹图片
        this.width = this.image.img.naturalWidth;
        this.height = this.image.img.naturalHeight;
        this.ctx = dataBus.ctx;
        this.isAlive = true; // 是否存活
        this.zIndex = 1; // 添加 zIndex 属性
    }

    update() {
        // 根据方向更新位置
        this.x += Math.cos(this.direction) * this.speed;
        this.y += Math.sin(this.direction) * this.speed;

        // 超出屏幕范围，设置为不存活
        if (this.x < 0 || this.x > dataBus.canvas.width || this.y < 0 || this.y > dataBus.canvas.height) {
            this.isAlive = false;
        }
    }

    render() {
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.angle); // 根据角度旋转
        const dx = -this.width / 2;
        const dy = -this.height / 2;
        this.ctx.drawImage(this.image.img, dx, dy, this.width, this.height);
        this.ctx.restore();
    }

    checkCollision(fish) {
        if (this.detectCollision(fish)) {
            // 生成网的效果
            dataBus.addActor(new Net(fish.x, fish.y, this.type));
            // 让鱼进入死亡状态
            fish.die();
            // 移除子弹
            this.isAlive = false;
        }
    }
}
