import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidationService } from '../services/custom-validation.service';
import * as _ from "lodash";
import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  hobbiesList: any = ['Cricket','Pool','Tennis','Golf','Footall','Chess'];
  stateList: any = ['Gujarat','Maharastra','Tamilnadu','Rajsthan','Goa','Meghalay','Madhay Pradesh','Delhi','Punjab','Arunachal Pradesh'];
  // hobbiesList: any = [
  //   {'name':'Cricket', 'value':'cricket'},
  //   {'name':'Pool', 'value':'pool'},
  //   {'name':'Tennis', 'value':'tennis'},
  //   {'name':'Golf', 'value':'golf'},
  //   {'name':'Footall', 'value':'football'},
  //   {'name':'Chess', 'value':'chess'},
  // ]
  // stateList: any = [
  //   {'name':'Gujarat', 'value':'gj'},
  //   {'name':'Maharastra', 'value':'mh'},
  //   {'name':'Tamilnadu', 'value':'tn'},
  //   {'name':'Rajsthan', 'value':'rj'},
  //   {'name':'Goa', 'value':'go'},
  //   {'name':'Meghalay', 'value':'mg'},
  //   {'name':'Madhay Pradesh', 'value':'mp'},
  //   {'name':'Delhi', 'value':'dl'},
  //   {'name':'Punjab', 'value':'pj'},
  //   {'name':'Arunachal Pradesh', 'value':'ap'},
  // ]

  personForm: FormGroup;
  selectedHobbiesNames: [string];
  myhobbies: any;
  selectedHobbies: FormArray<any>;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private storage:Storage,
    private userAuth:UserAuthService,
    private customValidator: CustomValidationService
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]], // this will be unique
      password: ['', Validators.compose([Validators.required, this.customValidator.validatePattern()])],
      address: [''],
      state: [''],
      gender: ['female'],
      hobbies: new FormArray([]),
    }
    );

    // fetch latest user data
    this.userAuth.fetchUsers();
  }


  onCheckChange(event) {
    const formArray: FormArray = this.registerForm.get('hobbies') as FormArray;
  
    /* Selected */
    if(event.target.checked){
      formArray.push(new FormControl(event.target.value));
    }
    /* unselected */
    else{
      // find the unselected element
      let i: number = 0;
  
      formArray.controls.forEach((ctrl: FormControl) => {
        if(ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
    // console.log('form array:', formArray);
  }


  onCheckboxChange(event: any) {
    
    this.selectedHobbies = (this.registerForm.controls['hobbies'] as FormArray);
    if (event.target.checked) {
      this.selectedHobbies.push(new FormControl(event.target.value));
    } else {
      const index = this.selectedHobbies.controls
      .findIndex(x => x.value === event.target.value);
      this.selectedHobbies.removeAt(index);
    }
  }

  // createHobbies(hobbiesInputs) {
  //   const arr = hobbiesInputs.map(hobby => {
  //     return new FormControl(hobby.selected || false);
  //   });
  //   return new FormArray(arr);
  // }

  // getSelectedHobbies() {
  //   this.selectedHobbiesNames = _.map(
  //     this.registerForm.controls.hobbies["controls"],
  //     (hobby, i) => {
  //       return hobby.value && this.hobbiesList[i].value;
  //     }
  //   );
  //   this.getSelectedHobbiesName();
  // }

  // getSelectedHobbiesName() {
  //   this.selectedHobbiesNames = _.filter(
  //     this.selectedHobbiesNames,
  //     function(hobby) {
  //       if (hobby !== false) {
  //         return hobby;
  //       }
  //     }
  //   );
  // }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  onSubmit() {
    console.log('ajay test:', this.registerForm.value);
    let alreadyExist: any = [];
    alreadyExist = this.userAuth.usersData.filter((u)=> u.email == this.registerForm.value.email);
    if(alreadyExist.length > 0) {
      this.userAuth.presentAlert('Duplicate Email!!','User with same Email already registered!!');
      return;
    }
    this.submitted = true;
    if (this.registerForm.valid) {
      this.userAuth.presentAlert('Sucess!!','User Registered Successfully!!');
      // console.table('this.userAuth.usersData: ',this.userAuth.usersData);
      this.userAuth.usersData.push(this.registerForm.value);
      this.storage.set('userList',this.userAuth.usersData);
      this.userAuth.fetchUsers();

      console.log('data saved in table:', this.userAuth.usersData);
      
      this.router.navigateByUrl("/login");
    }
  }

}
