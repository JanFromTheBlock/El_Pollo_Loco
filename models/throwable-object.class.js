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
    throwingSoundAlreadyPlayed = false
    constructor(x, y) {
        super().loadImage(this.IMAGES_THROWING[0]);
        this.loadImages(this.IMAGES_THROWING);
        this.loadImages(this.IMAGES_COLLIDING);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        world;
        this.bottle_smashing_sound.play();
    }


    throw(throwOtherDirection) {
        if (world.gameMuted) {
            this.bottle_smashing_sound.muted = true;
        }
        if (throwOtherDirection) {
            this.x -= 120;
        }
        this.speedY = 20;
        this.applyGravity();
        const moveBottleWrapper = () => {
            this.moveBottle(throwOtherDirection);
        };
        this.world.setStoppableInterval(this.animateBottle.bind(this), 25);
        this.world.setStoppableInterval(moveBottleWrapper.bind(this), 25);
        this.world.character.timeOfLastAction();
    }

    moveBottle(throwOtherDirection) {
        if (!this.collision) {
            if (!throwOtherDirection) {
                this.x += 10;
            }else{
                this.x -= 10;
            }
            
        }
    }

    animateBottle() {
        if (this.collision) {
            this.bottleIsColliding();
        } else {
            this.bottleIsFlying();
        }
    }

    bottleIsFlying() {
        this.playAnimation(this.IMAGES_THROWING);
    }

    bottleIsColliding() {
        this.playAnimation(this.IMAGES_COLLIDING);
        this.throwingSoundAlreadyPlayed = false;
    }
}