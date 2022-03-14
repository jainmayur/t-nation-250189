import { ElementRef } from "@angular/core";
import { SelectMultipleControlValueAccessor } from "@angular/forms";
//import { prototype } from "events";

export class GridMap{

    mapLength: number;
    numOfDivisions: number;
    cellLength: number;
    img: HTMLImageElement;
    //mapHeight: number;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    
    constructor(imageURL: string, targetElement: ElementRef){
        this.canvas = targetElement.nativeElement;
        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        this.img = new Image()
        this.img.src = imageURL;            
        this.img.onload = () => {          
            console.log(`image dimensions ${this.img.naturalWidth}x${this.img.naturalHeight}`);
            //this.mapHeight = (img.naturalWidth < img.naturalHeight) ? img.naturalWidth : img.naturalHeight;
            this.mapLength = (this.img.naturalWidth < this.img.naturalHeight) ? this.img.naturalWidth : this.img.naturalHeight;
            console.log(`Map Width : ${this.mapLength}`);

            this.canvas.height = this.mapLength;
            this.canvas.width = this.mapLength; 
            this.context.drawImage(this.img, 0, 0, this.mapLength, this.mapLength, 0, 0, this.mapLength, this.mapLength);
            //TODO: Remove magic 8
            this.drawGrid(16);

            const rect = this.canvas.getBoundingClientRect();
            console.log(`canvas ${this.canvas.width} : ${this.canvas.height}`);		
            console.log(`rectangle ${rect.width} : ${rect.height}`);
        }
    }

    clickCell(xClick: number, yClick: number) {
        if(xClick < 0 || xClick > this.mapLength || yClick < 0 || yClick > this.mapLength){
            throw new Error('invalid map region clicked');
        }
        console.log(`numOfDivisions ${this.numOfDivisions}`);
        console.log(`xClick input ${xClick}`);
        console.log(`X Cell - ${xClick/this.cellLength} : Y Cell - ${yClick/this.cellLength}`);

    }

    highlightCell(xClick: number, yClick: number){
        if(xClick < 0 || xClick > this.mapLength || yClick < 0 || yClick > this.mapLength){
            throw new Error(`invalid map region hovered - ${xClick} : ${yClick}`);
        }
        console.log(`Hover ${xClick} : ${yClick}`)
        /*this.context.save();
        this.context.filter = "brightness(120%)";
        this.context.drawImage(this.img, 0, 0, this.mapLength, this.mapLength, 0, 0, this.mapLength, this.mapLength);
        setTimeout(() => console.log('5 seconds!'),5000);
        this.context.restore();*/
    }

    drawGrid(divisions: number){
        this.numOfDivisions = divisions;

        this.cellLength = this.mapLength/this.numOfDivisions;

        for(let i=this.cellLength; i < this.cellLength * this.numOfDivisions; i+=this.cellLength){
            this.context.beginPath();
            this.context.moveTo(0, i);
            this.context.lineTo(this.mapLength, i);
            this.context.stroke();
        } 
        for(let i=this.cellLength; i < this.cellLength * this.numOfDivisions; i+=this.cellLength){
            this.context.beginPath();
            this.context.moveTo(i, 0);
            this.context.lineTo(i, this.mapLength);
            this.context.stroke();
        }


    }
}