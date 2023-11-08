class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    checkCollisions(){
        setInterval(() => {
           this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) ){
                this.character.hit();
            }
           }) 
        }, 200);
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //Kamera wird um Betrag camera_x zur Seite verschoben
        this.ctx.translate(this.camera_x, 0)

        //dann werden alle Objekte gezeichnet
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);

        //anschließend wird die Kamera wieder zurückgesetzt
        this.ctx.translate(-this.camera_x, 0)


        //draw-Methode wird sooft wiederholt wie es die Grafikkarte zulässt
        //Die Funktion wird asynchron ausgeführt und startet erst wenn alles vorab gezeichnet wurde.
        //in die Funktion kann man aber kein this schreiben, daher die Variable self
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    //Befehl wird für jedes Element in variable aus ausgeführt
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        //wenn aktuelles moving object otherDirection true hat, dann wird:
        //1. speichern wir aktuellen Einstellungen unseres ctx; 2. Bild wird um die Breite zur Seite versetzt um das Drehen der spiegelung zu kompensieren 3. Bild wird gespiegelt eingefügt
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        //wenn ctx oben geändert wurde, wird ctx hier wieder hergestellt und X-Koordinate erneut gespiegelt
        if (mo.otherDirection) {
            this.flipImageBack(mo)
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0)
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}

