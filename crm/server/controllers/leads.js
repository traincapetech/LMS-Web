const Lead = require('../models/Lead');

// @desc    Get all leads
// @route   GET /api/leads
// @access  Private
exports.getLeads = async (req, res) => {
  try {
    // Add query parameters for filtering if needed
    const filter = {};
    
    console.log('User requesting leads:', {
      id: req.user._id,
      role: req.user.role,
      name: req.user.fullName,
      email: req.user.email
    });
    
    const userId = req.user._id.toString();
    console.log('User ID (string format):', userId);
    
    // If not admin or manager, only show leads assigned to the user
    // or created by the user if they are a Lead Person
    if (req.user.role !== 'Admin' && req.user.role !== 'Manager') {
      if (req.user.role === 'Lead Person') {
        // Let MongoDB handle the ObjectId comparison
        filter.$or = [
          { leadPerson: req.user._id },
          { assignedTo: req.user._id }
        ];
        console.log('Lead Person filter:', filter);
      } else {
        filter.assignedTo = req.user._id;
        console.log('Sales Person filter:', filter);
      }
    } else {
      console.log('Admin/Manager - no filter applied');
    }
    
    const leads = await Lead.find(filter)
      .populate('assignedTo', 'fullName email')
      .populate('leadPerson', 'fullName email');
    
    console.log(`Found ${leads.length} leads matching the filter`);
    
    // Debug: List lead IDs and assignedTo values
    if (leads.length > 0) {
      console.log('Lead details:', leads.map(lead => ({
        id: lead._id,
        name: lead.name,
        assignedTo: lead.assignedTo ? lead.assignedTo._id : 'None',
        assignedToName: lead.assignedTo ? lead.assignedTo.fullName : 'None'
      })));
    }
    
    // Get all leads to verify if any exist and check user ID matches
    const allLeads = await Lead.find({}).populate('assignedTo');
    console.log(`Total leads in database: ${allLeads.length}`);
    
    if (allLeads.length > 0) {
      console.log('Checking if any leads should be visible to this user...');
      allLeads.forEach(lead => {
        if (lead.assignedTo) {
          const leadAssignedId = lead.assignedTo._id ? lead.assignedTo._id.toString() : 'null';
          console.log(`Lead "${lead.name}" (${lead._id})`);
          console.log(`  - assignedTo: ${leadAssignedId}`);
          console.log(`  - userId: ${userId}`);
          console.log(`  - match: ${leadAssignedId === userId}`);
        } else {
          console.log(`Lead "${lead.name}" has no assignedTo value`);
        }
      });
    }
    
    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads
    });
  } catch (err) {
    console.error('Error in getLeads:', err);
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Get single lead
// @route   GET /api/leads/:id
// @access  Private
exports.getLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate('assignedTo', 'fullName email')
      .populate('leadPerson', 'fullName email');
    
    console.log('Lead found:', lead ? lead._id : 'None');
    
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: `No lead found with id of ${req.params.id}`
      });
    }
    
    // Show detailed info for debugging
    console.log('Lead details:');
    console.log(`  - ID: ${lead._id}`);
    console.log(`  - Name: ${lead.name}`); 
    console.log(`  - AssignedTo ID: ${lead.assignedTo ? lead.assignedTo._id : 'None'}`);
    console.log(`  - AssignedTo Name: ${lead.assignedTo ? lead.assignedTo.fullName : 'None'}`);
    console.log(`  - Current User ID: ${req.user._id}`);
    
    const leadAssignedId = lead.assignedTo ? lead.assignedTo._id.toString() : null;
    const userId = req.user._id.toString();
    console.log(`  - String comparison: ${leadAssignedId === userId}`);
    
    // Check if user is authorized to view this lead
    if (
      req.user.role !== 'Admin' && 
      req.user.role !== 'Manager' && 
      lead.assignedTo.toString() !== req.user._id.toString() &&
      !(req.user.role === 'Lead Person' && 
        lead.leadPerson && 
        lead.leadPerson._id.toString() === req.user._id.toString())
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this lead'
      });
    }
    
    res.status(200).json({
      success: true,
      data: lead
    });
  } catch (err) {
    console.error('Error in getLead:', err);
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Create new lead
// @route   POST /api/leads
// @access  Private
exports.createLead = async (req, res) => {
  try {
    console.log('Creating new lead with data:', req.body);
    console.log('User creating lead:', {
      id: req.user._id,
      role: req.user.role,
      name: req.user.fullName
    });
    
    // If the user is a Lead Person, set them as the leadPerson
    if (req.user.role === 'Lead Person') {
      req.body.leadPerson = req.user._id.toString();
      console.log('Setting leadPerson to current user:', req.user._id.toString());
    }
    
    // If assignedTo is not specified or empty, assign to the current user
    if (!req.body.assignedTo) {
      req.body.assignedTo = req.user._id.toString();
      console.log('No assignedTo provided, using current user:', req.user._id.toString());
    } else {
      console.log('Using provided assignedTo:', req.body.assignedTo);
      // Ensure assignedTo is a string
      req.body.assignedTo = req.body.assignedTo.toString();
    }
    
    // Make sure creation timestamp is set
    req.body.createdAt = Date.now();
    req.body.updatedAt = Date.now();
    
    const lead = await Lead.create(req.body);
    console.log('Lead created successfully:', {
      id: lead._id,
      name: lead.name,
      assignedTo: lead.assignedTo,
      leadPerson: lead.leadPerson
    });
    
    res.status(201).json({
      success: true,
      data: lead
    });
  } catch (err) {
    console.error('Error creating lead:', err);
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Update lead
// @route   PUT /api/leads/:id
// @access  Private
exports.updateLead = async (req, res) => {
  try {
    let lead = await Lead.findById(req.params.id);
    
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: `No lead found with id of ${req.params.id}`
      });
    }
    
    // Check if user is authorized to update this lead
    if (
      req.user.role !== 'Admin' && 
      req.user.role !== 'Manager' && 
      lead.assignedTo.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this lead'
      });
    }
    
    // Update the updatedAt field
    req.body.updatedAt = Date.now();
    
    lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: lead
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Delete lead
// @route   DELETE /api/leads/:id
// @access  Private
exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: `No lead found with id of ${req.params.id}`
      });
    }
    
    // Check if user is authorized to delete this lead
    if (req.user.role !== 'Admin' && req.user.role !== 'Manager') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete leads'
      });
    }
    
    await lead.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
}; 