require("dotenv").config();
const landLord = require("../controller/landlordController");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const landlordModel = require("../models/landlordModel");
const SECRET_KEY = process.env.SECRET_KEY;



const getData = async (req, res) => {
    try {
        const loadData = await landlordModel.find()
        res.status(200).json(loadData)
    } catch (error) {
            res.status(500).json(error)
    }
}
const getSingleData = async (req, res) => {
    try {
        const id = req.params.id;
        const loadData = await landlordModel.findOne({_id : id})
        res.status(200).json(loadData)
    } catch (error) {
            res.status(500).json(error)
    }
}
const register = async (req, res) => {
    const {userName, email, password, ConfirmPassword} = req.body;
    try {
        const existUser = await landlordModel.findOne({ email : email });
    if(existUser){
        return res.status(400).json({ message : "landlord already exist" });
    }
    bcrypt.hash(password, 10, async function (err, hash) {
        bcrypt.hash(ConfirmPassword, 10, async function(err, conhash){
            const newUser = new landlordModel({
                userName : userName,
                email : email,
                password : hash,
                ConfirmPassword : conhash,
            });
            const token = jwt.sign({ id: newUser._id }, SECRET_KEY);
        await newUser.save();
        res.status(200).json({newUser : newUser, token : "Bearer " + token, message : "landlord create successful" });
        })
        
        
    });

    } catch (error) {
       res.status(500).json({ message : "landlord Create Failed" }) 
    }
};
const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const existinguser = await landlordModel.findOne({ email: email });
    if (!existinguser) {
      return res.status(404).json({ message: "landlord not found" });
    }
    const matchpassword = await bcrypt.compare(password, existinguser.password);
    if (!matchpassword) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    const token = jwt.sign(
        { email: existinguser.email, id: existinguser._id },
        SECRET_KEY
      );
      res.status(201).json({ user: existinguser, token: token, message : "login successful, Redirecting" });

    } catch (error) {
        res.status(500).json({ message: "landlord login faild" });
    }
};
const updateData = async (req, res) => {
    const {userName, email, password, ConfirmPassword} = req.body;
    const id = req.params.id;
    try {
        bcrypt.hash(password, 10, async function (err, hash) {
            bcrypt.hash(ConfirmPassword, 10, async function(err, conhash){
                const updateUser = {
                    userName : userName,
                    email : email,
                    password : hash,
                    ConfirmPassword : conhash,
                };
               
                await landlordModel.findByIdAndUpdate(id, updateUser, {new : true});
                res.status(200).json({ message : "User update successful"})
            })
            
            
        });
    } catch (error) {
       res.status(500).json({ message : "landlord Create Faild" }) 
    }
}
const deleteData = async (req, res) => {
    try {
      const id = req.params.id;
      await landlordModel.findByIdAndDelete(id);
      res.status(200).json({ message: "landlord account deleted" });
    } catch (error) {
      res.status(500).json(error);
    }
}

module.exports = {getData, register, updateData, deleteData, login, getSingleData}