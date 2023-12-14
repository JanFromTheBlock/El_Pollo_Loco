class DrawableObject {
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;

    /**
     * This function is used to add a new Image-class and set the path of the image of an object
     * 
     * @param {string} path - url of the image
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * This function places a layer on the canvas that can be painted
     * 
     * @param {CanvasRenderingContext2D} ctx - copy of the canvas
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * This function loads several picture and save them into new Images to an object
     * 
     * @param {array} array - array with all the picture to be saved
     */
    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}