import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faEdit, faRemove, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonDto } from '../../../dtos/person-dto';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { ModalYesNoComponent } from '../../../../shared/components/modals/modal-yes-no/modal-yes-no.component';
import { ModalAnswerType } from '../../../../shared/enums/modal-answer-types';
import { BrainiacsService } from '../../../../shared/services/brainiacs.service';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrl: './table-row.component.scss'
})
export class TableRowComponent extends BaseComponent {
  @Input()
  public person: PersonDto | undefined = undefined;

  @Input()
  public backgroundColorWhite: boolean = false;

  @Output()
  public rowRemovedEvent: EventEmitter<number> = new EventEmitter<number>(); // person.id

  @Output()
  public rowEditEvent: EventEmitter<number> = new EventEmitter<number>(); // person.id

  public editIcon: IconDefinition = faEdit;
  public deleteIcon: IconDefinition = faRemove;

  public constructor(private _brainiacsService: BrainiacsService,
    private _modalService: NgbModal) {
    super(_modalService);
  }

  public askForDeletion(): void {
    this.getModalAnswer()
    .then((answer: ModalAnswerType) => {
      if (answer === ModalAnswerType.Yes) {
        this.delete();
      }
    });
  }

  private delete(): void {
    this._brainiacsService.deleteBrainiac(this.person?.id ?? 0)
    .subscribe(
      (response: any) => {
        this.rowRemovedEvent.emit(this.person?.id);
    },
    (error: string) => {
      this.showMessage(error);
    });
  }

  private getModalAnswer(): Promise<ModalAnswerType> {
    return new Promise<ModalAnswerType>((resolve, reject) => {
      const modalRef = this.modalService.open(ModalYesNoComponent);
      modalRef.componentInstance.question = `Do you want to delete ${this.person?.first_name} ${this.person?.last_name}?`;
      
      modalRef.result.then(
        ((result: ModalAnswerType) => {
          resolve(result);
        }),
        (reject) => {});
    });
  }
}

