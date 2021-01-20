import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {

  constructor(private authService:AuthService,private router:Router,
    private alertCtrl:AlertController) { }
  

  ngOnInit() {
  }

  async resetPassword(form):Promise<void>{
    this.authService.resetPassword(form.value.email).
    then(
      async ()=>{
        const alert = await this.alertCtrl.create({
          message:'check your email toreset password',
          buttons:[{text:'ok',role:'cancel', handler:()=>{
            this.router.navigateByUrl('login');
          },},],
        });
        await alert.present();
        
      },
      async error => {
        const errorAlert = await this.alertCtrl.create({
          message:error.message,
          buttons:[{text:'ok',role:'cancel'}],
        });
        await errorAlert.present();
      }
    );
  }

}
