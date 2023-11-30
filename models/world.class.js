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
    IntervalIds = [];
    positionOfArray = -1;
    endboss_hurt_sound = new Audio('audio/chicken_hurt.mp3');
    collect_bottle_sound = new Audio('audio/collect_bottle.mp3');
    collect_coin_sound = new Audio('audio/collect_coins.mp3');
    game_over_sound = new Audio('audio/game_over.mp3');


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    run() {
        this.setStoppableInterval(this.runWorld.bind(this), 100);
    }

    runWorld() {
        this.pauseSounds();
        this.checkAllCollisions();
    }

    checkAllCollisions() {
        this.checkCollisions(this.level.enemies, 'enemy');
        this.checkCollisions(this.level.bottles, 'bottle');
        this.checkCollisions(this.level.coins, 'coin');
        this.checkCollisionsWithThrownBottles(this.throwableObjects);
        this.checkThrowableObjectsAvailable();
    }

    pauseSounds() {
        this.endboss_hurt_sound.pause();
        this.collect_bottle_sound.pause();
        this.collect_coin_sound.pause();
        this.game_over_sound.pause();
    }

    checkThrowableObjectsAvailable() {
        if (this.keyboard.D && this.bottleBar.collectedBottles > 0) {
            this.initializeBottleThrow();
        }
    }

    initializeBottleThrow() {
        this.AddBottleToThrowableObjects();
        this.deleteBottleFromBottleBar();
    }

    deleteBottleFromBottleBar() {
        this.bottleBar.collectedBottles--;
        this.bottleBar.setAmountOfBottles(this.bottleBar.collectedBottles);
    }

    AddBottleToThrowableObjects() {
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
        this.throwableObjects.push(bottle);
        let i = this.throwableObjects.length - 1;
        this.throwableObjects[i].world = this;
        this.throwableObjects[i].throw();
    }

    checkCollisionsWithThrownBottles(array) {
        array.forEach((o) => {
            let i = array.indexOf(o);
            if (this.level.enemies['3'].isColliding(o) || o.y > 335) {
                this.endbossIsGettingHurt(array, i);
                if (!this.throwableObjects[i].alreadyHit) {
                    this.reduceEndbossHealthBar(i);
                }

            }
        })
    }

    reduceEndbossHealthBar(i) {
        this.endbossBar.hit();
        this.endbossBar.setPercentage(this.endbossBar.percentage);
        this.throwableObjects[i].alreadyHit = true;
        this.level.enemies['3'].endbossHurt = true;;
    }

    endbossIsGettingHurt(array, i) {
        this.throwableObjects[i].collision = true;
        this.endboss_hurt_sound.play();
        setTimeout(() => {
            array.splice(i, 1);
        }, 0)
    }

    checkCollisions(array, objectType) {
        array.forEach((o) => {
            if (objectType == 'bottle' || objectType == 'coin') {
                this.identifyPositionofObjectInArray();
            }
            if (this.character.isColliding(o)) {
                if (objectType == 'enemy') {
                    this.characterRunsIntoEnemy(o);
                } if (objectType == 'bottle') {
                    this.characterCollectsBottle(array);
                } if (objectType == 'coin') {
                    this.characterCollectsCoin(array);
                }
            }
        })
        this.resetPositionIdentifyingVariable();
    }

    characterCollectsCoin(array) {
        this.collect_coin_sound.play();
        this.coinBar.collectedCoins++
        this.coinBar.setAmountOfCoins(this.coinBar.collectedCoins);
        array.splice(this.positionOfArray, 1);
    }

    characterCollectsBottle(array) {
        //Anzahl an Flaschen zum werfen wird um eins erhöht und bar aktualisiert
        this.collect_bottle_sound.play();
        this.bottleBar.collectedBottles++;
        this.bottleBar.setAmountOfBottles(this.bottleBar.collectedBottles);
        //Variable gibt die Position an an der im array die bottle gelöscht werden soll
        array.splice(this.positionOfArray, 1);
    }

    characterRunsIntoEnemy(o) {
        if (o instanceof Endboss) {
            this.characterRunsIntoEndboss();
        } else {
            this.characterRunsIntoChicken();
        }
    }

    characterRunsIntoChicken() {
        this.character.hit();
        this.healthBar.setPercentage(this.character.energy);
    }

    characterRunsIntoEndboss() {
        this.character.energy = 0;
        this.healthBar.setPercentage(this.character.energy);
    }

    resetPositionIdentifyingVariable() {
        //wenn Funktion einmal komplett durhclaufen wurde, wird variable wieder auf -1 gesetzt
        this.positionOfArray = -1;
    }

    identifyPositionofObjectInArray() {
        //wenn bottles gecheckt werden, wird Varaible immer um eins erhöht um die Position rauszufinden, an der später im array gelöscht werden soll bei einer Kollision
        this.positionOfArray++;
    }

    setWorld() {
        this.character.world = this;
        this.character.animate();
        for (let index = 0; index < this.level.enemies.length; index++) {
            this.level.enemies[index].world = this;
            this.level.enemies[index].animate();
        }
    }

    draw() {
        this.resetCanvas();
        this.drawAllFixedObjects();
        this.cameraFollowsCharacter();
        this.drawAllMovableObjects();
        this.resetPositionOfCamera();
        this.repeatDrawAsOftenAsPossible();
    }

    resetPositionOfCamera() {
        this.ctx.translate(-this.camera_x, 0);
    }

    cameraFollowsCharacter() {
        this.ctx.translate(this.camera_x, 0);
    }

    resetCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    repeatDrawAsOftenAsPossible() {
        //draw-Methode wird sooft wiederholt wie es die Grafikkarte zulässt
        //Die Funktion wird asynchron ausgeführt und startet erst wenn alles vorab gezeichnet wurde.
        //in die Funktion kann man aber kein this schreiben, daher die Variable self
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    drawAllMovableObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins)
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
    }

    drawAllFixedObjects() {
        this.addToMap(this.healthBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.endbossBar);
    }

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
        //mo.drawFrame(this.ctx);

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

    stopGame() {
        this.IntervalIds.forEach(clearInterval);
        this.game_over_sound.play();
    }

    setStoppableInterval(fn, time) {
        let id = setInterval(fn, time);
        this.IntervalIds.push(id);
    }

}

