import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-ok',
  standalone: true,
  imports: [],
  templateUrl: './modal-ok.component.html',
  styleUrl: './modal-ok.component.scss'
})

export class ModalOkComponent {
  @Input() 
  public message: string = "";

  public constructor(public modal: NgbActiveModal) {}
}