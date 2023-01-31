const express = require("express");
const userModel = require("../model/uerModel");
const jwt = require("jsonwebtoken");
const nodemailer=require("nodemailer");
const createUser = async function (req, res) {
  try {
    const data = req.body;
    let { Name, Email, Password, phonenumber } = data;
    if (!Name) {
      return res
        .status(400)
        .send({ status: false, message: "name is required" });
    }
    if (!Email) {
      return res
        .status(400)
        .send({ status: false, message: "Email is required" });
    }
    if (!Password) {
      return res
        .status(400)
        .send({ status: false, message: "Password is required" });
    }
    if (!phonenumber) {
      return res
        .status(400)
        .send({ status: false, message: "phonenumber is required" });
    }
    const userData = { Name, Email, Password, phonenumber };
    const newUser = await userModel.create(userData);
    res
      .status(201)
      .send({
        status: true,
        message: "user Created Successfully",
        data: newUser,
      });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
const loginUser = async function (req, res) {
  try {
    let data = req.body;
    const { Email, Password } = data;
    if (!Email) {
      return res
        .status(400)
        .send({ status: false, message: "Email is required" });
    }
    if (!Password) {
      return res
        .status(400)
        .send({ status: false, message: "Password is required" });
    }
    const user = await userModel.findOne({ Email, Password });
    if (!user) {
      return res
        .status(401)
        .send({ status: false, msg: "invalid Login credentials" });
    }
    const token = jwt.sign(
      { userId: user._id.toString() },
      "my-secret-secret-key"
    );
    return res.status(200).send({ status: true, msg: token });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
const updateUser = async function (req, res) {
  try {
    const data = req.body;
    const userId = req.params.userId;
    let { Name, Email, Password, phonenumber } = data;
    let update = {};
    if (Name) {
      update.Name = Name;
    }

    if (Email) {
      update.Email = Email;
    }
    if (Password) {
      update.Password = Password;
    }
    if (phonenumber) {
      update.phonenumber = phonenumber;
    }
    const updatedUser = await userModel.findByIdAndUpdate(
      { _id: userId },
      update,
      { new: true }
    );
    res
      .status(200)
      .send({ status: true, message: "Data Updated", data: updatedUser });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
const getUser = async function (req, res) {
  try {
    let data = req.query;
    let userId = req.params.userId;
    let get = await userModel.find(data);
    if (get.length == 0)
      return res.status(404).send({ message: "data not found" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = { createUser, updateUser, loginUser, getUser };
