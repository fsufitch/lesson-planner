import 'reflect-metadata';
import 'zone.js';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NotesContainerComponent } from './notes-container';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ NotesContainerComponent ],
  bootstrap: [ NotesContainerComponent ],
})
class NotesWindowRendererModule {}

platformBrowserDynamic().bootstrapModule(NotesWindowRendererModule);
