import DataBus from '../dataBus.js';
const dataBus = new DataBus();

export default class Button {
    constructor(type, x, y) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.ctx = dataBus.ctx;
        this.isAlive = true;
        this.zIndex = 3; // 设置 zIndex
        // 根据类型加载不同的图片资源
        if (type === 'add') {
            this.image = dataBus.resources['cannon_plus.png'];
        } else if (type === 'subtract') {
            this.image = dataBus.resources['cannon_minus.png'];
        }
        this.width = this.image.img.naturalWidth;
        this.height = this.image.img.naturalHeight;
        // 将按钮添加到游戏对象列表
        dataBus.addActor(this);
    }

    render() {
        this.ctx.drawImage(this.image.img, this.x, this.y, this.width, this.height);
    }

    update() {
        // 按钮不需要更新逻辑
    }

    isClicked(mx, my) {
        return mx >= this.x && mx <= this.x + this.width && my >= this.y && my <= this.y + this.height;
    }
}
