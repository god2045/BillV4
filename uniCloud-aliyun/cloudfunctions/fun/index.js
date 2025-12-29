const {
  start
} = require("repl");

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
    const now = new Date();
    const createTime = now.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(/\//g, '-');
    return await db.collection('message').add({
      typeLX: event.typeLX,
      typeLB: event.typeLB,
      money: event.money,
      date: event.date,
      content: event.content,
      createTime: createTime,
      timestamp: Date.now()
    })
  }

  if (event.api === 'showBill') {
    return await db.collection('message').where({
        date: db.command.and([
          db.command.gte(event.startDate),
          db.command.lte(event.endDate)
        ])
      }).orderBy("date", "desc").orderBy("createTime", "desc").skip(event.page)
      .limit(event.size).get()
  }

  return event.content
};