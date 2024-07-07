import { Injectable, signal } from '@angular/core';
import { people } from './people';
import { yearGroups } from './yeargroups';
import Person from '../types/Person';

@Injectable({
  providedIn: 'root',
})
export class MockBackendService {
  constructor() {}
  peopleResult = signal<Person[] | null>(null);
  yearGroupsResult = signal<string[] | null>(null);

  get yearGroupsResultSignal() {
    this.setYearGroupsResult(yearGroups);
    return this.yearGroupsResult;
  }
  setYearGroupsResult = (yearGroups: string[]) => {
    this.yearGroupsResult.set(yearGroups);
  };

  get peopleResultSignal() {
    this.setPeopleResult(this.people);
    return this.peopleResult;
  }
  setPeopleResult = (people: Person[]) => {
    this.peopleResult.set(people);
  };
  people: Person[] = people;
}
