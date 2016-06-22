function isCorrectDataType(req) {
    if (req.body.name === undefined || req.body.barcode === undefined
        || req.body.price === undefined || req.body.unit === undefined
        || typeof req.body.name !== "string" || typeof req.body.barcode !== "string"
        || typeof req.body.unit !== "string" || typeof req.body.price !== "number") {

        return false;
    }

    return true;
}
module.exports = isCorrectDataType;