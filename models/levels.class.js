/**
 * class representing the structure of a level
 * 
 */
class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2200;
    bottles;
    coins;

    /**
     * creating the structure of the level
     * 
     * @param {Array} enemies - all the enemies of the level
     * @param {Array} clouds - all the clouds of the level
     * @param {Array} backgroundObjects - all the background objects of the level
     * @param {Array} bottles - all the bottles of the level
     * @param {Array} coins - all the coins of the level
     */
    constructor(enemies, clouds, backgroundObjects, bottles, coins){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins
    }
}