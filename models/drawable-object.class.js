class DrawableObject{
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;

    loadImage(path) {
        this.img = new Image();    //image ist von javascript voreingestellt und beschreibt ein img-tag
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    //drawFrame(ctx) {
    //    if (this instanceof Character) {
    //        //Viereck um jedes Objekt zeichnen um Kollisionen zu detektieren
    //        ctx.beginPath();
    //        ctx.lineWidth = '5';
    //        ctx.strokeStyle = 'blue';
    //        ctx.rect(this.x, this.y + 120, this.width, this.height -120);
    //        ctx.stroke();
    //    }
    //}

       //lade mehrere Bilder aus einem Array
       loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}