const db = require('../Connect.js')
const url = require('url')
const { resolve } = require('path')

const getMarket=((req,res)=>{
    const sql = "SELECT * FROM jenisbarang"
    db.query(sql, (err,result)=>{
        if(err) throw err
        const market = JSON.parse(JSON.stringify(result))
        const sql1 = `SELECT * FROM transaksi JOIN barang ON transaksi.id_barang = barang.Id_barang` 
        db.query(sql1,(err,result)=>{
            if(err) throw err
            const barang1 = JSON.parse(JSON.stringify(result))
            const sql2=`SELECT SUM(harga) value1 FROM barang JOIN transaksi ON barang.Id_barang=transaksi.id_barang`
            db.query(sql2,(err,result)=>{
                if(err) throw err
                const barang2 = JSON.parse(JSON.stringify(result))
                res.render('jenisBarang',{markets:market,barangs1:barang1, barangs2:barang2})
            })
        })
    })
})

const getBarang=((req,res)=>{
    const sql = "SELECT * FROM barang where id_jenisBarang = ?"
    db.query(sql, req.params.Id_JenisBarang,(err,result)=>{
        if(err)throw err
        const barang = JSON.parse(JSON.stringify(result))
        const sql1 = `SELECT * FROM transaksi JOIN barang ON transaksi.id_barang = barang.Id_barang` 
        db.query(sql1,(err,result)=>{
            if(err) throw err
            const barang1 = JSON.parse(JSON.stringify(result))
            const sql2=`SELECT SUM(harga) value1 FROM barang JOIN transaksi ON barang.Id_barang=transaksi.id_barang`
            db.query(sql2,(err,result)=>{
                if(err) throw err
                const barang2 = JSON.parse(JSON.stringify(result))
                const sql3 = `SELECT Id_JenisBarang FROM jenisbarang WHERE Id_JenisBarang= '${req.params.Id_JenisBarang}'`
                db.query(sql3, (err, result)=>{
                    if(err) throw err
                    const barang3 = JSON.parse(JSON.stringify(result))
                    res.render('Barang', {barangs1:barang1, barangs:barang, barangs2:barang2, barangs3:barang3})
                })
            })
        })
    })
})
const ChooseBarang=((req,res)=>{
    const sql = "INSERT INTO transaksi(id_barang) Values(?)"
    db.query(sql,req.params.Id_barang,(err,result)=>{
        if(err)throw err
        res.redirect('back')
    })
})

const DoneTransaksi =((req,res)=>{
    const sql = "DELETE FROM transaksi"
    db.query(sql,(err,result)=>{
        if(err)throw err
       res.redirect('back')
    })
})

const TambahJenis = ((req,res)=>{
    const sql = `INSERT INTO jenisbarang(JenisBarang) VALUES ('${req.body.barang}')`
    db.query(sql,(err,result)=>{
        if(err) throw err
      res.redirect('/')  
    })
})
const TambahBarang = ((req,res)=>{
    console.log(req.url)
    const sql = `INSERT INTO barang(Nama_barang, harga, jumlah, id_jenisBarang) VALUES ('${req.body.nama}','${req.body.harga}', '${req.body.jumlah}','${req.body.id_jenis}')`
    db.query(sql,(err,result)=>{
        if(err) throw err
      res.redirect('back')  
    })
})
const cancelT = ((req,res)=>{
    let id = req.params.id_transaksi
    const sql = "DELETE FROM transaksi WHERE id_transaksi = ?"
    db.query(sql, id, (err,result)=>{
        if(err) throw err
        res.redirect('back')
    })
})
const cari= ((req,res)=>{
    const sql = `SELECT * FROM jenisbarang WHERE JenisBarang LIKE '%${req.body.cariJenis}%'`
    db.query(sql,(err,result)=>{
        if(err) throw err
        const market = JSON.parse(JSON.stringify(result))
        const sql1 = `SELECT * FROM transaksi JOIN barang ON transaksi.id_barang = barang.Id_barang` 
        db.query(sql1,(err,result)=>{
            if(err) throw err
            const barang1 = JSON.parse(JSON.stringify(result))
            const sql2=`SELECT SUM(harga) value1 FROM barang JOIN transaksi ON barang.Id_barang=transaksi.id_barang`
            db.query(sql2,(err,result)=>{
                if(err) throw err
                const barang2 = JSON.parse(JSON.stringify(result))
                res.render('jenisBarang', {markets : market, barangs1:barang1, barangs2:barang2})
            })
        })
    }) 
})

const cariBarang= ((req,res)=>{
    const sql = `SELECT * FROM barang WHERE Nama_barang LIKE '%${req.body.cari}%'`
    db.query(sql,(err,result)=>{
        if(err) throw err
        const barang = JSON.parse(JSON.stringify(result))
        const sql1 = `SELECT * FROM transaksi JOIN barang ON transaksi.id_barang = barang.Id_barang` 
        db.query(sql1,(err,result)=>{
            if(err) throw err
            const barang1 = JSON.parse(JSON.stringify(result))
            const sql2=`SELECT SUM(harga) value1 FROM barang JOIN transaksi ON barang.Id_barang=transaksi.id_barang`
            db.query(sql2,(err,result)=>{
                if(err) throw err
                const barang2 = JSON.parse(JSON.stringify(result))
                const sql3 = `SELECT Id_JenisBarang FROM jenisbarang WHERE Id_JenisBarang='${req.params.Id_JenisBarang}'`
                db.query(sql3, (err, result)=>{
                    if(err) throw err
                    const barang3 = JSON.parse(JSON.stringify(result))
                    res.render('Barang', {barangs1:barang1, barangs:barang, barangs2:barang2, barangs3:barang3})
                })
            })
        })
    })
})
module.exports={getMarket, getBarang, ChooseBarang, DoneTransaksi, TambahJenis, TambahBarang, cancelT, cari, cariBarang}