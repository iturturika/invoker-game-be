import UsersRecordsModel from '../models/UsersRecords.js';

export const setRecord = async (req, res) => {
    try {
        const doc = new UsersRecordsModel({
            nickName: req.body.nickName,
            id: req.body.id,
            record: req.body.record
        });
        const record = await doc.save();
        if(!record) {
            return res.status(404).json({
                message: `Can't save record`
            });
        }
        res.json({record});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Can't save record`
        })
    }
};


export const updateRecord = async (req, res) => {
    try {
        const doc = await UsersRecordsModel.findOneAndUpdate({id: req.body.id}, {record: req.body.record} );
        const record = await doc.save();
        if(!record) {
            return res.status(404).json({
                message: `Can't update record`
            });
        }
        res.json({
            message: `Record was successfully updated`
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Can't update record`
        })
    }
};

export const getRecords = async (req, res) => {
    try {
        const records = await UsersRecordsModel.find().sort({record: 1});
        if(!records) {
            return res.status(404).json({
                message: `Records not found`
            });
        }
        res.json({records});
    } catch (error) {
        console.log(err);
        res.status(500).json({
            message: `Can't get records`
        })
    }
};