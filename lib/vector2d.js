export class Vector2D {
    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        /**
         * @type {number}
         * @public
         */
        this.x = x;
        /**
         * @type {number}
         * @public
         */
        this.y = y;
    }

    /**
    * @param {Vector2D} v1 
    * @param {Vector2D} v2 
    * @returns {Vector2D}
    */
    static difference(v1, v2) {
        return new Vector2D(v1.x - v2.x, v1.y - v2.y);
    }

    /**
    * @param {Vector2D} v1 
    * @param {Vector2D} v2 
    * @returns {Vector2D}
    */
    static add(v1, v2) {
        return new Vector2D(v1.x + v2.x, v1.y + v2.y);
    }

    /**
    * @param {Vector2D} v 
    * @param {number} scalar 
    * @returns {Vector2D}
    */
    static divide(v, scalar) {
        return new Vector2D(v.x / scalar, v.y / scalar);
    }

    /**
     * @returns {Vector2D}
    */
    normalize() {
        return Vector2D.divide(this, this.magnitude());
    }

    /**
     * @returns {number}
    */
    magnitude() {
        return Math.sqrt((this.x ^ 2) + (this.y ^ 2));
    }
}
