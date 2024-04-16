import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

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
