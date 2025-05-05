const mongoose = require('mongoose');
const User = require('../models/userModel'); 

// mongodb shema form data
const formDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: /^.+@.+\..+$/
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'archived'],
    default: 'new'
  }
});

// to create the data model if i delete the table
let FormData;
try {
  FormData = mongoose.model('FormData');
} catch (e) {
  FormData = mongoose.model('FormData', formDataSchema);
}

// Submit form data
exports.submitForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false,
        message: 'All fields are required' 
      });
    }

    //new form submission
    const formSubmission = new FormData({
      name,
      email,
      subject,
      message
      // createdAt and status will use default values
    });

    // Save to mongus 
    await formSubmission.save();

    res.status(201).json({
      success: true,
      message: 'Form submitted successfully',
      data: formSubmission
    });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while processing form' 
    });
  }
};

// Get all form submissions (goes to emplyoee page)
exports.getAllForms = async (req, res) => {
  try {
    const forms = await FormData.find().sort({ createdAt: -1 });
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update form status (same deal)
exports.updateFormStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['new', 'read', 'replied', 'archived'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }
    
    const form = await FormData.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true, runValidators: true }
    );
    
    if (!form) {
      return res.status(404).json({
        success: false,
        message: 'Form submission not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: form
    });
  } catch (error) {
    console.error('Error updating form status:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while updating form status' 
    });
  }
};
