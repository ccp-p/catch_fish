import DataBus from '../dataBus.js';
const dataBus = new DataBus();

export default class Score {
    constructor() {
        this.ctx = dataBus.ctx;
        this.score = 0;
        this.image = dataBus.resources['number_black.png'].img;
        this.width = this.image.naturalWidth;
        this.height = this.image.naturalHeight / 10; // 图片被分为10个数字
        this.x = 20; // 左下角位置
        this.y = dataBus.canvas.height - this.height - 20;
        this.zIndex = 10; // 确保得分显示在最上层
        this.isAlive = true;
        dataBus.addActor(this);
    }

    addScore(score) {
        this.score += score;
    }

    update() {
        // 不需要更新逻辑
    }

    render() {
        this.ctx.save();
        this.ctx.fillStyle = "#fff";
        this.ctx.font = "20px Arial";
        this.ctx.fillText(`分数: ${this.score}`, 10, 30);
        this.ctx.restore();

        const scoreStr = this.score.toString();
        let offsetX = this.x;
        for (let i = 0; i < scoreStr.length; i++) {
            const num = parseInt(scoreStr[i]);
            this.ctx.drawImage(
                this.image,
                0, this.height * (9 - num), this.width, this.height, // 从上到下9~0
                offsetX, this.y, this.width, this.height
            );
            offsetX += this.width;
        }
    }
}