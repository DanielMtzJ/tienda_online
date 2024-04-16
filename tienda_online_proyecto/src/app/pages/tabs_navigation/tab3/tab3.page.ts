import { Component } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  logout() {
    this.afAuth.signOut().then(() => {
      console.log('El usuario ha cerrado sesión con éxito.');
      this.router.navigate(['/login']);
    })
    .catch((error) => {
      console.error('Ha ocurrido un error al cerrar sesión:', error);
    });
  }
}

