/**
 * @param {number} width  width of the window in px
 * @param {number} height height of the window in px
 * @param {number} [numerator=16] numerator of the desired aspect ratio (16 / 9)
 * @param {number} [denominator=9]  denominator of the desired aspect ratio (16 / 9)
 * @returns {Resolution} resolution including the aspect ratio as a number
 */
export function getResolution(width, height, numerator = 16, denominator = 9) {
    const heightRatio = 9 / 16;
    const widthRatio = 16 / 9;

    let resolution = {
        width,
        height: width * heightRatio,
        aspectRatio: numerator / denominator,
    };

    if (resolution.height > height) {
        resolution.height = height;
        resolution.width = height * widthRatio;
    }

    return resolution;
}

