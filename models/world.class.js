class World {
character = new Character();
enemies = [
    new Chicken(),
    new Chicken(),
    new Chicken(),
];
clouds = [
    new Cloud()
];
backgroundObjects = [
    new BackgroundObject('img/5_background/layers/air.png', 0),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
]
canvas
ctx;

constructor(canvas){
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.draw();
}

draw(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.addObjectsToMap(this.backgroundObjects);
    this.addObjectsToMap(this.clouds);
    this.addObjectsToMap(this.enemies);
    this.addToMap(this.character);

    //draw-Methode wird sooft wiederholt wie es die Grafikkarte zulässt
    //Die Funktion wird asynchron ausgeführt und startet erst wenn alles vorab gezeichnet wurde.
    //in die Funktion kann man aber kein this schreiben, daher die Variable self
    let self = this;
    requestAnimationFrame(function(){
        self.draw();
    });
}

//Befehl wird für jedes Element in variable aus ausgeführt
addObjectsToMap(objects){
    objects.forEach(o => {
        this.addToMap(o);
    });
}

addToMap(mo){
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
}

}

