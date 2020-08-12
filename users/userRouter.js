const express = require('express');
const { validateUserID } = require("../middleware/user")

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId() {
  return (req, res, next) => {
      users.getById(req.params.id)
          .then((user) => {
              if (user) {
                  // attach user data to the request so we can access later
                  req.user = user
                  // move on to next piece of middleware if user is valid
                  next()
              } else {
                  // if user isn't found send error and don't move down the middleware stack
                  res.status(404).json({
                      message: "User not found"
                  })
              }
          })
          .catch(next)
  }
}

function validateUser() {
  return (req, res, next) => {
      if (!req.body) {
          return res.status(400).json({
              message: "Missing user data"
          })
      } else if (!req.body.name) {
              return res.status(400).json({
                  message: "Missing required name field"
              })
          }
          next()
      }
  }

function validatePost() {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({
        message: "Missing post data"
      })
    } else if (!req.body.text) {
      return res.status(400).json({
        message: "Missing required text field"
      })
    }
      next()
   }
}

module.exports = router;
