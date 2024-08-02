const { body, validationResult } = require("express-validator");

const productValidationRules = () => [
	body("name").optional().notEmpty().withMessage("Name is required"),
	body("description")
		.optional()
		.notEmpty()
		.withMessage("Description is required"),
	body("price").optional().isNumeric().withMessage("Price must be a number"),
	body("category").optional().notEmpty().withMessage("Category is required"),
	body("platform").optional().notEmpty().withMessage("Platform is required"),
	body("imageUrl").optional().isURL().withMessage("Invalid URL for image"),
	body("developer").optional().notEmpty().withMessage("Developer is required"),
	body("publisher").optional().notEmpty().withMessage("Publisher is required"),
	body("releaseDate")
		.optional()
		.isISO8601()
		.toDate()
		.withMessage("Invalid release date"),
];

const userValidationRules = () => [
	body("email")
		.isEmail()
		.withMessage("Please provide a valid email")
		.custom(async (email) => {
			const user = await User.findOne({ email });
			if (user) {
				throw new Error("Email already exists");
			}
			return true;
		}),
	body("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),
	body("firstName").not().isEmpty().withMessage("First name is required"),
	body("lastName").not().isEmpty().withMessage("Last name is required"),
	body("userType")
		.optional()
		.isIn(["user", "admin"])
		.withMessage("Invalid user type"),
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

