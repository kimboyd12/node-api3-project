const express = require('express')
const userDb = require("./userDb")
const postDb = require("../posts/postDb");
const e = require('express');

const router = express.Router();

router.post('/', validateUser(), (req, res) => {
  userDb.insert(req.body)
      .then((user) => {
        res.status(201).json(user)
      })
      .catch((error) => {
        next(error)
      })
});

router.post('/:id/posts', validateUserId(), validatePost(), (req, res) => {
  req.body.user_id = req.params.id
  postDb.insert(req.body)
    .then((post) => {
      res.status(201).json(post)
    })
    .catch((error) => {
      next(error)
    })
});

router.get('/', (req, res) => {
    userDb.get(req.query)
      .then((users) => {
        res.status(200).json(users)
      })
      .catch((error) => {
        next(error)
      })
});

router.get('/:id', validateUserId(), (req, res) => {
  res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId(), (req, res) => {
  userDb.getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((error) => {
      next(error)
    })
});

router.delete('/:id', validateUserId(), (req, res) => {
  userDb.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: "The user has been deleted"
        })
      } else {
        res.status(404).json({
          message: "The user could not be found"
        })
      }
    })
    .catch((error) => {
      next(error)
    })
});

router.put('/:id',validateUser(), validateUserId(), (req, res) => {
  userDb.update(req.params.id, req.body)
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((error) => {
      next(error)
    })
});



//custom middleware

function validateUserId() {
  return (req, res, next) => {
      userDb.getById(req.params.id)
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
