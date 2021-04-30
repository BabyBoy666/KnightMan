import { KillType } from './consts';
import { BULLET_KILL } from './events';
let bulletID = 0;
class Bullet extends Phaser.GameObjects.Sprite {
    /**
     * Create a new `Bullet` object. Bullets are used by the {@link Weapon} class, and are normal Sprites,
     * with a few extra properties in the data manager to handle Weapon specific features.
     *
     * @param scene - A reference to the currently running scene.
     * @param x - The x coordinate (in world space) to position the Bullet at.
     * @param y - The y coordinate (in world space) to position the Bullet at.
     * @param key - This is the image or texture used by the Particle during rendering.
     * It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or {@link https://photonstorm.github.io/phaser3-docs/Phaser.Textures.Texture.html Texture}.
     * @param frame - If this Bullet is using part of a sprite sheet or texture atlas
     * you can specify the exact frame to use by giving a string or numeric index.
     */
    constructor(scene, x, y, key, frame) {
        super(scene, x, y, key, frame);
        this.bulletID = bulletID;
        bulletID++;
        this.scene.physics.add.existing(this);
        this.setDataEnabled();
        this.setData({
            timeEvent: undefined,
            bulletManager: undefined,
            fromX: 0,
            fromY: 0,
            bodyDirty: true,
            rotateToVelocity: false,
            killType: KillType.KILL_NEVER,
            killDistance: 0,
            bodyBounds: new Phaser.Geom.Rectangle(),
        });
    }
    setData(key, data) {
        return super.setData(key, data);
    }
    getData(key) {
        return super.getData(key);
    }
    /* eslint-enable no-unused-vars */
    /**
     * Prepares this bullet to be fired and to interact with the rest
     * of the scene again.
     * @param x - Resets bullet position to this x coordinate
     * @param y - Resets bullet position to this y coordinate
     */
    prepare(x, y) {
        this.setActive(true);
        this.setVisible(true);
        this.body.enable = true;
        this.body.reset(x, y);
        const debugPhysics = this.getData('bulletManager')?.debugPhysics || false;
        this.body.debugShowBody = debugPhysics;
        this.body.debugShowVelocity = debugPhysics;
    }
    /**
     * Kills the Bullet, freeing it up for re-use by the Weapon bullet pool.
     * Also dispatches the {@link BULLET_KILL} event on the {@link Weapon}.
     * @returns This instance of the bullet class
     */
    kill() {
        // Reproduce Phaser.Physics.Arcade.Components.Enable.disableBody because
        // we can't assume that the bullet class has it built in.
        this.body.stop();
        this.body.enable = false;
        this.setActive(false);
        this.setVisible(false);
        this.body.debugShowBody = false;
        this.body.debugShowVelocity = false;
        // TODO: potentially we don't need to destroy the time event and we can
        // just pause when the bullet is killed and restart it when it's refired.
        // For now though do the simple thing and discard it.
        // Another option would be to use Date.now() and manually process pause
        // events with a flag and some math.
        // Both of those are probably premature optimizations.
        const timeEvent = this.getData('timeEvent');
        if (timeEvent !== undefined) {
            timeEvent.destroy();
            this.setData('timeEvent', undefined);
        }
        this.getData('bulletManager')?.emit(BULLET_KILL, this, this.getData('bulletManager'));
        return this;
    }
    /**
     * Updates the Bullet, killing as required.
     */
    update() {
        if (!this.active) {
            // this was previously a check to this.exists
            return;
        }
        const bulletManager = this.getData('bulletManager');
        if (this.getData('killType') > KillType.KILL_LIFESPAN) {
            if (this.getData('killType') === KillType.KILL_DISTANCE) {
                if (new Phaser.Math.Vector2(this.getData('fromX'), this.getData('fromY')).distance(this) >
                    this.getData('killDistance')) {
                    this.kill();
                }
            }
            else if (!Phaser.Geom.Intersects.RectangleToRectangle(bulletManager.bulletBounds, this.body.getBounds(this.getData('bodyBounds')))) {
                this.kill();
            }
        }
        if (this.getData('rotateToVelocity')) {
            this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
        }
        if (bulletManager.bulletWorldWrap) {
            this.scene.physics.world.wrap(this, bulletManager.bulletWorldWrapPadding);
        }
    }
}
export default Bullet;
