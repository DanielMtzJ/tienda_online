import { createPool } from 'mysql2/promise'

export const pool = createPool({
 host: 'localhost',
 user: 'root', 
 password: '$admin_db/root/%$!ISW./.141003%_pwd$',
 port: 3306,
 database: 'tienda_online'
})