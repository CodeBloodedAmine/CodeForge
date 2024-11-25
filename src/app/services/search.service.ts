import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchTermSubject = new BehaviorSubject<string>('');
  private minPriceSubject = new BehaviorSubject<number>(0);
  private maxPriceSubject = new BehaviorSubject<number>(1000);

  searchTerm$ = this.searchTermSubject.asObservable();
  minPrice$ = this.minPriceSubject.asObservable();
  maxPrice$ = this.maxPriceSubject.asObservable();

  get searchTerm(): string {
    return this.searchTermSubject.value;
  }

  set searchTerm(term: string) {
    this.searchTermSubject.next(term);
  }

  get minPrice(): number {
    return this.minPriceSubject.value;
  }

  set minPrice(price: number) {
    this.minPriceSubject.next(price);
  }

  get maxPrice(): number {
    return this.maxPriceSubject.value;
  }

  set maxPrice(price: number) {
    this.maxPriceSubject.next(price);
  }
}