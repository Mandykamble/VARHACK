var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Load input validation
const validateRegisterInput = require("../validations/register");
const validateLoginInput = require("../validations/login");

// Load User model
const User = require("../models/users.model");

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

// Getting one user
router.get("/:id", function(req, res) {
    User.findById(req.params.id).then(user => 
        res.json(user)
    )
    .catch(err => console.log(err));
});

// POST request 
// Add a user to db
router.post("/register", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
        return res.status(400).json({ email: "Email already exists" });
        } else {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            phone_number: req.body.phone_number,
            // skills: req.body.skills
        });
        
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
                .save()
                .then(user => {
                    res.status(200).json(user);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
            });
        });
        }
    });
});

// PUT Request
// Edit User Details
router.route('/edit_profile/:id').put((req, res, next) => {
    User.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, (error, data) => {
      if (error) {
        return next(error);
        console.log(error)
      } else {
        res.json(data)
        console.log('Student updated successfully !')
      }
    })
})


// POST request 
// Login
router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    console.log(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).send({ message: "Email not found" });
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };
                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );


            } else {
                return res
                .status(400)
                .send({ message: " Password incorrect" });
            }
        });
    });
});

// router.post('/login', async (req, res) => {
//     // Get the username and password from the request body
//     const { email, password } = req.body;
  
//     // Find the user with the matching username
//     const user = users.find(u => u.email === email);
  
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
  
//     try {
//       // Compare the user's input password with the hashed password using bcrypt
//       const match = await bcrypt.compare(password, user.password);
  
//       if (match) {
//         // Create a JWT token with the user ID as the payload
//         const token = jwt.sign({ userId: user.id }, 'my_secret_key');
  
//         // Return the token as a JSON response
//         res.json({ token });
//       } else {
//         return res.status(401).json({ message: 'Invalid credentials' });
//       }
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//   });
  



router.delete('/del_user/:id', (req,res) => {
    User.findById(req.params.id).then(user => 
        user.remove().then(() => res.json({success: true}))
    )
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;
