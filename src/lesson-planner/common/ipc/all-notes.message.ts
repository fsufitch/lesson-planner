import * as _ from 'lodash';
import { IpcMessage } from './ipc-message.type';
import { Note } from 'lesson-planner/common/note.type';

export class AllNotesMessage implements IpcMessage {
  static type = 'lesson-planner/ipc/all-notes';
  type = AllNotesMessage.type;
  constructor(public payload: {notes: Note[]}) {}

  serializePayload = () => JSON.stringify(this.payload);
  deserializePayload(data: string) {
    this.payload = {notes: _.get<Note[]>(JSON.parse(data), ['notes'])};
    return this;
  }
}
