require("dotenv").config();
const adminModel = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_KEY = process.env.SECRET_KEY;



const getData = async (req, res) => {
    try {
        const loadData = await adminModel.find()
        res.status(200).json(loadData)
    } catch (error) {
            res.status(500).json(error)
    }
}
const getSingleData = async (req, res) => {
    try {
        const id = req.params.id;
        const loadData = await adminModel.findOne({_id : id})
        res.status(200).json(loadData)
    } catch (error) {
            res.status(500).json(error)
    }
}
const register = async (req, res) => {
    const {email, password, ConfirmPassword} = req.body;
    try {
        const existUser = await adminModel.findOne({ email : email });
    if(existUser){
        return res.status(400).json({ message : "Admin already exist" });
    }

    bcrypt.hash(password, 10, async function (err, hash) {
        bcrypt.hash(ConfirmPassword, 10, async function(err, conhash){
            const newUser = new adminModel({
                email : email,
                password : hash,
                ConfirmPassword : conhash,
            });
            const token = jwt.sign({ id: newUser._id }, SECRET_KEY);
        await newUser.save();
        res.status(200).json({newUser : newUser, token : "Bearer " + token, message : "Admin create successful" });
        })
        
        
    });

    } catch (error) {
       res.status(500).json({ message : "Admin Create Faild" }) 
    }
};
const login = async (req, res) => {
    const {email, password, ConfirmPassword} = req.body;
    try {
        const existinguser = await adminModel.findOne({ email: email });
    if (!existinguser) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const matchpassword = await bcrypt.compare(password, existinguser.password);
    if (!matchpassword) {
      return res.status(400).json({ message: "incorrect Password" });
    }

    const token = jwt.sign(
        { email: existinguser.email, id: existinguser._id },
        SECRET_KEY
      );
      res.status(201).json({ user: existinguser, token: token, message : "Admin login successful, Redirecting" });

    } catch (error) {
        res.status(500).json({ message: "Admin login faild" });
    }
};
const updateData = async (req, res) => {
    const {email, password, ConfirmPassword} = req.body;
    const id = req.params.id;
    const tokenData = await adminModel.findOne({_id : id})
    try {
        bcrypt.hash(password, 10, async function (err, hash) {
            bcrypt.hash(ConfirmPassword, 10, async function(err, conhash){
                const updateUser = {
                    email : email,
                    password : hash,
                    ConfirmPassword : conhash,
                };
                await adminModel.findByIdAndUpdate(tokenData, updateUser, {new : true});
                res.status(200).json({ message : "Admin update successful"})
            })
        });
    } catch (error) {
       res.status(500).json({ message : "Admin Create Faild" }) 
    }
}
const deleteData = async (req, res) => {
    try {
      const id = req.params.id;
      await adminModel.findByIdAndDelete(id);
      res.status(200).json({ message: "Admin account deleted" });
    } catch (error) {
      res.status(500).json(error);
    }
}

module.exports = {getData, register, updateData, deleteData, login, getSingleData}