import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';

import { RendererMessagingService } from 'lesson-planner/common/ng2';

@Component({
  selector: 'notes',
  template: require('./notes-container.component.html'),
  styles: [require('./notes-container.component.scss')],
  encapsulation: ViewEncapsulation.None,
})
export class NotesContainerComponent implements OnDestroy {
  private allNotesMessageSubscription = this.rendererService.getAllNotesMessages()
    .subscribe(msg => console.log('got notes', msg.payload.notes));

  constructor(private rendererService: RendererMessagingService) {}

  noteSubmitted(noteText: string) {
    this.rendererService.sendNewNote(noteText);
  }

  ngOnDestroy() {
    this.allNotesMessageSubscription.unsubscribe();
  }
}
