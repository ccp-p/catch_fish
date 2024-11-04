import DataBus from './dataBus.js';
import Fish from './player/fish.js';
import Net from './player/net.js';
import Score from './player/score.js';

const dataBus = new DataBus();
import ResourceLoader from './base/resourceLoader.js';
import Background from './runtime/background.js';
import Cannon from './player/cannon.js';
import Button from './player/button.js';

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
        this.addButton = null;
        this.subtractButton = null;
        this.nets = [];  // 添加网的管理数组
        this.loop(Date.now());

        // 鱼群管理相关属性
        this.lastFishTime = Date.now()
        this.fishGenerateInterval = 1000  // 每秒生成一条鱼
        this.maxFishCount = 15  // 场景中最多同时存在的鱼数量

    }
    init() {
        if (this.isAleadyInit) return;
        this.isAleadyInit = true;
        dataBus.reset()
        this.bg = new Background();
        this.cannon = new Cannon();
        this.score = new Score(); // 添加得分管理
        this.renderButton();
        this.bg.render();
        this.cannon.render();
        this.bindEvent()
        dataBus.score = this.score;

    
    }
    renderButton(){
        // center
        const sX = dataBus.canvas.width / 2 - 26; 
        //  bottom 
        const sY =  dataBus.canvas.height - 37;

        const aX = dataBus.canvas.width/2+  66;

        const aY = dataBus.canvas.height - 37;

        this.addButton = new Button('add', aX, aY);

        this.subtractButton = new Button('subtract', sX, sY);
    }
    bindEvent() {
        window.addEventListener('mousemove', this.cannon.bindMove.bind(this.cannon));
        window.addEventListener('mousedown', this.handleMouseDown.bind(this));
        window.addEventListener('mouseup', this.handleMouseUp.bind(this));
    }

    handleMouseDown(e) {
        const mx = e.clientX - this.canvas.offsetLeft;
        const my = e.clientY - this.canvas.offsetTop;

        if (this.addButton.isClicked(mx, my)) {
            this.addButton.isPressed = true;
        }
        if (this.subtractButton.isClicked(mx, my)) {
            this.subtractButton.isPressed = true;
        }
    }

    handleMouseUp(e) {
        const mx = e.clientX - this.canvas.offsetLeft;
        const my = e.clientY - this.canvas.offsetTop;

        if (this.addButton.isPressed) {
            if (this.addButton.isClicked(mx, my)) {
                this.cannon.levelUp();
            }
            this.addButton.isPressed = false;
        }
        if (this.subtractButton.isPressed) {
            if (this.subtractButton.isClicked(mx, my)) {
                this.cannon.levelDown();
            }
            this.subtractButton.isPressed = false;
        }

        // 处理其他区域的点击，例如发射炮弹
        if (!this.addButton.isClicked(mx, my) && !this.subtractButton.isClicked(mx, my)) {
            if (this.cannon.playAni) return;
            this.cannon.playAni = true;
        }
    }

  

    loop(currentTime) {
        this.aniId = requestAnimationFrame(() => {
            this.loop(Date.now());
        });

        if (currentTime - lastTime >= frameDuration) {
            lastTime = currentTime;
            if (dataBus.isResourceReady) {
                this.init();
            }

            this.update();
            this.checkCollisions(); // 确保调用碰撞检测
        }
    }

    update() {
        // 如果资源未加载完成，直接返回
        if (!dataBus.isResourceReady) {
            return;
        }

        dataBus.ctx.clearRect(0, 0, dataBus.canvas.width, dataBus.canvas.height);
        dataBus.actors = dataBus.actors.filter(actor => actor.isAlive !== false);
        // 根据 zIndex 排序 actors
        dataBus.actors.sort((a, b) => a.zIndex - b.zIndex);
        dataBus.actors.forEach(actor => {
            actor.update();
            actor.render();
        });

        // 生成新的鱼
        this.generateFish();
        
        // 更新网
        this.nets = this.nets.filter(net => net.isAlive);
        this.nets.forEach(net => {
            net.update();
            net.render();
        });
    }

    checkCollisions() {
        const nets = dataBus.actors.filter(actor => actor instanceof Net && actor.isAlive);
        const fishes = dataBus.actors.filter(actor => actor instanceof Fish && actor.isAlive);
        nets.forEach(net => {
            fishes.forEach(fish => {
                if (net.checkCollision(fish)) {
                    net.captureFish(fish);
                    this.score.addScore(fish.score); // 捕获鱼后增加得分
                }
            });
        });
    }

    generateFish() {
        const now = Date.now();
        if (now - this.lastFishTime >= this.fishGenerateInterval) {
            const currentFishCount = dataBus.actors.filter(actor => actor instanceof Fish).length;
            if (currentFishCount < this.maxFishCount) {
                const random = Math.random();
                let fishType;
                if (random < 0.4) fishType = 1;       // 40%的概率生成1号鱼
                else if (random < 0.7) fishType = 2;  // 30%的概率生成2号鱼
                else if (random < 0.85) fishType = 3; // 15%的概率生成3号鱼
                else if (random < 0.95) fishType = 4; // 10%的概率生成4号鱼
                else fishType = 5;                    // 5%的概率生成5号鱼

                new Fish(fishType);
                this.fishGenerateInterval = 1000 + currentFishCount * 100; // 动态调整生成间隔
            }

            this.lastFishTime = now;
        }
    }
}
new Main();
