import app from './app'
import db from './db'
import initializeDatabase from './db'

const start = async()=>{
const controller = await initializeDatabase();

app.get('/', (req, res)=>{
  res.send('ok')
});

app.get('/contacts/list', async(req, res)=>{
  const list = await controller.getContactsList();

  res.send(list)
});

app.listen(8080, ()=>{console.log("server listening on port 8080")});
}
start();


