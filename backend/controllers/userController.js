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
        res.status(401).json("Wrong password");
      }
    } else {
      res.status(401).json("Wrong email");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await usermodel.findOne({ email });
    if (user) {
      res.status(409).json("User already exist");
    } else {
      let newUser = await usermodel.create({
        email,
        password,
      });
      if (newUser) {
        let token = generateToken(res, newUser._id);
        res.status(200).json({ newUser, token });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const getUserDetails=async(req,res)=>{
    try {
       const email=req.user.email
       const user=await usermodel.findOne({email})
       if(user){
        res.status(200).json(user)
       }
       else{
        res.status(401).json('Unauthorised user')
       }
    } catch (error) {
        res.status(400).json(error)
    }
}

const editDetails = async (req, res) => {
  try {
    let { name, phone, email, address } = req.body;
    let user = await usermodel.findOne({ email: email });
    if (user) {
      user.name = name?name:'';
      user.phone = phone?phone:'';
      user.Address = address?address:'';
      user.profilePic=req.file?.filename

      const saveUser = await user.save();
      res.status(200).json({ saveUser });
    } else {
      res.status(404).json("user not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export { login, register, getUserDetails,editDetails };
