import 'reflect-metadata';
import 'zone.js';
import 'material-design-lite';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ipcRenderer } from 'electron';

import { IPC, RendererMessagingService } from 'lesson-planner/common/ng2';
import { NotesContainerComponent } from './notes-container';
import { NoteInputComponent } from './note-input';

@NgModule({
  imports: [ BrowserModule, FormsModule ],
  declarations: [ NotesContainerComponent, NoteInputComponent ],
  providers: [
    RendererMessagingService,
    { provide: IPC, useValue: ipcRenderer },
  ],
  bootstrap: [ NotesContainerComponent ],
})
class NotesWindowRendererModule {}

platformBrowserDynamic().bootstrapModule(NotesWindowRendererModule);
