class Endboss extends MovableObject {
    endbossHurt = false;
    endbossRun = false;
    height = 400;
    width = 250;
    y = 55;
    speed = 0.3;

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

    constructor() {
        super().loadImage(this.IMAGES_STANDING[0]);
        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2500;
    }

    animate() {
        setInterval(() => {
            if (world.endbossBar.percentage == 0) {
                this.playAnimation(this.IMAGES_DEAD);
                this.speed = 0;
                world.stopGame();
            } else {
                if (this.endbossHurt) {
                    this.speed = 0;
                    this.playAnimation(this.IMAGES_ATTACKING);
                    setTimeout(() => {
                        this.endbossHurt = false;
                        this.endbossRun = true;
                        this.speed = 0.3;
                    }, 1000);
                } else {
                    if (world.camera_x < -2000 || this.endbossRun) {
                        this.playAnimation(this.IMAGES_WALKING);
                        if (!this.endbossHurt) {
                            setInterval(() => {
                                this.moveLeft();
                            }, 1000 / 60);
                        }

                    } else {
                        this.playAnimation(this.IMAGES_STANDING);
                    }
                }
            }

        }, 200);
    }


}