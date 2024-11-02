import DataBus from '../dataBus.js';
const dataBus = new DataBus();

export default class Coin {
    constructor(x, y) {
        this.image = dataBus.resources['coin.png'];
        this.width = this.image.img.naturalWidth;
        this.height = this.image.img.naturalHeight / this.image.moveFrame;
        this.x = x;
        this.y = y;
        this.targetX = dataBus.canvas.width / 2;  // 底部栏位置，根据实际情况调整
        this.targetY = dataBus.canvas.height - 50; // 底部栏位置，根据实际情况调整
        this.speed = 5;
        this.frameIndex = 0;
        this.frameCount = this.image.moveFrame;
        this.ctx = dataBus.ctx;
        this.isAlive = true;
        this.zIndex = 2;

        dataBus.addActor(this);
    }

    update() {
        // 移动到目标位置
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.speed) {
            this.isAlive = false;
            // 更新玩家金币数量
            dataBus.playerCoins += 1; // 假设有玩家金币计数器
        } else {
            this.x += (dx / distance) * this.speed;
            this.y += (dy / distance) * this.speed;
        }
        // 更新帧动画
        this.frameIndex = (this.frameIndex + 1) % this.frameCount;
    }

    render() {
        const sh = this.height;
        const sy = this.frameIndex * sh;
        this.ctx.drawImage(
            this.image.img,
            0, sy, this.width, sh,
            this.x - this.width / 2, this.y - sh / 2, this.width, sh
        );
    }
}
