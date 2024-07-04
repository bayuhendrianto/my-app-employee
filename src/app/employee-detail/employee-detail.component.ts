import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import {
  MatDatepickerIntl,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import 'moment/locale/id';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeeModel, IEmployeeModel } from '../models/user.model';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { Location } from '@angular/common';
import { ButtonDirective } from '@coreui/angular';
import moment from 'moment';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatAutocompleteModule,
    AsyncPipe,
    ButtonDirective,
    MatSelectModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss',
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'id' },
    provideMomentDateAdapter(),
  ],
})
export class EmployeeDetailComponent implements OnInit {
  searchText: string = '';
  pageType: string = 'new';
  employeeForm!: FormGroup;
  detail: EmployeeModel = new EmployeeModel();
  employeeData: IEmployeeModel[] = [];
  groupList: string[] = [
    'IT Development',
    'IT Infrastructure',
    'IT Suuport',
    'Marketing',
    'Finance',
    'Human Resource',
    'Customer Service',
    'Accounting',
    'Engineering',
    'Sales',
  ];
  statusList = [
    { value: 'Magang', viewValue: 'Magang' },
    { value: 'Kontrak', viewValue: 'Kontrak' },
    { value: 'Tetap', viewValue: 'Tetap' },
  ];
  filteredOptions!: Observable<string[]>;

  private readonly _adapter = inject<DateAdapter<unknown, unknown>>(DateAdapter);
  private readonly _intl = inject(MatDatepickerIntl);
  private readonly _locale = signal(inject<unknown>(MAT_DATE_LOCALE));

  readonly dateFormatString = computed(() => {
    if (this._locale() === 'id') {
      return 'DD/MM/YYYY';
    }
    return '';
  });
  readonly maxDate = new Date();

  constructor(
    private router: Router,
    private activeRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private toastService: ToastrService
  ) {
    let _employees = localStorage.getItem('employees') ?? '';
    this.employeeData = JSON.parse(_employees);

    this.activeRouter.params.subscribe((response) => {
      if (response && response['id'] === 'new') {
        this.detail = new EmployeeModel();
        this.pageType = 'new';
      } else {
        let findEmployee = this.employeeData.find(
          (e) => e.id === response['id']
        );
        if (findEmployee) {
          this.detail = new EmployeeModel(findEmployee);
          this.pageType = 'edit';
        } else {
          this.toastService.warning('Data not found !', 'Waring !');
          this.goBack()
        }
      }
    });

    this.employeeForm = this.createDetailForm();
  }

  ngOnInit() {
    this.filteredOptions = this.employeeForm.controls['group'].valueChanges.pipe(
                              startWith(''),
                              map((value) => this._filter(value || ''))
                          );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.groupList.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  // Define default form
  createDetailForm(): FormGroup {
    return this.formBuilder.group({
      id                    : [this.detail.id],
      userName              : [this.detail.userName, Validators.required],
      firstName             : [this.detail.firstName, Validators.required],
      lastName              : [this.detail.lastName, Validators.required],
      email                 : [this.detail.email, Validators.compose([
                                  Validators.required,
                                  Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
                                ]),
                              ],
      birthDate             : [new Date(this.detail.birthDate), Validators.required],
      basicSalary           : [this.detail.basicSalary, Validators.required],
      status                : [this.detail.status, Validators.required],
      group                 : [this.detail.group, Validators.required],
      description           : [this.detail.description, Validators.required],
    });
  }

  addData() {
    let data = this.employeeForm.getRawValue();
    data = {
      ...data,
      birthDate: moment(new Date(data.birthDate)).format('YYYY/MM/DD'),
      id: `E${new Date().getTime().toString().slice(0, 5)}`,
    };

    let newEmployeeData = [...this.employeeData];
    newEmployeeData.push(data);

    localStorage.setItem('employees', JSON.stringify(newEmployeeData));
    this.toastService.success('Successfully add employee data');
    this.location.back();
  }

  saveData() {
    let data = this.employeeForm.getRawValue();
    data = {
      ...data,
      birthDate: moment(new Date(data.birthDate)).format('YYYY/MM/DD'),
    };

    let newEmployeeData = [...this.employeeData];
    let updateData = newEmployeeData.map((e) => {
      if (e.id === data.id) {
        return { ...data };
      } else {
        return e;
      }
    });

    localStorage.setItem('employees', JSON.stringify(updateData));

    this.toastService.warning('Successfully updated employee data');
    this.location.back();
  }

  goBack() {
    this.location.back();
  }
}
