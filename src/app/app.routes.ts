import { Routes } from '@angular/router';
import { EmpTableComponent } from './employee/components/emp-table/emp-table.component';
import { EditEmpComponent } from './employee/components/edit-emp/edit-emp.component';
import { AddEmpComponent } from './employee/components/add-emp/add-emp.component';

export const routes: Routes = [
    { path:'',component: EmpTableComponent},
    { path:'app-edit-emp/:empID', component: EditEmpComponent}
   , { path:'app-add-emp', component: AddEmpComponent}

];
