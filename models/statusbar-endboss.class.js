class EndbossBar extends StatusBar {
    y = 40;
    x = 500;
percentage = 100

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png',
    ]

    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }

     /**
      * This function shows the matching image of the status bar according to energy level of the endboss
      * 
      * @param {number} percentage - value between 0 - 5, which shows the remaining enegery of the endboss 
      */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()]
        this.img = this.imageCache[path];
    }

    /**
     * This function is used to convert the energy level into a number between 0 and 5
     * 
     * @returns - according to the energy level a number between 0 and 5
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * This function reduces the energy of the endboss by 34 and sets a new time for the last Hit
     * 
     */
    hit(){
        this.percentage -= 34;
        if(this.percentage < 0){
            this.percentage = 0;
        }else{
            this.lastHit = new Date().getTime();
        }
    }
}