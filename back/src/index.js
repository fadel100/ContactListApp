import app from './app'
import db from './db'
import {isloggedIn, authenticateUser, logout} from './auth.js';
import initializeDatabase from './db'
const PORT = process.env.PORT || 8080;


const start = async()=>{
const controller = await initializeDatabase();

/* const id = await controller.createContact({name:"Brad Putt",email:"brad@pet.com"})
  const contact = await controller.getContact(id)
  console.log("------\nmy newly created contact\n",contact)
 // await controller.updateContact(id, {name:"Brad Pitt"})
  await controller.updateContact(id, {email:"brad@pitt.com"})
  const updated_contact = await controller.getContact(id)
  console.log("------\nmy updated contact\n",updated_contact)
  console.log("------\nlist of contacts before\n",await controller.getContactsList())
  await controller.deleteContact(id)
  console.log("------\nlist of contacts after deleting\n",await controller.getContactsList())
 */

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
app.get('/contacts/list', async(req, res, next)=>{
  try{const {order} = req.query
  const rows = await controller.getContactsList(order);

  res.json({success:true, result:rows});}
  catch(err){
    next(err);
  }
});

app.get('/contacts/new', async(req, res, next)=>{
try { const {name, email} = req.query;
  const result = await controller.createContact({name, email});
  res.json({success:true, result});}
  catch(err){
    next(err)
  }
})

app.get('/contacts/get/:id', async(req, res, next)=>{
 try {const {id} = req.params;
  const result = await controller.getContact(id)
  res.json({success:true, result});}
  catch(err){
    next(err)
  }
})

app.get('/contacts/delete/:id', async(req, res, next)=>{
 try{const {id} = req.params;
  const result = await controller.deleteContact(id)
  res.json({success:true, result});}
  catch(err){
    next(err)
  }
})

app.get('/contacts/update/:id', async(req, res, next)=>{
  try{const {id} = req.params;
  const {name, email} = req.query;
  const result = await controller.updateContact(id, {name, email})
  res.json({success:true, result});}
  catch(err){
    next(err);
  }
})

app.get('/login', authenticateUser);

app.get('/logout', logout);

app.get('/mypage', isloggedIn, (req,res,next)=>{
  const username = req.user.name;
  res.json(
    {
      success:true,
      result: "User" + username +"has access to this page"
    }
  )
})



app.use((err, req, res, next) => {
  console.error(err)
  const message = err.message
  res.status(500).json({ success:false, message })
})


app.listen(PORT, ()=>{console.log(`server listening on port ${PORT}`)});
}
start();


