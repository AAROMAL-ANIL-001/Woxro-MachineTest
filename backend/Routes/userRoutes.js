const express = require("express");
const userModal = require("../Modals/userModal");
const transferModal = require("../Modals/transferModal");
const router = express.Router();

router.post("/api/signup", async (req, res) => {
  console.log(req.body);

  const signup = new userModal({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const userSave = signup.save();
  res.status(200).json({ userSave, message: "User created" });
});

router.post("/api/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const user = await userModal.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email" });
  }
  if (password !== user.password) {
    return res.status(400).json({ message: "Incorrect password" });
  }
  res.status(200).json({ user, message: "Login successfull" });
});

router.get("/api/balance/:id", async (req, res) => {
  const balance = await userModal.findById(req.params.id);
  console.log(balance);
  return res.status(200).json(balance.balance);
});

router.post("/api/balance/:id", async (req, res) => {
  console.log(req.body);
  const balance = await userModal.findById(req.params.id);
  const total = balance.balance + parseInt(req.body.amount);
  const newBalance = await userModal.findByIdAndUpdate(req.params.id, {
    $set: { balance: total },
  });

  console.log(newBalance.balance);
  return res.status(200).json(newBalance.balance);
});

router.post("/api/withdraw/:id", async (req, res) => {
  const balance = await userModal.findById(req.params.id);
  const total = balance.balance - parseInt(req.body.amount);
  const newBalance = await userModal.findByIdAndUpdate(req.params.id, {
    $set: { balance: total },
  });
  console.log(total);
  console.log(newBalance.balance);
  return res.status(200).json(newBalance.balance);
});

router.post("/api/transfer/:id", async (req, res) => {
  const balance = await userModal.findById(req.params.id);
  const total = balance.balance - parseInt(req.body.amount);
  const newBalance = await userModal.findByIdAndUpdate(req.params.id, {
    $set: { balance: total, transferEmail: req.body.email },
  });
  console.log(total);
  console.log(newBalance.balance);
  return res.status(200).json(newBalance.balance);
});

router.post("/api/transaction/:id", async (req, res) => {
  console.log(req.body);
  let balanceAmount = await userModal.findById(req.params.id);

  console.log("balllll", balanceAmount);

  const { date, time, details, type, balance, amount } = req.body;
  const trasaction = new transferModal({
    date,
    time,
    details,
    type,
    balance: balanceAmount.balance,
    amount,
  });
  await trasaction.save();
  res.status(200).json(trasaction);
});

router.get("/api/statement", async (req, res) => {
  const statement = await transferModal.find({});
  res.status(200).json(statement);
});
module.exports = router;
