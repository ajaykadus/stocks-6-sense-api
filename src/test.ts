import db from "./Connectors/PostGreSql"

db.one('select * from users')
    .then((res: any) => {
        console.log(res);
    });