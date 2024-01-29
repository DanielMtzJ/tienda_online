import express from 'express'
import {pool} from './connection.js'
import usersRoutes from './routes/users.routes.js'

const app = express();

app.get('/ping', async (req, res) => {
 const [result] = await pool.query('SELECT 1 + 1 AS result')
 res.json(result[0])
})

app.use(express.json())

app.use('/api/', usersRoutes)

app.use((req, res, next) => {
 res.status(404).json({
  message: 'Endpoint Not Found'
 })
})

app.listen(3000);

