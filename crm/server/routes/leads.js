const express = require('express');
const router = express.Router();
const {
  getLeads,
  getLead,
  createLead,
  updateLead,
  deleteLead
} = require('../controllers/leads');

const { protect, authorize } = require('../middleware/auth');

// All routes below this line require authentication
router.use(protect);

// Routes specific to roles
router.route('/')
  .get(authorize('Lead Person', 'Manager', 'Admin'), getLeads)
  .post(authorize('Lead Person', 'Manager', 'Admin'), createLead);

router.route('/:id')
  .get(authorize('Lead Person', 'Manager', 'Admin'), getLead)
  .put(authorize('Lead Person', 'Manager', 'Admin'), updateLead)
  .delete(authorize('Manager', 'Admin'), deleteLead);

module.exports = router; 