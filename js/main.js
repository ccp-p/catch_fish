import DataBus from './dataBus.js';
const dataBus = new DataBus();
import ResourceLoader from './base/resourceLoader.js';
import Background from './runtime/background.js';
import Cannon from './player/cannon.js';

let lastTime = 0;
const fps = 30; // Desired frames per second
const frameDuration = 1000 / fps; // Duration of one frame in ms
class Main {
    constructor() {

        // canvas
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        dataBus.canvas = this.canvas;
        dataBus.ctx = this.ctx;
        this.aniId = 0
        this.isAleadyInit = false;
        this.resources = new ResourceLoader();
        this.loop(Date.now());

    }
    init() {
        if (this.isAleadyInit) return;
        this.isAleadyInit = true;
        dataBus.reset()
        this.bg = new Background();
        this.cannon = new Cannon();
        this.bg.render();
        this.cannon.render();
        this.bindEvent()

    
    }
    bindEvent() {
        window.addEventListener('mousemove', this.cannon.bindMove.bind(this.cannon))
        window.addEventListener('click', () => {
            if(this.cannon.playAni) return;
            this.cannon.playAni = true;
        })
    }
    loop(currentTime) {
        this.aniId  = requestAnimationFrame(() => {
            this.loop(Date.now());
        })

        if (currentTime - lastTime >= frameDuration) {
            lastTime = currentTime;
            if(dataBus.isResourceReady){
                this.init()
            }

            this.update()

        }
    }
    update(){
        dataBus.ctx.clearRect(0, 0, dataBus.canvas.width, dataBus.canvas.height);
        dataBus.actors = dataBus.actors.filter(actor => actor.isAlive !== false);
        // 根据 zIndex 排序 actors
        dataBus.actors.sort((a, b) => a.zIndex - b.zIndex);
        dataBus.actors.forEach(actor => {
            actor.update();
            actor.render();
        });
    }

}
new Main();
