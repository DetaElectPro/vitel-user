import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {
  passwordResetData: any;

  constructor() {
  }

  ngOnInit() {
  }

  passwordResetFun() {
    alert('soon');
  }
}
