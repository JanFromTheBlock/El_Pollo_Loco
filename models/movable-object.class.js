class MovableObject{
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;


    loadImage(path){
        this.img = new Image();    //image ist von javascript voreingestellt und beschreibt ein img-tag
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving right')
    }

    moveLeft(){

    }
}