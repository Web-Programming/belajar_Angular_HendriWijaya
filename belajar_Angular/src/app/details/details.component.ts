import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo" alt="Exterior photo of {{housingLocation?.name}}" />
      <section class="listing-description">
        <h2 class="listing-heading">{{housingLocation?.name}}</h2>
        <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{housingLocation?.availableUnit}}</li>
          <li>Does this location have wifi: {{housingLocation?.wifi}}</li>
          <li>Does this location have laundry: {{housingLocation?.laundry}}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h1 class="section-heading">Register to live here</h1>
        <form [formGroup]="applyForm" (submit)="submitApplyForm()">
          <label for="first-name">First Name</label>
          <input type="text" id="first-name" formControlName="firstname" placeholder="Input first name">
          <label for="last-name">Last Name</label>
          <input type="text" id="last-name" formControlName="lastname" placeholder="Input last name">
          <label for="email">Email</label>
          <input type="text" id="email" formControlName="email" placeholder="Input email">
          <button type="submit" class="primary">Apply</button>
        </form>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService = inject(HousingService);

  housingLocationId = 0;
  housingLocation: HousingLocation | undefined;

  applyForm: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl('')
  });

  ngOnInit(): void {
    // Menangkap parameter id dari URL
    this.housingLocationId = Number(this.route.snapshot.paramMap.get('id'));

    // Memanggil service untuk mengambil data housing berdasarkan id
    this.housingService.getHousingLocationById(this.housingLocationId)
      .then(location => {
        this.housingLocation = location;
      })
      .catch(error => {
        console.error('Error fetching housing location:', error);
      });
  }

  submitApplyForm(): void {
    const { firstname, lastname, email } = this.applyForm.value;

    this.housingService.submitApplication(firstname, lastname, email);
    alert(`Application submitted for ${firstname} ${lastname}`);
  }
}
