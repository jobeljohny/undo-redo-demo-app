import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  canvas:any;
  colors:string[]=["red","green","blue","orange","black","yellow"]
  constructor() { }

  ngOnInit(): void {
    // this.canvas = new fabric.Canvas('canvas');
    //  this.canvas.add(new fabric.IText('Hello World !'));
  }
  ngAfterViewInit() {
     this.canvas = new fabric.Canvas('canvas');
    
}
getAdder(offset:number):number{
 return  Math.floor(Math.random() * offset);
}

addShape():void{
  var color=this.colors[Math.floor(Math.random() * this.colors.length)]
  const rect = new fabric.Rect({
    top : 100+this.getAdder(100),
    left : 100+this.getAdder(100),
    width : 60+this.getAdder(40),
    height : 70+this.getAdder(40),
    fill : color
 });
 this.canvas.add(rect);

}

}
