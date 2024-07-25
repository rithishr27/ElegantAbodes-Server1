import express from 'express';
import { createListing, deleteListing, getData, getListing, updateData } from "../Controller/listController.js";

const router = express.Router();

router.post("/create",createListing);
router.delete('/deleteData/:id',deleteListing);
router.post("/updateList/:id",updateData);
router.get("/getData/:id",getData);
router.get("/get",getListing);

export default router;