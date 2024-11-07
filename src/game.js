import { Vector2D } from "../lib/vector2d.js";

/**
* @param {GameConfig} config 
* @param {HTMLCanvasElement} canvas 
*/
export default function startGame(config, canvas) {

    /**
     * @type {GameState}
     */
    const state = {
        canvas,
        frameTimeTarget: 1000 / config.frameRate,
        lastRender: performance.now(),
        objects: [],
    };

    /**
    * @param {CanvasRenderingContext2D} ctx 
    * @param {string} text 
    */

    function drawText(ctx, text) {
        ctx.font = "24px consolas";
        ctx.fillStyle = "white";
        ctx.fillText(text, 50, 50);
    }

    /**
     * @param {number} timestamp 
     */
    function gameLoop(timestamp) {
        const delta = timestamp - state.lastRender;

        update(delta);
        state.lastRender = timestamp;

        setTimeout(() => requestAnimationFrame((t) => gameLoop(t)), state.frameTimeTarget);
    }

    /**
     * @param {number} delta time since the last frame in ms 
     */
    function update(delta) {
        /** @type {!CanvasRenderingContext2D} */
        const ctx = /** @type {CanvasRenderingContext2D} */ (canvas.getContext("2d"));

        ctx.fillStyle = "rgb(51, 76, 102)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawText(ctx, (1000 / delta).toString());
        state.objects.push(new Vector2D(Math.random(), Math.random()));

        if (Math.random() > 0.1) {
            state.objects.pop();
        }
    }


    gameLoop(state.frameTimeTarget);
}


