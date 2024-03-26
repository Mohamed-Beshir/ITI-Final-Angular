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
import { HttpClientModule,HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [FontAwesomeModule,ReactiveFormsModule,CommonModule, NavbarComponent, BigFooterComponent,HttpClientModule],
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css'
})
export class AddPropertyComponent{
  chech=faCheck;
  upload=faUpload;
//image
errorMessage: string | null = null;
successMessage: string | null = null;
selectedImages: { file: File, url: string }[] = [];
//
  myForm : FormGroup;
  constructor(private formBuilder : FormBuilder, private property : AddPropertyService, private router : Router, private property_rents : Property_RentsService, private property_sales : PropertySalesService,private http: HttpClient){

    this.myForm = this.formBuilder.group({
      title: ["", [Validators.required]],
      price: ["", [Validators.required, Validators.pattern(/^\d*$/)]],
      description: ["", [Validators.required]],
      city: ["", [Validators.required]],
      street: ["", [Validators.required]],
      district: ["", [Validators.required]],
      property_type: ["House", [Validators.required]],
      status: ["for_sale", [Validators.required]],
      beds: ["", [Validators.required, Validators.pattern(/^\d*$/)]],
      baths: ["", [Validators.required, Validators.pattern(/^\d*$/)]],
      area: ["", [Validators.required, Validators.pattern(/^\d*$/)]],
      image: ["", [Validators.required]],
      period: ['monthly', [Validators.required]],
    })
  }
  userData : any = [];
  ngOnInit(){
    const userDataString = localStorage.getItem('user_data');
    // Check if user data exists in localStorage
    if (userDataString) {
      // Convert the JSON string to an object
      this.userData= JSON.parse(userDataString);
    }else{
      this.router.navigate(['/signin']);
    }
    if(this.userData.role == 'user'){
      this.router.navigate(['']);
    }
  }

  img_1:any;
  img_2:any;
  img_3:any;
  // add async
  lastRow: any;
  async onSubmit() {
    let file = this.myForm.get('image')?.value;
    let imgName = file.split("\\");
    let currentDate = new Date()

    let newProperty : any = {
      title : this.myForm.get('title')?.value,
      description : this.myForm.get('description')?.value,
      street : this.myForm.get('street')?.value,
      type : this.myForm.get('property_type')?.value,
      city : this.myForm.get('city')?.value,
      district : this.myForm.get('district')?.value,
      area : this.myForm.get('area')?.value,
      status : this.myForm.get('status')?.value,
      baths : this.myForm.get('baths')?.value,
      beds : this.myForm.get('beds')?.value,
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
                "lister_id": this.userData.id,
                "period": this.myForm.get('period')?.value,
                "price": this.myForm.get('price')?.value
            }
            this.property_rents.saveProperty_rentsData(property_rent).subscribe(res => {
              console.log(res)
            });
          }else {
            let property_sale = {
              "property_id": resp.id,
              "lister_id": this.userData.id,
              "price": this.myForm.get('price')?.value
            }
            this.property_sales.saveProperty_salesData(property_sale).subscribe(res => {
              console.log(res)
            });
          }
          const formData = new FormData();
          for (let i = 0; i < this.selectedImages.length; i++) {
            formData.append('images[]', this.selectedImages[i].file);
          }
          this.http.post(`http://localhost:8000/api/images?property_id=${resp.id.toString()}`, formData).subscribe(res => {
            console.log(res)
            this.router.navigate(["my-properties"])
          });
        });
      });

    }

    //
  }

  //
  upload1 = 'upload'; // Assuming you have defined the 'upload' icon
  images: { url: string }[] = []; // Define the images property


  onFileChange(event: any) {
    const files: FileList = event.target.files;
    const remainingSlots = 4 - this.selectedImages.length;

    if (files.length > remainingSlots) {
      alert("You can only select up to 4 images.");
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImages.push({ file, url: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  }

onDelete(index: number) {
  this.selectedImages.splice(index, 1);
}
}
