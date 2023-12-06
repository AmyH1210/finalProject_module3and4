const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');


const app = express(); 
app.use(express.json());// accept json response

const JWT_KEY="This_IS_A_SECRET_KEY"

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200
  };

  // Receive requests from a front-end port
 app.use(cors(corsOptions));
 app.use(cookieParser());
 
//allow us to access to .env
require('dotenv').config();


const port = process.env.PORT;  // default port to listen
  
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });
  
 
  
  // Middleware function for database connection
  app.use(  
    async function(req, res, next) {
    try {
  
      //connecting to database
      req.db = await pool.getConnection();
      req.db.connection.config.namedPlaceholders = true;
  
      await req.db.query(`SET SESSION sql_mode = "TRADITIONAL"`);
      await req.db.query(`SET time_zone = '-8:00'`);
  
      await next();
  
        // Release connection to the database when finished
      req.db.release();
    } catch (err) {
      console.log(err);
  
      if (req.db) req.db.release();
      throw err;
    }
  });
  

    
    // a middleware function to check our JWT is valid
    const authenticateJWT = (req, res, next) => {
      const authHeader = req.headers.authorization;
    
      if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, JWT_KEY, (err, user) => {
          if (err) {
            return res.sendStatus(403);
          }
          req.user = user;
          next();
        });
      } else {
        res.sendStatus(401);
      }
    };
     
    


  app.post('/authentication',  async (req, res) => {
    try {
      const { email, password } = req.body;

      // Query the database to find a user with the specified email
      const [[user]] = await req.db.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );

      if (user) {
        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
          // If the password is valid, generate a JWT token
          const token = jwt.sign({ id: user.id, email: user.email }, JWT_KEY);
          // Respond to the client with a JSON object containing the generated JWT
          res.json({ jwt: token });
        } else {
          // If the password is invalid, send a 401 Unauthorized response
          res.status(401).send('Email or password incorrect');
        }
      } else {
        // If no user is found, send a 401 Unauthorized response
        res.status(401).send('Email or password incorrect');
      }
    } catch (err) {
      // Handle any errors that occurred during the execution of the try block
      res.status(500).json({ success: false, message: err.message, data: null });
    }
  });

//signup=register user
app.post('/signup',async function(req, res) {
  try {
  
    const { email, password } = req.body;
  
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

  // Insert the hashed password into the MySQL database
    const query = await req.db.query(
      `INSERT INTO users (email, password) 
      VALUES (?, ?)`,
      [email, hashedPassword]
      
  );

      // Generate a JWT token for the newly created user
      const encodeUser = jwt.sign({ 
          userId: query.insertId, 
          ...req.body }, 
          process.env.JWT_KEY
          );
          console.log(encodeUser);
          
            res.json({ jwt: encodeUser, isError: false });
          } catch (err) {
            console.log("error", err);
            res.json({ jwt: null, isError: true });
          }
    });


//login the user
    app.post('/login',   async function (req, res) {
        try {
          const { email, password } = req.body;

          // Use async/await to wait for the query result
          const [user] = await req.db.query('SELECT * FROM users WHERE email=?', [email]);

          if (user.length > 0) {
            const storedHashedPassword = user[0].password;

            // Compare the provided password with the hashed password stored in the database
            const isPasswordValid = await bcrypt.compare(password, storedHashedPassword);

            if (isPasswordValid) {
              // If the password is valid, create a payload
              const payload = {
                userId: user[0].id,
                email: user[0].email,
              };

              // Generate an access token
              const accessToken = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' });

              // Return the access token in the headers
              res.header('Authorization', `Bearer ${accessToken}`);
              res.status(200).json({ message: 'Login successful', accessToken });
            } else {
              // Send an appropriate response when the password is invalid
              res.status(401).json({ message: 'Invalid email or password' });
            }
          } else {
            // Send an appropriate response when the user is not found
            res.status(401).json({ message: 'Invalid email or password' });
          }
        } catch (err) {
          console.error('Error in /login route:', err);
          res.status(500).json({ success: false, message: err.message, data: null });
        }
});

    

        // Endpoint to retrieve all users from the database
  app.get('/users',  async function(req, res) {
          try {
            const [user] = await req.db.query(
              'SELECT * FROM users;'
              );
            res.json({ success: true, message: 'User data retrieved successfully', data: user });
            console.log(`/users`)
          } catch (err) {
            res.json({ success: false, message: err, data: null });
          }
        });
    
    // Start the server and listen on the specified port
  app.listen(port, () => console.log(`212 API Example listening on http://localhost:${port}`));
    

  
