import Databus from '../dataBus.js'
const databus = new Databus()

export default class Pad {
    constructor(){
        this.image = databus.resources.score_panel
        // 位置
        this.x = (databus.canvas.width-this.image.width) / 2
        this.y = databus.canvas.height
        // 宽高
        this.w = this.image.width
        this.h = this.image.height
        this.ey = 220
        databus.addActor(this)
    }
    update(){
        this.y -= 40
        if (this.y <= this.ey){
            this.y = this.ey
            this.end = true
        }
    }
    render(){
        databus.ctx.drawImage(this.image, this.x, this.y, this.w, this.h)
        if (this.end){
            databus.ctx.save()
            databus.ctx.fillStyle = "#00f"
            databus.ctx.font = "20px Arial"
            const ctx = databus.ctx;
            const pixelRatio = window.devicePixelRatio || 1;
            const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
// const textX = (databus.canvas.width / 2 + 70 * rem) * pixelRatio;
            const textX = (databus.canvas.width / 2 + 70) * 1;
            
            const textBaselineY = 270 * 1;
            
            // ctx.scale(pixelRatio, pixelRatio);
            ctx.fillText(databus.score, textX, textBaselineY);
            databus.ctx.restore()
        }
    }
}