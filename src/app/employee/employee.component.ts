import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from '@coreui/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IEmployeeModel } from '../models/user.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    ButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'firstName', 'status', 'action'];
  dataSource!: MatTableDataSource<IEmployeeModel>;
  searchText: string = '';
  employeeData: IEmployeeModel[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private toastService: ToastrService
  ) {
    this.initData();
  }

  initData() {
    let _employees = localStorage.getItem('employees') ?? '';
    this.employeeData = JSON.parse(_employees);

    this.dataSource = new MatTableDataSource(this.employeeData);

    this.activeRoute.queryParams.subscribe((res: any) => {
      if (res && res['searchText']) {
        this.searchText = res['searchText'];
        this.searchData(res['searchText']);
      } else {
        this.searchText = '';
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  searchData(text: string) {
    this.dataSource.filter = text.trim().toLowerCase();
    this.router.navigate(['/employee'], {
      queryParams: {
        searchText: text,
      },
    });

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goToPage(id: any) {
    this.router.navigateByUrl(`/employee/${id}`);
  }

  deleteData(id: string, name: string) {
    Swal.fire({
      title: `Do you want to delete ${name} ?`,
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: 'red',
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmDelete(id, name);
      }
    });
  }

  confirmDelete(id: string, name: string) {
    let findEmployee = this.employeeData.find((e) => e.id === id);
    if (findEmployee) {
      let remove = this.employeeData.filter((e) => e !== findEmployee);
      localStorage.setItem('employees', JSON.stringify(remove));

      this.toastService.error(
        `Successfully removed ${name} from the employee list`,
        'Danger !'
      );

      setTimeout(() => {
        this.initData();
      }, 1500);
    } else {
      this.toastService.error(`Oops...!!! Something wrong !`, 'Danger !');
    }
  }
}
