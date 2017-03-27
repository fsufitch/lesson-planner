import * as path from 'path';

import { app, BrowserWindow } from 'electron';

import { singleton } from 'lesson-planner/common/singleton.util';

const WINDOW_OPTIONS: Electron.BrowserWindowOptions = {
  title: 'Sample Window Please Ignore',
  minWidth: 800,
  minHeight: 600,
};

export class NotesBrowserWindow extends BrowserWindow {
  static HtmlPath = path.join(app.getAppPath(), 'build', 'res', 'notes.window.html');

  constructor() {
    super(WINDOW_OPTIONS);
    this.loadURL(NotesBrowserWindow.HtmlPath);
  }

  static _instance: NotesBrowserWindow = null;
  static getInstance = singleton(NotesBrowserWindow);
}
