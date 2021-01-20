import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ok } from 'assert';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService:AuthService,private router:Router,
    private alertCtrl:AlertController) { }

  ngOnInit() {
  }

  async loginUser(form):Promise<void>{
    this.authService.loginUser(form.value.email, form.value.password).
    then(
      ()=>{
        this.router.navigateByUrl('home');
      },
      async error => {
        const alert = await this.alertCtrl.create({
          message:error.message,
          buttons:[{text:'ok',role:'cancel'}],
        });
        await alert.present();
      }
    );
  }

  goToReset(){
    this.router.navigateByUrl('password-reset');
  }
  goToSignUp(){
    this.router.navigateByUrl('sign-up');
  }


}
