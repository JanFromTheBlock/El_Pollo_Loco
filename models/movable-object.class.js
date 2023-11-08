class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.5;
    energy = 100;
    lastHit = 0;

    applyGravity() {
        //wenn Pepe in der Luftist oder eine positive Geschwindigkeit nach oben hat durch drücken von PFeiltaste-UP --> wird Y-Koordinate durch Beschleunigung verändert
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }

    isAboveGround() {
        //solange Pepe höher als 155px ist, ist er in der Luft
        return this.y < 155;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            //Viereck um jedes Objekt zeichnen um Kollisionen zu detektieren
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
    //character.isColliding(chicken) detektiert pb der Charakter mit dem chicken zusammenstößt, indem geschaut wird, ob der Rahmen der beiden Elemente überkreuzt
    isColliding(mo) {
        return this.x + this.width > mo.x &&
                this.y + this.height > mo.y &&
                this.x < mo.x &&
                this.y < mo.y + mo.height
}

    hit(){
        this.energy -= 5;
        if(this.energy < 0){
            this.energy = 0;
        }else{
            //Zeit wird in Zahlen gespeichert in ms seit 1.1.1970
            this.lastHit = new Date().getTime();
        }
    }

    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit; //Differenz in ms seit letzem Hit
        timepassed = timepassed / 1000; // Differenz in Sekunden umgerechnet
        return timepassed < 1; // wenn Zeitpunkt des letzten Hits weniger als eine Skeunde zurückliegt, dann wird True ausgegeben
    }

    isDead(){
        return this.energy == 0;
    }

    loadImage(path) {
        this.img = new Image();    //image ist von javascript voreingestellt und beschreibt ein img-tag
        this.img.src = path;
    }

    //lade mehrere Bilder aus einem Array
    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    //Walk animation
    //modulo(%) Funktion errechnet den Rest und gibt den Rest aus, sodass i nie größer als 5 bzw. length wird
    //wenn RIGHT True ist werden die Bilder in ganz schneller Reihenfolge abgespielt, sodass es aussieht als würde der charakter laufen
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }
    jump() {
        this.speedY = 25;
    }
}