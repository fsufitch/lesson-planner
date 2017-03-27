import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'notes',
  template: require('./notes-container.component.html'),
  styles: [require('./notes-container.component.scss')],
  encapsulation: ViewEncapsulation.None,
})
export class NotesContainerComponent {

}
