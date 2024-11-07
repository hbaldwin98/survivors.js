/**
* @param {GameConfig} config 
* @param {HTMLCanvasElement} canvas 
*/
export default function startGame(config, canvas) {
    let lastRender = performance.now();
    let frameTimeTarget = 1000 / config.frameRate;

    /** @type {GameContext} */
    const context = {
        canvas,
        entities: new Map(),
        input: {
            w: false,
            a: false,
            s: false,
            d: false,
        },

        addEntity(entity) {
            for (const method in entity) {
                if (typeof entity[method] === "function") {
                    if (!this.entities.has(method)) {
                        this.entities.set(method, new Set());
                    }

                    this.entities.get(method)?.add(entity);
                }
            }
        },

        getEntities(method) {
            return [...(this.entities.get(method) || [])];
        },

        /**
         * Removes an entity from all sets where it was registered
         * @param {Entity} entity - The entity to remove
         */
        removeEntity(entity) {
            for (const [_, entitySet] of this.entities.entries()) {
                if (entitySet.has(entity)) {
                    entitySet.delete(entity);
                }
            }
        }
    };

    function listenToInput() {
        /** @param {KeyboardEvent} e */
        window.onkeydown = (e) => {
            context.input[e.key] = true;
        }

        /** @param {KeyboardEvent} e */
        window.onkeyup = (e) => {
            context.input[e.key] = false;
        }
    }

    /**
    * @param {CanvasRenderingContext2D} ctx 
    * @param {string} text 
    */

    function drawText(ctx, text) {
        ctx.font = "24px consolas";
        ctx.fillStyle = "white";
        ctx.fillText(text, 50, 50);
    }

    /** @param {number} timestamp */
    function gameLoop(timestamp) {
        const delta = timestamp - lastRender;

        update(context, delta);
        render(context, delta);

        lastRender = timestamp;

        setTimeout(() => requestAnimationFrame((t) => gameLoop(t)), frameTimeTarget);
    }

    /**
     * @type {Beggledorf}
     */
    let player = {
        id: 1,
        x: 100,
        y: 100,
        height: 30,
        width: 20,
        render: function(ctx) {
            ctx.fillStyle = "rgb(0, 0, 0)"
            ctx.fillRect(this.x, this.y, this.width, this.height);
        },
        handleInput: function(input, delta) {
            const speed = 0.5 * delta;
            let velocityX = (input.a ? -1 : 0) + (input.d ? 1 : 0);
            let velocityY = (input.w ? -1 : 0) + (input.s ? 1 : 0);

            this.x += velocityX * speed;
            this.y += velocityY * speed;
        }
    };

    context.addEntity(player);

    /**
     * @param {GameContext} context 
     * @param {number} delta time since the last frame in ms 
     */
    function update(context, delta) {
        for (const object of context.getEntities("handleInput")) {
            object.handleInput(context.input, delta);
        }
    }

    /**
     * @param {GameContext} context 
     * @param {number} delta time since the last frame in ms 
     */
    function render(context, delta) {
        /** @type {!CanvasRenderingContext2D} */
        const ctx = /** @type {CanvasRenderingContext2D} */ (canvas.getContext("2d"));

        ctx.fillStyle = "rgb(51, 76, 102)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (const object of context.getEntities("render")) {
            object.render(ctx);
        }

        drawText(ctx, (1000 / delta).toString());
    }


    listenToInput();
    gameLoop(frameTimeTarget);
}


