
import { Component, ViewChild, OnInit } from '@angular/core';
import { Employee } from '../interface/employee'
import { CommonService } from '../service/common.service';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public forecasts!: any;
  emailFormControl = new FormControl('', [Validators.required, Validators.email, Validators.pattern(/[a-zA-Z0–9. _%+-]+@[a-zA-Z0–9. -]+\.[a-zA-Z]{2,}/)]);
  nameFormControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]);
  dateOfBirthFormControl = new FormControl(new Date().toLocaleDateString(), [Validators.required]);
  departmentFormControl = new FormControl('', [Validators.required]);
  displayedColumns: string[] = ['Name', 'Email', 'DateOfBirth', 'Department','Edit','Delete'];
  searchValue: string = '';
  selectedId: number = 0;
  maxDate: Date = new Date();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private commonService: CommonService) {
   
  }
  async ngOnInit() {
    await this.loadEmployeeData();
  }
  getErrorMessage(field: string) {
    if (field=='email' && this.emailFormControl.hasError('required')) {
      return 'Enter a email';
    } else if (field == 'name' && this.nameFormControl.hasError('required')) {
      return 'Enter a name';
    } else if (field == 'dob' && this.dateOfBirthFormControl.hasError('required')) {
      return 'select the Date of birth';
    } else if (field == 'department' && this.departmentFormControl.hasError('required')) {
      return 'select an department';
    } else if (field == 'email' &&   this.emailFormControl.hasError('pattern')) {
      return 'Not a valid email';
    } else if (field == 'name' && this.nameFormControl.hasError('pattern')) {
      return 'Not a valid name';
    } else if (field == 'dob' && this.dateOfBirthFormControl.hasError('pattern')) {
      return 'Not a valid date';
    } else {
      return '';
    }
  }
  loadEmployeeData() {
    this.commonService.getWaeatherForeCast().subscribe(result => {
      this.forecasts = new MatTableDataSource<Employee>(result);
      this.forecasts.paginator = this.paginator;
    }, error => {
      console.error(error)
    });
  }
  public searchClick(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.forecasts.filter = filterValue.trim().toLowerCase();
  }
  public saveData() {
    const employee: Employee = {
      Id: this.selectedId,
      Name: this.nameFormControl.value ? this.nameFormControl.value : '',
      Email: this.emailFormControl.value ? this.emailFormControl.value : '',
      Department: this.departmentFormControl.value ? this.departmentFormControl.value : '',
      DateOfBirth: this.dateOfBirthFormControl.value ? new Date(this.dateOfBirthFormControl.value) : new Date()
    };
    if (!this.nameFormControl.hasError('pattern') && !this.emailFormControl.hasError('pattern') && !this.nameFormControl.hasError('required') && !this.emailFormControl.hasError('required') && !this.dateOfBirthFormControl.hasError('required') && !this.departmentFormControl.hasError('required')) { 
      this.commonService.saveEmployee(employee).subscribe(data => {
        //this.nameFormControl.setValue('');
        this.nameFormControl.reset();
        this.emailFormControl.reset();
        this.departmentFormControl.reset();
        this.dateOfBirthFormControl.reset();
        this.selectedId = 0;
        this.loadEmployeeData();
      },
        error => {

        });
  }
  }
  public editEmployee(employee: Employee) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.selectedId = employee.Id;
    this.nameFormControl.setValue(employee.Name ? employee.Name : '');
    this.emailFormControl.setValue(employee.Email ? employee.Email : '');
    this.departmentFormControl.setValue(employee.Department ? employee.Department : '');
    this.dateOfBirthFormControl.setValue(employee.DateOfBirth ? employee.DateOfBirth.toLocaleString() : '');
  }
  public deleteEmployee(employee: Employee) {
    this.commonService.deleteEmployee(employee).subscribe(result => { 
      this.loadEmployeeData();
    })
  }
}


