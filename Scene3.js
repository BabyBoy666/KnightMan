//bossfight 1
var SceneThree = new Phaser.Class(function(){
    var skip = false
    var bom = 0
    var score = 0;
    var scoreText;
    var ready = true
    var rls = false
    var isPlaying = false
    var health = 5
    var imun = false
    var com = true
    var tformv = false
    var busy = false
    var press = false
    var equip = false
    var go = true
    var first = true
    var busy2 = false

    return {
      Extends: Phaser.Scene,
      initialize: function() {
          Phaser.Scene.call(this, { "key": "SceneThree" });
          
      },
      init: function() {
      },
      preload: function() {
        this.load.atlas('shapes', 'assets/partical emitter test/shapes.png', 'assets/partical emitter test/shapes.json');
        this.load.text('particleeffect', 'assets/partical emitter test/partical emitter test.json');
        this.load.audio("boop", "./assets/select.mp3");
        this.load.audio("boom", "./assets/boom2.wav");
        this.load.audio("jump", "./assets/jump.wav");
        this.load.audio("enemyFireSound", "./assets/fire.mp3");
        this.load.image('dsky', 'assets/doomsky.png');
        this.load.image('heart', 'assets/heart.png');
        this.load.image('orb1', 'assets/orb.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('ground2',  'assets/platform2.png');
        this.load.image('star', 'assets/star3.png');
        this.load.spritesheet('bomb',
            'assets/orb2.png',
            { frameWidth: 15, frameHeight: 15 })

        this.load.image('upb', 'assets/upborder.png');
        this.load.image('leftb', 'assets/leftborder.png');
        this.load.spritesheet('dude', 
            'assets/dude4.png',
            { frameWidth: 48, frameHeight: 64 })
        this.load.spritesheet('orb',
            'assets/orb2.png',
            { frameWidth: 15, frameHeight: 15 })
            this.load.spritesheet('sworb',
            'assets/swordorb.png',
            { frameWidth: 30, frameHeight: 30 })
        this.load.spritesheet('boss1', 
            'assets/boss1.png',
            { frameWidth: 42, frameHeight: 64 })
        this.load.spritesheet('contin', 
            'assets/continue.png',
            { frameWidth: 64, frameHeight: 64 })
      },
      create: function() {
        this.cameras.main.setBackgroundColor('#ffffff')
        al = async (angle1, bombs2) => {
          console.log("hit2") 
          var vec = this.physics.velocityFromAngle(angle1, 1)
          var dx = Math.cos(angle1) * 1
          var dy = Math.cos(angle1) * 1
          var x = enemy.x + 0
          var y = enemy.y + 0
          console.log(dx)
          orb2 = bombs2.create(x, y, 'orb').setScale(2);
          orb2.body.setAllowGravity(false)
          orb2.setBounce(1);
          orb2.setCollideWorldBounds(true);
          orb2.anims.play('norm', true);
          var vx = vec.x * 300
          var vy = vec.y * 300
          orb2.setVelocity(vx, vy);
        }
        ag = async (angle1, bombs2) => {
          console.log("hit2") 
          var vec = this.physics.velocityFromAngle(angle1, 1)
          var dx = Math.cos(angle1) * 1
          var dy = Math.cos(angle1) * 1
          var x = enemy.x + 0
          var y = enemy.y + 0
          console.log(dx)
          orb2 = bombs2.create(x, y, 'orb').setScale(2);
          orb2.setTint(0x00FF00)
          orb2.body.setAllowGravity(false)
          orb2.setBounce(1);
          orb2.setCollideWorldBounds(true);
          orb2.anims.play('norm', true);
          var vx = vec.x * 300
          var vy = vec.y * 300
          orb2.setVelocity(vx, vy);
        }
        al2 = async (bombs3, leftright) => {
          if (leftright){
            var x = 0
            var y = 0
            var tx = 400
            var ty = 504
            var angle1 = 35
            console.log(angle1)
          }
          else { 
            var x = 800
            var y = 0
            var tx = 400
            var ty = 504
            var angle1 = 145
            console.log(angle1)
          }
          
          console.log("hit2") 
          var vec = this.physics.velocityFromAngle(angle1, 1)
          var dx = Math.cos(angle1) * 1
          var dy = Math.cos(angle1) * 1
          
          console.log(dx)
          orb2 = bombs3.create(x, y, 'orb').setScale(2);
          orb2.body.setAllowGravity(false)
          orb2.setBounce(1);
          orb2.setCollideWorldBounds(true);
          orb2.anims.play('norm', true);
          var vx = vec.x * 300
          var vy = vec.y * 300
          orb2.setVelocity(vx, vy);
        }
        health = 5
        select = this.sound.add("boop", { loop: false });
        boom = this.sound.add("boom", { loop: false });
        jump = this.sound.add("jump", { loop: false });
        wall = this.physics.add.staticGroup();
        lwall = wall.create(1, 300, 'upb')
        rwall = wall.create(800, 300, 'upb')
        twall = wall.create(400, 1, 'leftb')
        this.add.image(0, 0, 'dsky').setOrigin(0, 0)
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        plat = platforms.create(400, 400, 'ground2')

        player = this.physics.add.sprite(100, 450, 'dude');


        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        this.physics.add.collider(player, platforms, retform, null, this);
        var particles = this.add.particles('shapes',  new Function('return ' + this.cache.text.get('particleeffect'))());
        emitter = particles.createEmitter(player.x,  player.y, 50);
        emitter.start()
        //emitter.fromJSON(config);
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        bombs = this.physics.add.group();
        this.physics.add.collider(bombs, platforms);
        bombs2 = this.physics.add.group();
        bombs3 = this.physics.add.group();
        bombsS = this.physics.add.group();
        items = this.physics.add.group();

        
        

        

        this.anims.create({
            key: 'blink',
            frames: this.anims.generateFrameNumbers('boss1', { start: 4, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
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
            frames: this.anims.generateFrameNumbers('boss1', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'rlaunch1',
            frames: this.anims.generateFrameNumbers('boss1', { start: 2, end: 3 }),
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
            frames: this.anims.generateFrameNumbers('boss1', { start: 6, end: 7 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'rlaunch2',
            frames: this.anims.generateFrameNumbers('boss1', { start: 8, end: 9 }),
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
            key: 'left2',
            frames: this.anims.generateFrameNumbers('dude', { start: 59, end: 62 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'turn2',
            frames: [ { key: 'dude', frame: 63 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'right2',
            frames: this.anims.generateFrameNumbers('dude', { start: 64, end: 67 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'norm',
            frames: this.anims.generateFrameNumbers('orb', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'sbnorm',
            frames: this.anims.generateFrameNumbers('sworb', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'tform',
            frames: this.anims.generateFrameNumbers('sworb', { start: 5, end: 45 }),
            frameRate: 10,
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
        //5-45
        sworbcreate = () =>{
          orb5 = bombsS.create(390, 250, 'sworb').setScale(2);
          orb5.body.setAllowGravity(true)
          orb5.setBounce(0.3);
          orb5.setCollideWorldBounds(true);
          orb5.anims.play('sbnorm', true);
          items.add(orb5)
          this.physics.add.collider(orb5, platforms);
          this.physics.add.overlap(player, orb5, tformF, null, this);
        }
        
        player.body.setGravityY(300)
        stars = this.physics.add.group();
        star1 = stars.create(400, 0, "star")
        stars.children.iterate(function (child) {

          child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });
        this.physics.add.collider(stars, platforms);
        this.physics.add.overlap(player, stars, collectStar, null, this);
        this.physics.add.overlap(player, items, collectItem, null, this);
        this.physics.add.overlap(player, platforms,under, null, this);
        this.physics.add.collider(bombs2, wall, borderh, null, this)
        this.physics.add.collider(bombs2, platforms, borderh, null, this)
        //this.physics.add.collider(player, bombs,touchEnemy, null, this);
        //this.physics.add.collider(player, bombs2,touchEnemy, null, this);
        /*
        function onWorldBounds (bomb){
          bomb.disableBody(true, true);
        }
        */
        function tformF (sworb){
          if (tformv == false){
            orb5.setVelocity(0, -540);
            orb5.anims.play('tform', true);
            tformv = true
          }
        }
        function collectItem (player, item){ 
          if(press == true){
            if(item == orb5){
              equip = true
            }
            item.disableBody(true, true)
          }
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
                busy2 = false
              }
            });
          }
        }
        function enh(bomb, enemy){
          enemy.disableBody(true, true)
        }
        function borderh(bomb){
          console.log("hit3")
          bomb.disableBody(true, true)
        }
        function hitBomb (player, bomb)
        {
          this.physics.pause();

          player.setTint(0xff0000);

          player.anims.play('turn');

          gameOver = true;
        }
        function under (player, platforms)
        {
          player.y = 400
        }
        function touchEnemy(player, enemy) {
          if (busy){
            return
          }else{
            if (imun == false){              
              imun = true
              player.setTint(0x808080);
              enemy.body.velocity.x *= -1;
              player.body.velocity.x *= -1;
              liv = "liv"+health
              eval(`${liv}.disableBody(true, true);`)
              health = health - 1
            }
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
                      if(player.body.touching.down){
                        player.setVelocityY(-500);
                      }
                      this.time.addEvent({
                        delay: 1000,
                        loop: false,
                        callback: () => {
                          colliderObject = this.physics.add.collider(player, enemy, touchEnemy, null, this);
                          this.physics.add.overlap(bombs3, enemy, enh, null, this)
                          enemy.anims.play('stand1', true);
                          enemy.body.setAllowGravity(false)
                          enemy.setBounce(1);
                          this.time.addEvent({
                            delay: 5000,
                            loop: false,
                            repeat: 19, 
                            callback: () => {
                              enemy.anims.play('stand1', true);
                              enemy.setVelocity(Phaser.Math.Between(-400, 400), Phaser.Math.Between(-400, 400));
                              this.time.addEvent({
                                delay: 4000,
                                loop: false,
                                callback: () => {
                                  if(typeof orb != 'undefined'){
                                    orb.disableBody(true, true); 
                                  }
                                  enemy.anims.play('launch1', true);
                                  var x = enemy.x + 30
                                  var y = enemy.y - 10
                                  var preangle = Phaser.Math.Angle.Between(x, y, player.x, player.y)
                                  var angle = Phaser.Math.RadToDeg(preangle);
                                  var vec = this.physics.velocityFromAngle(angle, 1)
                                  vecx = vec.x * 300
                                  vecy = vec.y * 300
                                  orb = bombs.create(x, y, 'orb').setScale(2);
                                  orb.setBounce(1);
                                  orb.body.setAllowGravity(false)
                                  orb.setCollideWorldBounds(true);
                                  orb.setVelocity(vecx, vecy);
                                  orb.anims.play('norm', true);
                                  this.time.addEvent({
                                    delay: 2000,
                                    loop: false,
                                    callback: () => {
                                      if(typeof orb2 != 'undefined'){
                                        orb2.disableBody(true, true); 
                                      }
                                      enemy.anims.play('rlaunch1', true); 
                                      var x = enemy.x + 30
                                      var y = enemy.y + 10
                                      var preangle = Phaser.Math.Angle.Between(x, y, player.x, player.y)
                                      var angle = Phaser.Math.RadToDeg(preangle);
                                      var vec = this.physics.velocityFromAngle(angle, 1)
                                      vecx = vec.x * 300
                                      vecy = vec.y * 300
                                      orb2 = bombs.create(x, y, 'orb').setScale(2);
                                      orb2.setBounce(1);
                                      orb2.body.setAllowGravity(false)
                                      orb2.setCollideWorldBounds(true);
                                      orb2.setVelocity(vecx, vecy);
                                      orb2.anims.play('norm', true);
                                    }
                                  })
                                }
                              })
                            }
                          })
                          
                          timea = 0
                          this.time.addEvent({
                            delay: 5000,
                            loop: false,
                            repeat: 21,
                            callback: () => {
                              timea += 1
                              console.log(timea)
                              if(timea == 22){
                                console.log(enemy.x)
                                console.log(enemy.y)
                                colliderObject.destroy();
                                console.log('stage one compleate!')  
                                orb.disableBody(true, true);
                                orb2.disableBody(true, true);
                                enemy.setVelocity(0,0)
                                enemy.anims.play('solid')
                                enemy.x = 400
                                enemy.y = 504
                                this.time.addEvent({
                                  delay: 5000,
                                  loop: false,
                                  callback: () => {
                                    enemy.anims.play('stand2')
                                    enemy.x = 390
                                    enemy.y = 250
                                    this.time.addEvent({
                                      delay: 3000,
                                      loop: false,
                                      callback: () => {
                                        lp = async(delay, angle1) => {
                                          tdelay = delay + tdelay
                                          var delay = tdelay
                                         this.time.addEvent( {delay: delay, loop: false,callback:() => {al(angle1,bombs2)}});
                                        }
                                        lp2 = async(delay, angle1) => {
                                          tdelay = delay + tdelay
                                          var delay = tdelay
                                         this.time.addEvent( {delay: delay, loop: false,callback:() => {al2(bombs3, angle1)}});
                                        }
                                        lg = async(delay, angle1,blink) => {
                                          tdelay = delay + tdelay
                                          var delay = tdelay
                                         this.time.addEvent( {delay: delay, loop: false,callback:() => {ag(angle1,bombs2)
                                         this.time.addEvent( {delay: 1300, loop: false,callback:() => {
                                         if (blink){
                                           var camera = this.cameras.main;
                                           camera.flash(600);
                                           camera.shake(750, 0.05)
                                        }}});
                                         }});
                                        }
                                        console.log("hit1")
                                        al(135, 
                                        bombs2)
                                        al(180, bombs2)
                                        al(90, bombs2)
                                        al(45, bombs2)
                                        al(225,bombs2)
                                        al(360,bombs2)
                                        al(0,bombs2)
                                        al(270,bombs2)
                                        al(315,bombs2)
                                        al(360,bombs2)
                                        tdelay = 0
                                        lp(1000,155)
                                        lp(250,145)
                                        lp(250,135)
                                        lp(250,125)
                                        lp(250,115)
                                        lp(250,105)
                                        lp(250,95)
                                        lp(250,85)
                                        lp(250,75)
                                        lp(250,65)
                                        lp(250,55)
                                        lp(250,45)
                                        lp(250,35)
                                        lp(250,25)
                                        lg(1000,180,false)
                                        lg(0,135,true)
                                        lg(0,90,false)

                                        lp(1500,180)
                                        lp(0,179)
                                        lp(0,176)
                                        lp(0,173)
                                        lp(0,170)
                                        lp(0,167)
                                        lp(0,164)
                                        lp(0,161)
                                        lp(0,158)
                                        lp(0,155)
                                        lp(0,152)
                                        lp(0,149)
                                        lp(0,146)
                                        lp(0,143)
                                        lp(0,140)
                                        lp(0,137)
                                        lp(0,134)
                                        lp(0,131)
                                        lp(0,128)
                                        lp(0,125)
                                        lp(0,122)
                                        lp(0,119)
                                        lp(0,116)
                                        lp(0,113)
                                        lp(0,110)
                                        lp(0,107)
                                        lp(0,104)
                                        lp(0,101)
                                        lp(0,98)
                                        lp(0,95)
                                        lp(0,92)
                                        lp(1000,25)
                                        lp(250,35)
                                        lp(250,45)
                                        lp(250,55)
                                        lp(250,65)
                                        lp(250,75)
                                        lp(250,85)
                                        lp(250,95)
                                        lp(250,105)
                                        lp(250,115)
                                        lp(250,125)
                                        lp(250,135)
                                        lp(250,145)
                                        lp(250,155)
                                        lg(1000,0,false)
                                        lg(0,45,true)
                                        lg(0,90,false)
                                        lp(1500,0)
                                        lp(0,3)
                                        lp(0,6)
                                        lp(0,9)
                                        lp(0,12)
                                        lp(0,15)
                                        lp(0,18)
                                        lp(0,21)
                                        lp(0,24)
                                        lp(0,27)
                                        lp(0,30)
                                        lp(0,33)
                                        lp(0,36)
                                        lp(0,39)
                                        lp(0,42)
                                        lp(0,45)
                                        lp(0,48)
                                        lp(0,51)
                                        lp(0,54)
                                        lp(0,57)
                                        lp(0,60)
                                        lp(0,63)
                                        lp(0,66)
                                        lp(0,69)
                                        lp(0,72)
                                        lp(0,75)
                                        lp(0,78)
                                        lp(0,81)
                                        lp(0,84)
                                        lp(0,87)
                                        lp(0,90)
                                        lp(1000,0)
                                        lp(250,155)
                                        lp(250,20)
                                        lp(250,135)
                                        lp(250,40)
                                        lp(250,115)
                                        lp(250,60)
                                        lp(250,95)
                                        lp(250,80)
                                        lp(250,75)
                                        lp(250,100)
                                        lp(250,55)
                                        lp(250,120)
                                        lp(250,35)
                                        lp(250,140)
                                        lp(250,15)
                                        lp(250,155)
                                        lp(250,0)
                                        lp(250,135)
                                        lp(250,20)
                                        lp(250,115)
                                        lp(250,40)
                                        lp(250,95)
                                        lp(250,60)
                                        lp(250,75)
                                        lp(250,80)
                                        lp(250,55)
                                        lp(250,100)
                                        lp(250,35)
                                        lp(250,120)
                                        lp(250,15)
                                        lp(250,140)
                                        //******
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(50,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(250,55)
                                        lp(0,125)
                                        lp(0,35)
                                        lp(0,145)
                                        lp(1000,155)
                                        lp(250,145)
                                        lp(250,135)
                                        lp(250,125)
                                        lp(250,115)
                                        lp(250,105)
                                        lp(250,95)
                                        lp(250,85)
                                        lp(250,75)
                                        lp(250,65)
                                        lp(250,55)
                                        lp(250,45)
                                        lp(250,35)
                                        lp(250,25)
                                        lp(500,25)
                                        lp(250,35)
                                        lp(250,45)
                                        lp(250,55)
                                        lp(250,65)
                                        lp(250,75)
                                        lp(250,85)
                                        lp(250,95)
                                        lp(250,105)
                                        lp(250,115)
                                        lp(250,125)
                                        lp(250,135)
                                        lp(250,145)
                                        lp(250,155)
                                        lg(1000,180,false)
                                        lg(0,135,true)
                                        lg(0,90,false)

                                        lp(1500,180)
                                        lp(0,179)
                                        lp(0,176)
                                        lp(0,173)
                                        lp(0,170)
                                        lp(0,167)
                                        lp(0,164)
                                        lp(0,161)
                                        lp(0,158)
                                        lp(0,155)
                                        lp(0,152)
                                        lp(0,149)
                                        lp(0,146)
                                        lp(0,143)
                                        lp(0,140)
                                        lp(0,137)
                                        lp(0,134)
                                        lp(0,131)
                                        lp(0,128)
                                        lp(0,125)
                                        lp(0,122)
                                        lp(0,119)
                                        lp(0,116)
                                        lp(0,113)
                                        lp(0,110)
                                        lp(0,107)
                                        lp(0,104)
                                        lp(0,101)
                                        lp(0,98)
                                        lp(0,95)
                                        lp(0,92)
                                        lp(1000,25)
                                        lp(250,35)
                                        lp(250,45)
                                        lp(250,55)
                                        lp(250,65)
                                        lp(250,75)
                                        lp(250,85)
                                        lp(250,95)
                                        lp(250,105)
                                        lp(250,115)
                                        lp(250,125)
                                        lp(250,135)
                                        lp(250,145)
                                        lp(250,155)
                                        lp(500,155)
                                        lp(250,145)
                                        lp(250,135)
                                        lp(250,125)
                                        lp(250,115)
                                        lp(250,105)
                                        lp(250,95)
                                        lp(250,85)
                                        lp(250,75)
                                        lp(250,65)
                                        lp(250,55)
                                        lp(250,45)
                                        lp(250,35)
                                        lp(250,25)
                                        lg(1000,0,false)
                                        lg(0,45,true)
                                        lg(0,90,false)
                                        lp(1500,0)
                                        lp(0,3)
                                        lp(0,6)
                                        lp(0,9)
                                        lp(0,12)
                                        lp(0,15)
                                        lp(0,18)
                                        lp(0,21)
                                        lp(0,24)
                                        lp(0,27)
                                        lp(0,30)
                                        lp(0,33)
                                        lp(0,36)
                                        lp(0,39)
                                        lp(0,42)
                                        lp(0,45)
                                        lp(0,48)
                                        lp(0,51)
                                        lp(0,54)
                                        lp(0,57)
                                        lp(0,60)
                                        lp(0,63)
                                        lp(0,66)
                                        lp(0,69)
                                        lp(0,72)
                                        lp(0,75)
                                        lp(0,78)
                                        lp(0,81)
                                        lp(0,84)
                                        lp(0,87)
                                        lp(0,90)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        lp2(50,0)
                                        lp2(0,1)
                                        tdelay = tdelay + 1200;
                                        this.time.addEvent({
                                          delay: tdelay,
                                          loop: false,
                                          callback: () => {
                                            sworbcreate()
                                            enemy.anims.play('solid', true)

                                          }
                                        });
                                      }
                                    });
                                  }
                                });
                              }
                            }
                          });
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
        if(busy2){
          player.body.setVelocity(0, 480);
        }
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
        var downdf = () => {
          player.body.setAllowGravity(false)
          player.setVelocityX(0)
          player.setVelocityY(0)
          player.anims.play('downd', true)
            this.time.addEvent({
              delay: 1000,
              loop: false,
              callback: () => {  
                busy2 = true
                player.setVelocityY(500);
              }
            });
        }
        if (key.isDown){
          press = true
        }else{
          press = false
        }

        if (cursors.left.isDown && !busy)
        {
            player.setVelocityX(-160);

            if(equip){
              player.anims.play('left2', true);
            }else{
              player.anims.play('left', true);
            }
        }
        else if (cursors.right.isDown && !busy)
        { 
            player.setVelocityX(160);

            if(equip){
              player.anims.play('right2', true);
            }else{
              player.anims.play('right', true);
            }        }
        else if (!busy)
        {
            player.setVelocityX(0);

            if(equip){
              player.anims.play('turn2', true);
            }else{
              player.anims.play('turn', true);
            }
        }

        if (cursors.up.isDown && player.body.touching.down && !busy)
        {
            emitter.start()
            jump.play();
            player.setVelocityY(-480);
            
        }
        if (cursors.down.isDown && !player.body.touching.down && !busy){
          player.setBounce(0);
          busy = true
          downdf()
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
        if(equip == true && com == true){
          next = true
          cont = this.add.sprite(750, 50, 'contin')
          cont.setInteractive();
          com = false
          
        };

        //next lv button
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
        if (skip == true){
          localStorage.setItem('lvl', '4');
          reload() 
          skip = false
        } 
        if(rls == true){
          this.registry.destroy();
          this.events.off();
          if (typeof colliderObject != "undefined"){
            colliderObject.destroy();
            orb.disableBody(true, true);
            orb2.disableBody(true, true);
          }
          score = 0
          skip = false
          bom = 0
          score = 0;
          scoreText;
          ready = true
          rls = false
          isPlaying = false
          health = 5
          imun = false
          com = true
          tformv = false
          busy = false
          press = false
          equip = false
          go = true
          this.scene.restart();
          colliderObject.destroy();
          orb.disableBody(true, true);
          orb2.disableBody(true, true);
          rls = false; 
          skip = false
          bom = 0
          score = 0;
          scoreText;
          ready = true
          rls = false
          isPlaying = false
          health = 5
          imun = false
          com = true
          tformv = false
          busy = false
          press = false
          equip = false
          go = true
        }
        
      }
}}());