import { singleton } from 'lesson-planner/common/singleton.util';

export class DbService {

  static _instance: DbService = null;
  static getInstance = singleton(DbService);
}
