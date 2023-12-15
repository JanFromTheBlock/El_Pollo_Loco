class World {
    character = new Character();
    loseGame = new GameOver()
    wonGame = new GameWin();
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
    game_win_sound = new Audio('audio/game_win.mp3');
    endboss_died_sound = new Audio('audio/chicken_died.mp3');
    animationFrame;
    gameStarts = true;
    gameMuted = false;
    indexOfEndboss;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.pauseSounds();
        this.character.timeOfLastAction();
    }

    /**
     * This Function set an interval for a function that checks collisions between objects
     * 
     */
    run() {
        this.setStoppableInterval(this.runWorld.bind(this), 100);
    }

    /**
     * This function triggers another function checks all the collisions between objects, if the game has already been started
     * 
     */
    runWorld() {
        if (!this.gameStarts) {
            this.checkAllCollisions();
        }
    }

    /**
     * This function checks collisions between all objects
     * 
     */
    checkAllCollisions() {
        this.checkCollisions(this.level.enemies, 'enemy');
        this.checkCollisions(this.level.bottles, 'bottle');
        this.checkCollisions(this.level.coins, 'coin');
        this.prepareCheckCollisionsWithThrownBottles(this.throwableObjects);
        this.checkThrowableObjectsAvailable();
    }

    /**
     * This function is used to pause all the sounds of the game in the beginning
     * 
     */
    pauseSounds() {
        this.endboss_hurt_sound.pause();
        this.collect_bottle_sound.pause();
        this.collect_coin_sound.pause();
        this.game_over_sound.pause();
        this.game_win_sound.pause();
        this.character.character_hurt_sound.pause();
        this.character.jumping_sound.pause();
        this.endboss_died_sound.pause();
        this.character.character_died_sound.pause();
    }

    /**
     * This function checks whether the conditions for throwing a bottle were met to initiate the throw 
     * 
     */
    checkThrowableObjectsAvailable() {
        if (this.keyboard.D && this.bottleBar.collectedBottles > 0 && !this.throwableObjects.length) {
            this.initializeBottleThrow();
        }
    }

    /**
     * This function turns a bottle into a throwable object by deleting the bottle and create throwable object
     * 
     */
    initializeBottleThrow() {
        this.addBottleToThrowableObjects();
        this.deleteBottleFromBottleBar();
    }

    /**
     * This function initiate the reduction of the number of bottles by one and the change of the status bar of the bottles
     * 
     */
    deleteBottleFromBottleBar() {
        this.bottleBar.collectedBottles--;
        this.bottleBar.setAmountOfObjects(this.bottleBar.collectedBottles);
    }

    /**
     * This function create a new throwable object and triggers the throw function afterwards
     * 
     */
    addBottleToThrowableObjects() {
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
        this.throwableObjects.push(bottle);
        let i = this.throwableObjects.length - 1;
        this.throwableObjects[i].world = this;
        this.throwableObjects[i].throw(this.character.otherDirection);
    }

    /**
     * This function defines which enemy of the array the endboss is and initialize to check collisions with the thrown bottles
     * 
     * @param {array} array - enemies who are potential victims of the thrown bottles
     */
    prepareCheckCollisionsWithThrownBottles(array) {
        this.identifyIndexOfEndboss();
        this.checkCollisionsWithThrownBottles(array)
    }

    /**
     * This function checks whether the bottle collide with the ground, a normal chicken or the endobss
     * 
     * @param {array} array - array of throwable objects
     */
    checkCollisionsWithThrownBottles(array) {
        array.forEach((o, index) => {
            let i = array.indexOf(o);
            for (let enemy = 0; enemy < this.level.enemies.length; enemy++) {
                if (this.level.enemies[enemy].isColliding(o) || o.y > 335) {
                    this.bottleSplashes(array, i);
                    if (this.level.enemies[this.indexOfEndboss].isColliding(o)) {
                        this.endbossIsGettingHurt();
                        if (!this.throwableObjects[i].alreadyHit) {
                            this.reduceEndbossHealthBar(i, this.indexOfEndboss);
                        }
                    } else if (this.level.enemies[enemy].isColliding(o)) {
                        this.chickenDies(enemy)
                    }
                }                
            }
        })
    }

    /**
     * This function identifies which enemy of the array the endboss is
     * 
     */
    identifyIndexOfEndboss() {
        for (let indexEnemies = 0; indexEnemies < this.level.enemies.length; indexEnemies++) {
            if (this.level.enemies[indexEnemies].endboss) {
                this.indexOfEndboss = indexEnemies;
            }
        }
    }

    /**
     * This function is used to let a chicken die by deleteing the chicken from the enemies array and set the variable(enemy_dead) true
     * 
     * @param {number} index - number of the enemy in the array that should die
     */
    chickenDies(index) {
        if (!this.level.enemies[index].chickenIsDying) {
            this.level.enemies[index].enemy_dead = true;
            this.level.enemies[index].chickenIsDying = true;
            setTimeout(() => {
                if (index < this.level.enemies.length && this.level.enemies[index].chickenIsDying) {
                    this.level.enemies.splice(index, 1);
                }else{
                    for (let position = 0; position < this.level.enemies.length; position++) {
                        if (this.level.enemies[position].chickenIsDying) {
                            this.level.enemies.splice(position, 1);
                        }                        
                    }
                }
            }, 400);
        }
    }

    /**
     * This function is used to reduce the health bar of the endboss and set endbossHurt variable true.
     * 
     * @param {number} i - number of the bottle in the array wich hit an enemy
     * @param {number} indexOfEndboss - id of the endboss in the array of enemies
     */
    reduceEndbossHealthBar(i, indexOfEndboss) {
        this.endbossBar.hit();
        this.endbossBar.setPercentage(this.endbossBar.percentage);
        this.throwableObjects[i].alreadyHit = true;
        this.level.enemies[indexOfEndboss].endbossHurt = true;;
    }

    /**
     * This function initializes the animation of the splashing bottle and deletes the bottle from the bottles-array.
     * 
     * @param {*} array - enemies who are potential victims of the thrown bottles
     * @param {*} i - number of the bottle in the array wich hit an enemy
     */
    bottleSplashes(array, i) {
        this.throwableObjects[i].collision = true;
        setTimeout(() => {
            array.splice(i, 1);
        }, 50)
    }

    /**
     * This function is used to play the sounds of a hurt endboss
     * 
     */
    endbossIsGettingHurt() {
        this.endboss_hurt_sound.play();
    }

    /**
     * This function is used to check the collisions of the character with bottles, coins and enemies
     * 
     * @param {array} array - objecs that could potentially collide with the character
     * @param {string} objectType - defines the array and is used as a condition in this function 
     */
    checkCollisions(array, objectType) {
        array.forEach((o, index) => {
            if (objectType == 'bottle' || objectType == 'coin') {
                this.identifyPositionofObjectInArray();
            }
            if (this.character.isColliding(o)) {
                if (objectType == 'enemy') {
                    if (this.character.isAboveGround() && !this.keyboard.LEFT && !this.keyboard.RIGHT && this.character.characterIsLanding) {
                        this.chickenDies(index);
                    } else {
                        if (!this.level.enemies[index].chickenIsDying) {
                            this.characterRunsIntoEnemy(o);
                        }
                    }
                } if (objectType == 'bottle') {
                    this.characterCollectsBottle(array);
                } if (objectType == 'coin') {
                    this.characterCollectsCoin(array);
                }
            }
        })
        this.resetPositionIdentifyingVariable();
    }

    /**
     * This function is used when the character collects a coin. It plays the sound, increases the number of collected coins, refresh the coinbar and deletes the coin from the canvas
     * 
     * @param {array} array - array with all coins in the game
     */
    characterCollectsCoin(array) {
        this.collect_coin_sound.play();
        this.coinBar.collectedCoins++
        this.coinBar.setAmountOfObjects(this.coinBar.collectedCoins);
        array.splice(this.positionOfArray, 1);
    }

    /**
     * This function is used when the character collects a bottle. It plays the sound, increases the number of collected bottles, refresh the bottlebar and deletes the bottle from the canvas
     * 
     * @param {array} array - array with all bottles in the game
     */
    characterCollectsBottle(array) {
        this.collect_bottle_sound.play();
        this.bottleBar.collectedBottles++;
        this.bottleBar.setAmountOfObjects(this.bottleBar.collectedBottles);
        array.splice(this.positionOfArray, 1);
    }

    /**
     * This function checks if the character runs into an endboss or a normal chicken
     * 
     * @param {object} o - object of the enemy-array
     */
    characterRunsIntoEnemy(o) {
        if (o instanceof Endboss) {
            this.characterRunsIntoEndboss();
        } else {
            this.characterRunsIntoChicken();
        }
    }

    /**
     * This function is used when the character runs into a chicken. It triggers the character was hit function and initialieze a refreshment of the healthbar
     * 
     */
    characterRunsIntoChicken() {
        this.character.hit();
        this.healthBar.setPercentage(this.character.energy);
    }

    /**
     * This function is used when the character runs into the endboss. The energy of the character is set to 0 and it initializes a refreshment of the health bar
     * 
     */
    characterRunsIntoEndboss() {
        this.character.energy = 0;
        this.healthBar.setPercentage(this.character.energy);
    }

    /**
     * This function is used to reset the value of a variable. During a for loop, the variable checks which object of the array is currently being checked
     * 
     */
    resetPositionIdentifyingVariable() {
        this.positionOfArray = -1;
    }

    /**
     * This function is used to increase the value of a variable. During a for loop, the variable checks which object of the array is currently being checked
     * 
     */
    identifyPositionofObjectInArray() {
        this.positionOfArray++;
    }

    /**
     * This function set the world by defining the character and animating the character and enemies. It starts when the variable of gameStarts = false. The interval stops after the first succesful run
     * 
     */
    setWorld() {
        let startingInvterval = setInterval(() => {
            if (!this.gameStarts) {
                this.character.world = this;
                this.character.animate();
                for (let index = 0; index < this.level.enemies.length; index++) {
                    this.level.enemies[index].world = this;
                    this.level.enemies[index].animate();
                }
                clearInterval(startingInvterval);
            }
        }, 1000 / 25);
    }

    /**
     * This function intializes the drawing of the canvas
     * 
     */
    draw() {
        this.resetCanvas();
        if (this.gameStarts) {
            this.addToMap(this.wonGame);
        } else {
            this.cameraFollowsCharacter();
            this.drawAllMovableObjects();
            this.resetPositionOfCamera();
            this.drawAllFixedObjects();
        }
        this.repeatDrawAsOftenAsPossible();
    }

    /**
     * This function is used to reset the position of the camera to draw all fixed Objects afterwards.
     * 
     */
    resetPositionOfCamera() {
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * This function is used to follow the character with the camera to draw all movable objects afterwards
     * 
     */
    cameraFollowsCharacter() {
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     * This function is used to reset the canvas after each run of the interval to redraw it afterwards
     * 
     */
    resetCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * This function is used to repeat the rest of the main-function as often as possible
     * 
     */
    repeatDrawAsOftenAsPossible() {
        let self = this;
        this.animationFrame = requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * This function is used to initialize the drawing of all movable objects to the canvas
     * 
     */
    drawAllMovableObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins)
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
    }

    /**
     * This function is used to initialize the drawing of all fixed objects to the canvas
     * 
     */
    drawAllFixedObjects() {
        this.addToMap(this.healthBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.endbossBar);
    }

    /**
     * This function is used to draw all entites of an object-class
     * 
     * @param {array} objects - array with all the objects of the obect-class
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * This function initializes draws the object to the canvas and siwtches the images if the objects turns into the other direction
     * 
     * @param {object} mo - object to draw to the canvas
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo)
        }
    }

    /**
     * This function flips images if an object need to be turned in the other direction
     * 
     * @param {object} mo - object to flip 
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0)
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * This function flips images back if an object need to be turned back in the original direction
     * 
     * @param {*} mo - object to flip back 
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * This function is used to end the game if the character or the endboss died. It ends all intervals and initialize the winning or losing process
     * 
     */
    stopGame() {
        setInterval(() => {
            this.IntervalIds.forEach(clearInterval);
            cancelAnimationFrame(this.animationFrame);
            this.resetCanvas();
            if (this.character.characterDied) {
                this.lostGame();
            } else {
                this.wonTheGame();
            }
            document.getElementById('restart-game').classList.remove('d-none');
            document.getElementById('full-screen').classList.add('d-none');
        }, 1500);
    }

    /**
     * This function is used to play the winning sound and show the winning animation after the endboss was defeated
     * 
     */
    wonTheGame() {
        this.game_win_sound.play();
        this.addToMap(this.wonGame);
    }

    /**
     * This function is used to play the losing sound and show the losing animation after the character was defeated.
     * 
     */
    lostGame() {
        this.game_over_sound.play();
        this.cameraFollowsCharacter();
        this.addObjectsToMap(this.level.backgroundObjects);
        this.resetPositionOfCamera();
        this.addToMap(this.loseGame);
    }

    /**
     * This function is used to safe all the intervals of the game in on array. This is used to stop them simultaneously by the end of the game.
     * 
     * @param {Function} fn - the function to be repeated contuously through the intervall 
     * @param {number} time - the time interval in ms after which the function should be repeated  
     */
    setStoppableInterval(fn, time) {
        let id = setInterval(fn, time);
        this.IntervalIds.push(id);
    }
}

