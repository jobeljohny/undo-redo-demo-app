import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';

import * as canvasActions from "../store/canvas.actions";
import { Store } from "@ngrx/store";
import { take } from "rxjs/operators";
import { UndoActions } from "ngrx-undo-redo";

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  canvas:any;
  colors:string[]=["red","green","blue","orange","black","yellow"]
  state = [];
  mods = 0;

  constructor(private store:Store<any>) { }

  ngOnInit(): void {
   
    this.canvas = new fabric.Canvas('canvas',{
      centeredScaling: true,
      selection: false,
      renderOnAddRemove: false,
      stateful: false,
      
    });
    this.canvas["counter"] = 0;
   this.updateModifications(true);
   this.canvas.on("path:created", (x: any) => {
     console.log('path: ', x);

     this.updateModifications(true);
   });
  }
  ngAfterViewInit() {
    
    
}

updateModifications(savehistory:any) {
  if (savehistory === true) {
    this.store.dispatch(
      new canvasActions.UpdateCanvas({ canvas: JSON.stringify(this.canvas) })
    );
    // const myjson = JSON.stringify(this.canvas);
    // this.state.push(myjson);
  }
  console.log("updated")
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
 this.canvas.renderAll();
 this.updateModifications(true);
this.canvas["counter"]++;

}

redo() {
    this.store.dispatch(<UndoActions>{ type: 'REDO_STATE' });

    this.store
      .select('canvas')
      .pipe(take(1))
      .subscribe((x) => {
        this.canvas.loadFromJSON(x.canvas, () => {});
      });
  }

undo() {
  this.store.dispatch(<UndoActions>{ type: 'UNDO_STATE' });
  this.store
    .select('canvas')
    .pipe(take(1))
    .subscribe((x) => {
      this.canvas.loadFromJSON(x.canvas, () => {});
    });
}

}
