declare interface Entity {
    id: number;
}

declare interface PositionComponent {
    x: number;
    y: number;
}

declare interface SizeComponent {
    height: number;
    width: number;
}

declare interface RenderComponent {
    render(ctx: CanvasRenderingContext2D): void;
}

declare interface InputHandlerComponent {
    handleInput(input: InputMap, delta: number): void;
}

declare interface GameContext {
    canvas: HTMLCanvasElement;
    input: InputMap;
    entities: Map<string, Set<Entity>>;
    addEntity(entity: Entity & any): void;
    removeEntity(entity: Entity): void;
    getEntities(method: string): any[];
}

declare interface InputMap {
    w: boolean;
    a: boolean;
    s: boolean;
    d: boolean;
}


declare interface GameConfig {
    frameRate: number;
}

declare interface Resolution {
    height: number;
    width: number;
    aspectRatio: number;
}


// Player Character
declare interface Beggledorf extends Entity, PositionComponent, SizeComponent, RenderComponent, InputHandlerComponent { }
