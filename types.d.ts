declare interface Entity {
    id: number;
}

declare interface PositionComponent {
    x: number;
    y: number;
}

declare interface SizeComponent {

}

declare interface GameState {
    canvas: HTMLCanvasElement,
    frameTimeTarget: number; 
    lastRender: number; 
    objects: any[]; 
}


declare interface GameConfig {
    frameRate: number;
}

declare interface Resolution {
    height: number;
    width: number;
    aspectRatio: number;
}
