class ThrowableObject extends MovableObject {
    collision = false;
    alreadyHit = false;
    throwingSoundAlreadyPlayed = false
    bottle_smashing_sound = new Audio('audio/bottle_smash.mp3');

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

    /**
     * This function checks the settings for throwing the bottle
     * 
     * @param {boolean} throwOtherDirection - true, if character looks to the left and fals, if the character looks to the right
     */
    throw(throwOtherDirection) {
        this.speedY = 20;
        this.mute_bottles();
        this.setTheDropLocationforThrowingToTheLeft(throwOtherDirection);
        this.applyGravity();
        const moveBottleWrapper = () => {this.moveBottle(throwOtherDirection)};
        this.world.setStoppableInterval(this.animateBottle.bind(this), 25);
        this.world.setStoppableInterval(moveBottleWrapper.bind(this), 25);
        this.world.character.timeOfLastAction();
    }

    /**
     * This function is used to change the drop of location of the bottle to the left of the character if he is ging to throw to the left.
     * 
     * @param {*} throwOtherDirection - true, if character looks to the left and fals, if the character looks to the right 
     */
    setTheDropLocationforThrowingToTheLeft(throwOtherDirection){
        if (throwOtherDirection) {
            this.x -= 120;
        }
    }

    /**
     * This function is used to check whether the game is muted or not and apply the settings to new added bottle
     * 
     */
    mute_bottles(){
        if (world.gameMuted) {
            this.bottle_smashing_sound.muted = true;
        }
    }

    /**
     * This function is used to throw a bottle in the direction the character is facing
     * 
     * @param {boolean} throwOtherDirection - true, if character looks to the left and fals, if the character looks to the right
     */
    moveBottle(throwOtherDirection) {
        if (!this.collision) {
            if (!throwOtherDirection) {
                this.x += 5;
            }else{
                this.x -= 5;
            }  
        }
    }

    /**
     * This function is used to find out the current state of the bottle to play the right animations
     * 
     */
    animateBottle() {
        if (this.collision) {
            this.bottleIsColliding();
        } else {
            this.bottleIsFlying();
        }
    }

    /**
     * This function animates the flying bottle
     * 
     */
    bottleIsFlying() {
        this.playAnimation(this.IMAGES_THROWING);
    }

    /**
     * This function animates the flying bottle
     * 
     */
    bottleIsColliding() {
        this.playAnimation(this.IMAGES_COLLIDING);
        this.throwingSoundAlreadyPlayed = false;
    }
}