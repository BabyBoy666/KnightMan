//title
var Title = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "Title" });
    },
    init: function() {},
    preload: function() {
      this.load.audio("music", "./assets/titlemusic.mp3");
      this.load.audio("boop", "./assets/select.mp3");
    },
    create: function() {
      ready = false
      pmusic = this.sound.add("music", { loop: true });
      select = this.sound.add("boop", { loop: false });
      //pmusic.play();
        text = this.add.text(
            400, 
            300, 
            "Knight Man", 
            {
                fontSize: 50,
                color: "#000000",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);
        this.time.addEvent({
          delay: 1500,
          loop: false,
          callback: () => {
            text2 = this.add.text(
              400, 
              370, 
              "By Baby_Boy and Shadowfang95", 
              {
                  fontSize: 40,
                  color: "#000000",
                  fontStyle: "bold"
              }
            ).setOrigin(0.5);
          }
        })
        this.time.addEvent({
          delay: 3000,
          loop: false,
          callback: () => {
            text3 = this.add.text(
              400, 
              440, 
              "Press SPACE to start", 
              {
                  fontSize: 30,
                  color: "#000000",
                  fontStyle: "bold"
              }
            ).setOrigin(0.5);
            ready = true
          }
        })
    },
    update: function() {
      var key = this.input.keyboard.addKey("SPACE");
      
      if (ready){
        if(key.isDown){
          select.play();
          ready = false
          let container = this.add.container(0, 0, [text]);
          this.physics.world.enableBody(container);
          container.body.setVelocityY(100)
          this.time.addEvent({
            delay: 200,
            loop: false,
            callback: () => {
              let container = this.add.container(0, 0, [text2]);
              this.physics.world.enableBody(container);
              container.body.setVelocityY(100)
              this.time.addEvent({
                delay: 200,
                loop: false,
                callback: () => {
                  let container = this.add.container(0, 0, [text3]);
                  this.physics.world.enableBody(container);
                  container.body.setVelocityY(100)
                  this.time.addEvent({
                    delay: 1000,
                    loop: false,
                    callback: () => {
                      pmusic.stop()
                      this.scene.start("SceneOne")
                      this.scene.start("AudioOne")
                      this.scene.stop();
                    }
                  })
                }
              })
            }
          })
        }
      }
    }
});
//SceneThree