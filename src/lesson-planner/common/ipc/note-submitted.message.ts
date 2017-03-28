import * as _ from 'lodash';
import { IpcMessage } from './ipc-message.type';

export class NoteSubmittedMessage implements IpcMessage {
  static type = 'lesson-planner/ipc/note-submitted';
  type = NoteSubmittedMessage.type;
  constructor(public payload: {noteBody: string}) {}

  serializePayload = () => JSON.stringify(this.payload);
  deserializePayload(data: string) {
    this.payload = {noteBody: _.get<string>(JSON.parse(data), ['noteBody'])};
    return this;
  }
}
