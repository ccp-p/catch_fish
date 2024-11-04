import DataBus from '../dataBus.js';
const dataBus = new DataBus();

export default class Score {
    constructor() {
        this.ctx = dataBus.ctx;
        this.score = 0
        this.image = dataBus.resources['number_black.png'].img;
        this.width = this.image.naturalWidth;
        this.height = this.image.naturalHeight / 10; // 图片被分为10个数字
        this.naturalHeight = this.image.naturalHeight;
        this.x = 20; // 左下角位置
        this.y = dataBus.canvas.height - this.height - 20;
        this.zIndex = 10; // 确保得分显示在最上层
        this.isAlive = true;
        dataBus.addActor(this);
    }

    addScore(score) {
        this.score += score;
    }
    getScore(){
        const padNum = 6
        return this.score.toString().padStart(padNum, '0')
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

        const scoreStr = this.getScore()
        
        let offsetX = this.x;
        const x = 150
        const y = dataBus.canvas.height -  28
        const gap = 23

        for (let i = 0; i < scoreStr.length; i++) {
            const num = parseInt(scoreStr[i]);
            // 计算单个数字的位置，使得数字从000000开始显示
            const sy = (9 - num) * this.height;
            // 数字加间距 
            const dx = x + i * gap
            this.ctx.drawImage(
                this.image,
                0, sy, this.width, this.height,
                dx, y, this.width, this.height
            );
            offsetX += this.width;
        }
    }
}