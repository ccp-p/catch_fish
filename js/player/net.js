import DataBus from '../dataBus.js';
const dataBus = new DataBus();

export default class Net {
    constructor(x, y) {
        this.image = dataBus.resources['web1.png'];  // 假设网的图片名为 net1.png
        this.x = x;
        this.y = y;
        this.width = this.image.img.naturalWidth;
        this.height = this.image.img.naturalHeight;
        this.ctx = dataBus.ctx;
        this.isAlive = true;
        this.zIndex = 2;  // 确定渲染顺序
    }

    update() {
        // 可以添加网的动画或移动逻辑
    }

    render() {
        this.ctx.drawImage(this.image.img, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }

    checkCollision(fish) {
        const dx = Math.abs(this.x - fish.x);
        const dy = Math.abs(this.y - fish.y);
        return dx < (this.width + fish.width) / 2 && dy < (this.height + fish.height) / 2;
    }

    captureFish(fish) {
        // 捕捉鱼的逻辑
        this.isAlive = false;
        fish.die();
        // 添加捕捉动画或效果
    }
}
