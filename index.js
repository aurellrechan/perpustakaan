//inisiasi library
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")

//implementasi
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


// create MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "perpustakaan1"
})

db.connect(error => {
    if (error) {
        console.log(error.message)
    } else {
        console.log("MySQL Connected")
    }
})

//----------------------------DATA SISWA!!!!!!!--------------------------------

// end-point akses data siswa
app.get("/siswa", (req, res) => {
    // create sql query
    let sql = "select * from datasiswa"

    // run query
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                siswa: result // isi data
            }            
        }
        res.json(response) // send response
    })
})

// end-point akses data siswa berdasarkan id_siswa tertentu
app.get("/siswa/:id", (req, res) => {
    let datasiswa = {
        id_siswa: req.params.id
    }
    // create sql query
    let sql = "select * from datasiswa where ?"

    // run query
    db.query(sql, datasiswa, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                siswa: result // isi data
            }            
        }
        res.json(response) // send response
    })
})

// end-point menyimpan data siswa
app.post("/siswa", (req,res) => {

    // prepare data
    let siswa = {
        nama_siswa: req.body.nama_siswa,
        kelas: req.body.kelas,
        no_absen: req.body.no_absen
    }

    // create sql query insert
    let sql = "insert into datasiswa set ?"

    // run query
    db.query(sql, siswa, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response) // send response
    })
})

// end-point mengubah data siswa
app.put("/siswa/:id_siswa", (req,res) => {

    // prepare data
    let siswa = [
        // data
        {
            nama_siswa: req.body.nama_siswa,
            kelas: req.body.kelas,
            no_absen: req.body.no_absen
        },

        // parameter (primary key)
        {
            id_siswa: req.body.id_siswa
        }
    ]

    // create sql query update
    let sql = "update datasiswa set ? where ?"

    // run query
    db.query(sql, siswa, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response) // send response
    })
})

// end-point menghapus data siswa berdasarkan id_siswa
app.delete("/siswa/:id_siswa", (req,res) => {
    // prepare data
    let siswa = {
        id_siswa: req.params.id_siswa
    }

    // create query sql delete
    let sql = "delete from datasiswa where ?"

    // run query
    db.query(sql, siswa, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response) // send response
    })
})


//----------------------------DATA BUKU!!!!!!!--------------------------------

// end-point akses data buku
app.get("/buku", (req, res) => {
    // create sql query
    let sql = "select * from databuku"

    // run query
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                buku: result // isi data
            }            
        }
        res.json(response) // send response
    })
})

// end-point akses data buku berdasarkan id_buku tertentu
app.get("/buku/:id_buku", (req, res) => {
    let data = {
        id_buku: req.params.id_buku
    }
    // create sql query
    let sql = "select * from databuku where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                buku: result // isi data
            }            
        }
        res.json(response) // send response
    })
})

// end-point menyimpan data buku
app.post("/buku", (req,res) => {

    // prepare data
    let buku = {
        judul_buku: req.body.judul_buku,
        jmlh_hal_buku: req.body.jmlh_hal_buku,
        keterangan_kondisi_buku: req.body.keterangan_kondisi_buku
    }

    // create sql query insert
    let sql = "insert into databuku set ?"

    // run query
    db.query(sql, buku, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data sudah masuk"
            }
        }
        res.json(response) // send response
    })
})

// end-point mengubah data buku
app.put("/buku/:id_buku", (req,res) => {

    // prepare data
    let buku = [
        // data
        {

        judul_buku: req.body.judul_buku,
        jmlh_hal_buku: req.body.jmlh_hal_buku,
        keterangan_kondisi_buku: req.body.keterangan_kondisi_buku

        },

        // parameter (primary key)
        {
            id_buku: req.body.id_buku
        }
    ]

    // create sql query update
    let sql = "update databuku set ? where ?"

    // run query
    db.query(sql, buku, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data udah diupdate"
            }
        }
        res.json(response) // send response
    })
})

// end-point menghapus data buku berdasarkan id_buku
app.delete("/buku/:id_buku", (req,res) => {
    // prepare data
    let buku = {
        id_buku: req.params.id_buku
    }

    // create query sql delete
    let sql = "delete from databuku where ?"

    // run query
    db.query(sql, buku, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data udah dihapus"
            }
        }
        res.json(response) // send response
    })
})


app.listen(8000, () => {
    console.log("jadi tauk")
})

