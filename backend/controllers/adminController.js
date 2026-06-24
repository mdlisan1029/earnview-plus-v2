exports.login = (req,res)=>{


const {username,password}=req.body;


if(

username==="admin"

&&

password==="123456"

)

{

return res.json({

success:true,

token:"earnview_admin_2026"

})

}


return res.status(401).json({

success:false,

message:"Wrong username or password"

})


}
