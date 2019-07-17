import app from './app'
import db from './db'
import initializeDatabase from './db'

const start = async()=>{
const controller = await initializeDatabase();


/**
 * Route that returns string ok
 * @module /
 * @param {Express.Request} req - request
 * @param {Express.Response} res - response
 * @return {string}  - ok
 */
app.get('/', (req, res)=>{
  res.send('ok')
});

/**
 * Route that returns a list of contacts
 * @module contacts/list
 * @param {Express.Request} req - request
 * @param {Express.Response} res - response
 * @return {json} rows - array of contacts
 */
app.get('/contacts/list', async(req, res)=>{
  const rows = await controller.getContactsList();

  res.json(rows)
});

app.listen(8080, ()=>{console.log("server listening on port 8080")});
}
start();


