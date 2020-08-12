const express = require('express')
const postDb = require("./postDb")

const router = express.Router();

// router.get('/', validatePostId(), (req, res) => {
//   postDb.get(req.query)
//     .then((posts) => {
//       res.status(200).json(posts)
//     })
//     .catch((error) => {
//       next(error)
//     })
// });

// router.get('/:id', validatePostId(), (req, res) => {
//   postDb.getById(req.params.id)
//     .then((post) => {
//       if (post) {
//         res.status(200),json(post)
//       }
//     })
//     .catch((error) => {
//       next(error)
//     })
// });

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId() {
  return (req, res, next) => {
    postDb.getById(req.params.id)
        .then((post) => {
          if (post) {
            req.post = post
            next()
          } else {
            res.status(404).json({
              message: "Post not found"
            })
          }
        })
        .catch((error) => {
          next(error)
        })
     }  
}

module.exports = router;
