import { Injectable } from '@angular/core';
import { HousingLocation } from './housing-location';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  protected housingLocationlist:HousingLocation[]=[

  ]
  constructor() { }

  getAllHousingLocations() : HousingLocation[]{
    return this.housingLocationlist;
  }
  getHousingLocationById(id: Number): HousingLocation{
    return this.housingLocationlist.find(housingLocation => housingLocation.id == id)
  }
}
