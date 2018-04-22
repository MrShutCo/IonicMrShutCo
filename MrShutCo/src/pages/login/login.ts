import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    loading: Loading;
    r: {};

    constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
        this.r = {email: '', password: ''};
    }

    public createAccount() {
        this.nav.push('RegisterPage');
    }

    public login() {
        this.showLoading();
        this.auth.login(this.r).subscribe(allowed => {
            if (allowed) {
                this.nav.setRoot('HomePage');
            } else {
                this.showError("Access Denied");
            }
        })
    }

    public showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    }

    public showError(error: string) {
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
            title: 'Failure',
            subTitle: error,
            buttons: ['OK']
        });
        alert.present();
    }
}

