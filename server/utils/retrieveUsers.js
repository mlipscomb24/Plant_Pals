const db = require('../config/connection');

const retrieveUsers = async () => {
    try {
        const users = await db.collection('users').find({ notifications: true }).toArray();
        return users;
    } catch (error) {
        console.error('Error retrieving users:', error);
        throw error;
    }
};
module.exports = retrieveUsers;