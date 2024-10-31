
import DataBus from "../dataBus.js";
const dataBus = new DataBus();
const g = 0.98 / 2.9;
export default class Bird {
    constructor() {
        const imageArr = [
            [dataBus.resources.bird0_0,
            dataBus.resources.bird0_1,
            dataBus.resources.bird0_2],

            [dataBus.resources.bird1_0,
            dataBus.resources.bird1_1,
            dataBus.resources.bird1_2],

            [dataBus.resources.bird2_0,
            dataBus.resources.bird2_1,
            dataBus.resources.bird2_2]
        ]

        this.color = Math.floor(Math.random() * imageArr.length)
        this.images = imageArr[this.color];
        this.wing = 0;

        this.x=100
        this.y=100
        this.image = this.images[this.wing];

        this.width = this.image.width;
        this.height = this.image.height;
        this.t = 0;
    
        this.rotate = 0;
        this.fly = false
        this.ey = dataBus.canvas.height - dataBus.resources.land.height - this.height +11

        dataBus.addActor(this);
        dataBus.bird = this

  
    
    }
    update() {
        this.wing++
        if (this.wing >= this.images.length) {
            this.wing = 0;
        }
        if(!this.fly) return
        this.t++
        this.rotate +=0.08
        const nineity = Math.PI / 2;
        if(this.rotate >= nineity){
            this.rotate = nineity
        }

        this.y = this.y -10 + g * this.t * (this.t) / 2;
        
        if(this.y >= this.ey){
            this.y =  this.ey
            dataBus.scence = 2
        
        }

        if(this.y<-13){
            this.y = -13
        }
    }
    render() {
        this.image = this.images[this.wing];
        dataBus.ctx.save();
        dataBus.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);

        dataBus.ctx.rotate(this.rotate);
        dataBus.ctx.drawImage(this.image, -this.width/2, -this.height/2, this.width, this.height);
        dataBus.ctx.restore();

    }
    bindFly(){
        this.fly= true
        this.t = 0
        this.rotate = -1
    }
}