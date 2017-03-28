import { Observable, Subject } from 'rxjs/Rx';

export function observeAsyncOnce<T>(callback: (resultCallback: (error: Error, result: T) => void) => void) {
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

export function observeAsync<T>(callback: (resultCallback: (error: Error, result: T) => void) => void) {
  let subj = new Subject<T>();
  try {
    callback((error, result) => {
      console.log('cb', error, result);
      if (!error) {
        subj.next(result);
      } else {
        subj.error(error);
      }
    });
  } catch (error) {
    subj.error(error);
  }
  return subj.asObservable();
}
