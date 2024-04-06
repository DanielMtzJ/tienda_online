import { createPool } from 'mysql2/promise'

export const pool = createPool({
 host: 'localhost',
 user: 'root', 
 password: 'Admin_root./.141003/!',
 port: 3306,
 database: 'nexpixel_shop'
})