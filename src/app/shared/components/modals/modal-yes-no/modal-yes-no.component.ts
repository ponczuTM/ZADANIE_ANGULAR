import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAnswerType } from '../../../enums/modal-answer-types';

@Component({
  selector: 'app-modal-yes-no',
  standalone: true,
  imports: [],
  templateUrl: './modal-yes-no.component.html',
  styleUrl: './modal-yes-no.component.scss'
})
export class ModalYesNoComponent {
  @Input() 
  public question: string = "";

  public constructor(public modal: NgbActiveModal) {}

  public confirm(): void {
    this.modal.close(ModalAnswerType.Yes);
  }

  public dismiss(): void {
    this.modal.close(ModalAnswerType.No);
  }
}