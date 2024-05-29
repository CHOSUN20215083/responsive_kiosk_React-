const { param } = require("express/lib/router");
//const poolPromise = require("./db.js");

// constructor
const Tutorial = function(tutorial) {
  this.title = tutorial.title;
  this.description = tutorial.description;
  this.published = tutorial.published;
};

Tutorial.create = (newTutorial, result) => {
  result(null, 1);
  // sql.query("INSERT INTO tutorials SET ?", newTutorial, (err, res) => {
  //   if (err) {
  //     console.log("error: ", err);
  //     result(err, null);
  //     return;
  //   }

  //   console.log("created tutorial: ", { id: res.insertId, ...newTutorial });
  //   result(null, { id: res.insertId, ...newTutorial });
  // });
};
function formatDate(dt) {
  const date = new Date(dt);

  console.log("hfdiuh",date,dt);
  const formattedTimeString = date.getUTCFullYear() + '-' +
    ('0' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
    ('0' + date.getUTCDate()).slice(-2) + ' ' +
    ('0' + date.getUTCHours()).slice(-2) + ':' +
    ('0' + date.getUTCMinutes()).slice(-2) + ':' +
    ('0' + date.getUTCSeconds()).slice(-2);
  // 拼接成最终的字符串
  return `'${formattedTimeString}'`;
}



Tutorial.findById = async(params, res) => {

  condition_sql = buildWhereClause(params)
  query_sql = "SELECT TOP 20 * FROM [dbo].[TAcceptEvent] " + condition_sql + " ORDER BY 开始受理时刻 DESC";
  console.log('query_sql : ',query_sql,params);

  poolPromise.then(pool => {  
    return pool.request()  
        .query(
          query_sql
        )  
        .then(result => {  
            //console.dir(result);  
            //pool.close();  
            res(null, result.recordset);
            return;
        })  
        .catch(err => {  
            console.log(err);  
        });  
    }).catch(err => {  
        console.log(err);  
    });

    function buildWhereClause(params) {  
      let whereClause = '';  
      let firstParam = true;  
      
      // 检查每个参数并构建 WHERE 子句  
      if (params['主诉'] && params['主诉'].trim() !== '') {  
        if (!firstParam) {  
          whereClause += ' AND ';  
        }else {
          whereClause += ' WHERE ';  
        }  
        whereClause += (`主诉 LIKE '%` + params['主诉'] + `%'`);  
        firstParam = false;  
      }  
      
      if (params['送往地点'] && params['送往地点'].trim() !== '') {  
        if (!firstParam) {  
          whereClause += ' AND ';  
        }else {
          whereClause += ' WHERE ';  
        }   
        whereClause += (`送往地点 LIKE '%` + params['送往地点'] + `%'`);  
        firstParam = false;  
      }  
      
      if (params['病种判断'] && params['病种判断'].trim() !== '') {  
        if (!firstParam) {  
          whereClause += ' AND ';  
        }  else {
          whereClause += ' WHERE ';  
        } 
        whereClause += (`病种判断 LIKE '%` + params['病种判断'] + `%'`);  
        firstParam = false;  
      }  

      if (params['开始受理时刻'] && params['开始受理时刻'].trim() !== '' && params['开始受理时刻'].trim() !== 'null') {  
        const time = params['开始受理时刻'].split(",");
        if (!firstParam) {  
          whereClause += ' AND ';  
        }  else {
          whereClause += ' WHERE ';  
        } 
        whereClause += (`开始受理时刻 BETWEEN ` + formatDate(time[0]) + ` AND ` + formatDate(time[1]));  
        firstParam = false;  
      }  
      
      return whereClause;  
    }  
  // try {  

  //   console.log('===========pool',pool)
  //     // 创建一个新的请求对象  
  //     const request = pool.request();  
        
  //     // 执行查询  
  //     const result = await request.query('SELECT * FROM [dbo].[TAcceptEvent]');  
        
  //     // 发送响应  
  //     res.json(result.recordset);  
  // } catch (err) {  
  //     // 错误处理  
  //     console.error('Error executing query:', err);  
  //     res.status(500).send('Internal Server Error');  
  // }  
  // sql.query(`SELECT * FROM tutorials WHERE id = ${id}`, (err, res) => {
  //   if (err) {
  //     console.log("error: ", err);
  //     result(err, null);
  //     return;
  //   }

  //   if (res.length) {
  //     console.log("found tutorial: ", res[0]);
  //     result(null, res[0]);
  //     return;
  //   }

  //   // not found Tutorial with the id
  //   result({ kind: "not_found" }, null);
  // });
};


Tutorial.findById1 = async(params, res) => {

  condition_sql = buildWhereClause(params)
  query_sql = "SELECT TOP 100 * FROM [dbo].[TAcceptEvent] " + condition_sql + " ORDER BY 开始受理时刻 DESC";
  console.log('query_sql : ',query_sql,params);

  poolPromise.then(pool => {  
    return pool.request()  
        .query(
          query_sql
        )  
        .then(result => {  
            //console.dir(result);  
            //pool.close();  
            res(null, result.recordset);
            return;
        })  
        .catch(err => {  
            console.log(err);  
        });  
    }).catch(err => {  
        console.log(err);  
    });

    function buildWhereClause(params) {  
      let whereClause = '';  
      let firstParam = true;  
      
      // 检查每个参数并构建 WHERE 子句  
      if (params['主诉'] && params['主诉'].trim() !== '') {  
        if (!firstParam) {  
          whereClause += ' AND ';  
        }else {
          whereClause += ' WHERE ';  
        }  
        whereClause += (`主诉 LIKE '%` + params['主诉'] + `%'`);  
        firstParam = false;  
      }  
      
      if (params['送往地点'] && params['送往地点'].trim() !== '') {  
        if (!firstParam) {  
          whereClause += ' AND ';  
        }else {
          whereClause += ' WHERE ';  
        }   
        whereClause += (`送往地点 LIKE '%` + params['送往地点'] + `%'`);  
        firstParam = false;  
      }  
      
      if (params['病种判断'] && params['病种判断'].trim() !== '') {  
        if (!firstParam) {  
          whereClause += ' AND ';  
        }  else {
          whereClause += ' WHERE ';  
        } 
        whereClause += (`病种判断 LIKE '%` + params['病种判断'] + `%'`);  
        firstParam = false;  
      }  

      if (params['开始受理时刻'] && params['开始受理时刻'].trim() !== '' && params['开始受理时刻'].trim() !== 'null') {  
        const time = params['开始受理时刻'].split(",");
        if (!firstParam) {  
          whereClause += ' AND ';  
        }  else {
          whereClause += ' WHERE ';  
        } 
        whereClause += (`开始受理时刻 BETWEEN ` + formatDate(time[0]) + ` AND ` + formatDate(time[1]));  
        firstParam = false;  
      }  
      
      return whereClause;  
    } 
}

Tutorial.getAll = (title, result) => {
  let query = "SELECT * FROM tutorials";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tutorials: ", res);
    result(null, res);
  });
};

Tutorial.getAllPublished = result => {
  sql.query("SELECT * FROM tutorials WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tutorials: ", res);
    result(null, res);
  });
};

Tutorial.updateById = (id, tutorial, result) => {
  sql.query(
    "UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?",
    [tutorial.title, tutorial.description, tutorial.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tutorial: ", { id: id, ...tutorial });
      result(null, { id: id, ...tutorial });
    }
  );
};

Tutorial.remove = (id, result) => {
  sql.query("DELETE FROM tutorials WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tutorial with id: ", id);
    result(null, res);
  });
};

Tutorial.removeAll = result => {
  sql.query("DELETE FROM tutorials", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} tutorials`);
    result(null, res);
  });
};

module.exports = Tutorial;
