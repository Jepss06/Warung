const express = require('express')
const router = express.Router()

const {
    getMarket,
    getBarang,
    ChooseBarang,
    DoneTransaksi,
    TambahJenis,
    TambahBarang,
    cancelT,
    cari,
    cariBarang
} = require('../controller/market.js')

router.get('/', getMarket)
router.get('/barang/:Id_JenisBarang', getBarang)
router.get('/pilih/:Id_barang', ChooseBarang)
router.get('/selesai', DoneTransaksi)
router.post('/tambahJenis', TambahJenis)
router.get('/cancel/:id_transaksi', cancelT)
router.post('/tambahBarang', TambahBarang)
router.post('/cariJenis', cari)
router.post('/cariBarang', cariBarang)


module.exports = router