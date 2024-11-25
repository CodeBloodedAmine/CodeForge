import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe, DatePipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [FormsModule, RouterLink,MatCardModule,MatIconModule,SlicePipe,CurrencyPipe,DatePipe,RouterModule],
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'] 
})
export class CoursesListComponent implements OnInit, OnChanges {
  onCardClick(courseId: string): void {
    this.router.navigate(['/courses', courseId]);
  }

  @Input() searchTerm: string = '';
  @Input() minPrice: number = 0;
  @Input() maxPrice: number = 1000;

  courses: Course[] = [];
  filteredCourses: Course[] = [];
  advertisements: any[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((courses) => {
      this.courses = courses;
      this.filterCourses();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes detected:', changes);
    if (changes['searchTerm'] || changes['minPrice'] || changes['maxPrice']) {
      this.filterCourses();
    }
  }

  filterCourses(): void {
    console.log('Filtering with:', this.searchTerm, this.minPrice, this.maxPrice);
    this.filteredCourses = this.courses.filter(course =>
      course.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      course.price >= this.minPrice &&
      course.price <= this.maxPrice
    );
    console.log('Filtered Courses:', this.filteredCourses);
  }
  private router: Router = inject(Router);
  onNavigateToCourseDetail(courseId: string): void {
    const id = Number(courseId);
    if (!isNaN(id)) {
      this.router.navigate(['/course', id]);
    } else {
      console.error('Invalid course ID');
    }
  }
}
