import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOkComponent } from '../modals/modal-ok/modal-ok.component';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss'
})
export class BaseComponent {
  public constructor(public modalService: NgbModal) {}

  public showMessage(message: string): void {
    const modalRef = this.modalService.open(ModalOkComponent);
      modalRef.componentInstance.message = message;
      
      modalRef.result.then((result: any) => {});
  }
}