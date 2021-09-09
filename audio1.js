//base music
var AudioOne = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
      Phaser.Scene.call(this, { "key": "AudioOne" });
    },
    init: function() {},
    preload: function() {
      this.load.audio("music1", "./assets/music1.mp3");
    },
    create: function() {
      pmusic1 = this.sound.add("music1", { loop: true });
      //pmusic1.play()
    },
    update: function() {}
});