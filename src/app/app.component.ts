import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DataService } from './services/data.service';
import { Data } from './interfaces/data';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, RouterLink],
  providers: [DataService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  posts: Data[] = [];

  constructor(private dataService: DataService) {
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
}
