class EndbossBar extends StatusBar {
    y = -10;
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

     //setPercentage wird mit parameter aufgerufen und parameter wird der neue percentage Wert
    setPercentage(percentage) {
        this.percentage = percentage; //Zahl zwischen 0 ... 5 ermitteln, damit nur eines der Bilder angezeigt wird
        let path = this.IMAGES[this.resolveImageIndex()]
        this.img = this.imageCache[path];
    }
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

    hit(){
        this.percentage -= 20;
        if(this.percentage < 0){
            this.percentage = 0;
        }else{
            //Zeit wird in Zahlen gespeichert in ms seit 1.1.1970
            this.lastHit = new Date().getTime();
        }
    }
}