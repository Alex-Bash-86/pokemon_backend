import User from "../models/user.model.js";


const createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({ data: user });
};

const getAllUsers = async (_req, res) => {
  const users = await User.find().lean();
  res.json({ data: users });
};

const getOneUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate('readingList.bookRefId');
  if (!user) throw new Error('User not found', { cause: 404 });
  res.json({ data: user });
};

const updateOneUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }).lean();
  if (!user) throw new Error('User not found', { cause: 404 });
  res.json({ data: user });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id).lean();
  if (!user) throw new Error('User not found', { cause: 404 });
  res.json({ data: user });
};



export { createUser, getAllUsers, getOneUser, updateOneUser, deleteUser };