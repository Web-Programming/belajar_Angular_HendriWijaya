import { Component } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import {CommonModule} from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,HousingLocationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  export interface HousingLocation{
    id: number,
    name:string,
    city:string,
    state:string,
    photo:string,
    availableUnits:number,
    wifi:boolean,
    laundry: boolean
}


