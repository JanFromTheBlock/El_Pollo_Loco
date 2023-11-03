class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png')
        this.x = Math.random() * 500;  //Variable zwischen 0 und 500
        this.animate();


    }
    //Funktion wird alle 1000/60 ms ausgeführt und x verringert sich jeweils um 0,15px
    animate(){
    this.moveLeft();
        
    };

}