import DataBus from "../dataBus.js";
const dataBus = new DataBus();

export default class Fish {
    constructor() {
        // 获取鱼的图片资源
        this.image = dataBus.resources.fish;
     
     
        // 将鱼添加到游戏对象列表
        dataBus.addActor(this);
    }

    update() {
      
    }

    render() {
      
    }

    
}
