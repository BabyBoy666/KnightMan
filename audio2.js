//boss music 1
var AudioTwo = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
      Phaser.Scene.call(this, { "key": "AudioTwo" });
    },
    init: function() {},
    preload: function() {
      this.load.audio("bossm", "./assets/bossmusic.mp3");
    },
    create: function() {
      pmusic2 = this.sound.add("bossm", { loop: true });
      pmusic2.play()
    },
    update: function() {}
});