class Character extends MovableObject {
    height = 280;
    y = 155;
    speed = 10;
    IMAGES_WALKING = ['/img/2_character_pepe/2_walk/W-21.png',
        '/img/2_character_pepe/2_walk/W-22.png',
        '/img/2_character_pepe/2_walk/W-23.png',
        '/img/2_character_pepe/2_walk/W-24.png',
        '/img/2_character_pepe/2_walk/W-25.png',
        '/img/2_character_pepe/2_walk/W-26.png',
    ];
    world;
    walking_sound = new Audio('audio/running.mp3')

    constructor() {
        super().loadImage('/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);

        this.animate()
    }

    animate() {

        setInterval(()=>{
            //Geschwindigkeiten für rechts und links laufen wird animiert
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
            };
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
            //kamera wird immer um die gleiche Pixelmenge wie der charakter bewegt aber in die andere Richtung und soll insgesamt immer 100pixel rechts vom charakter sein, damit dieser nicht direkt am Rand ist
            this.world.camera_x = -this.x +100;
        },1000/60)

        setInterval(() => {
            //walking-musik wird kurz pausiert und läuft nur weiter wenn die Tasten wieterhin gedrückt werdne
            this.walking_sound.pause();
            //Animation wird abgespielt wenn Rechts oder Links true ist
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                //Walk animation
                //modulo(%) Funktion errechnet den Rest und gibt den Rest aus, sodass i nie größer als 5 bzw. length wird
                //wenn RIGHT True ist werden die Bilder in ganz schneller Reihenfolge abgespielt, sodass es aussieht als würde der charakter laufen
                this.playAnimation(this.IMAGES_WALKING);

                //walking-musik wird abgespielt
                this.walking_sound.play();
            }
        }, 50)
    }

    jump() {

    }
}