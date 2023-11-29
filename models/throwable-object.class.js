class ThrowableObject extends MovableObject {
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

    bottle_smashing_sound = new Audio('audio/bottle_smash.mp3');
    constructor(x, y) {
        super().loadImage(this.IMAGES_THROWING[0]);
        this.loadImages(this.IMAGES_THROWING);
        this.loadImages(this.IMAGES_COLLIDING);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        world;
    }


    throw() {
        this.speedY = 20;
        this.applyGravity();
        this.world.setStoppableInterval(this.animateBottle.bind(this), 25);
        this.world.setStoppableInterval(this.moveBottle.bind(this), 25);
    }

    moveBottle() {
        if (!this.collision) {
            this.x += 20;
        }
    }

    animateBottle() {
        this.pauseSound();
        if (this.collision) {
            this.bottleIsColliding();
        } else {
            this.bottleIsFlying();
        }
    }

    pauseSound(){
        this.bottle_smashing_sound.pause();
    }

    bottleIsFlying() {
        this.playAnimation(this.IMAGES_THROWING);
        if (this.bottle_smashing_sound !== undefined) {
            this.bottle_smashing_sound.play().then(_ => {
                this.bottle_smashing_sound.pause();
            })
                .catch(error => {
                })
        }
    }

    bottleIsColliding() {
        this.playAnimation(this.IMAGES_COLLIDING);
    }
}