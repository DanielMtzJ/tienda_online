import express from 'express'
import cors from 'cors'
import {pool} from './connection.js'
import usersRoutes from './routes/users.routes.js'
import productsRoutes from './routes/products.routes.js'
import loginRoutes from './routes/auth.routes.js'

const app = express();
app.use(cors());

app.get('/ping', async (req, res) => {
 try {
  const [result] = await pool.query('SELECT 1 + 1 AS result')
  res.json(result[0])
 } catch (error) {
  res.json({
    message: 'Serfefe'
  })
  console.log('Conectado');
 }

})

app.use(express.json())

app.use('/api/', usersRoutes)
app.use('/api/', productsRoutes)
app.use('/api/', loginRoutes)

app.use((req, res, next) => {
 res.status(404).json({
  message: 'Endpoint Not Found'
 })
})

app.listen(3000);

