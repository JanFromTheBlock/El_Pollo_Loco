class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.5;
    energy = 100;
    lastHit = 0;
    endboss = false;
    offsetx = 0;
    offsety = 0;
    offsetWidth = 0
    chickenIsDying = false;

    /**
     * This function sets the interval to apply gravity. Objects jumping or throwing around, will get back to the ground
     * 
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }

    /**
     * This function checks whether there are objects in the air
     * 
     * @returns - if its a throwable object or if an object has a lower y-value than 155px
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 155;
        }
    }


    /**
     * This function checks whether an object is colliding with another movable object
     * 
     * @param {object} mo - This is a movable object you want to check a collision with
     * @returns - if a collision is detected
     */
    isColliding(mo) {
        return this.x + this.offsetx < mo.x + mo.width &&
            this.y + this.offsety < mo.y + mo.height &&
            this.x + this.width + this.offsetWidth > mo.x &&
            this.y + this.height > mo.y;
    }

    /**
     * This function reduces the energy of an object by 5 and sets a new time for the last Hit
     * 
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * This function checks if the character is still hurt by calculating the duration since the last hit
     * 
     * @returns - if the last Hit was less than 1 second ago
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; 
        timepassed = timepassed / 1000; 
        return timepassed < 1;
    }

    /**
     * This function checks whether the object is dead
     * 
     * @returns - if the energy of the object is 0
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * This function is used to showcurrent image of an object. It is gonna be repeated multiple times with different images th animate an object
     * 
     * @param {array} images - array withe all the images of the object
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * This function is used to move an object to the right
     * 
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * This function is used to move an object to the left
     * 
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * This function is used to make an object jump
     * 
     */
    jump() {
        this.speedY = 25;
    }
}