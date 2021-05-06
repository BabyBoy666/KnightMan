var SceneThree = new Phaser.Class(function(){
    var bom = 0
    var score = 0;
    var scoreText;
    var ready = true
    var rls = false
    var isPlaying = false
    var health = 5
    var imun = false
    

    return {
      Extends: Phaser.Scene,
      initialize: function() {
          Phaser.Scene.call(this, { "key": "SceneThree" });
          
      },
      init: function() {
      },
      preload: function() {
        this.load.audio("boop", "./assets/select.mp3");
        this.load.audio("boom", "./assets/boom2.wav");
        this.load.audio("jump", "./assets/jump.wav");
        this.load.audio("enemyFireSound", "./assets/fire.mp3");
        this.load.image('dsky', 'assets/doomsky.png');
        this.load.image('heart', 'assets/heart.png');
        this.load.image('orb', 'assets/orb.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('ground2',  'assets/platform2.png');
        this.load.image('star', 'assets/star3.png');
        this.load.image('bomb', 'assets/bomb3.png');
        this.load.spritesheet('dude', 
            'assets/dude4.png',
            { frameWidth: 48, frameHeight: 64 })
        this.load.spritesheet('boss1', 
            'assets/boss1.png',
            { frameWidth: 42, frameHeight: 64 })
        this.load.atlas('shapes', 'assets/particle-effect/shapes.png', 'assets/particle-effect/shapes.json');
        this.load.text('particle-effect', 'assets/particle-effect/particle-effect.json');
      },
      create: function() {
        health = 5
        select = this.sound.add("boop", { loop: false });
        boom = this.sound.add("boom", { loop: false });
        jump = this.sound.add("jump", { loop: false });
        this.add.image(0, 0, 'dsky').setOrigin(0, 0)
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        plat = platforms.create(400, 400, 'ground2')
        var particles = this.add.particles(this.add.image('shapes', 'circle_05'));
        particles.createEmitter({
          active:true, 
          visible:true,
          collideBottom:true,
          collideLeft:true,
          collideRight:true,
          collideTop:true,
          on:true,
          particleBringToTop:true,
          radial:true,
          frequency:100,
          gravityX:0,
          gravityY:30,
          maxParticles:30,
          timeScale:2,
          blendMode:0,
          accelerationX:0,
          accelerationY:0,
          alpha:1,
          angle:{min:0,max:360,ease:"Linear"},
          bounce:0,
          delay:0,
          lifespan:{ease:"Linear",min:1000,max:10000},
          maxVelocityX:10000,
          maxVelocityY:10000,
          moveToX:{ease:"Linear",min:0,max:1000},
          moveToY:0,
          quantity:1,
          rotate:1,
          scale:1,
          speed:[1,0],
          x:470,
          y:380,
          name:"parta",
          tint:[16711680,13504014,5899268,16719647,9573653],
          emitZone:{source:new Phaser.Geom.Rectangle(-50,-60,50,50),type:'random'}
        })
        var particle = particles.emitters.getByName("parta");
        particle.start();
        particle.pause();

        player = this.physics.add.sprite(100, 450, 'dude');

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        this.physics.add.collider(player, platforms);
        particle.startFollow(player);
        
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        bombs = this.physics.add.group();
        this.physics.add.collider(bombs, platforms);
        

        

        this.anims.create({
            key: 'blink',
            frames: this.anims.generateFrameNumbers('boss1', { start: 4, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'solid',
            frames: [ { key: 'boss1', frame: 4 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'stand1',
            frames: [ { key: 'boss1', frame: 3 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'launch1',
            frames: this.anims.generateFrameNumbers('boss1', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'stand2',
            frames: [ { key: 'boss1', frame: 6 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'launch2',
            frames: this.anims.generateFrameNumbers('boss1', { start: 6, end: 10 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });


        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        player.body.setGravityY(300)
        stars = this.physics.add.group();
        star1 = stars.create(400, 0, "star")
        stars.children.iterate(function (child) {

          child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });
        this.physics.add.collider(stars, platforms);
        this.physics.add.overlap(player, stars, collectStar, null, this);
        this.physics.add.collider(player, bombs, hitBomb,  null, this);
        function hitBomb (player, bomb)
        {
          this.physics.pause();

          player.setTint(0xff0000);

          player.anims.play('turn');

          gameOver = true;
        }
        function touchEnemy(player, enemy) {
          if (imun == false){
            particle.resume();  
            this.time.addEvent({
              delay: 50,
              loop: false,
              callback: () => {
                particle.pause();
                this.time.addEvent({
                  delay: 50,
                  loop: false,
                  callback: () => {
                    particle.killAll()
                  }
                })
              }
            })
            imun = true
            player.setTint(0x808080);
            enemy.body.velocity.x *= -1;
            player.body.velocity.x *= -1;
            liv = "liv"+health
            eval(`${liv}.disableBody(true, true);`)
            health = health - 1
          }
          if (imun == true){
            this.time.addEvent({
              delay: 3000,
              loop: false,
              callback: () => {
                imun = false 
                player.setTint(0xFFFFFF);
              }
            })
          }
        }
        function collectStar (player, star)
        {
          star.disableBody(true, true); 
          plat.disableBody(true, true);
          lives = this.physics.add.staticGroup();
          liv1 = lives.create(780, 580, 'heart')
          liv2 = lives.create(750, 580, 'heart')
          liv3 = lives.create(720, 580, 'heart')
          liv4 = lives.create(690, 580, 'heart')
          liv5 = lives.create(660, 580, 'heart')
          enemy = this.physics.add.sprite(400, 200,'boss1')  
          enemy.setCollideWorldBounds(true);
          enemy.body.bounce.x = 1;
          this.physics.add.collider(enemy, platforms);
          this.physics.add.collider(player, enemy, touchEnemy, null, this);
          enemy.anims.play('blink', true);
          this.time.addEvent({
            delay: 100,
            loop: false,
            callback: () => {
              enemy.body.setAllowGravity(false)
              this.time.addEvent({
                delay: 4000,
                loop: false,
                callback: () => {
                  enemy.anims.play('solid', true);
                  enemy.body.setAllowGravity(true)
                  this.time.addEvent({
                    delay: 1000,
                    loop: false,
                    callback: () => {
                      boom.play()
                      player.setVelocityY(-500);
                      this.time.addEvent({
                        delay: 1000,
                        loop: false,
                        callback: () => {
                          enemy.anims.play('stand1', true);
                           
                        }
                      })
                    }
                  })
                }
              })
            }
          })


            /** 
            bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            */

        }
        
      },
      update: function() {
        if(health == 0){
          this.physics.pause();

          player.setTint(0xff0000);

          player.anims.play('turn');

          gameOver = true;
        }
        
        cursors = this.input.keyboard.createCursorKeys();
        var key = this.input.keyboard.addKey("A");
        var ps = this.input.keyboard.addKey("ESC");
        var isDown = ps.isDown;
        



        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down)
        {
            jump.play();
            player.setVelocityY(-480);
        }
        if(ps.isDown && ready == true){
          select.play();
          this.scene.launch('Pause',{
            serv:"Three"
          })
          this.scene.pause(); 
          ps = null
          this.input.keyboard.removeKey('ESC'); 
          this.events.on('resume', (scene, data) => {
              rls = data.rld
          });
          isPlaying = true
          
        }
        if(rls == true){
          //this.scene.stop();
          //this.scene.start('SceneOne');
          this.registry.destroy();
          this.events.off();
          score = 0
          isPlaying = true
          this.scene.restart();
          isPlaying = true
          //this.events.on();
          rls = false; 
        }
        
      }
}}());