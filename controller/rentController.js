const rentModels = require("../models/rentModel");



const getRent = async (req, res) => {
    try {
        const data = await rentModels.find();
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message : "Rent data not found"})
    }
};
const createRent = async (req, res) => {
    const {rentCost, montOfRent, collectRent, securityDeposit, protectRent, moveinCost, relentedCost, rentID } = req.body;
    const {startDate, endDate } = collectRent ? collectRent : "";
    const {secAmmount, secNote} = securityDeposit ? securityDeposit : "";
    const {protAmmount, protNote} = protectRent ? protectRent : "";   
    try {  
        const rentInfo = new rentModels({
            rentCost : rentCost,
            montOfRent : montOfRent,
            collectRent : {
                startDate: startDate ? startDate : "",
                endDate: endDate ? endDate : ""
            },
            securityDeposit : {
                secAmmount: secAmmount ? secAmmount : "", 
                secNote: secNote ? secAmmount : ""},
            protectRent : {
                protAmmount: protAmmount ? protAmmount : "", 
                protNote: protNote ? protNote: ""
            },
            moveinCost : moveinCost,
            relentedCost : relentedCost,
            rentID: rentID
        });
        await rentInfo.save();
        res.status(200).json({rentData: rentInfo, message : "Rent Created"})
    } catch (error) {
       res.status(500).json({ message : "Rent Create Faild" }) 
    }
};
const getSingleRent = async (req, res) => {
    const id = req.params.id;
    try {
        const oneUser = await rentModels.findOne({_id : id})
        res.status(200).json(oneUser)
    } catch (error) {
        res.status(500).json(error)
    }
};
const updateRent = async (req, res) => {
    const {rentCost, montOfRent, collectRent, securityDeposit, protectRent, moveinCost, relentedCost , rentID} = req.body;
    const {startDate, endDate } = collectRent ? collectRent : "";
    const {secAmmount, secNote} = securityDeposit ? securityDeposit : "";
    const {protAmmount, protNote} = protectRent ? protectRent : "";
    const id = req.params.id;
    try {
        const updateRent ={
            rentCost : rentCost,
            montOfRent : montOfRent,
            collectRent : {
                startDate: startDate ? startDate : "",
                endDate: endDate ? endDate : ""
            },
            securityDeposit : {
                secAmmount: secAmmount ? secAmmount : "", 
                secNote: secNote ? secAmmount : ""},
            protectRent : {
                protAmmount: protAmmount ? protAmmount : "", 
                protNote: protNote ? protNote: ""
            },
            moveinCost : moveinCost,
            relentedCost : relentedCost,
            rentID: rentID
        };
        await rentModels.findByIdAndUpdate(id, updateRent, {new : true});
        res.status(200).json({ message : "Rent update successful"})
        
        
    } catch (error) {
        res.status(500).json({message : "User update faild"})
    }
};
const deleteRent = async (req, res) => {
    const id = req.params.id;
    try {
      await rentModels.findByIdAndRemove(id);
      res.status(200).json({ message: "Rent delete successful" });
    } catch (error) {
      res.status(500).json({ message: "Rent delete faild!" });
    }
};

module.exports = {getRent, createRent, getSingleRent, updateRent, deleteRent};
