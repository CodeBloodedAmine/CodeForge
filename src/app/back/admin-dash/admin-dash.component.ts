import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { Router, RouterModule } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-dash',
  standalone: true,
  imports: [MatCardModule,MatIconModule,CurrencyPipe,RouterModule,MatButtonModule,MatExpansionModule,MatDividerModule,ReactiveFormsModule,MatLabel,MatFormField,FormsModule,DatePipe],
  templateUrl: './admin-dash.component.html',
  styleUrl: './admin-dash.component.css'
})
export class AdminDashboardComponent implements OnInit {
  courses: Course[] = [];
  editingCourse: Course | null = null;

  constructor(private courseService: CourseService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe((data: Course[]) => {
      this.courses = data;
    });
  }

  addCourse(course: Course): void {
    this.courseService.addCourse(course).subscribe(() => {
      this.loadCourses();
      this.snackBar.open('Course added successfully!', 'Close', { duration: 3000 });
    });
  }

  onUpdateCourse(course: Course): void {
    if (course.id) {
      this.courseService.updateCourse(course.id, course).subscribe(() => {
        this.loadCourses();
        this.editingCourse = null;
        this.snackBar.open('Course updated successfully!', 'Close', { duration: 3000 });
      });
    }
  }

  startEditing(course: Course): void {
    this.editingCourse = { ...course };
  }

  cancelEditing(): void {
    this.editingCourse = null;
  }

  deleteCourse(courseId: string): void {
    this.courseService.deleteCourse(courseId).subscribe(() => {
      this.loadCourses();
      this.snackBar.open('Course deleted successfully!', 'Close', { duration: 3000 });
    });
  }
}