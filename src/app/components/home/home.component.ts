import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, RouterModule, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Data } from '../../interfaces/data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgFor, RouterOutlet, RouterModule, NgIf, CommonModule],
  providers: [DataService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  posts: Data[] = [];

  constructor(private dataService: DataService, private router: Router) {
  }

  ngOnInit() {
    this.dataService.getPosts().subscribe({
      next: (response: Data[]) => {
        this.posts = response;
      },
      error: (error: Error) => {
        console.log(error);
      }
    })
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
