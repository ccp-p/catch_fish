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
        this.isPressed = false;
        // 根据类型加载不同的图片资源
        if (type === 'add') {
            this.imageNormal = dataBus.resources['cannon_plus.png'];
            this.imagePressed = dataBus.resources['cannon_plus_down.png'];
        } else if (type === 'subtract') {
            this.imageNormal = dataBus.resources['cannon_minus.png'];
            this.imagePressed = dataBus.resources['cannon_minus_down.png'];
        }
        // 设置初始图片
        this.image = this.imageNormal;
        this.width = this.image.img.naturalWidth;
        this.height = this.image.img.naturalHeight;
        // 将按钮添加到游戏对象列表
        dataBus.addActor(this);
    }

    render() {
        this.image = this.isPressed ? this.imagePressed : this.imageNormal;
        this.ctx.drawImage(this.image.img, this.x, this.y, this.width, this.height);
    }

    update() {
        // 按钮不需要更新逻辑
    }

    isClicked(mx, my) {
        return mx >= this.x && mx <= this.x + this.width && my >= this.y && my <= this.y + this.height;
    }
}
