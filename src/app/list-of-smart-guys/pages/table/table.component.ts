import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PersonDto } from '../../dtos/person-dto';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input()
  public people: PersonDto[] = [];

  @Output()
  public passPersonToEditEvent: EventEmitter<number> = new EventEmitter<number>(); // person.id

  public removePerson(personId: number): void {
    const personIndex: number = this.people.findIndex((person) => person.id === personId);

    if (personIndex !== -1) {
      this.people.splice(personIndex, 1);
    }
  }
}