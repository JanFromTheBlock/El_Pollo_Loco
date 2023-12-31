/**
 * class representing the main character
 * 
 * @extends MovableObject
 */
class Character extends MovableObject {
    height = 280;
    y = 155;
    speed = 10;
    offsetx = 20;
    offsety = 120;
    offsetWidth = -20 
    world;
    walking_sound = new Audio('audio/running.mp3')
    character_hurt_sound = new Audio('audio/character_hurt.mp3');
    character_died_sound = new Audio('audio/character_died.mp3')
    jumping_sound = new Audio('audio/jump.mp3');
    jumpingSoundAlreadyPlayed = false;
    characterDied = false;
    lastAction;
    characterIsLanding = false;

    IMAGES_SLEEPING = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    IMAGES_WAITING = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ]
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    /**
     * creating the main character
     * 
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_WAITING);
        this.loadImages(this.IMAGES_SLEEPING);
        this.applyGravity();
    }

    /**
     * This function sets the intervals for moving the character
     * 
     */
    animate() {
        this.world.setStoppableInterval(this.moveCharacter.bind(this), 1000 / 60);
        this.world.setStoppableInterval(this.animateCharacter.bind(this), 100);
    }

    /**
     * This function pauses the walkinng-sound and check the situation of the character to load the correct Images and sounds
     * 
     */
    animateCharacter() {
        this.pauseSounds();
        this.checkSituationOfTheCharacterToAnimate();
    }

    /**
     * This function is used to find out the current state of the character to play the right animations
     * 
     */
    checkSituationOfTheCharacterToAnimate() {
        if (this.isDead()) {
            this.characterisDying();
            this.timeOfLastAction();
        } else if (this.isHurt()) {
            this.characterIsHurt();
            this.timeOfLastAction();
        } else if (this.isAboveGround()) {
            this.characterIsJumping();
            this.timeOfLastAction();
        } else {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.characterIsWalking();
                this.timeOfLastAction();
            } else {
                if (this.timeSinceLastAction()) {
                    this.characterIsSleeping();
                }else{
                    this.characterIsWaiting();
                }
            }
        }
    }

   /**
    * This function is used to check the duration sindce the last action of the character
    * 
    * @returns - if the character hasn't performed any action for more than 2 seconds
    */
    timeSinceLastAction(){
        let timepassed = new Date().getTime() - this.lastAction;
        timepassed = timepassed / 1000;
        return timepassed > 2;
    }

    /**
     * This function sets the time of the last action of the character
     * 
     */
    timeOfLastAction(){
        this.lastAction = new Date().getTime();
    }

    /**
     * This function animates the sleeping character
     * 
     */
    characterIsSleeping() {
        this.playAnimation(this.IMAGES_SLEEPING);
    }

    /**
     * This function animates the waiting character
     * 
     */
    characterIsWaiting() {
        this.playAnimation(this.IMAGES_WAITING);
    }

    /**
     *  * This function animates the walking character
     * 
     */
    characterIsWalking() {
        this.playAnimation(this.IMAGES_WALKING);
        this.walking_sound.play();
    }

    /**
     *  * This function animates the hurt character
     * 
     */
    characterIsHurt() {
        this.playAnimation(this.IMAGES_HURT); 
        if (this.character_hurt_sound.play !== undefined) {
            this.character_hurt_sound.play();
        }
        this.character_hurt_sound.play();
    }

    /**
     *  * This function animates the jumping character
     * 
     */
    characterIsJumping() {
        this.playAnimation(this.IMAGES_JUMPING);
        this.characterIsLanding = true;
        if (!this.jumpingSoundAlreadyPlayed) {
            if (this.jumping_sound.play !== undefined) {
                this.jumping_sound.play();
            }
            this.jumping_sound.play();
            this.jumpingSoundAlreadyPlayed = true;
            setTimeout(() => {
                this.jumpingSoundAlreadyPlayed = false;
                this.characterIsLanding = false;
            }, 1500);
        }
    }

    /**
     *  * This function let the character die and triggers the termination of the game
     * 
     */
    characterisDying() {
        this.playAnimation(this.IMAGES_DEAD);
        this.character_died_sound.play();
        this.characterDied = true;
        this.world.stopGame();
    }

    /**
     * This function stops the walking sounds
     * 
     */
    pauseSounds() {
        this.walking_sound.pause();
    }

    /**
     * This function is used to move the character left, right and up
     * 
     */
    moveCharacter() {
        if (this.world) {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveCharacterRight();
            };
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveCharacterLeft();
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }
            this.world.camera_x = -this.x + 100;
        }
    }

    /**
     * This function moves the character to the right
     * 
     */
    moveCharacterRight() {
        this.moveRight();
        this.otherDirection = false;
    }

    /**
     * This function moves the character to the left
     * 
     */
    moveCharacterLeft() {
        this.moveLeft();
        this.otherDirection = true;
    }
}