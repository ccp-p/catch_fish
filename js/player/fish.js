import DataBus from '../dataBus.js';
const dataBus = new DataBus();

export default class Fish {
    constructor(type) {
        // 鱼的类型(1-5对应不同鱼的大小)
        this.type = type;
        // 加载鱼的图片
        this.image = dataBus.resources[`fish${this.type}.png`];
        
        // 初始化基本属性
        this.width = this.image.img.naturalWidth;
        this.height = this.image.img.naturalHeight;
        this.ctx = dataBus.ctx;
        this.isAlive = true;
        this.zIndex = 1;
        
        // 随机生成鱼的初始位置(从屏幕右侧游出)
        this.x = dataBus.canvas.width + this.width;
        this.y = Math.random() * (dataBus.canvas.height - this.height);
        
        // 移动相关属性
        this.speed = 2 + Math.random() * 2;  // 随机速度
        this.angle = Math.PI + Math.random() * 0.3 - 0.15;  // 基本向左，有小范围随机角度
        
        // 动画相关
        this.frameIndex = 0;  // 当前帧索引
        this.frameCount = 8;  // 将总帧数从4增加到8
        this.animationSpeed = 0.1;  // 控制动画速度
        this.frameTimer = 0;
        
        // 将鱼添加到游戏对象列表
        dataBus.addActor(this);
    }

    update() {
        // 更新位置
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        
        // 更新动画帧
        this.frameTimer += this.animationSpeed;
        if (this.frameTimer >= 1) {
            this.frameTimer = 0;
            this.frameIndex = (this.frameIndex + 1) % this.frameCount;
        }
        
        if (!this.isAlive) {
            this.frameIndex = 4 + Math.floor(this.frameTimer); // 使用死亡动画帧
        }
        
        // 检查是否超出屏幕
        if (this.x < -this.width) {
            this.isAlive = false;
        }
    }

    render() {
        this.ctx.save();
        
        // 移动到鱼的位置并旋转
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.angle);
        
        // 绘制当前帧
        const sw = this.width;
        const sh = this.height / 8; // 每条鱼8帧垂直排列
        const sx = 0;
        const sy = this.isAlive ? this.frameIndex * sh : 4 * sh + this.frameIndex * sh; // 根据状态选择行
        this.ctx.drawImage(
            this.image.img,
            sx, sy, sw, sh,
            -sw / 2, -sh / 2, sw, sh
        );
        
        this.ctx.restore();
    }

    checkCollision(bullet) {
        // 简单的矩形碰撞检测
        const dx = Math.abs(this.x - bullet.x);
        const dy = Math.abs(this.y - bullet.y);
        
        return dx < (this.width / 8 + bullet.width) / 2 &&
               dy < (this.height / 8 + bullet.height) / 2;
    }
    
    die() {
        this.isAlive = false;
        // 这里可以添加死亡动画或其他效果
    }
}
