import Databus from '../dataBus.js'
const databus = new Databus()

export default class Over {
    constructor(){
        this.image = databus.resources.game_over
        // 位置
        this.x = (databus.canvas.width-this.image.width) / 2
        this.y = - this.image.height
        // 宽高
        this.w = this.image.width
        this.h = this.image.height
        this.ey = 140
        databus.addActor(this)
    }
    update(){
        this.y += 12
        if (this.y >= this.ey){
            this.y = this.ey
        }
    }
    render(){
        databus.ctx.drawImage(this.image, this.x, this.y, this.w, this.h)
    }
}