const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['todo', 'in-progress', 'done'], // Status field with enum
        default: 'todo', // Default status
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true, 
    },
}, {
    timestamps: true,
});

todoSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;

