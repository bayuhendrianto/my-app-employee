import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DefaultLayoutComponent } from './default-layout';
import { LoginComponent } from './login/login.component';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { EmployeeListDummy } from './services/data';

@Component({
  selector: 'app-root',
  template: '<router-outlet />',
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent {
  title = 'my-app-employee';

  constructor(private iconSetService: IconSetService) {
    this.iconSetService.icons = { ...iconSubset };
    this.initialEmployeeList();
  }

  initialEmployeeList() {
    let _employees = Boolean(localStorage.getItem('employees')) ? true : false;
    if (!_employees) {
      localStorage.setItem('employees', JSON.stringify(EmployeeListDummy));
    }
  }
}
