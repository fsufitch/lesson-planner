import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'note-input',
  template: require('./note-input.component.html'),
  styles: [require('./note-input.component.scss')],
})
export class NoteInputComponent {
  @Output() noteSubmitted = new EventEmitter<string>();
  @ViewChild('noteInput') noteInput: ElementRef;

  submit(noteData: string) {
    if (!noteData) return;
    this.noteSubmitted.emit(noteData);
    (<HTMLInputElement>this.noteInput.nativeElement).value = '';
  }
}
