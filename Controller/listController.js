import Listing from "../model/ListingModel.js";

export const createListing = async (req,res,next)=> {

    try{
        const list = await Listing.create(req.body);
        return res.status(200).json(list);
    }
    catch(error){
        next(error);
    }
};

export const deleteListing = async (req,res,next)=> {
    const listing = await Listing.findById(req.params.id);
    if(!listing){
      next(errorHandler(401,"Data not found...!"));
    }
    try{
      await Listing.findByIdAndDelete(req.params.id);
      res.status(200).json('Data has been deleted!');
    }
    catch(error){
      next(error);
    }
}

export const updateData = async (req,res,next) => {
    const listing = await Listing.findById(req.params.id);
    if(!listing){
        next(errorHandler(401,"Data not found...!"));
    }
    try{
        const data = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new : true}
        )

        res.status(200).json(data);
    }
    catch(error){
        next(error);
    }
}

export const getData = async(req,res,next) => {
    try{
        const listing = await Listing.findById(req.params.id);
        res.status(200).json(listing);
    }
    catch(error){
        next(error);
    }
}

export const getListing = async (req,res,next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        let offer = req.query.offer;
    
        if (offer === undefined || offer === 'false') {
          offer = { $in: [false, true] };
        }
    
        let furnished = req.query.furnished;
    
        if (furnished === undefined || furnished === 'false') {
          furnished = { $in: [false, true] };
        }
    
        let parking = req.query.parking;
    
        if (parking === undefined || parking === 'false') {
          parking = { $in: [false, true] };
        }
    
        let type = req.query.type;
    
        if (type === undefined || type === 'all') {
          type = { $in: ['sale', 'rent', 'sell'] };
        }
    
        const searchTerm = req.query.searchTerm || '';
    
        const sort = req.query.sort || 'createdAt';
    
        const order = req.query.order || 'desc';
    
        const listings = await Listing.find({
          name: { $regex: searchTerm, $options: 'i' },
          offer,
          furnished,
          parking,
          type,
        })
          .sort({ [sort]: order })
          .limit(limit)
          .skip(startIndex);
    
        return res.status(200).json(listings);
      } catch (error) {
        next(error);
      }
}