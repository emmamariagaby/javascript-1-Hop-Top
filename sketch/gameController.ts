class GameController {
  private levelFactory: LevelFactory;
  private level: Level;
  private player: Player;
  private collisionDetection: CollisionDetection;
  private score: number;
  private highScore: number;
  private levelNumber: number;
  private isStartGame: boolean;

  constructor() {
    this.score = 0;
    this.highScore = 0;
    this.levelNumber = 1;
    this.levelFactory = new LevelFactory();
    this.level = this.levelFactory.createLevel(this.levelNumber);
    this.player = new Player(width / 2, height - 100);
    this.collisionDetection = new CollisionDetection();
    this.isStartGame = true;
  }


  public drawStartScreen() {
    background("cornflowerblue");
    fill("white");
    textAlign(CENTER);
    textSize(30);
    text("HOP TOP", width / 2, height / 2);
    text("click to start", width / 2, height / 2 + 38);
   }

  public drawGame(): void {
    if (mouseIsPressed === true) {
    this.isStartGame = false;
    console.log("mouseIsPressed");
    }
    if (this.isStartGame) {
    this.drawStartScreen() 
    return;
    
    }

  private loadLevel(level: Level): void {}

  private createPlayer(): void {}

  public gameLoop(): void {
    this.player.move();
    this.level.updateLevel(this.player.pos);

    // moves all level objects down
    this.level.levelObjects.forEach(levelObject => {
      if (
        this.collisionDetection.playerCollidedWithBlock(
          this.player,
          levelObject
        )
      ) {
        if (levelObject instanceof Item) {
          const item = levelObject as Item;
          item.explode();
          gameController.collectItem();
        } else {
          this.player.bounceOnBlock(levelObject.pos);
        }
      }
    });

    //Make speedboost(star) disappear when bounced into
    this.level.levelObjects.forEach(block => {
      if (this.collisionDetection.playerCollidedWithBlock(this.player, block)) {
        if (block instanceof SpeedBoost) {
          const item = block as SpeedBoost;
          item.explode();
          gameController.collectItem();
        } else {
          this.player.bounceOnBlock(block.pos);
        }
      }
    });

    this.level.updateLevel(this.player.pos);

    console.log("progress", this.level.levelProgress);
    const r = map(this.level.levelProgress, 0, 100, 140, 60);
    const b = map(this.level.levelProgress, 0, 100, 190, 110);
    const g = map(this.level.levelProgress, 0, 100, 255, 200);

    // background("cornflowerblue");
    background(r, b, g);

    this.level.drawLevel();
    this.drawScoreBoard();
    this.player.drawPlayer();
  }

  private playerCollision(): boolean {
    return false;
  }

  public collectItem(): void {
    this.score += 1;
    if (this.score >= this.highScore) {
      this.highScore = this.score;
    }
  }

  private gameOver(): void {}

  public drawScoreBoard(): void {
    function scoreText(): void {
      push();
      fill(0, 10, 153);
      textSize(18);
      text("Level", 275, 35);
      text("High Score", 85, 55);
      text("Score", 430, 55);
      pop();
    }

    const scorePoints = (): void => {
      push();
      fill(255, 255, 255);
      textSize(18);
      text(this.highScore, 90, 75);
      text(this.score, 430, 75);
      textSize(62);
      textAlign(CENTER);
      text(this.levelNumber, 300, 90);
      pop();
    };

    function scoreBoard(): void {
      push();
      let c: p5.Color = color(252, 208, 107);
      stroke(c);
      fill(c);
      circle(300, 60, 100);
      strokeWeight(50);
      line(75, 60, 525, 60);
      pop();
    }

    scoreBoard();
    scoreText();
    scorePoints();
  }
}
