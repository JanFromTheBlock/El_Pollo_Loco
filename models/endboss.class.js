/**
 * class representing the endboss
 * 
 * @extends MovableObject
 */
class Endboss extends MovableObject {
    endbossHurt = false;
    endbossRun = false;
    height = 400;
    width = 250;
    y = 55;
    speed = 0.3;
    world;
    endboss = true;
    
    IMAGES_STANDING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    IMAGES_ATTACKING = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ]
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    /**
     * creating the endboss
     * 
     */
    constructor() {
        super().loadImage(this.IMAGES_STANDING[0]);
        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2500;
    }

    /**
     * This function sets the interval to animate the endboss
     * 
     */
    animate() { this.world.setStoppableInterval(this.animateEndboss.bind(this), 200); }

    /**
     * This function checks the situation of the endboss and plays the matching animation
     * 
     */
    animateEndboss() {
        if (world.endbossBar.percentage == 0) {
            this.endbossIsDying();
        } else {
            if (this.endbossHurt) {
                this.endbossIsHurt();
            } else {
                if (world.camera_x < -2000 || this.endbossRun) {
                    this.endbossIsRunning();
                } else {
                    this.endbossIsWaiting();
                }
            }
        }
    }

    /**
     * This function animates the waiting endboss
     * 
     */
    endbossIsWaiting() {
        this.playAnimation(this.IMAGES_STANDING);
    }

    /**
     * This function animates the running endboss
     * 
     */
    endbossIsRunning() {
        if (!this.endbossHurt) {
            this.endbossRun = true;
            this.playAnimation(this.IMAGES_WALKING);
            this.world.setStoppableInterval(this.moveLeft.bind(this), 1000 / 60);
        }
    }

    /**
     *This function animates the hurt endboss
     * 
     */
    endbossIsHurt() {
        this.speed = 0;
        this.playAnimation(this.IMAGES_ATTACKING);
        this.endbossIsAttacking();
    }

    /**
     * This function animates the attacking endboss
     * 
     */
    endbossIsAttacking() {
        setTimeout(() => {
            this.endbossHurt = false;
            this.endbossRun = true;
            this.speed = 0.3;
        }, 1000);
    }

    /**
     * This function let the endboss die and triggers the termination of the game
     * 
     */
    endbossIsDying() {
        this.playAnimation(this.IMAGES_DEAD);
        this.world.endboss_died_sound.play();
        this.speed = 0;
        world.stopGame();
    }

}