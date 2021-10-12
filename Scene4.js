//after boss fight
var SceneFour = new Phaser.Class(function () {
  var bom = 0
  var score = 0;
  var scoreText;
  var ready = true
  var rls = false
  var isPlaying = false
  var com = true
  var first = true
  var skip = false
  var go = true
  var boss = false
  var dir = "left"
  var delay = false
  var atk = false
  var busy = false
  return {
    Extends: Phaser.Scene,
    initialize: function () {
      Phaser.Scene.call(this, { "key": "SceneFour" });
    },
    init: function () {
    },
    preload: function () {
      this.load.audio("boop", "./assets/select.mp3");
      this.load.audio("jump", "./assets/jump.wav");
      this.load.audio("hit", "./assets/hit.wav");
      this.load.image('sky', 'assets/sky1.png');
      this.load.image('ground', 'assets/platform.png');
      this.load.image('star', 'assets/star3.png');
      this.load.image('hitbox', 'assets/Hitbox.png');
      this.load.spritesheet('bomb',
            'assets/orb2.png',
            { frameWidth: 15, frameHeight: 15 })
      this.load.spritesheet('dude',
        'assets/dude4.png',
        { frameWidth: 48, frameHeight: 64 })
      this.load.spritesheet('swordc',
        'assets/sword.png',
        { frameWidth: 18, frameHeight: 40 })
      this.load.spritesheet('contin',
        'assets/continue.png',
        { frameWidth: 64, frameHeight: 64 })
    },

    create: function () {
      next = false
      select = this.sound.add("boop", { loop: false });
      jump = this.sound.add("jump", { loop: false });
      this.add.image(0, 0, 'sky').setOrigin(0, 0)
      platforms = this.physics.add.staticGroup();
      platforms.create(400, 568, 'ground').setScale(2).refreshBody();

      platforms.create(600, 400, 'ground');
      platforms.create(50, 250, 'ground');
      platforms.create(750, 220, 'ground');
      player = this.physics.add.sprite(100, 450, 'dude');

      player.setBounce(0.2);
      player.setCollideWorldBounds(true);
      this.physics.add.collider(player, platforms, retform, null, this);
      swordc = this.physics.add.sprite(15, 575, 'swordc');
      swordc.body.setAllowGravity(false)

      scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
      bombs = this.physics.add.group();
      this.physics.add.collider(bombs, platforms);

      this.anims.create({
        key: 'over',
        frames: [{ key: 'contin', frame: 1 }],
        frameRate: 20
      });
      this.anims.create({
        key: 'nover',
        frames: [{ key: 'contin', frame: 0 }],
        frameRate: 20
      });
      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 59, end: 62 }),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 63 }],
        frameRate: 20
      });

      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 64, end: 67 }),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: 'swordch',
        frames: this.anims.generateFrameNumbers('swordc', { start: 0, end: 20 }),
        frameRate: 5,
      });
      this.anims.create({
        key: 'downd',
        frames: this.anims.generateFrameNumbers('dude', { start: 9, end: 40 }),
        frameRate: 30,
      });
      this.anims.create({
        key: 'reform',
        frames: this.anims.generateFrameNumbers('dude', { start: 41, end: 58 }),
        frameRate: 10,
      });
      player.body.setGravityY(300)
      stars = this.physics.add.group({
        setScale: 3,
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
      });

      stars.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

      });
      //sword damage
      box = this.physics.add.group();
      enemys = this.physics.add.group();


      this.physics.add.collider(stars, platforms);
      this.physics.add.overlap(player, stars, collectStar, null, this);
      this.physics.add.overlap(enemys, box, kill, null, this);
      this.physics.add.collider(player, bombs, hitBomb, null, this);
      function hitBomb(player, bomb) {
        if (next == true) {
          this.scene.start("SceneTwo")
          this.scene.stop();
        } else {
          this.physics.pause();

          player.setTint(0xff0000);

          player.anims.play('turn');

          gameOver = true;
        }
      }
      function kill(enemy) {
        enemy.disableBody(true, true)
      }
      function retform (player){
          if (busy){
            player.anims.play('reform', true)
            this.time.addEvent({
              delay: 1800,
              loop: false,
              callback: () => {
                player.body.setAllowGravity(true)
                player.setBounce(0.2);
                busy = false
              }
            });
          }
        }
      function collectStar(player, star) {
        star.disableBody(true, true);
        score += 10;
        scoreText.setText('scene4: ' + score);
        if (stars.countActive(true) === 0) {
          stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

          });

          var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

          bomb = bombs.create(x, 16, 'bomb').setScale(2);
          enemys.add(bomb)
          bomb.setBounce(1);
          bomb.setCollideWorldBounds(true);
          bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }

      }
      var combo = this.input.keyboard.createCombo('wwssdadabaelvl', {
        resetOnWrongKey: true,
        maxKeyDelay: 1000,
        resetOnMatch: true,
        // deleteOnMatch: false,
      });

      this.input.keyboard.on('keycombomatch', function (event) {
        if (first == true) {
          text = this.add.text(
            150,
            175,
            "Cheat Code Entered\n\tAwaiting Input",
            {
              fontSize: 50,
              color: "#000000",
              fontStyle: "bold"
            }
          )
          first = false
        } else {
          text.setVisible(true);
        }
        console.log('Key Combo matched!');
        console.log('event.data:', event.data);
        console.log('event.target:', event.target);
        var wait = 1
        var key = this.input.keyboard.addKey("Q");
        var key2 = this.input.keyboard.addKey("W");
        var key3 = this.input.keyboard.addKey("B");
        var timer = this.time.addEvent({
          delay: 400,
          args: [this],
          loop: true,
          callback: function () {
            if (key.isDown) {
              skip = true
              wait = 2
              text.setVisible(false);
            } else if (key2.isDown) {
              score = 550
              wait = 2
              text.setVisible(false);
            } else if (key3.isDown) {
              boss = true
              wait = 2
              text.setVisible(false);
            }
            if (wait == 2) {
              timer.remove();
            }
          }
        })

      }, this);


    },
    update: function () {
      if (skip == true) {
        this.scene.start("SceneSeven")
        this.scene.stop();
        skip = false
      }
      if (boss == true) {
        pmusic1.stop()
        this.scene.stop('AudioOne')
        this.scene.start('AudioTwo')
        this.scene.start("SceneThree")
        this.scene.stop();
        boss = false
      }

      cursors = this.input.keyboard.createCursorKeys();
      var key = this.input.keyboard.addKey("A");
      var ps = this.input.keyboard.addKey("ESC");
      var isDown = ps.isDown;
        var downdf = () => {
          player.body.setAllowGravity(false)
          player.setVelocityX(0)
          player.setVelocityY(0)
          player.anims.play('downd', true)
            this.time.addEvent({
              delay: 1000,
              loop: false,
              callback: () => {

                player.setVelocityY(500);
              }
            });
        }
      //
      //"up", "up", "down", "down", "left", "right" "left", "right", "ba", "space", "lvl"
      var attk = this.input.keyboard.addKey("SPACE");




      if (cursors.left.isDown && !busy)
        {
          dir = "left"
            player.setVelocityX(-160);

              player.anims.play('left', true);
        }
        else if (cursors.right.isDown && !busy)
        { 
          dir = "right"
            player.setVelocityX(160);
              player.anims.play('right', true);
           }
        else if (!busy)
        {
            player.setVelocityX(0);

              player.anims.play('turn', true);
        }

        if (cursors.up.isDown && player.body.touching.down && !busy)
        {
            jump.play();
            player.setVelocityY(-480);
            
        }
        if (cursors.down.isDown && !player.body.touching.down && !busy){
          player.setBounce(0);
          busy = true
          downdf()
        }
      if (score == 600 && com == true) {
        next = true
        cont = this.add.sprite(750, 50, 'contin')
        cont.setInteractive();
        com = false

      };
      if (com == false && go == true) {
        cont.on('pointerover', () => {
          cont.anims.play('over')
        })
        cont.on('pointerout', () => {
          cont.anims.play('nover')
        })
        cont.on('pointerdown', () => {
          go = false
          select.play();
          skip = true
        })
      }

      if (ps.isDown && ready == true) {
        select.play();
        this.scene.launch('Pause', {
          serv: "Four"
        })
        this.scene.pause();
        ps = null
        this.input.keyboard.removeKey('ESC');
        this.events.on('resume', (scene, data) => {
          rls = data.rld
        });
        isPlaying = true
      }
      
      if (rls == true) {
        //this.scene.stop();
        //this.scene.start('SceneOne')
        this.registry.destroy();
        this.events.off();
        score = 0
        isPlaying = true
        this.scene.restart();
        isPlaying = true
        bom = 0
        score = 0;
        scoreText;
        ready = true
        rls = false
        isPlaying = false
        com = true
        first = true
        skip = false
        go = true
        boss = false
        dir = "left"
        delay = false
        atk = false
        busy = false
        //this.events.on();
        rls = false;
      }
      if (attk.isDown && atk == false && !busy) {
        this.time.addEvent({
          delay: 10,
          loop: false,
          callback: () => {
            if (attk.isUp && atk == false && !busy) {
              this.events.on('resume', (scene, data) => {});
              this.scene.setVisible(false);
              this.scene.launch('Slash', {
                serv: "Seven",
                cordx: player.x,
                cordy: player.y,
                dir: dir
              })
              this.scene.pause();
              cursors = null
              attk = null
              if (dir == "left") {
                var x = player.x - 29
                var y = player.y
                crbox = box.create(x, y, 'hitbox');
                crbox.body.setAllowGravity(false, false)
                this.time.addEvent({
                  delay: 300,
                  loop: false,
                  callback: () => {
                    crbox.disableBody(true, true)
                  }
                });     
              } else {

                var x = player.x + 29
                var y = player.y
                crbox = box.create(x, y, 'hitbox');
                crbox.body.setAllowGravity(false, false)
                this.time.addEvent({
                  delay: 300,
                  loop: false,
                  callback: () => {
                    crbox.disableBody(true, true)
                  }
                });
              }
            atk = true
            }
          }
        });
      }
      if (atk == true && delay == false) {
        delay = true
        this.scene.setVisible(true);
        swordc.anims.play('swordch', true)
        this.time.addEvent({
          delay: 4000,
          loop: false,
          callback: () => {
            atk = false
            delay = false
          }
        });
      }

    }
  }
}());