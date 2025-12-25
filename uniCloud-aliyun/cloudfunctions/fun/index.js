let db = uniCloud.database({
  throwOnNotFound: false,
})
exports.main = async (event, context) => {
  if (event.api === 'publish') {
    return await db.collection('message').add({
      content: event.content,
    })
  }

  if (event.api === 'addBill') {
    return await db.collection('message').add({
      typeLX: event.typeLX,
      typeLB: event.typeLB,
      money: event.money,
      date: event.date,
      content: event.content,
    })
  }

  if (event.api === 'showBill') {
    return await db.collection('message').get()
  }

  return event.content
};