const multer = require('multer')

const storage = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, 'src/assets/images/avatars')
  },
  filename (req, file, cb) {
    cb(null, `${file.originalname}`)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

module.exports = multer({
  storage,
  fileFilter
})
