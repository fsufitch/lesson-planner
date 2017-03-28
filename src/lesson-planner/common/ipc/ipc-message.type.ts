export interface IpcMessage {
  type: string;
  payload?: any;
  serializePayload(): string;
  deserializePayload(data: string): void;
}

export function getMessageType(msg: string | IpcMessage) {
  if (typeof msg === 'string') {
    msg = JSON.parse(msg);
  }
  return (<IpcMessage>msg).type;
}
