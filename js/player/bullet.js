import DataBus from "../dataBus.js";
import Net from './net.js';
const dataBus = new DataBus();
import Fish from './fish.js';
import Coin from './coin.js';

export default class Bullet {
    constructor(cannonLevel, x, y, angle) {
        this.x = x;
        this.y = y;
        this.speed = 30; // 炮弹速度
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
            const isCollision = this.detectCollision(fish);
            console.log('isCollision',isCollision);
            
            if (isCollision) {
                // 生成网的效果
                dataBus.addActor(new Net(this.x, this.y, this.level));
                // 生成金币效果
                fish.addCoin(fish);
                // 让鱼进入死亡状态
                fish.die();
          
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
        // 绘制绿色的碰撞检测边框
        this.ctx.strokeStyle = 'green';
        this.ctx.lineWidth = 20;
        // 是绘制线框矩形，不是填满
        this.ctx.strokeRect(dx, dy, this.width, this.height);

        this.ctx.restore();

    }
  
    detectCollision(fish) {
        const rect1 = {
            x: this.x - this.width / 2,
            y: this.y - this.height / 2,
            width: this.width,
            height: this.height
        };
        const rect2 = {
            x: fish.x - fish.width / 2,
            y: fish.y - fish.fishHeight / 2,
            width: fish.width,
            height: fish.fishHeight
        };
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
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
