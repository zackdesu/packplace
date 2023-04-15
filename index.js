// All Imports
// Express modules
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import expressValidator from 'express-validator';

// Method Modules (put & delete)
import methodOverride from 'method-override';

// Database & Contact
import './utilities/db.js'
import Contact from './utilities/model.js'