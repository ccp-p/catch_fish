export default class PowerUp {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type; // 'speed', 'multiBullet', 'increaseBullet'
        // ...初始化代码...
    }

    update() {
        // 检测与玩家的碰撞
        // ...已有代码...
        if (this.checkCollisionWithPlayer()) {
            this.applyEffect();
            this.isAlive = false;
        }
    }

    applyEffect() {
        switch (this.type) {
            case 'speed':
                dataBus.player.increaseBulletSpeed();
                break;
            case 'multiBullet':
                dataBus.player.enableMultiBullet();
                break;
            case 'increaseBullet':
                dataBus.player.increaseBulletCount();
                break;
        }
    }
    // ...已有代码...
}
