//level 2 (jumping on pickup) in progress
var SceneTwo = new Phaser.Class(function(){
    var skip = false
    var bom = 0
    var com = true
    var score = 0; 
    var scoreText; 
    var ready = true
    var rls = false
    var isPlaying = false
    var go = true
    var first = true
    return {
      Extends: Phaser.Scene,
      initialize: function() {
          Phaser.Scene.call(this, { "key": "SceneTwo" });
      },
      init: function() {
      },
      preload: function() {
        
        this.load.audio("boop", "./assets/select.mp3");
        this.load.audio("jump", "./assets/jump.wav");
        this.load.image('sky', 'assets/sky1.png');
        this.load.image('spike', 'assets/spike.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star3.png');
        this.load.image('sstar', 'assets/superstar.png');
        this.load.spritesheet('bomb',
            'assets/orb2.png',
            { frameWidth: 15, frameHeight: 15 })
        this.load.spritesheet('dude', 
            'assets/dude4.png',
            { frameWidth: 48, frameHeight: 64 })
      },
      create: function() { 
        stop = false
        select = this.sound.add("boop", { loop: false });
        jump = this.sound.add("jump", { loop: false });
        this.add.image(0, 0, 'sky').setOrigin(0, 0)
        platforms = this.physics.add.staticGroup();
        platforms.create(750, 220, 'ground');
        platforms.create(50, 220, 'ground');
        player = this.physics.add.sprite(50, 100, 'dude');

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        this.physics.add.collider(player, platforms);
        
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        bombs = this.physics.add.group();
        this.physics.add.collider(bombs, platforms);

        
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
        star1 = stars.create(400, 0, 'star')

        stars.children.iterate(function (child) {

          child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });
        sstars = this.physics.add.group();
        star2 = sstars.create(750, 0, 'sstar')

        stars.children.iterate(function (child) {

          child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });
        spikes = this.physics.add.staticGroup();
        spikes.create(175, 584, 'spike');
        spikes.create(685, 584, 'spike');
      
        this.physics.add.collider(sstars, platforms);
        this.physics.add.overlap(player, sstars, collectStar2, null, this);
        this.physics.add.overlap(player, stars, collectStar, null, this);
        this.physics.add.collider(player, bombs, hitBomb,  null, this);
        function hitBomb(player, bomb)
        {
          if(next == true){
            this.scene.start("SceneThree")
            this.scene.stop();
          }else{
            this.physics.pause();

            player.setTint(0xff0000);

            player.anims.play('turn');

            gameOver = true;
          }
        } 
        function collectStar (player, star)
        {
          star.disableBody(true, true);
          if (stars.countActive(true) === 0)
          {
            stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });   
          }

        }
        function collectStar2 (player, star)
        {
          star.disableBody(true, true);
          score += 10;
          scoreText.setText('Score: ' + score)
          player.body.x = 50
          player.body.y = 100
          star2 = sstars.create(750, 0, 'sstar') 
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
          this.scene.start("SceneFive")
          this.scene.stop();   
          skip = false
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
        if(score == 20 && com == true){
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
        if(player.body.y == 536 && stop == false){
          stop = true
          this.physics.pause();

          player.setTint(0xff0000);

          player.anims.play('turn');

          gameOver = true;
        }
        if(star1.body.y > 600){
          this.time.addEvent({
            delay: 1000,
            loop: false,
            callback: () => {
              star1.disableBody(true, true);
              star1 = stars.create(400, 0, 'star')
            }
          });
        }
        if (stars.countActive(true) === 0)
          {
            child.enableBody(true, child.x, 0, true, true);
          }
        //if(key.isDown){
          //console.log(player.body.y)
        //}
        if(ps.isDown){
          select.play();
          this.scene.launch('Pause',{
            serv:"Two"
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
          this.registry.destroy();
          this.events.off();
          this.scene.restart();
          rls = false; 
        }
        
      }

}}());