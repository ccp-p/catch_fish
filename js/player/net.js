import DataBus from '../dataBus.js';
const dataBus = new DataBus();
export default class Net {
    constructor(x, y, type) {
        this.image = dataBus.resources[`web${type}.png`];
        this.width = this.image.img.naturalWidth;
        this.height = this.image.img.naturalHeight;
        this.x = x;
        this.y = y;
        this.ctx = dataBus.ctx;
        this.isAlive = true;
        this.zIndex = 1;
        this.lifeTime = 30; // 网的存在时间帧数
    }

    update() {
        this.lifeTime--;
        if (this.lifeTime <= 0) {
            this.isAlive = false;
        }
    }

    render() {
        this.ctx.drawImage(
            this.image.img,
            0, 0, this.width, this.height,
            this.x - this.width / 2, this.y - this.height / 2, this.width, this.height
        );
    }

    checkCollision(fish) {
        const dx = Math.abs(this.x - fish.x);
        const dy = Math.abs(this.y - fish.y);
        return dx < (this.width + fish.width) / 2 && dy < (this.height + fish.fishHeight) / 2;
    }

    captureFish(fish) {
        // 捕捉鱼的逻辑
        this.isAlive = false;
        // 添加捕捉动画或效果
    }
}
