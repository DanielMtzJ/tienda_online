import {pool} from '../connection.js'

export const getUsers = async (req, res) => {

 try {
  const [rows] = await pool.query('SELECT * FROM usuarios')
  res.send(rows)
 } catch (error) {
  return res.status(500).json({
   message: 'Algo salio mal'
  })
 }

}

export const getUser = async (req, res) => {

 try {
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [req.params.id])
  console.log(rows);
  if (rows.length <= 0 ) {
   return res.status(404).json({
    message: 'Usuario no encontrado'
   })
  }
  res.json(rows[0])
 } catch (error) {
  return res.status(500).json({
   message: 'Algo salio mal'
  })
 }

}

export const createUsers = async (req, res) => {

 const {nombre, apellido_paterno, apellido_materno, direccion, telefono, email, password} = req.body

 try {
  const [rows] = await pool.query('INSERT INTO usuarios (nombre, apellido_paterno, apellido_materno, direccion, telefono, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)', [nombre, apellido_paterno, apellido_materno, direccion, telefono, email, password])
  res.send({
   id: rows.insertId,
   nombre,
   apellido_paterno,
   apellido_materno,
   direccion,
   telefono,
   email,
   password
  })
 } catch (error) {
  return res.status(500).json({
   message: 'Algo salio mal'
  })
 }

}

export const updateUsers = async (req, res) => {

 const {id} = req.params
 const {nombre, apellido_paterno, apellido_materno, direccion, telefono, email, password} = req.body

 try {
  const [result] = await pool.query('UPDATE usuarios SET nombre = IFNULL(?, nombre), apellido_paterno = IFNULL(?, apellido_paterno), apellido_materno = IFNULL(?, apellido_materno), direccion = IFNULL(?, direccion), telefono = IFNULL(?, telefono), email = IFNULL(?, email), password = IFNULL(?, password) WHERE id = ?', [nombre, apellido_paterno, apellido_materno, direccion, telefono, email, password, id])
 
  if (result.affectedRows === 0){
   return res.status(404).json({
    message: 'Usuario no encontrado'
   })
  }

  const [rows] = pool.query('SELECT * FROM usuarios WHERE id = ?', [id])
  res.json(rows[0])
 } catch (error) {
  return res.status(500).json({
   message: 'Algo salio mal'
  })
 }

}

export const deleteUsers = async (req, res) => {

 try {
  const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?', [req.params.id])

  if (result.affectedRows <= 0){
   return res.status(404).json({
    message: 'Usuario no encontrado'
   })
  }
  
  res.sendStatus(204)
 } catch (error) {
  return res.status(500).json({
   message: 'Algo salio mal'
  })
 }
 
}