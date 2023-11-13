class ThrowableObject extends MovableObject{
    collision = false;
    alreadyHit = false;
  IMAGES_COLLIDING = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];
    IMAGES_THROWING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];
    constructor(x, y){
        super().loadImage(this.IMAGES_THROWING[0]);
        this.loadImages(this.IMAGES_THROWING);
        this.loadImages(this.IMAGES_COLLIDING);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
    }


    throw(){
        this.speedY = 20;
        this.applyGravity();
            setInterval(() => {
               if (this.collision) {
                   this.playAnimation(this.IMAGES_COLLIDING);
                } else{
                    this.playAnimation(this.IMAGES_THROWING);
                }
            }, 25);
            setInterval(() => {
                if (!this.collision) {
                    this.x += 20;
                }
            }, 25);
    }
}