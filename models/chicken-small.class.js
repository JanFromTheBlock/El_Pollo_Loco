/**
 * class representing small chicken
 * 
 * @extends MovableObject
 */
class ChickenSmall extends MovableObject {
    y = 350;
    height = 80;
    width = 80;
    enemy_dead = false
    world;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    
    /**
     * creating a small chicken
     * 
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 200 + Math.random() * 2000;
        this.speed = 0.15 + Math.random() * 0.5
    }

    /**
     * This function sets the intervals for moving the small chicken
     * 
     */
    animate() {
        this.world.setStoppableInterval(this.moveLeft.bind(this), 1000 / 60);
        this.world.setStoppableInterval(this.animateChicken.bind(this), 200);
    }
    
    /**
     * This function checks the situation of the small chicken and plays the matching animation
     * 
     */
    animateChicken(){
        if (this.enemy_dead) {
            this.loadImage('img/3_enemies_chicken/chicken_small/2_dead/dead.png')
            this.speed = 0;
        }else{
            this.playAnimation(this.IMAGES_WALKING);
        }
    }
}