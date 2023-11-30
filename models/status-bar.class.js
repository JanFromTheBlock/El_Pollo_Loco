class StatusBar extends DrawableObject {
    x = 20;
    width = 200;
    height = 60;
    constructor() {
        super();
    }  

    setAmountOfObjects(objects){
        let path = this.IMAGES[objects]
        this.img = this.imageCache[path];
    }
}

