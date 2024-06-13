const user = require('../models/User')

const userList = async (req, res) => {
    try {
        const users = await user.find({}, {password:0, _id:0});
        res.json({ users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { userList }