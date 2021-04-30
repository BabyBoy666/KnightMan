import type Weapon from './Weapon';
/**
 * Log text to the console or throw an error
 * @param text - Text to be logged
 * @param logLevel - The log level, either `warn`, `error' or `off`
 */
declare function log(text: string, logLevel: 'warn' | 'error' | 'off'): void;
/**
 * Check the config of the weapon for common errors and weird configurations.
 * @param weapon - The weapon being validated
 * @param property - The property of the weapon being validated
 */
declare function validateConfig(weapon: Weapon, property?: keyof Weapon | 'all'): void;
export { log };
export default validateConfig;
