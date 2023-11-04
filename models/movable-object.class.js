class MovableObject{
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;

    loadImage(path){
        this.img = new Image();    //image ist von javascript voreingestellt und beschreibt ein img-tag
        this.img.src = path;
    }

    //lade mehrere Bilder aus einem Array
    loadImages(array){
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    playAnimation(images){
        let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
    }

    moveRight() {
        console.log('Moving right')
    }

    moveLeft(){
        setInterval(() => {
            this.x -= this.speed;
        }, 1000/60)
    }
}