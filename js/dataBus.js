let instance 
export default class DataBus {
    constructor() {
        if (instance) {
            return instance
        }
        instance = this
       this.actors = []
    }
    addActor(actor){
        this.actors.push(actor)
    }
    reset(){
       
    }
}