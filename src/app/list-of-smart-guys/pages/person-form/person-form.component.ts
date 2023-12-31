import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonDto } from '../../dtos/person-dto';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { BrainiacsService } from '../../../shared/services/brainiacs.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrl: './person-form.component.scss'
})
export class PersonFormComponent extends BaseComponent implements OnInit {
  @Input()
  public person: PersonDto | null = null;

  public firstName: string = '';
  public lastName: string = '';
  public email: string = '';

  public form: FormGroup;
  public firstNameControl: FormControl;
  public lastNameControl: FormControl;
  public emailControl: FormControl;

  public constructor(private _formBuilder: FormBuilder,
    private _brainiacsService: BrainiacsService,
    private _modalService: NgbModal,
    public modal: NgbActiveModal) {

    super(_modalService);

    this.firstNameControl = new FormControl(this.firstName, [Validators.required]);
    this.lastNameControl = new FormControl(this.lastName, [Validators.required]);
    this.emailControl = new FormControl(this.email, [Validators.required]);

    this.form = this._formBuilder.group({
      firstName: this.firstNameControl,
      lastName: this.lastNameControl,
      email: this.emailControl,
    });
  }

  public ngOnInit(): void {
    if (this.person !== null && this.person !== undefined) {
      const personData = {
        'firstName': this.person.first_name,
        'lastName': this.person.last_name,
        'email': this.person.email
      }

      this.form.patchValue(personData);
    }
  }

  public save(): void {
    const formData: PersonDto = this.form.getRawValue();

    if (this.person === null) { // create
      this._brainiacsService.createBrainiac(formData)
      .subscribe(
        (response: PersonDto) => {
          this.modal.close(response);
        },
        (error: string) => {
          this.showMessage(error);
        });
    }
    else { // edit
      this._brainiacsService.updateBrainiac(formData, this.person.id)
      .subscribe(
        (response: PersonDto) => {
          this.modal.close(response);
        },
        (error: string) => {
          this.showMessage(error);
        });
    }
  }
}