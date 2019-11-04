const swag = require('../models/swag')

module.exports = {
  add: (req, res) => {
    if (req.params.id) {
      let exist = req.session.user.cart.find(item => item.id === +req.params.id)
      if (exist) {
        res.status(200).send(req.session.user)
      }else {
        let item = swag.find(prod => {
          return prod.id === +req.params.id
        })
        req.session.user.cart.push(item)
        req.session.user.total += item.price
        res.status(200).send(req.session.user)
      }
    }
  },
  delete: (req, res) => {
    if (req.params.id) {
      let index = req.session.user.cart.findIndex(item => item.id === +req.params.id)
      
      let item = req.session.user.cart[index]
      req.session.user.cart.splice(index, 1)
      req.session.user.total -= item.price
      res.status(200).send(req.session.user)
    }
  },
  checkout: (req, res) => {
    req.session.user.cart = []
    req.session.user.total = 0
    res.status(200).send(req.session.user)
  }
}