import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export function observeAsync<T>(callback: (resultCallback: (error: Error, result: T) => void) => void) {
  return Observable.fromPromise(new Promise<T>((resolve, reject) => {
    let subj = new Subject<T>();
    subj.map(result => ({result, error: <any>null}))
      .catch(error => Observable.of({result: null, error}))
      .take(1)
      .subscribe(({result, error}) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    callback((error, result) => {
      if (!error) {
        subj.next(result);
      } else {
        subj.error(error);
      }
    });
  }));
}
