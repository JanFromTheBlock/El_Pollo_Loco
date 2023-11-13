class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new HealthBar();
    bottleBar = new BottleBar();
    coinBar = new CoinBar();
    endbossBar = new EndbossBar();
    throwableObjects = [];
    positionOfArray = -1;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    run() {
        setInterval(() => {
            this.checkCollisions(this.level.enemies, 'enemy');
            this.checkCollisions(this.level.bottles, 'bottle');
            this.checkCollisions(this.level.coins, 'coin');
            this.checkCollisionsWithThrownBottles(this.throwableObjects);
            this.checkThrowableObjects();
        }, 100);
    }

    checkThrowableObjects() {
        if (this.keyboard.D && this.bottleBar.collectedBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.bottleBar.collectedBottles--;
            this.bottleBar.setAmountOfBottles(this.bottleBar.collectedBottles);
        }
    }

    checkCollisionsWithThrownBottles(array) {
        array.forEach((o) => {
            let i = array.indexOf(o);
            if (this.level.enemies['3'].isColliding(o) || o.y > 335) {
                this.throwableObjects[i].collision = true;
                setTimeout(() => {
                    array.splice(i, 1);
                }, 0)
                if (!this.throwableObjects[i].alreadeHit) {
                    this.endbossBar.hit();
                this.endbossBar.setPercentage(this.endbossBar.percentage);
                this.throwableObjects[i].alreadeHit = true;
                }
                
            }
        })
    }

    checkCollisions(array, objectType) {
        array.forEach((o) => {
            if (objectType == 'bottle' || objectType == 'coin') {
                //wenn bottles gecheckt werden, wird Varaible immer um eins erhöht um die Position rauszufinden, an der später im array gelöscht werden soll bei einer Kollision
                this.positionOfArray++;
            }
            if (this.character.isColliding(o)) {
                if (objectType == 'enemy') {
                    this.character.hit();
                    this.healthBar.setPercentage(this.character.energy);
                } if (objectType == 'bottle') {
                    //Anzahl an Flaschen zum werfen wird um eins erhöht und bar aktualisiert
                    this.bottleBar.collectedBottles++;
                    this.bottleBar.setAmountOfBottles(this.bottleBar.collectedBottles);
                    //Variable gibt die Position an an der im array die bottle gelöscht werden soll
                    array.splice(this.positionOfArray, 1);
                } if (objectType == 'coin') {
                    this.coinBar.collectedCoins++
                    this.coinBar.setAmountOfCoins(this.coinBar.collectedCoins);
                    array.splice(this.positionOfArray, 1);
                }
            }
        })
        //wenn Funktion einmal komplett durhclaufen wurde, wird variable wieder auf -1 gesetzt
        this.positionOfArray = -1;
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

        this.ctx.translate(-this.camera_x, 0); //back: damit StatusBar fest an einem Ort bleibt
        // ------- space for fixed objects ----------
        this.addToMap(this.healthBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.endbossBar);
        this.ctx.translate(this.camera_x, 0) //forward: damit der Rest wieder dynamisch gezeichnet wird

        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins)
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);

        //anschließend wird die Kamera wieder zurückgesetzt
        this.ctx.translate(-this.camera_x, 0);


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

