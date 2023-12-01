class Character extends MovableObject {
    height = 280;
    y = 155;
    speed = 10;
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
    world;
    walking_sound = new Audio('audio/running.mp3')
    character_hurt_sound = new Audio('audio/character_hurt.mp3');
    jumping_sound = new Audio('audio/jump.mp3');
    jumpingSoundAlreadyPlayed = false;


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
    }

    animate() {
        this.world.setStoppableInterval(this.moveCharacter.bind(this), 1000 / 60);
        this.world.setStoppableInterval(this.animateCharacter.bind(this), 50);
    }

    animateCharacter() {
        this.pauseSounds();
        this.checkSituationOfTheCharacterToAnimate();
    }

    checkSituationOfTheCharacterToAnimate() {
        if (this.isDead()) {
            this.characterisDying();
        } else if (this.isHurt()) {
            this.characterIsHurt();
        } else if (this.isAboveGround()) {
            this.characterIsJumping();
        } else {
            this.characterIsWalking();
        }
    }

    characterIsWalking() {
        //Animation wird abgespielt wenn Rechts oder Links true ist und Pepe nicht above Ground ist
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
            //walking-musik wird abgespielt
            this.walking_sound.play();
        }
    }

    characterIsHurt() {
        this.playAnimation(this.IMAGES_HURT); //wenn is Hurt true ist, wird Velretze Bilder angezeigt

        if (this.character_hurt_sound.play !== undefined) {
            this.character_hurt_sound.play();
        }
        this.character_hurt_sound.play();

    }

    characterIsJumping() {
        this.playAnimation(this.IMAGES_JUMPING);  //wenn Pepe in der Luft ist wird Jumping Animation angezeigt
        if (!this.jumpingSoundAlreadyPlayed) {
            if (this.jumping_sound.play !== undefined) {
                this.jumping_sound.play();
            }
            this.jumping_sound.play();
            this.jumpingSoundAlreadyPlayed = true;
            setTimeout(() => {
                this.jumpingSoundAlreadyPlayed = false;
            }, 1500);
        }
    }

    characterisDying() {
        this.playAnimation(this.IMAGES_DEAD);
        this.world.stopGame();
    }

    pauseSounds() {
        //walking-musik wird kurz pausiert und läuft nur weiter wenn die Tasten wieterhin gedrückt werdne
        this.walking_sound.pause();
        this.character_hurt_sound.pause();
        this.jumping_sound.pause();
    }

    moveCharacter() {
        if (this.world) {
            //Geschwindigkeiten für rechts und links laufen wird animiert
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveCharacterRight();
            };
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveCharacterLeft();
            }
            //wenn space-taste gedrückt wird und PEpe auf dem Boden ist, wird initial beschleunigt nach oben
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }
            //kamera wird immer um die gleiche Pixelmenge wie der charakter bewegt aber in die andere Richtung und soll insgesamt immer 100pixel rechts vom charakter sein, damit dieser nicht direkt am Rand ist
            this.world.camera_x = -this.x + 100;
        }
    }

    moveCharacterRight() {
        this.moveRight();
        this.otherDirection = false;
    }

    moveCharacterLeft() {
        this.moveLeft();
        this.otherDirection = true;
    }
}