import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  providers: [DataService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router, private dataService: DataService) {
  }

  ngOnInit() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.router.navigate(['/home']);
    }
  }

  login() {
    const payload = {
      email: this.email,
      password: this.password
    };

    this.dataService.getToken(payload).subscribe({
      next: (response) => {
        localStorage.setItem('authToken', response.token);
        console.log(localStorage.getItem('authToken'));
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.errorMessage = 'Invalid email or password';
        console.error(error);
      }
    });
  }
}
