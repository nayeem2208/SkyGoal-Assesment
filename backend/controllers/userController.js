import generateToken from "../config/token.js";
import usermodel from "../modals/userModal.js";

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await usermodel.findOne({ email });
    if (user) {
      if (await user.matchpassword(password)) {
        let token = generateToken(res, user._id);
        res.status(200).json({ user, token });
      } else {
        console.log("wrong password");
        res.status(401).json("Wrong password");
      }
    } else {
      console.log("wrong email");
      res.status(401).json("Wrong email");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const register=async(req,res)=>{
    try {
        console.log(req.body,'bodyyyyyyyyyy')
        const {email,password}=req.body
        console.log(email,'email')
        let user=await usermodel.findOne({email})
        console.log(user,'user')
        if(user){
            res.status(409).json('User already exist')
        }
        else{
            let newUser=await usermodel.create({
                email,
                password
            })
            if(newUser){
                generateToken(res.newUser._id)
                res.status(200).json('Its working')
            }
        }
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

export { login,register };
