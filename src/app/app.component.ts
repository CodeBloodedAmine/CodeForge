import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CoursesListComponent } from "./front/courses-list/courses-list.component";
import { NavbarComponent } from "./front/navbar/navbar.component";
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, RouterModule, CoursesListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  searchTerm: string = '';
  minPrice: number = 0;
  maxPrice: number = 1000;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to the authentication status
    this.authService.loggedIn$.subscribe((status: boolean) => {
      this.isLoggedIn = status;
      if (this.isLoggedIn) {
        // If logged in, redirect to the market (or courses) page
        this.router.navigate(['/course']);
      } else {
        // If not logged in, redirect to the login page
        this.router.navigate(['/login']);
      }
    });
  }
}