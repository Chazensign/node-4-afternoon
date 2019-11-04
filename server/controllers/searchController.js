const swag = require('../models/swag')

module.exports = {
  search: (req, res) => {
    if (req.query.category) {
      let filteredSwag = swag.filter(item => item.category === req.query.category)
      res.status(200).send(filteredSwag)
    } else {
      res.status(200).send(swag)
    }
  }
}