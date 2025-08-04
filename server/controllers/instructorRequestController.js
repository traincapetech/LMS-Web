const InstructorRequest = require('../models/InstructorRequest');
const User = require('../models/User');
const Instructor = require('../models/Instructor');

// Only allow admin (hardcoded email) to approve/reject
const ADMIN_EMAIL = 'vikasdev518@gmail.com';

function isAdmin(req) {
  return req.user && req.user.email === ADMIN_EMAIL;
}

exports.apply = async (req, res) => {
  const { name, email, bio } = req.body;
  const userId = req.user && req.user._id;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });
  // Prevent duplicate requests
  const existing = await InstructorRequest.findOne({ user: userId, status: 'pending' });
  if (existing) return res.status(400).json({ message: 'You already have a pending request.' });
  const request = new InstructorRequest({ user: userId, name, email, bio });
  await request.save();
  res.status(201).json({ message: 'Request submitted.' });
};

exports.list = async (req, res) => {
  if (!isAdmin(req)) return res.status(403).json({ message: 'Forbidden' });
  const requests = await InstructorRequest.find().populate('user', 'name email');
  res.json(requests);
};

exports.approve = async (req, res) => {
  if (!isAdmin(req)) return res.status(403).json({ message: 'Forbidden' });
  const request = await InstructorRequest.findById(req.params.id);
  if (!request) return res.status(404).json({ message: 'Request not found' });
  request.status = 'approved';
  await request.save();
  // Promote user to instructor
  const user = await User.findByIdAndUpdate(request.user, { role: 'instructor' }, { new: true });
  // Create/update Instructor entry
  await Instructor.findOneAndUpdate(
    { email: user.email },
    {
      fullName: user.name,
      email: user.email,
      isSubscribed: false,
      isVerified: true,
    },
    { upsert: true, new: true }
  );
  // Add notification
  user.notifications.unshift({
    message: 'Your instructor request was approved! You can now access the instructor dashboard.',
    type: 'instructor-request',
    read: false,
    createdAt: new Date()
  });
  await user.save();
  res.json({ message: 'Instructor approved.' });
};

exports.reject = async (req, res) => {
  if (!isAdmin(req)) return res.status(403).json({ message: 'Forbidden' });
  const request = await InstructorRequest.findById(req.params.id);
  if (!request) return res.status(404).json({ message: 'Request not found' });
  request.status = 'rejected';
  await request.save();
  // Add notification
  const user = await User.findById(request.user);
  if (user) {
    user.notifications.unshift({
      message: 'Your instructor request was rejected by the admin.',
      type: 'instructor-request',
      read: false,
      createdAt: new Date()
    });
    await user.save();
  }
  res.json({ message: 'Instructor request rejected.' });
}; 