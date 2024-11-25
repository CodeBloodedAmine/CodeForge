import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/users';
  private loggedIn = new BehaviorSubject<boolean>(this.checkLoggedIn());
  loggedIn$ = this.loggedIn.asObservable();
  private userDbUrl = 'http://localhost:3001/users';
  private router: Router = inject(Router);

  constructor(private http: HttpClient) {}

  private checkLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  signUp(email: string, password: string, name: string): Observable<any> {
    const newUser = { email, password, name };
    return this.http.post<any>(this.apiUrl, newUser);
  }

  login(email: string, password: string): Observable<string> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      map((users) => {
        if (users && users.length > 0) {
          const user = users[0];
  
          localStorage.setItem('auth_token', 'authenticated');
          localStorage.setItem('user_role', user.role);
          localStorage.setItem('user_email', user.email);
  
          this.setLoggedIn(true);
  
          return user.role;
        } else {
          this.setLoggedIn(false);
          alert('Login failed: Incorrect email or password.');
          return '';
        }
      })
    );
  }
  

  setLoggedIn(status: boolean): void {
    this.loggedIn.next(status);
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.setLoggedIn(false);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }
  getPasswordByUsername(username: string): Observable<any> {
    return this.http.get<any[]>(this.userDbUrl)
  }
  getLoggedInUser(): string | null {
    const user = sessionStorage.getItem('loggedInUser');
    return user ? JSON.parse(user).user : null; 
  }
}