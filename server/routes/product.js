const express = require('express');
const router = express.Router();
const multer =require('multer');
const { Product } = require('../models/Product');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    }
  })
   
  var upload = multer({ storage: storage }).single("file")

router.post('/image',(req,res)=>{

    //가져온 이미지 저장
    upload(req,res,err=>{
        if(err){
            return res.json({success:false,err})
        }
        return res.json({success: true,filePath: res.req.file.path , fileName: res.req.file.filename})
    })

})

router.post('/',(req,res)=>{

  //가져온 이미지 저장
  const product= new Product(req.body)
  product.save((err)=>{
    if(err) return res.status(400).json({success:false,err})
    return res.status(200).json({success:true})
  })

})

router.post('/products',(req,res)=>{
 
  let limit=req.body.limit?parseInt(req.body.limit):20;
  let skip=req.body.skip?parseInt(req.body.skip):0;
  let findArgs={};
  for (let key in req.body.filters){
    if(req.body.filters[key].length>0){
      findArgs[key]=req.body.filters[key];
    }
  }
  //product 콜랙션의 모든 상품 가져오기
Product.find(findArgs).populate("writer").skip(skip).limit(limit).exec((err, productInfo)=>{
  if(err) return res.status(400).json({success:false,err})
  return res.status(200).json({success:true, productInfo})

})

})

router.get('/products_by_id',(req,res)=>{
  let type=req.query.type
  let productIds=req.query.id
  if(type=="array"){
    let ids=req.query.id.split(',')
    productIds=ids.map(item=>{
      return item
    })
  }
 
  Product.find({_id:{$in: productIds}}).populate('writer').exec((err,product)=>{
if(err) return res.status(400).send(err)
return res.status(200).send(product)

  })

})


module.exports = router;
