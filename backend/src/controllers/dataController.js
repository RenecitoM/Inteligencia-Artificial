const Data = require('../model/DataModel');

exports.getData = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;

    try {
        const count = await Data.countDocuments();
        const totalPages = Math.ceil(count / limit);

        const skip = (page - 1) * limit;

        const data = await Data.find().skip(skip).limit(limit);

        res.json({
            totalPages,
            currentPage: page,
            data
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
