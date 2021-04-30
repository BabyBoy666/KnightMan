/// <reference types="phaser" />
import { KillType } from './consts';
import type { Weapon } from './main';
declare type BulletData = {
    timeEvent?: Phaser.Time.TimerEvent;
    bulletManager?: Weapon;
    fromX: number;
    fromY: number;
    bodyDirty: boolean;
    rotateToVelocity: boolean;
    killType: KillType;
    killDistance: number;
    bodyBounds: Phaser.Geom.Rectangle;
};
declare class Bullet extends Phaser.GameObjects.Sprite {
    body: Phaser.Physics.Arcade.Body;
    bulletID: number;
    lifespan?: number;
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
    constructor(scene: Phaser.Scene, x: number, y: number, key: string, frame: string | number);
    setData(key: Partial<BulletData>, data?: never): this;
    setData(key: 'timeEvent', data: BulletData['timeEvent']): this;
    setData(key: 'bulletManager', data: BulletData['bulletManager']): this;
    setData(key: 'fromX', data: BulletData['fromX']): this;
    setData(key: 'fromY', data: BulletData['fromY']): this;
    setData(key: 'bodyDirty', data: BulletData['bodyDirty']): this;
    setData(key: 'rotateToVelocity', data: BulletData['rotateToVelocity']): this;
    setData(key: 'killType', data: BulletData['killType']): this;
    setData(key: 'killDistance', data: BulletData['killDistance']): this;
    setData(key: 'bodyBounds', data: BulletData['bodyBounds']): this;
    getData(key: 'timeEvent'): BulletData['timeEvent'];
    getData(key: 'bulletManager'): BulletData['bulletManager'];
    getData(key: 'fromX'): BulletData['fromX'];
    getData(key: 'fromY'): BulletData['fromY'];
    getData(key: 'bodyDirty'): BulletData['bodyDirty'];
    getData(key: 'rotateToVelocity'): BulletData['rotateToVelocity'];
    getData(key: 'killType'): BulletData['killType'];
    getData(key: 'killDistance'): BulletData['killDistance'];
    getData(key: 'bodyBounds'): BulletData['bodyBounds'];
    /**
     * Prepares this bullet to be fired and to interact with the rest
     * of the scene again.
     * @param x - Resets bullet position to this x coordinate
     * @param y - Resets bullet position to this y coordinate
     */
    prepare(x: number, y: number): void;
    /**
     * Kills the Bullet, freeing it up for re-use by the Weapon bullet pool.
     * Also dispatches the {@link BULLET_KILL} event on the {@link Weapon}.
     * @returns This instance of the bullet class
     */
    kill(): this;
    /**
     * Updates the Bullet, killing as required.
     */
    update(): void;
}
export default Bullet;
