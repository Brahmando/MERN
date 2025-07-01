const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient;

const url = 'mongodb+srv://powerangerinfinite123:n2n1RXzFsHFfzmNJ@mongocluster.pe7odxo.mongodb.net/?retryWrites=true&w=majority&appName=MongoCluster';


let _dbHouses;
let _dbFavs;
const dbConnect=(callback) =>{

    MongoClient.connect(url).then((client) => {
        console.log(client)
        _dbHouses = client.db('RentHome'); // just this line will not creat the database. Insert something first

        _dbFavs=client.db('Favourites')

        // for(let i=0;i<5;i++){

        //     await db.collection('houses').insertOne({ name: `My House-${i}` });
        // }

        // const cursor = db.collection('houses').find({ name: 'My House-4' });
        // const result = await cursor.toArray();
        // console.log('cursor',result);

        // const cursor = await db.collection('houses').find({ name: 'My House-4' });
        
        // console.log('cursor-',await cursor.toArray());


        callback()
        
    }).catch((err)=>{
        console.log('error arised-',err)
    })
}

const getDB = () => {
    console.log(_dbHouses)
    if (_dbHouses) {
        return _dbHouses;
    } else {
        throw new Error('Database connection not established');
    }
}

const getFavs=()=>{
    console.log(_dbFavs)
    if (_dbFavs) {
        return _dbFavs;
    } else {
        throw new Error('Favorites Databases connection not established');
    }
}

exports.dbConnect=dbConnect;
exports.getDB=getDB;
exports.getFavs=getFavs;