import { Database, QueryResults } from 'sql.js';
import { Observable } from 'rxjs/Observable';

import { singleton, observeAsyncOnce } from 'lesson-planner/common/utils';
import { Note } from 'lesson-planner/common/note.type';

const DB_SETUP_SQL = require('./db-setup.sql');

export class DatabaseService {
  private db: Database;
  constructor() {
    try {
      this.db = new Database();
      this.db.run(DB_SETUP_SQL);
    } catch (err) {
      console.error('Fatal error instantiating db', err);
    }
  }

  getAllNotes() {
    return observeAsyncOnce<QueryResults>(cb => {
      try {
        cb(null, this.db.exec('SELECT id, body, timestamp FROM notes')[0]);
      } catch (err) {
        cb(err, null);
      }
    })
    .catch(err => {
      console.error(err);
      return Observable.of(<QueryResults>{columns: [], values: []});
    })
    .map(qr => qr.values)
    .map(rows => rows.map(([id, body, timestamp]) => (<Note>{
      id: <number>id,
      body: <string>body,
      timestamp: <number>timestamp,
    })));
  }

  addNoteNow(body: string) {
    let timestamp = new Date().getTime();
    let stmt = this.db.prepare('INSERT INTO notes VALUES (:id, :timestamp, :body)');
    stmt.bind({id: null, timestamp, body});
    stmt.run();
  }

  static _instance: DatabaseService = null;
  static getInstance = singleton(DatabaseService);
}
