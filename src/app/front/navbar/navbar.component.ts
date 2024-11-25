import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { NgClass, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule,NgIf,MdbCollapseModule,RouterModule,MatToolbarModule,NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  @Input() searchTerm: string = '';
  @Input() minPrice: number = 0;
  @Input() maxPrice: number = Infinity;

  @Output() searchTermChange = new EventEmitter<string>();
  @Output() minPriceChange = new EventEmitter<number>();
  @Output() maxPriceChange = new EventEmitter<number>();
  isLoggedIn: boolean = false;
  isNavOpen: boolean = false;  
  isSearchOpen: boolean = false; 
  searchIconClass: string = 'fa-search'; 

  constructor(
    private authService: AuthService,
    private router: Router,
    public searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  
  openNav() {
    this.isNavOpen = true;
  }


  closeNav() {
    this.isNavOpen = false;
  }


  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
    this.searchIconClass = this.isSearchOpen ? 'fa-times' : 'fa-search';  
  }

 
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  isAdmin(): boolean {
    return localStorage.getItem('user_role') === 'admin'; 
  }
  onSearchTermChange(searchTerm: string) {
    this.searchTermChange.emit(searchTerm);
  }

  onMinPriceChange(minPrice: number) {
    this.minPriceChange.emit(minPrice);
  }

  onMaxPriceChange(maxPrice: number) {
    this.maxPriceChange.emit(maxPrice);
  }
}