import * as path from 'path';

import { app, BrowserWindow } from 'electron';

import { singleton } from 'lesson-planner/common/utils';
import { DatabaseService } from 'lesson-planner/app/db';

const WINDOW_OPTIONS: Electron.BrowserWindowOptions = {
  title: 'Sample Window Please Ignore',
  minWidth: 800,
  minHeight: 600,
};

export class NotesBrowserWindow extends BrowserWindow {
  static HtmlPath = path.join(app.getAppPath(), 'build', 'res', 'notes.window.html');

  constructor(private dbService = DatabaseService.getInstance()) {
    super(WINDOW_OPTIONS);
    this.loadURL(NotesBrowserWindow.HtmlPath);
    this.dbService.getAllNotes().take(1).subscribe(notes => {
      console.log('notes!');
      console.log(notes);
    });
  }

  static _instance: NotesBrowserWindow = null;
  static getInstance = singleton(NotesBrowserWindow);
}
