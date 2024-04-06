import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }
  login() {
    this.afAuth.signInWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        console.log('El usuario ha iniciado sesión con éxito.');
        this.router.navigate(['/tabs/tab1']);
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          console.error('El usuario no existe en Firebase:', error);
        } else {
          console.error('Ha ocurrido un error con la autenticación de Firebase:', error);
        }
      });
  }

}
