class Chicken extends MovableObject {
    y = 350;
    height = 80;
    width = 80;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'

    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5

        this.animate();
    }

    animate() {
        this.moveLeft();
        setInterval(() => {
            //modulo(%) Funktion errechnet den Rest und gibt den Rest aus, sodass i nie größer als 5 bzw. length wird
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}