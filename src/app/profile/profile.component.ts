import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  userData: any;

  constructor() {}

  ngOnInit(): void {
    let _user = localStorage.getItem('user') ?? '';
    this.userData = JSON.parse(_user);
  }
}
