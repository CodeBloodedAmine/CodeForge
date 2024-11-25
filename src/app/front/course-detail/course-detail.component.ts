import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [MatCardModule,MatIconModule,CurrencyPipe,DatePipe,RouterModule,MatButtonModule,MatExpansionModule,MatDividerModule,ReactiveFormsModule,MatError,MatLabel,MatFormField],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent implements OnInit {
  course: Course | undefined;
  reviewForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private router: Router,
    private fb: FormBuilder 
  ) {
    this.reviewForm = this.fb.group({
      user: ['', Validators.required],
      comment: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const courseId = this.route.snapshot.params['id'];
    this.courseService.getCourseById(courseId).subscribe((data) => {
      this.course = data;
      console.log('Course loaded:', this.course); 
    });
  
    this.reviewForm = this.fb.group({
      user: ['', Validators.required],
      comment: ['', Validators.required]
    });
  }

  addReview(): void {
    console.log('Add Review button clicked');
    console.log('Form Validity:', this.reviewForm.valid);
  
    if (!this.course) {
      console.warn('Course not loaded');
      return;
    }
  
    if (this.reviewForm.valid) {
      const newReview = {
        user: this.reviewForm.value.user,
        comment: this.reviewForm.value.comment
      };
  
      console.log('Adding review:', newReview);
  
      if (!this.course.reviews) {
        this.course.reviews = [];
      }
  
      this.course.reviews.push(newReview);
  
      this.courseService.updateCourse(this.course.id, this.course).subscribe(
        () => {
          console.log('Review successfully added');
          this.reviewForm.reset();
        },
        (error) => {
          console.error('Error updating course with new review:', error);
        }
      );
    }
  }

  goBackToCourseList(): void {
    this.router.navigate(['/course']);
  }
}