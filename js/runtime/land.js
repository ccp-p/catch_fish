import DataBus from "../dataBus.js";
const dataBus = new DataBus();
export default class Land {
    constructor() {
        this.image =  dataBus.resources.land;
        this.width = this.image.width;
        this.height = this.image.height;
        this.x = 0;
        this.y = dataBus.canvas.height - this.height;
        dataBus.addActor(this);
    }
    update() {
        this.x -= dataBus.speed;
        if (this.x <= -this.width) {
            this.x = 0;
        }
    }
    render(ctx) {
        dataBus.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        dataBus.ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        dataBus.ctx.drawImage(this.image, this.x + this.width * 2, this.y, this.width, this.height);
    }
}