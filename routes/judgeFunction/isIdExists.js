function isIdExists(items, id) {
    for (var i = 0; i < items.length; i++) {
        if (items[i].id === id) {

            return items[i];
        }
    }

    return false;
}
module.exports = isIdExists;