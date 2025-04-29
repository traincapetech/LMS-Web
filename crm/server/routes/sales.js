const express = require('express');
const router = express.Router();
const {
  getSales,
  getSale,
  createSale,
  updateSale,
  deleteSale
} = require('../controllers/sales');

const { protect, authorize } = require('../middleware/auth');

// All routes below this line require authentication
router.use(protect);

// Routes specific to roles
router.route('/')
  .get(authorize('Sales Person', 'Manager', 'Admin'), getSales)
  .post(authorize('Sales Person', 'Manager', 'Admin'), createSale);

router.route('/:id')
  .get(authorize('Sales Person', 'Manager', 'Admin'), getSale)
  .put(authorize('Sales Person', 'Manager', 'Admin'), updateSale)
  .delete(authorize('Manager', 'Admin'), deleteSale);

module.exports = router; 