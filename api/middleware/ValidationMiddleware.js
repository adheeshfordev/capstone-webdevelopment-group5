const { body, validationResult } = require('express-validator');

const productValidationRules = () => {
  return [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('category').notEmpty().withMessage('Category is required'),
    body('platform').notEmpty().withMessage('Platform is required'),
    body('imageUrl').isURL().withMessage('Image URL must be valid'),
    body('developer').notEmpty().withMessage('Developer is required'),
    body('publisher').notEmpty().withMessage('Publisher is required'),
    body('releaseDate').isISO8601().withMessage('Release Date must be a valid date'),
  ];
};

const userValidationRules = () => [
    body('email')
        .isEmail().withMessage('Please provide a valid email')
        .custom(async (email) => {
            const user = await User.findOne({ email });
            if (user) {
                throw new Error('Email already exists');
            }
            return true;
        }),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('firstName').not().isEmpty().withMessage('First name is required'),
    body('lastName').not().isEmpty().withMessage('Last name is required'),
    body('userType').optional().isIn(['user', 'admin']).withMessage('Invalid user type')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
    userValidationRules,
    productValidationRules, 
    validate,
};