import SQL from 'sql';

let db = function(){
    'use strict';
    return {
        ini:function(){
            return new SQL.Database();
        },
        create:function(db,table,fields){
            return db.run(`CREATE TABLE ${table}(${fields});`);
        }
    }
}();

let table = function(){
    'use strict';
    return {
        insert:function(db,table,values){
            return db.run(`INSERT INTO ${table} VALUES (?,?,?,?)`, values);
        },
        view:function(db,sql){
            let stmt = db.prepare(sql);
            return stmt.getAsObject({$start:1, $end:1});
        },
        manipulate:function(){

        }     
    }
}();

let dbase = db.ini();
db.create(dbase,'tbl_admin',`id,name,address,email`);
table.insert(dbase,`tbl_admin`,[1,'Rufo N. Gabrillo JR.','Macabito Calasiao Pangasinan','rufo.gabrillo@gmail.com']);

let admin = table.view(dbase,`SELECT * FROM tbl_admin`);
console.log(admin);

let content = `
Name: ${admin.name} <br/>
Address: ${admin.address} <br/>
Email: ${admin.email} <br/>
`;

document.getElementById('root').innerHTML = content;
