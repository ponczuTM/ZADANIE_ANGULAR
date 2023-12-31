import { Component, OnInit } from '@angular/core';
import { faPlus, faUserGroup, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonDto } from '../dtos/person-dto';
import { BaseComponent } from '../../shared/components/base/base.component';
import { BrainiacsService } from '../../shared/services/brainiacs.service';
import { PersonFormComponent } from './person-form/person-form.component';

@Component({
  selector: 'app-list-of-smart-guys',
  templateUrl: './list-of-smart-guys.component.html',
  styleUrl: './list-of-smart-guys.component.scss'
})
export class ListOfSmartGuysComponent extends BaseComponent implements OnInit {
  public peopleIcon: IconDefinition = faUserGroup;
  public plusIcon: IconDefinition = faPlus;

  public people: PersonDto[] = [];

  public constructor(private _brainiacsService: BrainiacsService,
    private _modalService: NgbModal) {
    super(_modalService);
  }

  public ngOnInit(): void {
    this._brainiacsService
    .getBrainiacs()
    .subscribe(
      (response) => {
      this.people = response;
    },
    (error: string) => {
      this.showMessage(error);
    });
  }

  public editPerson(personId: number): void {
    const person: PersonDto | undefined = this.people.find((pers) => pers.id === personId);

    if (person !== undefined) {
      this.showBrainiacForm(person);
    }
  }

  public showBrainiacForm(person: PersonDto | null = null): void {
    const modalRef = this.modalService.open(PersonFormComponent, {
      backdrop: 'static'
    });

    if (person !== null) {
      modalRef.componentInstance.person = person;
    }
    
    modalRef.result.then(
    (result: PersonDto) => {
      this.refreshList(result, person?.id);
    },
    (reject) => {});
  }

  private refreshList(newPerson: PersonDto | null, personId: number | undefined): void {
    if (newPerson !== null) {

      if (newPerson.id !== undefined) {
        const personInArray: PersonDto | undefined = this.people.find((p) => p.id === newPerson?.id);

        if (personInArray === undefined) {
          this.people.push(newPerson);
        }
      }
      else {
        if (personId !== undefined) {
          const personToUpdateIndex: number = this.people.findIndex((p) => p.id === personId);

          if (personToUpdateIndex !== -1) {
            this.people[personToUpdateIndex].first_name = newPerson.first_name;
            this.people[personToUpdateIndex].last_name = newPerson.last_name;
            this.people[personToUpdateIndex].email = newPerson.email;
          }
        }
      }
    }
  }
}