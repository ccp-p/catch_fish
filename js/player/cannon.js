import DataBus from "../dataBus.js";
const dataBus = new DataBus();

export default class Cannon {
    constructor(options) {
        // 获取大炮的图片资源
        
        this.image = dataBus.resources['cannon1.png'];
        this.x = 552
        this.y = 740
        this.options = options || {}
        this.ang  = 0
        this.ctx = dataBus.ctx;
        this.width = this.image.img.naturalWidth;
        this.height = this.image.img.naturalHeight;
        // 将大炮添加到游戏对象列表
        dataBus.addActor(this);
    }

    update() {
        const a = this.x - this.options.mx
        const b = this.y - this.options.my
        const ang =this.ang = Math.atan2(b,a)

      console.log('ang', ang);
      
    }
    bindMove(e){
            this.options.mx = e.clientX;
            this.options.my = e.clientY;
    }

    render() {
        const sw =  this.width
        const sh = this.height / 5

        const dx = -sw/2
        const dy = -sh/2

        this.ctx.save();
        
        this.ctx.translate(this.x,this.y);

        this.ctx.rotate(this.ang);

        this.ctx.drawImage(this.image.img,
              0, 0, sw, sh,
              dx,dy , sw, sh);

        this.ctx.restore();
    }

}