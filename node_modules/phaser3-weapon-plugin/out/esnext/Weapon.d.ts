/// <reference types="phaser" />
import Bullet from './Bullet';
import { FrameType } from './consts';
/**
 * Any Object, as long as it has public `x` and `y` properties,
 * such as {@link https://photonstorm.github.io/phaser3-docs/Phaser.Geom.Point.html Point}, `{ x: 0, y: 0 }`, {@link https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Sprite.html Sprite}, etc
 */
declare type ObjectWithXY = {
    x: number;
    y: number;
};
/**
 * An object that has x/y coords and optional rotation. Any Sprite-like object.
 */
declare type ObjectWithTransform = ObjectWithXY & {
    rotation?: number;
    angle?: number;
    body?: Phaser.Physics.Arcade.Body;
};
/**
 * The Weapon provides the ability to easily create a bullet pool and manager.
 *
 * Weapons fire {@link Bullet} objects, which are essentially Sprites with a
 * few extra properties. The Bullets are enabled for Arcade Physics. They do
 * not currently work with Impact or Matter Physics.
 *
 * The Bullets are created inside of {@link bullets weapon.bullets}, which is
 * a {@link https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Group.html Group} instance. Anything you can usually do
 * with a Group, like iterate it, etc can be done to the bullets Group too.
 *
 * Bullets can have textures and even animations. You can control the speed at
 * which they are fired, the firing rate, the firing angle, and even set things
 * like gravity for them.
 *
 * A small example, using add.weapon, assumed to be running from within a
 * {@link https://photonstorm.github.io/phaser3-docs/Phaser.Types.Scenes.html#.SceneCreateCallback Phaser.Scene.create} method:
 *
 * ```javascript
 * var weapon = this.add.weapon(10, 'bullet');
 * weapon.fireFrom.setPosition(300, 300);
 * this.input.on(Phaser.Input.Events.POINTER_DOWN, weapon.fire, this);
 * ```
 */
