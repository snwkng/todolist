const boom = require('boom')

const genericCrud = (model) => ({
  async getTodoFromGroups ({ params: { groupID }, res }) {
    try {
      const items = await model.find({ todo_group: groupID })
      return res.status(200).send(items)
    } catch (error) {
      return res.status(400).send(boom.boomify(error))
    }
  },
  async get ({ params: { id }, res }) {
    try {
      const item = await model.findById(id)
      return res.status(200).send(item)
    } catch (error) {
      return res.status(400).send(boom.boomify(error))
    }
  },
  async getAll (_, res) {
    try {
      const items = await model.find()
      return res.status(200).send(items)
    } catch (error) {
      return res.status(400).send(boom.boomify(error))
    }
  },
  async create ({ body }, res) {
    try {
      // eslint-disable-next-line new-cap
      const item = new model(body)
      const newItem = await item.save()
      return res.status(200).send(newItem)
    } catch (error) {
      return res.status(400).send(boom.boomify(error))
    }
  },
  async update ({ params: { id }, body }, res) {
    try {
      const item = await model.findByIdAndUpdate(id, body, { new: true })
      return res.status(200).send(item)
    } catch (error) {
      return res.status(400).send(boom.boomify(error))
    }
  },
  async delete ({ params: { id } }, res) {
    try {
      await model.findByIdAndDelete(id)
      return res.status(200).send({ status: 'OK', message: 'Todo has been deleted' })
    } catch (error) {
      return res.status(400).send(boom.boomify(error))
    }
  }
})

module.exports = genericCrud
