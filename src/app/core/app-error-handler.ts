import { ErrorHandler, Inject, Injector } from '@angular/core';
import { NotificationService } from './notification.service';


export class AppErrorHandler implements ErrorHandler {
  constructor(@Inject(Injector) private injector: Injector) {}

  private get notificationService(): NotificationService {
    return this.injector.get(NotificationService);
  }

  public handleError(error: any): void {
    this.notificationService.error('An unexpected internal error has occurred.', 'Error', {
      closeButton: true,
      timeOut: 5000
    });
    console.error('App Error', error);
  }
}
