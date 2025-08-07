/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4002712837")

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "bool271442091",
    "name": "done",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4002712837")

  // remove field
  collection.fields.removeById("bool271442091")

  return app.save(collection)
})
