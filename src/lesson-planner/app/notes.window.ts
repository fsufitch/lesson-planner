import * as path from 'path';

import { app, ipcMain, BrowserWindow } from 'electron';

import { singleton, observeAsync } from 'lesson-planner/common/utils';
import { NoteSubmittedMessage, AllNotesMessage } from 'lesson-planner/common/ipc';
import { DatabaseService } from 'lesson-planner/app/db';

const WINDOW_OPTIONS: Electron.BrowserWindowOptions = {
  title: 'Sample Window Please Ignore',
  minWidth: 800,
  minHeight: 600,
};

export class NotesBrowserWindow extends BrowserWindow {
  static HtmlPath = path.join(app.getAppPath(), 'build', 'res', 'notes.window.html');
  static _instance: NotesBrowserWindow = null;
  static getInstance = singleton(NotesBrowserWindow);

  private noteSubmittedMessageSubscription = observeAsync<string>(
    cb => this.ipc.on(NoteSubmittedMessage.type, (ev, data: string) => cb(null, data))
  )
  .do(x => console.log('got data', x))
  .map(data => new NoteSubmittedMessage(null).deserializePayload(data))
  .subscribe(msg => {
    this.dbService.addNoteNow(msg.payload.noteBody);
    this.sendNotes();
  });

  constructor(
    private dbService = DatabaseService.getInstance(),
    private ipc = ipcMain
  ) {
    super(WINDOW_OPTIONS);
    this.loadURL(NotesBrowserWindow.HtmlPath);
    this.sendNotes();
  }

  destroy() {
    this.noteSubmittedMessageSubscription.unsubscribe();
  }

  private sendNotes() {
    this.dbService.getAllNotes().take(1).subscribe(notes => {
      let message = new AllNotesMessage({notes});
      this.webContents.send(message.type, message.serializePayload());
    });
  }
}
