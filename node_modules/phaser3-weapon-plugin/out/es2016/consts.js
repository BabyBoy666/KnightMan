/* eslint-disable no-unused-vars */
/**
 * Kill type constants for {@link Weapon.bulletKillType}
 */
var KillType;
(function (KillType) {
    /**
     * A {@link Weapon.bulletKillType bulletKillType} constant that stops the bullets from ever being destroyed automatically.
     */
    KillType[KillType["KILL_NEVER"] = 0] = "KILL_NEVER";
    /**
     * A {@link Weapon.bulletKillType bulletKillType} constant that automatically kills the bullets
     * when their {@link Weapon.bulletLifespan} expires.
     */
    KillType[KillType["KILL_LIFESPAN"] = 1] = "KILL_LIFESPAN";
    /**
     * A {@link Weapon.bulletKillType bulletKillType} constant that automatically kills the bullets after they
     * exceed the {@link Weapon.bulletKillDistance} from their original firing position.
     */
    KillType[KillType["KILL_DISTANCE"] = 2] = "KILL_DISTANCE";
    /**
     * A {@link Weapon.bulletKillType bulletKillType} constant that automatically kills the bullets
     * when they leave the {@link Weapon.bounds} rectangle.
     */
    KillType[KillType["KILL_WEAPON_BOUNDS"] = 3] = "KILL_WEAPON_BOUNDS";
    /**
     * A {@link Weapon.bulletKillType bulletKillType} constant that automatically kills the bullets
     * when they leave the {@link https://photonstorm.github.io/phaser3-docs/Phaser.Cameras.Scene2D.Camera.html#getBounds Camera.getBounds} rectangle.
     */
    KillType[KillType["KILL_CAMERA_BOUNDS"] = 4] = "KILL_CAMERA_BOUNDS";
    /**
     * A {@link Weapon.bulletKillType bulletKillType} constant that automatically kills the bullets
     * when they leave the {@link https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.World.html#bounds World.bounds} rectangle.
     */
    KillType[KillType["KILL_WORLD_BOUNDS"] = 5] = "KILL_WORLD_BOUNDS";
    /**
     * A {@link Weapon.bulletKillType} constant that automatically kills the bullets
     * when they leave the {@link Weapon.bounds} rectangle.
     * The difference between static bounds and weapon bounds, is that a static bounds will never be adjusted to
     * match the position of a tracked sprite or pointer.
     */
    KillType[KillType["KILL_STATIC_BOUNDS"] = 6] = "KILL_STATIC_BOUNDS";
})(KillType || (KillType = {}));
export { KillType };
/**
 * Angle constants that can be used anywhere you specify angles in degrees, for instance {@link Weapon.fireAngle} and {@link Weapon.bulletAngleOffset}.
 */
var Angle;
(function (Angle) {
    /**
     * The Angle (in degrees) a Game Object needs to be set to in order to face up.
     */
    Angle[Angle["ANGLE_UP"] = 270] = "ANGLE_UP";
    /**
     * The Angle (in degrees) a Game Object needs to be set to in order to face down.
     */
    Angle[Angle["ANGLE_DOWN"] = 90] = "ANGLE_DOWN";
    /**
     * The Angle (in degrees) a Game Object needs to be set to in order to face left.
     */
    Angle[Angle["ANGLE_LEFT"] = 180] = "ANGLE_LEFT";
    /**
     * The Angle (in degrees) a Game Object needs to be set to in order to face right.
     */
    Angle[Angle["ANGLE_RIGHT"] = 0] = "ANGLE_RIGHT";
    /**
     * The Angle (in degrees) a Game Object needs to be set to in order to face north east.
     */
    Angle[Angle["ANGLE_NORTH_EAST"] = 315] = "ANGLE_NORTH_EAST";
    /**
     * The Angle (in degrees) a Game Object needs to be set to in order to face north west.
     */
    Angle[Angle["ANGLE_NORTH_WEST"] = 225] = "ANGLE_NORTH_WEST";
    /**
     * The Angle (in degrees) a Game Object needs to be set to in order to face south east.
     */
    Angle[Angle["ANGLE_SOUTH_EAST"] = 45] = "ANGLE_SOUTH_EAST";
    /**
     * The Angle (in degrees) a Game Object needs to be set to in order to face south west.
     */
    Angle[Angle["ANGLE_SOUTH_WEST"] = 135] = "ANGLE_SOUTH_WEST";
})(Angle || (Angle = {}));
export { Angle };
/**
 * Bullet frame type constants for {@link Weapon.setBulletFrames}
 */
var FrameType;
(function (FrameType) {
    /**
     * When selecting a bullet frame the same frame should always be used. This
     * is the default value.
     */
    FrameType[FrameType["BULLET_FRAME_STABLE"] = 0] = "BULLET_FRAME_STABLE";
    /**
     * When selecting a bullet frame the next frame should be used
     */
    FrameType[FrameType["BULLET_FRAME_CYCLE"] = 1] = "BULLET_FRAME_CYCLE";
    /**
     * When selecting a bullet frame a random frame should be used.
     */
    FrameType[FrameType["BULLET_FRAME_RANDOM"] = 2] = "BULLET_FRAME_RANDOM";
})(FrameType || (FrameType = {}));
export { FrameType };
export default {
    KillType,
    Angle,
    FrameType,
};
