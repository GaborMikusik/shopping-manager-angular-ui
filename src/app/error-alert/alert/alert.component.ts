import { Component, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { Alert } from '../alert.model';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() id = 'default-alert';
  @Input() fade = true;

  alert: Alert | null = null;
  alertSubscription: Subscription = new Subscription;
  routeSubscription: Subscription = new Subscription;

  constructor(private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    this.alertSubscription = this.alertService.onAlert(this.id)
      .subscribe(alert => {
        this.alert = null;

        if (alert.error) {
          this.alert = alert;

          if (alert.autoClose) {
            setTimeout(() => this.removeAlert(), 3000);
          }
        }
      });

    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.removeAlert();
      }
    });
  }

  ngOnDestroy() {
    this.alertSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  removeAlert() {
    this.alert = null;
  }

  cssClass(alert: Alert) {
    if (!alert) return;

    const classes = ['alert', 'alert-dismissable'];

    if (alert.fade) {
      classes.push('fade');
    }

    return classes.join(' ');
  }
}
