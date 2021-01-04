import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName} from '@angular/forms';
import { NumberValidators } from '../validator/number.validator';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {EmployeeData} from '../model/employee';

import {EmployeeService} from '../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.css']
})

export class EmpDetailsComponent implements OnInit {
  errorMessage:string
  employeeForm:FormGroup;
  empData:EmployeeData;
 

  genders = ['M','F','other']
  submitted = false
  btnname='Submit';
  btnclass="btn btn-success btn-lg"

  constructor(private fb:FormBuilder,private _employeeService:EmployeeService, private route: ActivatedRoute,private router:Router ) { 

    this.route.paramMap.subscribe(
      params=>{
        const id = params.get('id');
        alert(id);
        
        if(id!=null){
          this.btnname="Update"
          this.btnclass="btn btn-info btn-lg"
          
          this.fetchingEmployee(id)
        }
      }
    )


  }

  ngOnInit():void {
    this.employeeForm = this.fb.group({
      name:['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)]],
      // id:['',],
      salary:['',NumberValidators.range(20000,1000000)],
      age:['',NumberValidators.range(23,56 )],
      gender:['',Validators.required]
     
    });


  }

  


  onSubmit() { 
    
      
    

      if(this.employeeForm.valid){
        if(this.employeeForm.dirty){
          this.submitted = true;
          const p = {...this.empData,...this.employeeForm.value};

          if(this.btnname==="Update"){
            console.log("welcome")
            this._employeeService.updateEmployee(p)
            .subscribe({
              // next:()=>this.afterSubmit(),
              error:err=>this.errorMessage = err
            })

          }
          else{
          this._employeeService.addEmployee(p)
          .subscribe({
            // next:()=>this.afterSubmit(),
            error:err=>this.errorMessage = err
          })
        }
         
        }
      }
      else{
        alert("you are trying to submit an invalid form")
      }
  }

  afterSubmit():void{
    this.employeeForm.reset();
    // alert("super")
    this.router.navigate(['/dashboard']);
    
  }

  fetchingEmployee(id: string): void {
    this._employeeService.getEmployee(id)
    .subscribe({
    next: (empData: EmployeeData) => this.bindToForm(empData),
    error: err => this.errorMessage = err
    });
    }

    bindToForm(empdata:EmployeeData):void{
      if(this.employeeForm){
        this.employeeForm.reset();
      }
      this.empData = empdata

      this.employeeForm.patchValue({
        name:this.empData.name,
        // id:this.empData.id,
        salary:this.empData.salary,
        age:this.empData.age,
        gender:this.empData.gender
      });
    }

}
