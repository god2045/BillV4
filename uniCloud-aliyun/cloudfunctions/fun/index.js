let db = uniCloud.database({
  throwOnNotFound: false,
})
exports.main = async (event, context) => {
  if (event.opi === 'publish') {
    return await db.collection('message').add({
      content: event.content,
    })
  }

  return event.content
};