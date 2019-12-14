import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig, ActiveToast } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) {}

  /** show toast */
  show(message?: string, title?: string, override?: Partial<IndividualConfig>, type?: string): ActiveToast<any> {
    return this.toastr.show(message, title, override, type);
  }

  /** show successful toast */
  success(message?: string, title?: string, override?: Partial<IndividualConfig>): ActiveToast<any> {
    return this.toastr.success(message, title, override);
  }

  /** show error toast */
  error(message?: string, title?: string, override?: Partial<IndividualConfig>): ActiveToast<any> {
    return this.toastr.error(message, title, override);
  }

  /** show info toast */
  info(message?: string, title?: string, override?: Partial<IndividualConfig>): ActiveToast<any> {
    return this.toastr.info(message, title, override);
  }

  /** show warning toast */
  warning(message?: string, title?: string, override?: Partial<IndividualConfig>): ActiveToast<any> {
    return this.toastr.warning(message, title, override);
  }

  /**
   * Remove all or a single toast by id
   */
  clear(toastId?: number): void {
    this.toastr.clear(toastId);
  }

  /**
   * Remove and destroy a single toast by id
   */
  remove(toastId: number): boolean {
    return this.toastr.remove(toastId);
  }
}
