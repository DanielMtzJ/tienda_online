import {pool} from '../connection.js'
import admin from 'firebase-admin';

import serviceAccount from '../../../nexpixel-shop-firebase-adminsdk-907eb-4157af9de8.json' assert { type: 'json' };;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const loginAuth = async (req, res) => {
  const { email, password } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [uid]);
    if (rows.length === 0) {
      const result = await pool.query('INSERT INTO usuarios (id, email, password) VALUES (?, ?, ?)', [uid, email, password]);
      if (result.affectedRows === 0) {
        return res.status(500).json({
          message: 'Algo salió mal al crear el usuario en MySQL'
        });
      }
    }

    admin.auth().getUser(uid)
      .then((userRecord) => {
        res.json({ message: 'El usuario ha iniciado sesión con éxito.' });
        this.router.navigate(['/tabs/tab1']);
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          admin.auth().createUser({
            uid: uid,
            email: email,
            password: password
          })
          .then((userRecord) => {
            res.json({ message: 'Usuario creado con éxito en Firebase.' });

            this.router.navigate(['/tabs/tab1']);
          })
          .catch((error) => {

            res.status(500).json({
              message: 'Algo salió mal al crear el usuario en Firebase'
            });
          });
        } else {

          res.status(500).json({
            message: 'Algo salió mal al verificar el usuario en Firebase'
          });
        }
      });
  } catch (error) {
    res.status(500).json({
      message: 'Algo salió mal al verificar el token de ID'
    });
  }
}
