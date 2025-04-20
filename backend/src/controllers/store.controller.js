import apiResponse from '../utils/apiResponse.js'
import Store from '../models/store.model.js'
import Product from '../models/product.model.js'

const addStore = async(req, res) =>{
    try {
        const { name, location } = req.body
        if (!name || !location ) {
            return res.status(400).json(new apiResponse(false,400, 'Please provide all required fields'))
        }

        const storeExists = await Store.findOne({ name })
        if (storeExists) {
            return res.status(400).json(new apiResponse(false,400, 'Store already exists'))
        }
        
        const store = await Store.create({
            name,
            location,
            
        })
        return res.status(201).json(new apiResponse(true,201, 'Store created successfully', store))
        
    } catch (error) {
        console.error(error)
        return res.status(500).json(new apiResponse(false,500, 'Server error'))
        
    }
}

const getAllStores = async(req, res) =>{
    try {
        const stores = await Store.find()
        if (stores.length == 0) {
            return res.status(404).json(new apiResponse(false,404, 'No stores found'))
        }
        return res.status(200).json(new apiResponse(true,200, 'Stores retrieved successfully', stores))
        
    } catch (error) {
        console.error(error)
        return res.status(500).json(new apiResponse(false,500, 'Server error'))
        
    }
}

const getOneStore = async(req, res) =>{
    try {
        const { storeId } = req.params
        if (!storeId) {
            return res.status(400).json(new apiResponse(false,400, 'Please provide store id'))
        }
        const store = await Store.findById(storeId)
        if (!store) {
            return res.status(404).json(new apiResponse(false,404, 'Store not found'))
        }

        const products = await Product.find({ store: storeId })
        // if (data.length == 0) {
        //     return res.status(404).json(new apiResponse(false,404, 'No products found for this store'))
        // }
        return res.status(200).json(new apiResponse(true,200, 'Store retrieved successfully', {store, products}))
       
        
    } catch (error) {
        console.error(error)
        return res.status(500).json(new apiResponse(false,500, 'Server error'))
        
    }
}




export {
    addStore,
    getAllStores,
    getOneStore,
   

}