declare class Weapon extends Phaser.Events.EventEmitter {
    /**
     * The scene the Weapon is bound to
     */
    scene: Phaser.Scene;
    /**
     * Should debug graphics render for physics bodies?
     */
    debugPhysics: boolean;
    /**
     * Private var that holds the public {@link bullets} property.
     */
    private _bullets;
    /**
     * Private var that holds the public {@link autoExpandBulletsGroup} property.
     */
    private _autoExpandBulletsGroup;
    /**
     * Private var that holds the public {@link autofire} property.
     */
    private _autofire;
    /**
     * Private var that holds the public {@link shots} property.
     */
    private _shots;
    /**
     * Private var that holds the public {@link fireLimit} property.
     */
    private _fireLimit;
    /**
     * Private var that holds the public {@link fireRate} property.
     */
    private _fireRate;
    /**
     * Private var that holds the public {@link fireRateVariance} property.
     */
    private _fireRateVariance;
    /**
     * Private var that holds the public {@link fireFrom} property.
     */
    private _fireFrom;
    /**
     * Private var that holds the public {@link fireAngle} property.
     */
    private _fireAngle;
    /**
     * Private var that holds the public {@link bulletInheritSpriteSpeed} property.
     */
    private _bulletInheritSpriteSpeed;
    /**
     * Private var that holds the public {@link bulletAnimation} property.
     */
    private _bulletAnimation;
    /**
     * Private var that holds the public {@link bulletFrameRandom} property.
     */
    private _bulletFrameRandom;
    /**
     * Private var that holds the public {@link bulletFrameCycle} property.
     */
    private _bulletFrameCycle;
    /**
     * Private var that holds the public {@link bulletWorldWrap} property.
     */
    private _bulletWorldWrap;
    /**
     * Private var that holds the public {@link bulletWorldWrapPadding} property.
     */
    private _bulletWorldWrapPadding;
    /**
     * Private var that holds the public {@link bulletAngleOffset} property.
     */
    private _bulletAngleOffset;
    /**
     * Private var that holds the public {@link bulletAngleVariance} property.
     */
    private _bulletAngleVariance;
    /**
     * Private var that holds the public {@link bulletSpeed} property.
     */
    private _bulletSpeed;
    /**
     * Private var that holds the public {@link bulletSpeedVariance} property.
     */
    private _bulletSpeedVariance;
    /**
     * Private var that holds the public {@link bulletLifespan} property.
     */
    private _bulletLifespan;
    /**
     * Private var that holds the public {@link bulletKillDistance} property.
     */
    private _bulletKillDistance;
    /**
     * Private var that holds the public {@link bulletGravity} property.
     */
    private _bulletGravity;
    /**
     * Private var that holds the public {@link bulletRotateToVelocity} property.
     */
    private _bulletRotateToVelocity;
    /**
     * Private var that holds the public {@link bulletKey} property.
     */
    private _bulletKey;
    /**
     * Private var that holds the public {@link bulletFrame} property.
     */
    private _bulletFrame;
    /**
     * Private var that holds the public {@link bulletClass} property.
     */
    private _bulletClass;
    /**
     * Private var that holds the public {@link bulletCollideWorldBounds} property.
     */
    private _bulletCollideWorldBounds;
    /**
     * Private var that holds the public {@link bulletKillType} property.
     */
    private _bulletKillType;
    /**
     * Holds internal data about custom bullet body sizes.
     */
    private _data;
    /**
     * Private var that holds the public {@link bounds} property.
     */
    private _bounds;
    /**
     * Private var that holds the public {@link bulletBounds} property.
     */
    private _bulletBounds;
    /**
     * This array stores the frames added via {@link setBulletFrames}.
     */
    private _bulletFrames;
    /**
     * Private var that holds the public {@link bulletFrameIndex} property.
     */
    private _bulletFrameIndex;
    /**
     * An internal object that stores the animation data added via {@link addBulletAnimation}.
     */
    private anims;
    /**
     * Private var that holds the public {@link trackedSprite} property.
     */
    private _trackedSprite?;
    /**
     * Private var that holds the public {@link trackedPointer} property.
     */
    private _trackedPointer?;
    /**
     * Private var that holds the public {@link multiFire} property.
     */
    private _multiFire;
    /**
     * Internal multiFire test flag.
     */
    private _hasFired;
    /**
     * Private var that holds the public {@link trackRotation} property.
     */
    private _trackRotation;
    /**
     * Private var that holds the public {@link trackOffset} property.
     */
    private _trackOffset;
    /**
     * Internal firing rate time tracking variable.
     */
    private _nextFire;
    /**
     * Internal firing rate time tracking variable used by multiFire.
     */
    private _tempNextFire;
    /**
     * Internal firing rotation tracking point.
     */
    private _rotatedPoint;
    /**
     * Log level for this weapon. Either `warn`, `error' or `off`. `warn` is the default.
     * If you change this, please do so before setting any other properties.
     */
    logLevel: 'warn' | 'error' | 'off';
    /**
     * TODO: a builder style interface would be neat. Can be kicked way forward
     * into polishing.
     * @param scene - A reference to the {@link https://photonstorm.github.io/phaser3-docs/Phaser.Scene.html Phaser.Scene} instance.
     * @param bulletLimit - The quantity of bullets to seed the Weapon with. If -1 it will set the pool to automatically expand.
     * @param key - The texture cache key of the image that this Sprite will use.
     * @param frame - If the Sprite image contains multiple frames you can specify which one to use here.
     * @param group - Optional Group to add the object to.
     */
    constructor(scene: Phaser.Scene, bulletLimit?: number, key?: string, frame?: string, group?: Phaser.GameObjects.Group);
    /**
     * This is the {@link https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Group.html Group} that contains all of the bullets managed by this plugin.
     */
    get bullets(): Phaser.GameObjects.Group;
    set bullets(value: Phaser.GameObjects.Group);
    /**
     * Should the bullet pool run out of bullets (i.e. they are all in flight) then this
     * boolean controls if the Group will create a brand new bullet object or not.
     * @default false
     */
    get autoExpandBulletsGroup(): boolean;
    set autoExpandBulletsGroup(value: boolean);
    /**
     * Will this weapon auto fire? If set to true then a new bullet will be fired
     * based on the {@link fireRate} value.
     * @default false
     */
    get autofire(): boolean;
    set autofire(value: boolean);
    /**
     * The total number of bullets this Weapon has fired so far.
     * You can limit the number of shots allowed (via {@link fireLimit}), and reset
     * this total via {@link resetShots}.
     * @default 0
     */
    get shots(): number;
    set shots(value: number);
    /**
     * The maximum number of shots that this Weapon is allowed to fire before it stops.
     * When the limit is hit the {@link WEAPON_FIRE_LIMIT} event is dispatched.
     * You can reset the shot counter via {@link resetShots}.
     * @default 0
     */
    get fireLimit(): number;
    set fireLimit(value: number);
    /**
     * The minimum interval between shots, in milliseconds.
     * @default 100
     */
    get fireRate(): number;
    set fireRate(value: number);
    /**
     * This is a modifier that is added to the {@link fireRate} each update to add variety
     * to the firing rate of the Weapon. The value is given in milliseconds.
     * If you've a {@link fireRate} of 200 and a {@link fireRateVariance} of 50 then the actual
     * firing rate of the Weapon will be between 150 and 250.
     * @default 0
     */
    get fireRateVariance(): number;
    set fireRateVariance(value: number);
    /**
     * This is a Rectangle from within which the bullets are fired. By default it's a 1x1
     * rectangle, the equivalent of a Point. But you can change the width and height, and if
     * larger than 1x1 it'll pick a random point within the rectangle to launch the bullet from.
     */
    get fireFrom(): Phaser.Geom.Rectangle;
    set fireFrom(value: Phaser.Geom.Rectangle);
    /**
     * The angle at which the bullets are fired. This can be a const such as {@link Angle.ANGLE_UP ANGLE_UP}
     * or it can be any number from 0 to 360 inclusive, where 0 degrees is to the right.
     * @default {@link Angle.ANGLE_UP ANGLE_UP}
     */
    get fireAngle(): integer;
    set fireAngle(value: integer);
    /**
     * When a Bullet is fired it can optionally inherit the velocity of the {@link trackedSprite} if set.
     * @default false
     */
    get bulletInheritSpriteSpeed(): boolean;
    set bulletInheritSpriteSpeed(value: boolean);
    /**
     * The string based name of the animation that the Bullet will be given on launch.
     * This is set via {@link addBulletAnimation}.
     * @default ''
     */
    get bulletAnimation(): string;
    set bulletAnimation(value: string);
    /**
     * If you've added a set of frames via {@link setBulletFrames} then you can optionally
     * chose for each Bullet fired to pick a random frame from the set.
     * @default false
     */
    get bulletFrameRandom(): boolean;
    set bulletFrameRandom(value: boolean);
    /**
     * If you've added a set of frames via {@link setBulletFrames} then you can optionally
     * chose for each Bullet fired to use the next frame in the set. The frame index is then
     * advanced one frame until it reaches the end of the set, then it starts from the start
     * again. Cycling frames like this allows you to create varied bullet effects via
     * sprite sheets.
     * @default false
     */
    get bulletFrameCycle(): boolean;
    set bulletFrameCycle(value: boolean);
    /**
     * Should the Bullets wrap around the world bounds? This automatically calls
     * {@link https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.World.html#wrap World.wrap} on the Bullet each frame. See the docs for that method for details.
     * @default false
     */
    get bulletWorldWrap(): boolean;
    set bulletWorldWrap(value: boolean);
    /**
     * If {@link bulletWorldWrap} is true then you can provide an optional padding value with this
     * property. It's added to the calculations determining when the Bullet should wrap around
     * the world or not. The value is given in pixels.
     * @default 0
     */
    get bulletWorldWrapPadding(): integer;
    set bulletWorldWrapPadding(value: integer);
    /**
     * An optional angle offset applied to the Bullets when they are launched.
     * This is useful if for example your bullet sprites have been drawn facing up, instead of
     * to the right, and you want to fire them at an angle. In which case you can set the
     * angle offset to be 90 and they'll be properly rotated when fired.
     * @default 0
     */
    get bulletAngleOffset(): number;
    set bulletAngleOffset(value: number);
    /**
     * This is a variance added to the angle of Bullets when they are fired.
     * If you fire from an angle of 90 and have a {@link bulletAngleVariance} of 20 then the actual
     * angle of the Bullets will be between 70 and 110 degrees. This is a quick way to add a
     * great 'spread' effect to a Weapon.
     * @default 0
     */
    get bulletAngleVariance(): number;
    set bulletAngleVariance(value: number);
    /**
     * The initial velocity of fired bullets, in pixels per second.
     * @default 200
     */
    get bulletSpeed(): number;
    set bulletSpeed(value: number);
    /**
     * This is a variance added to the speed of Bullets when they are fired.
     * If bullets have a {@link bulletSpeed} value of 200, and a {@link bulletSpeedVariance} of 50
     * then the actual speed of the Bullets will be between 150 and 250 pixels per second.
     * @default 0
     */
    get bulletSpeedVariance(): number;
    set bulletSpeedVariance(value: number);
    /**
     * If you've set {@link bulletKillType} to {@link KillType.KILL_LIFESPAN KILL_LIFESPAN} this controls the amount
     * of lifespan the Bullets have set on launch. The value is given in milliseconds.
     * When a Bullet hits its lifespan limit it will be automatically killed.
     * @default 0
     */
    get bulletLifespan(): number;
    set bulletLifespan(value: number);
    /**
     * If you've set {@link bulletKillType} to {@link KillType.KILL_DISTANCE KILL_DISTANCE} this controls the distance
     * the Bullet can travel before it is automatically killed. The distance is given in pixels.
     * @default 0
     */
    get bulletKillDistance(): number;
    set bulletKillDistance(value: number);
    /**
     * This is the amount of {@link https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.Body.html#gravity Phaser.Physics.Arcade.Body.gravity} added to the Bullets physics body when fired.
     * Gravity is expressed in pixels / second / second.
     */
    get bulletGravity(): Phaser.Math.Vector2;
    set bulletGravity(value: Phaser.Math.Vector2);
    /**
     * Bullets can optionally adjust their rotation in-flight to match their velocity.
     * This can create the effect of a bullet 'pointing' to the path it is following, for example
     * an arrow being fired from a bow, and works especially well when added to {@link bulletGravity}.
     * @default false
     */
    get bulletRotateToVelocity(): boolean;
    set bulletRotateToVelocity(value: boolean);
    /**
     * The Texture Key that the Bullets use when rendering.
     * Changing this has no effect on bullets in-flight, only on newly spawned bullets.
     * @default ''
     */
    get bulletKey(): string;
    set bulletKey(value: string);
    /**
     * The Texture Frame that the Bullets use when rendering.
     * Changing this has no effect on bullets in-flight, only on newly spawned bullets.
     * @default ''
     */
    get bulletFrame(): string | integer;
    set bulletFrame(value: string | integer);
    /**
     * The Class of the bullets that are launched by this Weapon. Defaults to {@link Bullet}, but can be
     * overridden before calling {@link createBullets} and set to your own class type.
     *
     * It should be a constructor function accepting `(scene, x, y, key, frame)`.
     * @default Bullet
     */
    get bulletClass(): typeof Bullet;
    set bulletClass(classType: typeof Bullet);
    /**
     * Should bullets collide with the World bounds or not?
     * @default false
     */
    get bulletCollideWorldBounds(): boolean;
    set bulletCollideWorldBounds(value: boolean);
    /**
     * This controls how the bullets will be killed. The default is {@link KillType.KILL_WORLD_BOUNDS KILL_WORLD_BOUNDS}.
     *
     * There are 7 different "kill types" available:
     *
     * * {@linkcode KillType.KILL_NEVER KILL_NEVER}
     * The bullets are never destroyed by the Weapon. It's up to you to destroy them via your own code.
     *
     * * {@linkcode KillType.KILL_LIFESPAN KILL_LIFESPAN}
     * The bullets are automatically killed when their {@link bulletLifespan} amount expires.
     *
     * * {@linkcode KillType.KILL_DISTANCE KILL_DISTANCE}
     * The bullets are automatically killed when they
     * exceed {@link bulletKillDistance} pixels away from their original launch position.
     *
     * * {@linkcode KillType.KILL_WEAPON_BOUNDS KILL_WEAPON_BOUNDS}
     * The bullets are automatically killed when they no longer intersect with the {@link bounds} rectangle.
     *
     * * {@linkcode KillType.KILL_CAMERA_BOUNDS KILL_CAMERA_BOUNDS}
     * The bullets are automatically killed when they no longer intersect with the {@link https://photonstorm.github.io/phaser3-docs/Phaser.Cameras.Scene2D.Camera.html#getBounds Camera.getBounds} rectangle.
     *
     * * {@linkcode KillType.KILL_WORLD_BOUNDS KILL_WORLD_BOUNDS}
     * The bullets are automatically killed when they no longer intersect with the {@link https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.World.html#bounds World.bounds} rectangle.
     *
     * * {@linkcode KillType.KILL_STATIC_BOUNDS KILL_STATIC_BOUNDS}
     * The bullets are automatically killed when they no longer intersect with the {@link bounds} rectangle.
     * The difference between static bounds and weapon bounds, is that a static bounds will never be adjusted to
     * match the position of a tracked sprite or pointer.
     * @default {@link KillType.KILL_WORLD_BOUNDS KILL_WORLD_BOUNDS}
     */
    get bulletKillType(): integer;
    set bulletKillType(type: integer);
    /**
     * This Rectangle defines the bounds that are used when determining if a Bullet should be killed or not.
     * It's used in combination with {@link bulletKillType} when that is set to either {@link KillType.KILL_WEAPON_BOUNDS KILL_WEAPON_BOUNDS}
     * or {@link KillType.KILL_STATIC_BOUNDS KILL_STATIC_BOUNDS}. If you are not using either of these kill types then the bounds are ignored.
     * If you are tracking a Sprite or Point then the bounds are centered on that object every frame.
     */
    get bounds(): Phaser.Geom.Rectangle;
    set bounds(value: Phaser.Geom.Rectangle);
    /**
     * The Rectangle used to calculate the bullet bounds from.
     */
    get bulletBounds(): Phaser.Geom.Rectangle;
    set bulletBounds(value: Phaser.Geom.Rectangle);
    /**
     * This array stores the frames added via {@link setBulletFrames}.
     */
    get bulletFrames(): integer[];
    set bulletFrames(value: integer[]);
    /**
     * The index of the frame within {@link bulletFrames} that is currently being used.
     * This value is only used if {@link bulletFrameCycle} is set to `true`.
     */
    get bulletFrameIndex(): number;
    set bulletFrameIndex(value: number);
    /**
     * The Sprite currently being tracked by the Weapon, if any.
     * This is set via the {@link trackSprite} method.
     */
    get trackedSprite(): Phaser.GameObjects.Sprite | ObjectWithTransform | undefined;
    set trackedSprite(value: Phaser.GameObjects.Sprite | ObjectWithTransform | undefined);
    /**
     * The Pointer currently being tracked by the Weapon, if any.
     * This is set via the {@link trackPointer} method.
     */
    get trackedPointer(): Phaser.Input.Pointer | undefined;
    set trackedPointer(value: Phaser.Input.Pointer | undefined);
    /**
     * If you want this Weapon to be able to fire more than 1 bullet in a single
     * update, then set this property to `true`. When `true` the Weapon plugin won't
     * set the shot / firing timers until the {@link postRender} phase of the game loop.
     * This means you can call {@link fire} (and similar methods) as often as you like in one
     * single game update.
     * @default false
     */
    get multiFire(): boolean;
    set multiFire(value: boolean);
    /**
     * If the Weapon is tracking a Sprite, should it also track the Sprites rotation?
     * This is useful for a game such as Asteroids, where you want the weapon to fire based
     * on the sprites rotation.
     * @default false
     */
    get trackRotation(): boolean;
    set trackRotation(value: boolean);
    /**
     * The Track Offset is a Vector2 object that allows you to specify a pixel offset that bullets use
     * when launching from a tracked Sprite or Pointer. For example if you've got a bullet that is 2x2 pixels
     * in size, but you're tracking a Sprite that is 32x32, then you can set `trackOffset.x = 16` to have
     * the bullet launched from the center of the Sprite.
     */
    get trackOffset(): Phaser.Math.Vector2;
    set trackOffset(value: Phaser.Math.Vector2);
    /**
     * The x coordinate from which bullets are fired. This is the same as {@link Weapon.fireFrom}.x, and
     * can be overridden by the {@link fire} arguments.
     */
    get x(): number;
    set x(value: number);
    /**
     * The y coordinate from which bullets are fired. This is the same as {@link Weapon.fireFrom}.y, and
     * can be overridden by the {@link fire} arguments.
     */
    get y(): number;
    set y(value: number);
    /**
     * This method performs two actions: First it will check to see if the
     * {@link bullets} Group exists or not, and if not it creates it, adding its
     * children to the `group` given as the 4th argument.
     *
     * Then it will seed the bullet pool with the `quantity` number of Bullets,
     * using the texture key and frame provided (if any).
     *
     * If for example you set the quantity to be 10, then this Weapon will only
     * ever be able to have 10 bullets in-flight simultaneously. If you try to
     * fire an 11th bullet then nothing will happen until one, or more, of the
     * in-flight bullets have been killed, freeing them up for use by the Weapon
     * again.
     *
     * If you do not wish to have a limit set, then pass in -1 as the quantity.
     * In this instance the Weapon will keep increasing the size of the bullet
     * pool as needed. It will never reduce the size of the pool however, so be
     * careful it doesn't grow too large.
     *
     * You can either set the texture key and frame here, or via the
     * {@link bulletKey} and {@link bulletFrame} properties. You can also
     * animate bullets, or set them to use random frames. All Bullets belonging
     * to a single Weapon instance must share the same texture key however.
     *
     * @param quantity - The quantity of bullets to seed the Weapon
     *  with. If -1 it will set the pool to automatically expand.
     * @param key - The texture cache key of the image that this
     *  Sprite will use.
     * @param frame - If the Sprite image contains multiple
     *  frames you can specify which one to use here.
     * @param group - Optional Group to add the object to.
     * @return This Weapon instance.
     */
    createBullets(quantity?: integer, key?: string, frame?: integer | string, group?: Phaser.GameObjects.Group, bulletClass?: typeof Bullet): this;
    /**
     * Call a function on each in-flight bullet in this Weapon.
     *
     * See {@link https://photonstorm.github.io/phaser3-docs/Phaser.Structs.Set.html#each Set.each} for more details.
     *
     * @param callback - The function that will be called for each applicable child.
     * The child will be passed as the first argument.
     * @param callbackContext - The context in which the function should be called (usually 'this').
     * @param args - Additional arguments to pass to the callback function, after the child item.
     * @return This Weapon instance.
     */
    forEach(callback: (child: Phaser.GameObjects.GameObject, ...args: unknown[]) => void, callbackContext: unknown, ...args: unknown[]): this;
    /**
     * Sets {@link https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.Body.html#enable Body.enable} to `false` on each bullet in this Weapon.
     * This has the effect of stopping them in-flight should they be moving.
     * It also stops them being able to be checked for collision.
     *
     * @return This Weapon instance.
     */
    pauseAll(): this;
    /**
     * Sets {@link https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.Body.html#enable Body.enable} to `true` on each bullet in this Weapon.
     * This has the effect of resuming their motion should they be in-flight.
     * It also enables them for collision checks again.
     *
     * @return This Weapon instance.
     */
    resumeAll(): this;
    /**
     * Calls {@link Bullet.kill} on every in-flight bullet in this Weapon.
     * Also re-enables their physics bodies, should they have been disabled via {@link pauseAll}.
     *
     * @return This Weapon instance.
     */
    killAll(): this;
    /**
     * Resets the {@link shots} counter back to zero. This is used when you've set
     * {@link fireLimit} and have hit (or just wish to reset) your limit.
     *
     * @param newLimit - Optionally set a new {@link fireLimit}.
     * @return This Weapon instance.
     */
    resetShots(newLimit?: integer): this;
    /**
     * Sets this Weapon to track the given Sprite, or any {@link ObjectWithTransform Object with x/y coords and optionally rotation}
     * When a Weapon tracks a Sprite it will automatically update its {@link fireFrom} value to match the
     * Sprite's position within the Game World, adjusting the coordinates based on the offset arguments.
     *
     * This allows you to lock a Weapon to a Sprite, so that bullets are always launched from its location.
     *
     * Calling {@link trackSprite} will reset {@link trackedPointer} to undefined, should it have been set, as you can
     * only track _either_ a Sprite, or a Pointer, at once, but not both.
     *
     * @param sprite - The Sprite to track the position of.
     * @param offsetX - The horizontal offset from the Sprites position to be applied to the Weapon.
     * @param offsetY - The vertical offset from the Sprites position to be applied to the Weapon.
     * @param trackRotation - Should the Weapon also track the Sprites rotation?
     * @return This Weapon instance.
     */
    trackSprite(sprite: Phaser.GameObjects.Sprite | ObjectWithTransform, offsetX?: integer, offsetY?: integer, trackRotation?: boolean): this;
    /**
     * Sets this Weapon to track the given Pointer.
     * When a Weapon tracks a Pointer it will automatically update its {@link fireFrom} value to match the Pointer's
     * position within the Game World, adjusting the coordinates based on the offset arguments.
     *
     * This allows you to lock a Weapon to a Pointer, so that bullets are always launched from its location.
     *
     * Calling {@link trackPointer} will reset {@link trackedSprite} to undefined, should it have been set, as you can
     * only track _either_ a Pointer, or a Sprite, at once, but not both.
     *
     * @param pointer - The Pointer to track the position of.
     * Defaults to {@link https://photonstorm.github.io/phaser3-docs/Phaser.Input.InputPlugin.html#activePointer InputPlugin.activePointer} if not specified.
     * @param offsetX - The horizontal offset from the Pointers position to be applied to the Weapon.
     * @param offsetY - The vertical offset from the Pointers position to be applied to the Weapon.
     * @return This Weapon instance.
     */
    trackPointer(pointer?: Phaser.Input.Pointer, offsetX?: integer, offsetY?: integer): this;
    /**
     * Attempts to fire multiple bullets from the positions defined in the given array.
     *
     * If you provide a `from` argument, or if there is a tracked Sprite or Pointer, then
     * the positions are treated as __offsets__ from the given objects position.
     *
     * If `from` is undefined, and there is no tracked object, then the bullets are fired
     * from the given positions, as they exist in the world.
     *
     * Calling this method sets {@link multiFire} to `true`.
     *
     * If there are not enough bullets available in the pool, and the pool cannot be extended,
     * then this method may not fire from all of the given positions.
     *
     * When the bullets are launched they have their texture and frame updated, as required.
     * The velocity of the bullets are calculated based on Weapon properties like {@link bulletSpeed}.
     *
     * @param positions - An array of positions. Each position can be any Object, as long as it
     * has public `x` and `y` properties, such as {@link https://photonstorm.github.io/phaser3-docs/Phaser.Geom.Point.html Point}, { x: 0, y: 0 }, {@link https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Sprite.html Sprite}
     * @param from Optionally fires the bullets **from** the {@link x} and {@link y} properties of this object,
     * _instead_ of any {@link trackedSprite} or {@link trackedPointer} that is set.
     * @return An array containing all of the fired Bullet objects,
     * if a launch was successful, otherwise an empty array.
     */
    fireMany(positions: ObjectWithXY[], from: Phaser.GameObjects.Sprite | Phaser.Math.Vector2 | ObjectWithTransform): Bullet[];
    /**
     * Attempts to fire a single Bullet from a tracked Sprite or Pointer, but applies an offset
     * to the position first. This is the same as calling {@link fire} and passing in the offset arguments.
     *
     * If there are no more bullets available in the pool, and the pool cannot be extended,
     * then this method returns `undefined`. It will also return `undefined` if not enough time has expired since the last time
     * the Weapon was fired, as defined in the {@link fireRate} property.
     *
     * Otherwise the first available bullet is selected, launched, and returned.
     *
     * When the bullet is launched it has its texture and frame updated, as required. The velocity of the bullet is
     * calculated based on Weapon properties like {@link bulletSpeed}.
     *
     * If you wish to fire multiple bullets in a single game update, then set {@link multiFire} to `true`
     * and you can call this method as many times as you like, per loop. See also {@link fireMany}.
     *
     * @param offsetX - The horizontal offset from the position of the tracked Sprite or Pointer,
     * as set with {@link trackSprite}.
     * @param offsetY - The vertical offset from the position of the tracked Sprite or Pointer,
     * as set with {@link trackSprite}.
     * @return The fired bullet, if a launch was successful, otherwise `undefined`.
     */
    fireOffset(offsetX?: number, offsetY?: number): Bullet | undefined;
    /**
     * Fires a bullet **at** the given Pointer. The bullet will be launched from the {@link fireFrom} position,
     * or from a Tracked Sprite or Pointer, if you have one set.
     *
     * @param pointer - The Pointer to fire the bullet towards.
     * @return The fired bullet if successful, undefined otherwise.
     */
    fireAtPointer(pointer?: Phaser.Input.Pointer): Bullet | undefined;
    /**
     * Fires a bullet **at** the given Sprite. The bullet will be launched from the {@link fireFrom} position,
     * or from a Tracked Sprite or Pointer, if you have one set.
     *
     * @param sprite - The Sprite to fire the bullet towards.
     * @return The fired bullet if successful, undefined otherwise.
     */
    fireAtSprite(sprite?: Phaser.GameObjects.Sprite): Bullet | undefined;
    /**
     * Fires a bullet **at** the given coordinates. The bullet will be launched from the {@link fireFrom} position,
     * or from a Tracked Sprite or Pointer, if you have one set.
     *
     * @param x - The x coordinate, in world space, to fire the bullet towards.
     * @param y - The y coordinate, in world space, to fire the bullet towards.
     * @return The fired bullet if successful, undefined otherwise.
     */
    fireAtXY(x?: number, y?: number): Bullet | undefined;
    /**
     * Attempts to fire a single Bullet. If there are no more bullets available in the pool,
     * and the pool cannot be extended, then this method returns `undefined`. It will also return `undefined`
     * if not enough time has expired since the last time the Weapon was fired,
     * as defined in the {@link fireRate} property.
     *
     * Otherwise the first available bullet is selected, launched, and returned.
     *
     * The arguments are all optional, but allow you to control both where the bullet is launched from, and aimed at.
     *
     * If you don't provide any of the arguments then it uses those set via properties such as {@link trackedSprite},
     * {@link fireAngle} and so on.
     *
     * When the bullet is launched it has its texture and frame updated, as required. The velocity of the bullet is
     * calculated based on Weapon properties like {@link bulletSpeed}.
     *
     * If you wish to fire multiple bullets in a single game update, then set `Weapon.multiFire = true`
     * and you can call {@link fire} as many times as you like, per loop. Multiple fires in a single update
     * only counts once towards the {@link shots} total, but you will still receive an event for each bullet.
     *
     * @param from Optionally fires the bullet **from** the {@link x} and {@link y} properties of this object.
     * If set this overrides {@link trackedSprite} or {@link trackedPointer}. Pass `null` to ignore it.
     * @param x - The x coordinate, in world space, to fire the bullet **towards**.
     * If left as `undefined`, or `null`, the bullet direction is based on its angle.
     * @param y - The y coordinate, in world space, to fire the bullet **towards**.
     * If left as `undefined`, or `null`, the bullet direction is based on its angle.
     * @param offsetX - If the bullet is fired from a tracked Sprite or Pointer,
     * or the `from` argument is set, this applies a horizontal offset from the launch position.
     * @param offsetY - If the bullet is fired from a tracked Sprite or Pointer,
     * or the `from` argument is set, this applies a vertical offset from the launch position.
     * @return The fired bullet, if a launch was successful, otherwise `undefined`.
     */
    fire(from?: Phaser.GameObjects.Sprite | Phaser.Math.Vector2 | ObjectWithTransform | null, x?: number | null, y?: number | null, offsetX?: number, offsetY?: number): Bullet | undefined;
    /**
     * Set the fireFrom rectangle based on passed coords
     * @private
     * @param x - X coordinate for where to fire from
     * @param y - Y coordinate for where to fire from
     */
    updateFireFrom(x: number, y: number): void;
    /**
     * You can modify the size of the physics Body the Bullets use to be any dimension you need.
     * This allows you to make it smaller, or larger, than the parent Sprite.
     * You can also control the x and y offset of the Body. This is the position of the
     * Body relative to the top-left of the Sprite _texture_.
     *
     * For example: If you have a Sprite with a texture that is 80x100 in size,
     * and you want the physics body to be 32x32 pixels in the middle of the texture, you would do:
     *
     * `setSize(32 / Math.abs(this.scale.x), 32 / Math.abs(this.scale.y), 24, 34)`
     *
     * Where the first two parameters are the new Body size (32x32 pixels) relative to the Sprite's scale.
     * 24 is the horizontal offset of the Body from the top-left of the Sprites texture, and 34
     * is the vertical offset.
     *
     * @param width - The width of the Body.
     * @param height - The height of the Body.
     * @param offsetX - The X offset of the Body from the top-left of the Sprites texture.
     * @param offsetY - The Y offset of the Body from the top-left of the Sprites texture.
     * @return This Weapon instance.
     */
    setBulletBodyOffset(width: number, height: number, offsetX?: number, offsetY?: number): this;
    /**
     * Sets the texture frames that the bullets can use when being launched.
     *
     * This is intended for use when you've got numeric based frames, such as
     * those loaded via a Sprite Sheet.
     *
     * It works by calling {@link https://photonstorm.github.io/phaser3-docs/Phaser.Utils.Array.html#.NumberArray Phaser.Utils.Array.NumberArray} internally, using
     * the min and max values provided. Then it sets the frame index to be zero.
     *
     * You can optionally set the cycle and random booleans, to allow bullets to
     * cycle through the frames when they're fired, or pick one at random.
     *
     * @param min - The minimum value the frame can be. Usually zero.
     * @param max - The maximum value the frame can be.
     * @param selectionMethod - Specifies how the
     *  frame for the fired bullet will be selected. See {@link FrameType consts.FrameType}
     *  for options.
     * @return This Weapon instance.
     */
    setBulletFrames(min: integer, max: integer, selectionMethod?: FrameType): this;
    /**
     * Adds a new animation under the given key. Optionally set the frames, frame rate and loop.
     * The arguments are all the same as for {@link https://photonstorm.github.io/phaser3-docs/Phaser.Animations.AnimationManager.html#add AnimationManager.add}, and work in the same way.
     *
     * {@link bulletAnimation} will be set to this animation after it's created. From that point on, all
     * bullets fired will play using this animation. You can swap between animations by calling this method
     * several times, and then just changing the {@link bulletAnimation} property to the name of the animation
     * you wish to play for the next launched bullet.
     *
     * If you wish to stop using animations at all, set {@link bulletAnimation} to '' (an empty string).
     *
     * @param name - The unique (within the Weapon instance) name for the animation, i.e. "fire", "blast".
     * @param frames - An array of numbers/strings that correspond to the framesto add to this animation
     * and in which order. e.g. [1, 2, 3] or ['run0', 'run1', run2]). If null then all frames will be used.
     * @param frameRate - The speed at which the animation should play.
     * The speed is given in frames per second.
     * @param repeat - Number of times to repeat the animation. Set to -1 to repeat forever.
     * @return This Weapon instance.
     */
    addBulletAnimation(name: string, frames?: Phaser.Types.Animations.AnimationFrame[], frameRate?: number, repeat?: number): this;
    /**
     * Internal update method, called by the Weapon Plugin.
     */
    update(): void;
    /**
     * Internal update method, called by the Weapon Plugin.
     */
    postRender(): void;
    /**
     * Destroys this Weapon.
     * You must release everything in here, all references, all objects, free it all up.
     */
    destroy(): void;
}
export default Weapon;
