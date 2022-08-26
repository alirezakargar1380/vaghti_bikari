import { Injectable } from "@nestjs/common";
import { IHome_are_fill } from "./interface/fallen_cubes.service.interface";


@Injectable()
export class FallenCubesService {
    public direction
    public center
    constructor() {
        this.direction = {
            "topRight": "topRight",
            "right": "right",
            "downRight": "downRight",
            "down": "down",
            "downLeft": "downLeft",
            "left": "left",
            "topLeft": "topLeft",
            "top": "top",
            "center": "center"
        }
        this.center = {
            x: 2,
            y: 2
        }
    }

    getShapePoints(shapeName, stepByRotation, lastStartPoint, r) {
        let newStartPoint
        let shapePoint = [];
        let counter = 0;
        let maxCupe = 4;
        let result
        switch (shapeName) {
            case "L":
                newStartPoint = this.getCoorByDirection(r, lastStartPoint.x, lastStartPoint.y)

                // check for direction want to go
                if (r === "topRight") {
                    console.log("topRight")
                    // down
                    result = this.straightLineDown(3, newStartPoint)
                    if (result.canGo) {
                        maxCupe -= 3
                        result.directions.forEach((dir) => {
                            shapePoint.push(dir);
                        })
                        newStartPoint = result.lastDirection;
                    }

                    // left
                    maxCupe -= 1
                    shapePoint.push({
                        x: newStartPoint.x - 1,
                        y: newStartPoint.y
                    });

                }

                // check for direction want to go
                if (r === "downRight") {
                    // left
                    result = this.straightLineLeft(3, newStartPoint)
                    if (result.canGo) {
                        maxCupe -= 3
                        result.directions.forEach((dir) => {
                            shapePoint.push(dir);
                        })
                        newStartPoint = result.lastDirection;
                    }

                    // top
                    maxCupe -= 1
                    shapePoint.push({
                        x: newStartPoint.x,
                        y: newStartPoint.y - 1
                    });

                    // console.log(shapePoint);
                }

                // check for direction want to go
                if (r === "downLeft") {
                    // top
                    result = this.straightLineTop(3, newStartPoint);
                    if (result.canGo) {
                        maxCupe -= 3;
                        result.directions.forEach((dir) => {
                            shapePoint.push(dir);
                        })
                        newStartPoint = result.lastDirection;
                    }

                    // right
                    maxCupe -= 1
                    shapePoint.push({
                        x: newStartPoint.x + 1,
                        y: newStartPoint.y
                    });

                }

                // check for direction want to go
                if (r === "topLeft") {
                    // right
                    result = this.straightLineRight(3, newStartPoint);
                    if (result.canGo) {
                        maxCupe -= 3;
                        result.directions.forEach((dir) => {
                            shapePoint.push(dir);
                        })
                        newStartPoint = result.lastDirection;
                    }

                    // down
                    maxCupe -= 1
                    shapePoint.push({
                        x: newStartPoint.x,
                        y: newStartPoint.y + 1
                    });
                }

                break;
            case "T":

                // centerTop
                newStartPoint = this.getCoorByDirection("topLeft", lastStartPoint.x, lastStartPoint.y)
                if (r === "centerTop") {
                    console.log("center top")
                    // right
                    result = this.straightLineRight(stepByRotation, newStartPoint)
                    if (result.canGo) {
                        result.directions.forEach((dir) => {
                            shapePoint.push(dir);
                        })
                    }
                }

                // centerRight
                newStartPoint = this.getCoorByDirection("topRight", lastStartPoint.x, lastStartPoint.y)
                if (r === "centerRight") {
                    console.log("center right")
                    // down
                    result = this.straightLineDown(stepByRotation, newStartPoint)
                    if (result.canGo) {
                        result.directions.forEach((dir) => {
                            shapePoint.push(dir);
                        })
                    }
                }

                // centerDown
                newStartPoint = this.getCoorByDirection("downRight", lastStartPoint.x, lastStartPoint.y)
                if (r === "centerDown") {
                    console.log("center down")
                    // down
                    result = this.straightLineLeft(stepByRotation, newStartPoint)
                    if (result.canGo) {
                        result.directions.forEach((dir) => {
                            shapePoint.push(dir);
                        })
                    }
                }

                // centerLeft
                newStartPoint = this.getCoorByDirection("downLeft", lastStartPoint.x, lastStartPoint.y)
                if (r === "centerLeft") {
                    console.log("center left")
                    // top
                    result = this.straightLineTop(stepByRotation, newStartPoint)
                    if (result.canGo) {
                        result.directions.forEach((dir) => {
                            shapePoint.push(dir);
                        })
                    }
                }

                shapePoint.push({
                    x: this.center.x,
                    y: this.center.y
                });
                break;
            case "LT":

                // top
                newStartPoint = this.getCoorByDirection(this.direction.topRight, lastStartPoint.x, lastStartPoint.y)
                if (r === this.direction.top) {
                    // top
                    shapePoint.push(this.getCoorByDirection(this.direction.top, lastStartPoint.x, lastStartPoint.y))
                    // down
                    result = this.straightLineDown(3, newStartPoint);
                    if (result.canGo) {
                        result.directions.forEach((dir) => {
                            shapePoint.push(dir);
                        })
                    }
                }

                // right
                newStartPoint = this.getCoorByDirection(this.direction.downRight, lastStartPoint.x, lastStartPoint.y)
                if (r === this.direction.right) {
                    // right
                    shapePoint.push(this.getCoorByDirection(this.direction.right, lastStartPoint.x, lastStartPoint.y))
                    // left
                    result = this.straightLineLeft(3, newStartPoint);
                    if (result.canGo) {
                        result.directions.forEach((dir) => {
                            shapePoint.push(dir);
                        })
                    }
                }

                // down
                newStartPoint = this.getCoorByDirection(this.direction.downLeft, lastStartPoint.x, lastStartPoint.y)
                if (r === this.direction.down) {
                    // down
                    shapePoint.push(this.getCoorByDirection(this.direction.down, lastStartPoint.x, lastStartPoint.y))
                    // left
                    result = this.straightLineTop(3, newStartPoint);
                    if (result.canGo) {
                        result.directions.forEach((dir) => {
                            shapePoint.push(dir);
                        })
                    }
                }

                // left
                newStartPoint = this.getCoorByDirection(this.direction.topLeft, lastStartPoint.x, lastStartPoint.y)
                if (r === this.direction.left) {
                    // down
                    shapePoint.push(this.getCoorByDirection(this.direction.left, lastStartPoint.x, lastStartPoint.y))
                    // left
                    result = this.straightLineRight(3, newStartPoint);
                    if (result.canGo) {
                        result.directions.forEach((dir) => {
                            shapePoint.push(dir);
                        })
                    }
                }


                break;
            case "ZL":
                // left
                if (r === this.direction.left) {
                    // left
                    shapePoint.push(this.getCoorByDirection(this.direction.left, lastStartPoint.x, lastStartPoint.y))
                    // center
                    shapePoint.push(this.getCoorByDirection(this.direction.center, lastStartPoint.x, lastStartPoint.y))
                    // down
                    shapePoint.push(this.getCoorByDirection(this.direction.down, lastStartPoint.x, lastStartPoint.y))
                    // downRight
                    shapePoint.push(this.getCoorByDirection(this.direction.downRight, lastStartPoint.x, lastStartPoint.y))
                }

                // top
                if (r === this.direction.top) {
                    // topRight
                    shapePoint.push(this.getCoorByDirection(this.direction.topRight, lastStartPoint.x, lastStartPoint.y))
                    // right
                    shapePoint.push(this.getCoorByDirection(this.direction.right, lastStartPoint.x, lastStartPoint.y))
                    // center
                    shapePoint.push(this.getCoorByDirection(this.direction.center, lastStartPoint.x, lastStartPoint.y))
                    // down
                    shapePoint.push(this.getCoorByDirection(this.direction.down, lastStartPoint.x, lastStartPoint.y))
                }
                break;
            case "ZR":
                // right
                if (r === this.direction.right) {
                    // right
                    shapePoint.push(this.getCoorByDirection(this.direction.right, lastStartPoint.x, lastStartPoint.y))
                    // center
                    shapePoint.push(this.getCoorByDirection(this.direction.center, lastStartPoint.x, lastStartPoint.y))
                    // down
                    shapePoint.push(this.getCoorByDirection(this.direction.down, lastStartPoint.x, lastStartPoint.y))
                    // downLeft
                    shapePoint.push(this.getCoorByDirection(this.direction.downLeft, lastStartPoint.x, lastStartPoint.y))
                }

                // top
                if (r === this.direction.top) {
                    // topRight
                    shapePoint.push(this.getCoorByDirection(this.direction.topLeft, lastStartPoint.x, lastStartPoint.y))
                    // right
                    shapePoint.push(this.getCoorByDirection(this.direction.left, lastStartPoint.x, lastStartPoint.y))
                    // center
                    shapePoint.push(this.getCoorByDirection(this.direction.center, lastStartPoint.x, lastStartPoint.y))
                    // down
                    shapePoint.push(this.getCoorByDirection(this.direction.down, lastStartPoint.x, lastStartPoint.y))
                }
                break;
            default:
                break;
        }

        return shapePoint
    }

