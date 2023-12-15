/**
 * class representing the status bar for the amount of collected coins
 * 
 * @extends StatusBar
 */
class CoinBar extends StatusBar {
    y = 90;
    collectedCoins = 0;

    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
    ];

    /**
     * creating the CoinBar
     * 
     */
    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.setAmountOfObjects(this.collectedCoins);
    }
}