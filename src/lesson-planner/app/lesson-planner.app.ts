import { singleton } from 'lesson-planner/common/utils';

import { NotesBrowserWindow } from './notes.window';

export class LessonPlannerApp {
  notesWindow: NotesBrowserWindow;

  start() {
    this.notesWindow = NotesBrowserWindow.getInstance();
  }

  static _instance: LessonPlannerApp = null;
  static getInstance = singleton(LessonPlannerApp);
}