    getCurrentShapeRotaion(shapeRotationObject) {
        let rotationName
        Object.keys(shapeRotationObject).forEach((keyItem) => {
            if (shapeRotationObject[keyItem]) {
                rotationName = keyItem
            }
        })
        return rotationName
    }

    getCubePoints(centerX, centerY) {
        let points = [];

        // row 1
        points.push(this.getCoorByDirection("topLeft", centerX, centerY))
        points.push(this.getCoorByDirection("top", centerX, centerY))
        points.push(this.getCoorByDirection("topRight", centerX, centerY))

        // row 2
        points.push(this.getCoorByDirection("left", centerX, centerY))
        points.push(this.getCoorByDirection("center", centerX, centerY))
        points.push(this.getCoorByDirection("right", centerX, centerY))

        // row 3
        points.push(this.getCoorByDirection("downLeft", centerX, centerY))
        points.push(this.getCoorByDirection("down", centerX, centerY))
        points.push(this.getCoorByDirection("downRight", centerX, centerY))

        return points;
    }

    canGoHere(direction, center: any) {
        console.log(center.x)
        const points = this.getCubePoints(center.x, center.y)
        let canGo = false;
        points.forEach(({ x, y }) => {
            if (x === direction.x && y === direction.y) {
                canGo = true
            }
        })

        return canGo
    }

