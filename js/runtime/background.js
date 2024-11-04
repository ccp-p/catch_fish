import DataBus from '../dataBus.js';
const dataBus = new DataBus();

export default class Background {
    constructor() {
        
        this.image =  dataBus.resources['bottom-bar.png'].img
        console.log('this.image',this.image);
        
        this.width = dataBus.resources['bottom-bar.png'].img.naturalWidth;
        this.height = dataBus.resources['bottom-bar.png'].img.naturalHeight;
        this.zIndex = 2;
        // center
//         步骤分析：
// 1. dataBus.canvas.width 表示画布的总宽度
// 2. this.width 表示要居中的元素宽度
// 3. 两者相减得到剩余空间
// 4. 除以2将剩余空间平均分配到两边

// 图示说明：
// |<-------- 画布宽度 (1000px) -------->|
// |   左边空白   |  元素(200px) |  右边空白   |
// |<--400px-->|<---200px--->|<--400px-->|

// 计算过程：
// 1. 剩余空间 = 1000px - 200px = 800px
// 2. 两边各分配 = 800px ÷ 2 = 400px
// 3. 所以元素的x坐标 = 400px
        this.x = (dataBus.canvas.width - this.width) /2; 
        this.y = dataBus.canvas.height - this.height;
        
        
        dataBus.addActor(this);
    }
    update(){
        // this.x -= dataBus.speed
        // if(this.x <= -this.width){
        //     this.x = 0;
        // }
    }

    render() {
        // dataBus.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        // dataBus.ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        // dataBus.ctx.drawImage(this.image, this.x + this.width * 2, this.y, this.width, this.height);
        dataBus.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}