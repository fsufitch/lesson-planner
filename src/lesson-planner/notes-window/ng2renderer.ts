import 'reflect-metadata';
import 'zone.js';
import 'material-design-lite';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NotesContainerComponent } from './notes-container';
import { NoteInputComponent } from './note-input';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ NotesContainerComponent, NoteInputComponent ],
  bootstrap: [ NotesContainerComponent ],
})
class NotesWindowRendererModule {}

platformBrowserDynamic().bootstrapModule(NotesWindowRendererModule);
