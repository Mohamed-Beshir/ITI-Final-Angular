import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { AddPropertyService } from '../services/add-property.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { BigFooterComponent } from '../big-footer/big-footer.component';
import { Property_RentsService } from '../services/property-rents.service';
import { PropertySalesService } from '../services/property-sales.service';


@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [FontAwesomeModule,ReactiveFormsModule,CommonModule, NavbarComponent, BigFooterComponent],
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css'
})
export class AddPropertyComponent{
  chech=faCheck;
  upload=faUpload;
  
  myForm : FormGroup; 
  constructor(private formBuilder : FormBuilder, private property : AddPropertyService, private router : Router, private property_rents : Property_RentsService, private property_sales : PropertySalesService){

    this.myForm = this.formBuilder.group({
      title: ["", [Validators.required]],
      price: ["", [Validators.required]],
      description: ["", [Validators.required]],
      city: ["", [Validators.required]],
      street: ["", [Validators.required]],
      property_number: ["", [Validators.required]],
      property_type: ["", [Validators.required]],
      status: ["", [Validators.required]],
      beds: ["", [Validators.required]],
      baths: ["", [Validators.required]],
      area: ["", [Validators.required]],
      garages: ["", [Validators.required]],
      image: ["", [Validators.required]],
    })
  }
  img_1:any;
  img_2:any;
  img_3:any;

  lastRow: any;
  onSubmit() {
    let file = this.myForm.get('image')?.value;
    let imgName = file.split("\\");
    let currentDate = new Date()

    let newProperty : any = {
      title : this.myForm.get('title')?.value,
      // price : this.myForm.get('price')?.value,
      description : this.myForm.get('description')?.value,
      street : this.myForm.get('street')?.value,
      type : this.myForm.get('property_type')?.value,
      city : this.myForm.get('city')?.value,
      district : this.myForm.get('property_number')?.value,
      area : this.myForm.get('area')?.value,
      status : this.myForm.get('status')?.value,
      baths : this.myForm.get('baths')?.value,
      beds : this.myForm.get('beds')?.value,
      // image : [this.img_1,this.img_2,this.img_3],
      // date: currentDate.getDate()+"."+currentDate.getMonth()+"."+currentDate.getFullYear()
    }
    if(this.myForm.valid){
      console.log(newProperty)
      this.property.savePropertyData(newProperty).subscribe((resp : any)=> {
        console.log(resp);
        console.log(resp.id);

        this.property.getAllProperty().subscribe((data : any) => {
          if(this.myForm.get('status')?.value == 'for_rent'){
            let property_rent = {
                "property_id": resp.id,
                "lister_id": 1,
                "period": "monthly",
                "price": this.myForm.get('price')?.value
            }
            this.property_rents.saveProperty_rentsData(property_rent).subscribe(res => console.log(res));
          }else {
            let property_sale = {
              "property_id": resp.id,
              "lister_id": 1,
              "price": this.myForm.get('price')?.value
            }
            this.property_sales.saveProperty_salesData(property_sale).subscribe(res => console.log(res));
          }
        });
      });

      // this.router.navigate(["my-properties"])
      
    }
  }

  //
  upload1 = 'upload'; // Assuming you have defined the 'upload' icon
  images: { url: string }[] = []; // Define the images property

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      // Clear existing images
      this.images = [];

      for (let i = 0; i < files.length; i++) {
        const img: File = files[i];
        i == 0 ? this.img_1 = img.name : "";
        i == 1 ? this.img_2 = img.name : "";
        i == 2 ? this.img_3 = img.name : "";
      }
      // Process the selected files
      for (let i = 0; i < files.length; i++) {
        const imgs: FileList = event.target.files;

        const file: File | null = files.item(i); // Allow file to be null
        if (file) {
          const reader = new FileReader();

          reader.onload = (e: any) => {
            // Push the image URL to the array
            this.images.push({ url: e.target.result });
          };

          // Read the file as a data URL
          reader.readAsDataURL(file);
        }
      }
    }
  }
//
deleteImage(index: number): void {
  this.images.splice(index, 1); // Remove the image at the specified index
}
  //
}

