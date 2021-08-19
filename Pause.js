//pause screen
var Pause = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { "key": "Pause" });
  },
  init: function (data) {
    this.serv = data.serv

  },
  preload: function () {

    this.load.audio("boop", "./assets/select.mp3");
    this.load.image('menu', 'assets/menu.png');
    this.load.spritesheet('playb',
      'assets/playbutton.png',
      { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('relo',
      'assets/reload.png',
      { frameWidth: 64, frameHeight: 64 })
  },
  create: function () {

    servr = "Scene" + this.serv
    select = this.sound.add("boop", { loop: false });
    this.add.image(200, 150, 'menu').setOrigin(0, 0)

    var text = this.add.text(
      328,
      175,
      "Pause",
      {
        fontSize: 50,
        color: "#000000",
        fontStyle: "bold"
      }
    )

    pas = this.add.sprite(350, 350, 'playb')
    rlo = this.add.sprite(450, 350, 'relo')
    pas.setInteractive();
    rlo.setInteractive();

    this.anims.create({
      key: 'hover',
      frames: [{ key: 'playb', frame: 1 }],
      frameRate: 20
    });
    this.anims.create({
      key: 'non',
      frames: [{ key: 'playb', frame: 0 }],
      frameRate: 20
    });
    this.anims.create({
      key: 'hover2',
      frames: [{ key: 'relo', frame: 1 }],
      frameRate: 20
    });
    this.anims.create({
      key: 'non2',
      frames: [{ key: 'relo', frame: 0 }],
      frameRate: 20
    });
  },
  update: function () {
    pas.on('pointerover', () => {
      pas.anims.play('hover')
    })
    pas.on('pointerout', () => {
      pas.anims.play('non')
    })
    pas.on('pointerdown', () => {
      select.play();
      this.scene.resume(servr, {
        "rld": false
      });

      this.scene.stop();
    })
    rlo.on('pointerover', () => {
      rlo.anims.play('hover2')
    })
    rlo.on('pointerout', () => {
      rlo.anims.play('non2')
    })
    rlo.on('pointerdown', () => {
      select.play();
      this.scene.resume(servr, {
        "rld": true
      });
      this.scene.stop();
    })
  }
});

