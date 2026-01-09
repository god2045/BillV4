const {
  start
} = require("repl");

let db = uniCloud.database({
  throwOnNotFound: false,
})
exports.main = async (event, context) => {
  if (event.api === 'billData') {
    const db = uniCloud.database();
    const $ = db.command.aggregate;

    return await db.collection('message')
      .aggregate()
      .match({
        date: db.command.and([
          db.command.gte(event.startDate),
          db.command.lte(event.endDate)
        ])
      })
      .addFields({
        // 使用算术运算将字符串转换为数字
        moneyNum: $.add([{
            $multiply: [{
              $toDouble: {
                $ifNull: ["$money", "0"]
              }
            }, 1]
          },
          0
        ])
      })
      .group({
        _id: {
          typeLX: '$typeLX',
          date: '$date'
        },
        total: $.sum('$moneyNum'),
        count: $.sum(1)
      })
      .project({
        _id: 0,
        typeLX: '$_id.typeLX',
        date: '$_id.date',
        total: 1,
        count: 1
      })
      .sort({
        date: -1
      })
      .end();
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