import mongoose from 'mongoose';

const db = mongoose;
// Function to establish a connection to the database
const connectDB = async () => {
  try {
    // CONNECTION ONLINE
    // const dbURL = 'mongodb+srv://josue:Diosesamor1.@atlascluster.gvyz4aw.mongodb.net/stock_genius?retryWrites=true&w=majority&appName=AtlasApp';
    // CONNECTION LOCAL
    const dbURL = 'mongodb://localhost:27017/Stock_Genius';

    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};


export  {connectDB,db};