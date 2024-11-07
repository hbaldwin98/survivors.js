import { getResolution } from "./lib/helpers.js";
import startGame from "./src/game.js";

/**
 * @type {HTMLCanvasElement}
 */
const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("game"));

/**
* @param {HTMLCanvasElement} canvas 
*/
function listenToChanges(canvas) {
    canvas.onclick = (clickEvent) => console.log("click", clickEvent.pageX, clickEvent.pageY);
    window.onresize = (_) => {
        const resolution = getResolution(window.innerWidth, window.innerHeight);

        canvas.width = resolution.width;
        canvas.height = resolution.height;
    };
}

/**
* @param {HTMLCanvasElement} canvas 
* @param {object} params 
*/
function setCanvasDimensions(canvas, params) {
    canvas.width = params.width;
    canvas.height = params.height;
}

const defaultResolution = getResolution(
    Math.max(1280, window.innerWidth),
    Math.max(720, window.innerHeight)
);
// Entity component system
// Collision
// bounding boxes AABB (good enough for this game)
// With lots of entities:
// Quad trees, R-Trees, or Spacial Hashmap

setCanvasDimensions(canvas, { ...defaultResolution });
listenToChanges(canvas);
startGame({
    frameRate: 60,
}, canvas)

