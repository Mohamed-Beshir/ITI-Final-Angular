import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { AddPropertyService } from '../services/add-property.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [FontAwesomeModule,ReactiveFormsModule],
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css'
})
export class AddPropertyComponent{
  chech=faCheck;
  upload=faUpload;
  
  myForm : FormGroup; 
  constructor(private formBuilder : FormBuilder, private property : AddPropertyService, private router : Router){
    this.myForm = this.formBuilder.group({
      title: ["", [Validators.required]],
      price: ["", [Validators.required]],
      description: ["", [Validators.required]],
      location: ["", [Validators.required]],
      property_type: ["", [Validators.required]],
      status: ["", [Validators.required]],
      beds: ["", [Validators.required]],
      baths: ["", [Validators.required]],
      area: ["", [Validators.required]],
      garages: ["", [Validators.required]],
      image: ["", [Validators.required]],
    })
  }
  onSubmit() {
    let file = this.myForm.get('image')?.value;
    let imgName = file.split("\\");
    let currentDate = new Date()
    let newProperty : any = {
      title : this.myForm.get('title')?.value,
      price : this.myForm.get('price')?.value,
      description : this.myForm.get('description')?.value,
      street : this.myForm.get('location')?.value,
      property_type : this.myForm.get('property_type')?.value,
      city : this.myForm.get('status')?.value,
      property_number : this.myForm.get('beds')?.value,
      area : this.myForm.get('area')?.value,
      image : imgName[imgName.length - 1],
      date: currentDate.getDate()+"."+currentDate.getMonth()+"."+currentDate.getFullYear()
    }

    if(!this.myForm.valid){
      this.property.savePropertyData(newProperty).subscribe((res)=> res);
      this.router.navigate(["my-properties"])
    }
  }
}

