var Slash = new Phaser.Class(function(){
    var done = false;
    return {
      Extends: Phaser.Scene,
      initialize: function() {
          Phaser.Scene.call(this, { "key": "Slash" });
      },
      init: function(data) {
        this.serv = data.serv
        this.cordx = data.cordx
        this.cordy = data.cordy
        this.dir = data.dir
      },
      preload: function() {
        this.load.spritesheet('slash', 
          'assets/slash.png',
          { frameWidth: 18, frameHeight: 50 })
      },
      
      create: function() {
        this.cameras.main.setBackgroundColor('#000000');
        this.anims.create({
            key: 'slaright',
            frames: this.anims.generateFrameNumbers ('slash', { start: 0, end: 10 }),
            frameRate: 25
        });
        this.anims.create({
            key: 'slaleft',
            frames: this.anims.generateFrameNumbers('slash', { start: 11, end: 21 }),
            frameRate: 25
        });
        
        servr = "Scene" + this.serv
        if(this.dir == "left"){
          var x = this.cordx - 10
          var y = this.cordy
          slashsp = this.physics.add.sprite(x, y, 'slash');
          slashsp.on('animationcomplete', function (anim, frame) {
            this.emit('animationcomplete_' + anim.key, anim, frame);
          }, slashsp);
          slashsp.body.setAllowGravity(false)
          slashsp.anims.play('slaleft', true)
          slashsp.on('animationcomplete_slaleft', function () {
            slashsp.disableBody(true, true)
            this.scene.resume(servr,{"rld": false});
            this.scene.stop();
          }, this);
        }else{
          var x = this.cordx + 10
          var y = this.cordy
          slashsp = this.physics.add.sprite(x, y, 'slash');
          slashsp.on('animationcomplete', function (anim, frame) {
            this.emit('animationcomplete_' + anim.key, anim, frame);
          }, slashsp);
          slashsp.body.setAllowGravity(false)
          slashsp.anims.play('slaright', true)
          slashsp.on('animationcomplete_slaright', function () {
            slashsp.disableBody(true, true)
            this.scene.resume(servr,{"rld": false});
            this.scene.stop();
          }, this);
        }
      },
      update: function() {
        
      }
}}());