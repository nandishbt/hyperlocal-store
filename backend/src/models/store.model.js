import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      
    },
    location: {
      type: String,
      required: true,
      
    },
  },
  {
    timestamps: true, 
  }
);

const Store = mongoose.models.stores ||  mongoose.model('Store', storeSchema);

export default Store;
