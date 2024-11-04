import DataBus from '../dataBus.js';
const dataBus = new DataBus();
import Coin from './coin.js';
export default class Fish {
    constructor(type) {
        // 鱼的类型(1-5对应不同鱼的大小)
        this.type = type;
        // 加载鱼的图片
        this.image = dataBus.resources[`fish${this.type}.png`];
        
        // 初始化基本属性
        this.width = this.image.img.naturalWidth;
        this.height = this.image.img.naturalHeight;
        this.fishHeight = this.height / this.image.moveFrame; // 每条鱼8帧垂直排列
        this.ctx = dataBus.ctx;
        this.isAlive = true;
        this.zIndex = 1;
        this.frameIndex = 0;
        this.frameCount = this.image.moveFrame + this.image.captureFrame; // 总帧数
        this.isDying = false;  // 是否正在播放死亡动画
        this.score = this.type * 10; // 根据鱼的类型设置分数
        this.from = Math.random() < 0.5 ? 'left' : 'right'; // 随机生成鱼的游出方向
        this.scale = this.from === 'left' ? [1,1] : [1,-1]; // 根据游出方向设置缩放
        if (this.from === 'left') {
            this.x = -this.width;
            this.angle = Math.random() * 0.3 - 0.15; // 基本向右，有小范围随机角度
        } else {
            this.x = dataBus.canvas.width + this.width;
            this.angle = Math.PI + Math.random() * 0.3 - 0.15; // 基本向左，有小范围随机角度
        }
        this.y = Math.random() * (dataBus.canvas.height - 400) + 200;
        
        // 移动相关属性
        this.speed = 2 + Math.random() * 2;  // 随机速度
        
        
        // 将鱼添加到游戏对象列表
        dataBus.addActor(this);
    }

    update() {
        if (this.isDying) {
            // 死亡动画
            if (this.frameIndex < this.image.captureFrame - 1) {
                this.frameIndex++;
            } else {
                this.isAlive = false;
            }
        } else {
            // 移动动画
            this.frameIndex = (this.frameIndex + 1) % this.image.moveFrame;
            // 更新位置
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
            // 检查是否超出屏幕
            if (this.x < -this.width || this.x > dataBus.canvas.width + this.width || this.y < -this.height || this.y > dataBus.canvas.height + this.height) {
                this.isAlive = false;
            }
        }
    }

    render() {
        this.ctx.save();
        
        // 移动到鱼的位置并旋转
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.angle);
        this.ctx.scale(this.scale[0], this.scale[1]);
        
        // 绘制当前帧
        const sw = this.width;
        const sh = this.height / this.frameCount; // 每条鱼8帧垂直排列
        const sx = 0;

     

        let sy;
        if (this.isDying) {
            sy = (this.image.moveFrame + this.frameIndex) * sh;
        } else {
            sy = this.frameIndex * sh;
        }

        // 绘制绿色的碰撞检测边框
        this.ctx.strokeStyle = 'green';
        this.ctx.lineWidth = 5;
        // 围绕中心点绘制
        // this.ctx.strokeRect(-this.width / 2, -this.fishHeight / 2, this.width, this.fishHeight);

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
               dy < (this.fishHeight / 8 + bullet.height) / 2;
    }
    addCoin(fish) {
        // fishType 1-5 对应 1-5 号鱼
        let coinCount = fish.type * fish.type;
     
        const timer = setInterval(() => {
            if(coinCount % 10 !=0){
                dataBus.addActor(new Coin(1,fish.x, fish.y));
                coinCount--;
            }else{
                dataBus.addActor(new Coin(2,fish.x, fish.y));
                coinCount -=10
            }
            if(coinCount === 0){
                clearInterval(timer)
            }
            
        },150)
        
    }
    die() {
        if (!this.isDying) {
            this.isDying = true;
            console.log('die',this.type);
            
            this.frameIndex = 0;
            this.speed = 0; // 停止移动
            // 生成金币
            this.addCoin(this)
        }
        // 添加死亡动画或效果
    }
}
