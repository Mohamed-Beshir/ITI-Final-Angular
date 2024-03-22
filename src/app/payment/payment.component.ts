import { Component, OnInit } from '@angular/core';
import { BigFooterComponent } from '../big-footer/big-footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../services/payment.service';

import { NgxPayPalModule } from 'ngx-paypal';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';


@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [BigFooterComponent, NavbarComponent, NgxPayPalModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {


  offer: any;

  public payPalConfig?: IPayPalConfig;


  constructor(private route: ActivatedRoute, private payment: PaymentService) { }

  ngOnInit(): void {
    // Retrieve the offer data from the route's query parameters
    this.route.queryParams.subscribe(params => {
      this.offer = JSON.parse(params['offer']);
      console.log(this.offer); // Display the offer data
    });

    this.initConfig();
  }


  private initConfig(): void {
    this.payPalConfig = {
    currency: 'USD',
    clientId: 'AXbSN5iQG3A_H9VUbqg3QDW3HASmV6H0-Mj8JD-LL4hGGXEoOEnknp401J4GEXk1MIHaBz_sZfynD4ZB',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: this.offer.offer_price.toString(),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.offer.offer_price.toString()
              }
            }
          },
          items: [
            {
              name: this.offer.property_title,
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'USD',
                value: this.offer.offer_price.toString(),
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details:any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
        let status = 'completed';
        if (details.status === 'APPROVED') {
          status = 'completed';
        }
        if(this.offer.offer_for == "Sale"){
          const paymentDetails = {
            transaction_id: details.id,
            status: status,
            sales_offer_id: this.offer.offer_id // or any other property you want to include
          };
          this.payment.saveSalePaymentDetails(paymentDetails).subscribe(
            (response) => {
              console.log('Sale payment details saved successfully:', response);
            },
            (error) => {
              console.error('Error saving rent payment details:', error);
              // Handle error, e.g., show an error message
            }
          );
        }else if(this.offer.offer_for == "Rent"){
          const paymentDetails = {
            transaction_id: details.id,
            status: status,
            rents_offer_id: this.offer.offer_id // or any other property you want to include
          };
          this.payment.saveRentPaymentDetails(paymentDetails).subscribe(
            (response) => {
              console.log('Rent payment details saved successfully:', response);
            },
            (error) => {
              console.error('Error saving rent payment details:', error);
              // Handle error, e.g., show an error message
            }
          );
        }
        
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }
}
