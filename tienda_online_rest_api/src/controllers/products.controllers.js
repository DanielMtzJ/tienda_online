import {pool} from '../connection.js'

export const getProducts = async (req, res) => {

 try {
  const [rows] = await pool.query('SELECT * FROM productos')
  res.send(rows)
 } catch (error) {
  return res.status(500).json({
   message: 'Algo salio mal'
  })
 }

}

export const getProduct = async (req, res) => {

 try {
  const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [req.params.id])
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

export const createProducts = async (req, res) => {

 const {nombre, descripcion, marca, precio, cantidad_stock, imagen} = req.body

 try {
  const [rows] = await pool.query('INSERT INTO productos (nombre, descripcion, marca, precio, cantidad_stock, imagen) VALUES (?, ?, ?, ?, ?, ?)', [nombre, descripcion, marca, precio, cantidad_stock, imagen])
  res.send({
   id: rows.insertId,
   nombre,
   descripcion,
   marca,
   precio,
   cantidad_stock,
   imagen
  })
 } catch (error) {
  return res.status(500).json({
   message: 'Algo salio mal'
  })
 }

}

export const updateProducts = async (req, res) => {

 const {id} = req.params
 const {nombre, descripcion, marca, precio, cantidad_stock, imagen} = req.body

 try {
  const [result] = await pool.query('UPDATE productos SET nombre = IFNULL(?, nombre), descripcion = IFNULL(?, descripcion), marca = IFNULL(?, marca), precio = IFNULL(?, precio), cantidad_stock = IFNULL(?, cantidad_stock), imagen = IFNULL(?, imagen) WHERE id = ?', [nombre, descripcion, marca, precio, cantidad_stock, imagen, id])
 
  if (result.affectedRows === 0){
   return res.status(404).json({
    message: 'Usuario no encontrado'
   })
  }

  const [rows] = pool.query('SELECT * FROM productos WHERE id = ?', [id])
  res.json(rows[0])
 } catch (error) {
  return res.status(500).json({
   message: 'Algo salio mal'
  })
 }

}

export const deleteProducts = async (req, res) => {

 try {
  const [result] = await pool.query('DELETE FROM productos WHERE id = ?', [req.params.id])

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