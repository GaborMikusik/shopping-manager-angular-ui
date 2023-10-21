import { Injectable } from '@angular/core';
import { Subject, Observable, filter } from 'rxjs';
import { Alert } from './alert.model';
import { ErrorDetails } from './model/error-details';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<Alert>();
  private defaultId = 'default-alert';

  alert(alert: Alert) {
    alert.id = alert.id || this.defaultId;
    this.subject.next(alert);
  }

  onAlert(id = this.defaultId): Observable<Alert> {
    return this.subject.asObservable().pipe(filter(x => x && x.id === id));
  }

  error(error: ErrorDetails, options?: any) {

    this.alert(new Alert({ ...options, error }));
  }

  clear(id = this.defaultId) {
    this.subject.next(new Alert({ id }));
  }
}
