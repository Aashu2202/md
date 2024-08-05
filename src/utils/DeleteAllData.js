async function deleteUserById(model ,id) {
    try {
        const deletedUser = await model.findByIdAndDelete(id);
        
        if (!deletedUser) {
            return 0;
        }
        return 1;
    } catch (error) {
        console.error("Error deleting user:", error);
        return 0;
    }
}

module.exports = {deleteUserById};