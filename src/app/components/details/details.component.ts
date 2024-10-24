import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Data } from '../../interfaces/data';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterModule, NgIf],
  providers: [DataService],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  detailId!: any;
  postData: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private dataService: DataService, private location: Location) {
    this.route.params.subscribe(params => {
      this.detailId = params['id'];
    });
  }

  ngOnInit(): void {
    this.dataService.getPostById(this.detailId).subscribe({
      next: (response: Data) => {
        this.postData = response;
      },
      error: (error: Error) => {
        console.log(error);
      }
    })
  }

  goBack() {
    this.location.back();
  }
}
