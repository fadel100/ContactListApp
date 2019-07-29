const users = [
  { nick:'anna', name:'nina.williams@tek.ken', password:'hapkido' },
  { nick:'shao', name:'johnny.cage@mk.com.bat', password:'hunter2' },
  { nick:'ryu', name:'ken.masters@sf.er', password:'shoryuken' },
  { nick:'a', name:'a', password:'b' }, // this one is for easy testing
]
/**
 * this is our logged in users.
 * In this example, `ken` is logged in (we suppose Ken, on the other side, 
 * holds the same token in their browser)
 * Of course, this token should be something unknowable, not a simple word like "test"
 **/
const tokens = {
  'test':2
}

export const authenticateUser = (req,res,next)=>{

  if(!req.query.username || !req.query.password)
  {

    return res.status(401).json(
      {
        success:false, 
        message:"username and password required"
      }
      
    )
  }
  const {username, password} = req.query;
  const index = users.findIndex(user =>user.name === username && user.password === password
  );
  console.log(index)
  if(index < 0){
   return res.status(401).json(
      {
        success:false, 
        message:"incorrect username or password"
      }
      
    )
  }
  const nickname = users[index].nick;
  const token = Math.random()+"";
  tokens[token]= index;
  return res.json(
    {
      success:true, 
    result:{nickname, token, tokens}
  }
  )

}

export const logout =(req,res,next)=>
{
  const {token} = req.query;
  if(!token){
   return res.json(
      {success:true}
    )
  }
  delete tokens[token];
  return res.json(
    {success:true}
  )
}

export const isloggedIn = (req, res, next)=>
{
  const {token} = req.query;
  if(!token || typeof tokens[token]== 'undefined'){
    return res.status(401).json(
      {
        success:false, 
        message:"forbidden"
      }
      
    )
  }
  
  const userIndex = tokens[token];
  const user = users[userIndex];
  req.is_logged_in = true;
  req.user = user;
  next();
}