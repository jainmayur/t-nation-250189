import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GridMap } from './gridMap';

@Component({
  selector: 'app-game-map',
  templateUrl: './game-map.component.html',
  styleUrls: ['./game-map.component.scss']
})
export class GameMapComponent implements AfterViewInit {

  constructor() { }

  pText="";
  @ViewChild('mapCanvas') mapElement: ElementRef;
  gridMap: GridMap;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  testClick(){
    console.log('element clicked');
  }


 getSquareClicked(event: MouseEvent){

    this.gridMap.clickCell((event.pageY-this.canvas.offsetTop), 
      (event.pageX-this.canvas.offsetLeft));
  }

  highlightOnHover(event: MouseEvent){
    this.gridMap.highlightCell((event.pageY-this.canvas.offsetTop), 
      (event.pageX-this.canvas.offsetLeft));    
  }

  ngAfterViewInit(): void {
    //this.pText = "after view works!"
    this.gridMap = new GridMap('assets/img/testMap2.jpg', this.mapElement);    
    this.canvas = this.mapElement.nativeElement;
    //this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    //console.log(this.context);
    //this.drawMap();*/
    console.log("console log after view");
  }

}
