import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [FontAwesomeModule,ReactiveFormsModule,CommonModule],
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css'
})
export class AddPropertyComponent{
  myForm : FormGroup;
  chech=faCheck;
  upload=faUpload;

  constructor(private formBuilder : FormBuilder){
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
      features: ["", [Validators.required]],
    })
  }
  onSubmit() {
    let title = this.myForm.get('title')?.value;
    let price = this.myForm.get('price')?.value;
    let description = this.myForm.get('description')?.value;
    let location = this.myForm.get('location')?.value;
    let property_type = this.myForm.get('property_type')?.value;
    let status = this.myForm.get('status')?.value;
    let beds = this.myForm.get('beds')?.value;
    let baths = this.myForm.get('baths')?.value;
    let area = this.myForm.get('area')?.value;
    let garages = this.myForm.get('garages')?.value;
    let file = this.myForm.get('image')?.value;
    let image = file.split("\\")
    console.log(title)
    console.log(price)
    console.log(description)
    console.log(location)
    console.log(property_type)
    console.log(status)
    console.log(beds)
    console.log(baths)
    console.log(area)
    console.log(garages)
    console.log(image[image.length - 1])
    console.log(this.myForm)
  }

  //
  upload1 = 'upload'; // Assuming you have defined the 'upload' icon
  images: { url: string }[] = []; // Define the images property

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      // Clear existing images
      this.images = [];

      // Process the selected files
      for (let i = 0; i < files.length; i++) {
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

