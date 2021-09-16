var SceneSix = new Phaser.Class(function(){
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
    var ofree = false
    var delay = false
    return {
      Extends: Phaser.Scene,
      initialize: function() {
          Phaser.Scene.call(this, { "key": "SceneSix" });
      },
      init: function() {
      },
      preload: function() {
        
        this.load.audio("boop", "./assets/select.mp3");
        this.load.audio("jump", "./assets/jump.wav");
        this.load.audio("hit", "./assets/hit.wav");
        this.load.image('sky', 'assets/sky1.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('shortground', 'assets/shortplatform.png');
        this.load.image('uground', 'assets/uplatform.png');
        this.load.image('star', 'assets/star3.png');
        
        this.load.spritesheet('bomb',
            'assets/orb2.png',
            { frameWidth: 15, frameHeight: 15 })
        this.load.spritesheet('dude', 
            'assets/dude4.png',
            { frameWidth: 48, frameHeight: 64 })
        this.load.spritesheet('contin', 
            'assets/continue.png',
            { frameWidth: 64, frameHeight: 64 })
      },
      
      create: function() {
        next = false
        select = this.sound.add("boop", { loop: false });
        jump = this.sound.add("jump", { loop: false });
        this.add.image(0, 0, 'sky').setOrigin(0, 0)
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        platforms.create(400, 300, 'shortground').refreshBody();
        platforms.create(400, 200, 'shortground').refreshBody();
        platforms.create(400, 100, 'shortground').refreshBody();
        
        
        
        
        player = this.physics.add.sprite(100, 450, 'dude');

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        this.physics.add.collider(player, platforms);
        
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        bombs = this.physics.add.group();
        this.physics.add.collider(bombs, platforms);
        
        this.anims.create({
            key: 'over',
            frames: [ { key: 'contin', frame: 1 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'nover',
            frames: [ { key:  'contin', frame: 0 } ],
            frameRate: 20
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
        
        
        this.physics.add.collider(player, bombs, hitBomb,  null, this);
        function hitBomb (player, bomb)
        {
          if(next == true){
            this.scene.start("SceneTwo")
            this.scene.stop();
          }else{
            this.physics.pause();

            player.setTint(0xff0000);

            player.anims.play('turn');

            gameOver = true;
          }
        }
        
        var combo = this.input.keyboard.createCombo('wwssdadabaelvl', {
          resetOnWrongKey: true,
          maxKeyDelay: 1000,
          resetOnMatch: true,
          // deleteOnMatch: false,
        });

        this.input.keyboard.on('keycombomatch', function (event) {
          if (first == true){
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
          }else{
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
            callback: function (){
              if(key.isDown){
                skip = true
                wait = 2
                text.setVisible(false);
              }else if(key2.isDown){
                score = 550
                wait = 2
                text.setVisible(false);
              }else if(key3.isDown){
                boss = true
                wait = 2
                text.setVisible(false);
              }
              if(wait == 2){
                timer.remove(); 
              }
            }
          })
          
    }, this);


      },
      update: function() {
        if (skip == true){
          this.scene.start("SceneOne")
          this.scene.stop();   
          skip = false
        } 
        if (boss == true){
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
        
//
      //"up", "up", "down", "down", "left", "right" "left", "right", "ba", "space", "lvl"

        
        




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
        if(score == 240 && com == true){
          next = true
          cont = this.add.sprite(750, 50, 'contin')
          cont.setInteractive();
          com = false
          
        };
        if(com == false && go == true){
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
        
        if(ps.isDown && ready == true){
          select.play();
          this.scene.launch('Pause',{
            serv:"Five"
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
          score = 0
          ofree = false
          scoreText.setText('Score: ' + score);
          this.registry.destroy();
          this.scene.restart();
          rls = false; 
        }
        
      }
}}());