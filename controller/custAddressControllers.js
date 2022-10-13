const create = async(req, res) => {

    try {
        const newAddress = {
            cust_id: req.body.cust_id,
            city: req.body.city,
            province: req.body.province,
            line:req.body.line,
            zip_code: req.body.zip_code
        }

        await req.uC.custAddressUC.Create(newAddress);

        return res
        .status(201)
        .json({
            meassage: 'Berhasil menambahkan alamat baru.'
        });
    } catch (error) {
        return res
        .status(error.status || 500)
        .json({
            message: error.message || 'Internal server error.'
        })
    }
};

const findAll = async(req, res) => {

    const id = req.body.cust_id;
    try {
        let address = await req.uC.custAddressUC.FindAll(id);

        return res
        .status(200)
        .json({
            message: `Berhasil mendapatkan semua address dengan id Customer${id}.`,
            data: [
                address
            ]
        })
    } catch (error) {
        return res
        .status(error.status || 500)
        .json({
            message: error.message || 'Internal server error.'
        })
    }
};

const findOne = async(req, res) => {
    let id = req.body.id

    try {
        let address = await req.uC.custAddressUC.FindOne(id);

        return res
        .status(200)
        .json({
            message: `Berhasil mendapatkan address dengan id:${id} .`,
            data: address
        });
    } catch (error) {
        return res
        .status(error.status || 500)
        .json({
            message: error.message || 'Internal server error.'
        })
    }
};

const delById = async(req, res) =>{
    let id = req.body.id
    try {
        let address = await req.uC.custAddressUC.Delete(id);

        return res
        .status(200)
        .json({
            message: 'Berhasil menghapus address dengan Username: .'
        })

    } catch (error) {
        return res
        .status(error.status || 500)
        .json({
            message: error.message || 'Internal server error.'
        })
    }
};

const update = async(req, res) => {
    const newAddress = {
        cust_id: req.body.cust_id,
        city: req.body.city,
        province: req.body.province,
        line:req.body.line,
        zip_code: req.body.zip_code
    }

    try {
        let address = await req.uC.custAddressUC.Update(newAddress);
        return res
        .status(201)
        .json({
            meassage: 'Berhasil mendaftarkan customer baru.',
            data: address
        })

    } catch (error) {
        return res
        .status(error.status || 500)
        .json({
            message: error.message || 'Internal server error.'
        })
    }
};