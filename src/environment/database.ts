import mongoose from 'mongoose';
const connectDB = () => {
    try {
        mongoose.connect('mongodb://localhost:27017/fakebooker', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`<<success connection database>>`);
    } catch (err) {
        console.log(err);
    }
}
export default connectDB;