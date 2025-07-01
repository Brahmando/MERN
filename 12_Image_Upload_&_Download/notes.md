>> mongoose.model(...) returns a Model class (constructor), not a document object.

>>When you use find() in Mongoose, it returns an array of documents. If you chain .populate('fieldName') to the query, Mongoose will:

Go through each document in the result array,
Replace the specified field (e.g., an ObjectId or array of ObjectIds) with the actual referenced document(s) from the related collection.
