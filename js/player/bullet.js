import DataBus from "../dataBus.js";
import Net from './net.js';
const dataBus = new DataBus();
import Fish from './fish.js';

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

        // 添加碰撞检测
        const fishes = dataBus.actors.filter(actor => actor instanceof Fish && actor.isAlive);
        fishes.forEach(fish => {
            if (this.checkCollision(fish)) {
                // 生成网的效果
                dataBus.addActor(new Net(this.x, this.y, this.level));
                // 生成金币效果
                dataBus.addActor(new Coin(fish.x, fish.y));
                // 让鱼进入死亡状态
                fish.die();
                // 增加分数
                dataBus.score.addScore(fish.score);
                // 移除子弹
                this.isAlive = false;
            }
        });
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
    detectCollision(fish) {
        const dx = Math.abs(this.x - fish.x);
        const dy = Math.abs(this.y - fish.y);
        return dx < (this.width + fish.width) / 2 && dy < (this.height + fish.height) / 2;
    }

    checkCollision(fish) {
        if (this.detectCollision(fish)) {
            // 生成网的效果
            dataBus.addActor(new Net(fish.x, fish.y, this.level));
            // 让鱼进入死亡状态
            fish.die();
            // 移除子弹
            this.isAlive = false;
        }
    }
}