    straightLineDown(lineNumYouWantToGo, newStartPoint) {
        let canGo = true
        let directions = []
        let newDirection

        for (let i = 0; i < lineNumYouWantToGo; i++) {
            if (!canGo) break;

            newDirection = {
                x: newStartPoint.x,
                y: newStartPoint.y + i
            }

            // if (!this.canGoHere(newDirection, newStartPoint)) {
            //     console.error("problem")
            //     canGo = false
            //     break;
            // }

            directions.push(newDirection)
        }

        return {
            canGo: canGo,
            directions: directions,
            lastDirection: newDirection
        }
    }

    straightLineLeft(lineNumYouWantToGo, newStartPoint) {
        let canGo = true
        let directions = []
        let newDirection

        for (let i = 0; i < lineNumYouWantToGo; i++) {
            if (!canGo) continue;

            newDirection = {
                x: newStartPoint.x - i,
                y: newStartPoint.y
            }

            // if (!this.canGoHere(newDirection, newStartPoint)) {
            //     console.error("problem")
            //     canGo = false
            //     break;
            // }

            directions.push(newDirection)
        }

        return {
            canGo: canGo,
            directions: directions,
            lastDirection: newDirection
        }
    }

    straightLineTop(lineNumYouWantToGo, newStartPoint) {
        let canGo = true
        let directions = []
        let newDirection

        for (let i = 0; i < lineNumYouWantToGo; i++) {
            if (!canGo) continue;

            newDirection = {
                x: newStartPoint.x,
                y: newStartPoint.y - i
            }

            // if (!this.canGoHere(newDirection, newStartPoint)) {
            //     console.error("problem")
            //     canGo = false
            //     break;
            // }

            directions.push(newDirection)
        }

        return {
            canGo: canGo,
            directions: directions,
            lastDirection: newDirection
        }
    }

    straightLineRight(lineNumYouWantToGo, newStartPoint) {
        let canGo = true
        let directions = []
        let newDirection

        for (let i = 0; i < lineNumYouWantToGo; i++) {
            if (!canGo) continue;

            newDirection = {
                x: newStartPoint.x + i,
                y: newStartPoint.y
            }

            // if (!this.canGoHere(newDirection, newStartPoint)) {
            //     console.error("problem")
            //     canGo = false
            //     break;
            // }

            directions.push(newDirection)
        }

        return {
            canGo: canGo,
            directions: directions,
            lastDirection: newDirection
        }
    }

    getCoorByDirection(dir, x, y) {
        let coor: any = {}

        switch (dir) {
            case "topLeft":
                coor.x = x - 1
                coor.y = y - 1
                break;

            case "top":
                coor.x = x
                coor.y = y - 1
                break;

            case "topRight":
                coor.x = x + 1
                coor.y = y - 1
                break;

            case "left":
                coor.x = x - 1
                coor.y = y
                break;

            case "center":
                coor.x = x
                coor.y = y
                break;

            case "right":
                coor.x = x + 1
                coor.y = y
                break;

            case "downLeft":
                coor.x = x - 1
                coor.y = y + 1
                break;

            case "down":
                coor.x = x
                coor.y = y + 1
                break;

            case "downRight":
                coor.x = x + 1
                coor.y = y + 1
                break;

            default:
                break;
        }

        return coor
    }

    getFilledCubes(home_are_fill: IHome_are_fill[]) {
        let rowLength = 5
        let fillRowNum = 0
        let fillRows: number[] = []
        for (let r = 1; r <= 20; r++) {
            fillRowNum = 0
            home_are_fill.forEach(({ x, y }) => {
                if (r === y) {
                    fillRowNum++
                }
            })
            if (rowLength === fillRowNum) {
                fillRows.push(r)
            }
        }

        return fillRows
    }
}