import { Inject, Injectable } from '@angular/core';

import { IPC } from './ipcProvider';
import { observeAsync } from 'lesson-planner/common/utils';
import { NoteSubmittedMessage, AllNotesMessage } from 'lesson-planner/common/ipc';

@Injectable()
export class RendererMessagingService {
  constructor(@Inject(IPC) private ipc: Electron.IpcRenderer) {}

  sendNewNote(noteBody: string) {
    let message = new NoteSubmittedMessage({noteBody});
    this.ipc.send(message.type, message.serializePayload());
  }

  private allNotesMessages$ = observeAsync<string>(
    cb => this.ipc.on(AllNotesMessage.type, (ev, data: string) => cb(null, data))
  )
  .map(data => new AllNotesMessage(null).deserializePayload(data));

  getAllNotesMessages() {
    return this.allNotesMessages$;
  }
}
