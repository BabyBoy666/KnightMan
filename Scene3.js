var SceneThree = new Phaser.Class(function(){
    var bom = 0
    var score = 0;
    var scoreText;
    var ready = true
    var rls = false
    var isPlaying = false
    var health = 5
    

    return {
      Extends: Phaser.Scene,
      initialize: function() {
          Phaser.Scene.call(this, { "key": "SceneThree" });
          
      },
      init: function() {
      },
      preload: function() {
        this.load.audio("boop", "./assets/select.mp3");
        this.load.audio("jump", "./assets/jump.wav");
        this.load.audio("enemyFireSound", "./assets/fire.mp3");
        this.load.image('dsky', 'assets/doomsky.png');
        this.load.image('orb', 'assets/orb.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('ground2',  'assets/platform2.png');
        this.load.image('star', 'assets/star3.png');
        this.load.image('bomb', 'assets/bomb3.png');
        this.load.spritesheet('dude', 
            'assets/dude4.png',
            { frameWidth: 48, frameHeight: 64 })
        this.load.spritesheet('boss1', 
            'boss1/dude4.png',
            { frameWidth: 42, frameHeight: 64 })
      },
      create: function() {

        
        select = this.sound.add("boop", { loop: false });
        this.add.image(0, 0, 'dsky').setOrigin(0, 0)
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        plat = platforms.create(400, 400, 'ground2')

        player = this.physics.add.sprite(100, 450, 'dude');

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        this.physics.add.collider(player, platforms);
        
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        bombs = this.physics.add.group();
        this.physics.add.collider(bombs, platforms);
        

        

        this.anims.create({
            key: 'blink',
            frames: this.anims.generateFrameNumbers('boss1', { start: 5, end: 6 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'solid',
            frames: [ { key: 'boss1', frame: 5 } ],
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
        function collectStar (player, star)
        {
          star.disableBody(true, true); 
          plat.disableBody(true, true);
          enemy = this.physics.add.sprite(400, 200,'boss1')  
          enemy.body.setGravityY(0)
          enemy.setCollideWorldBounds(true);
          enemy.body.bounce.x = 1;
          this.physics.add.collider(enemy, platforms);
          this.physics.add.overlap(player, enemy, touchEnemy, null, this);
          enemy.anims.play('blink', true);
          this.time.addEvent({
            delay: 4000,
            loop: false,
            callback: () => {
              enemy.anims.play('solid', true);
            }
          })


            /** 
            bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            */

        }
        function touchEnemy(player, enemy) {
          enemy.body.velocity.x *= -1;
          health = health - 1
        }
      },
      update: function() {
        
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