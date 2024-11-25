import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) {}

 
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);  
  }

  
  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);  
  }

  updateCourse(courseId: string, updatedCourse: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${courseId}`, updatedCourse);
  }
  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  deleteCourse(id: String): Observable<any> {
    return this.http.delete(`${this.apiUrl}/courses/${id}`);
  }
}