import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  email: string;
  password: string;

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.afAuth.createUserWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        console.log('El usuario se ha registrado con éxito.');
        this.router.navigate(['/tabs/tab1']);
      })
      .catch((error) => {
        console.error('Ha ocurrido un error con el registro de Firebase:', error);
      });
  }

}
