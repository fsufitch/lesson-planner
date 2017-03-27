export class LessonPlannerApp {
  private constructor() {}

  start() {
    console.log('hello, world!');
  }

  static _instance: LessonPlannerApp = null;
  static getInstance() {
    return (!!LessonPlannerApp._instance) ?
      (LessonPlannerApp._instance) :
      (LessonPlannerApp._instance = new LessonPlannerApp());
  }
}
