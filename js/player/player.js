// ...已有代码...
constructor() {
    // ...已有代码...
    this.bulletSpeed = 10;
    this.bulletCount = 1;
    this.multiBullet = false;
}

increaseBulletSpeed() {
    this.bulletSpeed += 2;
}

increaseBulletCount() {
    this.bulletCount += 1;
}

enableMultiBullet() {
    this.multiBullet = true;
    setTimeout(() => {
        this.multiBullet = false;
    }, 5000);
}

shoot() {
    for (let i = 0; i < this.bulletCount; i++) {
        const angleOffset = (i - (this.bulletCount - 1) / 2) * 0.1;
        const angle = this.angle + angleOffset;
        dataBus.addActor(new Bullet(this.level, this.x, this.y, angle));
    }
    if (this.multiBullet) {
        // 发射多方向子弹
        // ...实现代码...
    }
}
// ...已有代码...
