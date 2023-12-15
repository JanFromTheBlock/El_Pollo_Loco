/**
 * class representing the status bar for the amount of bottles the character collected
 * 
 * @extends StatusBar
 */
class BottleBar extends StatusBar {
    y = 40;
    collectedBottles = 0;
    
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png',
    ];

    /**
     * creating the BottleBar
     */
    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.setAmountOfObjects(this.collectedBottles);
    }
}