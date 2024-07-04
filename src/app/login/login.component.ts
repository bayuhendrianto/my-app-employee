import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardGroupComponent,
  TextColorDirective,
  CardComponent,
  CardBodyComponent,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonDirective,
} from '@coreui/angular';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UtilService } from '../services/util.service';
import { ToastrService } from 'ngx-toastr';
import { MatInputModule } from '@angular/material/input';
import { UserListDummy } from '../services/data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ButtonDirective,
    NgStyle,
    ReactiveFormsModule,
    MatIconModule,
    MatSnackBarModule,
    MatInputModule,
  ],
})
export class LoginComponent {
  public account = {
    email: 'admin@example.com',
    password: 'pass@12345',
  };

  loginForm!: FormGroup;

  _userListDummy = UserListDummy;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private utilService: UtilService,
    private toastService: ToastrService
  ) {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }

  login() {
    let { email, password } = this.loginForm.getRawValue();
    let findUser = this._userListDummy.find(
      (e) => e.email === email && e.password === password
    );
    if (findUser) {
      localStorage.setItem('isAuth', 'true');
      localStorage.setItem('user', JSON.stringify(findUser));
      this.router.navigateByUrl('/');
      this.toastService.success(
        `Your loggedin with ${this.loginForm.get('email')?.value}`,
        'Wellcome !'
      );
    } else {
      this.toastService.error(`Invalid your email or password !`, 'Warning !');
    }
  }
}
