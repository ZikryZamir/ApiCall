import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Data } from '../../interfaces/data';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterModule, NgIf],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  detailId!: any;
  postData: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.params.subscribe(params => {
      this.detailId = params['id'];
      this.fetchPostData();
    });
  }

  ngOnInit(): void {}

  fetchPostData() {
    const apiUrl = `https://jsonplaceholder.typicode.com/posts/${this.detailId}`;

    this.http.get(apiUrl).subscribe({
      next: (response) => {
        this.postData = response;
        console.log('Post Data:', this.postData);
      },
      error: (error) => {
        console.error('API error:', error);
      }
    });
  }
}
