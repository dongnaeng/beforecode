const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");
const { Product } = require('../models/Product');
const {Order}=require('../models/Order');
const { config, msg } = require('coolsms-node-sdk')


//=================================
//             User
//=================================

// apiKey, apiSecret 설정 (설정하지 않으면 패키지 홈의 config.json 파일의 설정을 참고합니다.)



router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        address: req.user.address,
        addressdetail: req.user.addressdetail,
        phone: req.user.phone,
        cart: req.user.cart,
        discount: req.user.discount,
        history: req.user.history,
        image: req.user.image,
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});


router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/ordering", auth, (req, res) => {
//주문 내역정리
    const orderbody={
        userid: req.user._id,
        username: req.user.name,
        userphone: req.user.phone,
        useraddress: `${req.user.address} 세부: ${req.user.addressdetail}`,
        totalprice: req.body.totalprice,
        discount: req.user.discount,
        Ordered: req.body.Ordered
    }
    const order = new Order(orderbody);
    const orderhis=req.body.Ordered.map((food,index)=>{
        return(`${food.name}[${food.leastbuy}]: ${food.quantity}개 ${food.price}원에 주문 `)
    })
   
    const orderhistory= orderhis.join("\n").concat(' ', `\n총 ${req.body.totalprice}원 주문완료!`); 

//주문 정보 저장 
config.init({
    apiKey: 'NCSVVIUORDGN4UPY',
    apiSecret: '63BXLIMMRVRBWSCRDXSJSJDCK7JD7PNU'
  })




async function send (params = {}) {
  try {
    const result = await msg.send(params)
    console.log('RESULT:', result)
  } catch (e) {
    console.log('statusCode:', e.statusCode)
    console.log('errorCode:', e.error.errorCode)
    console.log('errorMessage:', e.error.errorMessage)
  }
}


   

    order.save((err, doc) => {
        
        if (err) return res.json({ ordersuccess: false, err });

        User.findOneAndUpdate({_id:req.user._id},{cart:[],$push:{history:{
            order:req.body.Ordered,
            totalprice:req.body.totalprice,
            date:Date.now()
        }}}, (err, doc) => {console.log(err)})
        const sendmsg=`${orderhistory} 
        이름 ${req.user.name}
        주소 ${req.user.address} ${req.user.addressdetail}
        전화번호 ${req.user.phone}
        주문 타입 ${req.body.ordertype}`
        const tel=req.user.phone;

        send({
            messages: [
              {
                to: '01054759175',
                from: '01075922316',
                text: sendmsg
              },
              {
                to: '01075922316',
                from: '01075922316',
                text: sendmsg
              }, {
                to: '01064424878',
                from: '01075922316',
                text: sendmsg
              },
              {
                  to: tel,
                  from: '01075922316',
                  text: orderhistory + " 카카오뱅크 3333-18-3493363 으로 입금해주시면 주문완료 됩니다."
                }
              // ...
              // 1만건까지 추가 가능
            ]
          })

       
        return res.status(200).send({
            ordersuccess: true,orderinfo: orderhistory
        });
    });

    
   
});

router.get("/info", auth, (req, res) => {
    User.findOne({ _id: req.user._id }, (err, userInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({success:true,userInfo});
    });
});




router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

router.post("/addToCart", auth, (req, res) => {
    
User.findOne({_id:req.user._id},(err,userInfo)=>{
    let duplicate= false;
    userInfo.cart.forEach((item)=>{
        if(item.id===req.body.productId){
            duplicate=true;
        }
    })

    if(duplicate){
        User.findOneAndUpdate(
            {_id:req.user._id, "cart.id":req.body.productId },{
                $inc:{"cart.$.quantity":1}
            },
            {new:true},
            (err, userInfo)=>{
                if(err) return res.status(200).json({success:false, err})
                res.status(200).send(userInfo.cart)
               }
        )

    }else{
        User.findOneAndUpdate(
            {_id:req.user._id},{
                $push:{cart:{
                    id: req.body.productId,
                    quantity:1,
                    date:Date.now()
                }}
            },
            {new:true},
            (err, userInfo)=>{
                if(err) return res.status(200).json({success:false, err})
                res.status(200).send(userInfo.cart)
            })
    }
})

});
router.get('/removeFromCart', auth,(req,res)=>{
    //카트 안에 지우려고 한 상품 지움
    User.findOneAndUpdate({_id:req.user._id},
        {"$pull":{"cart":{"id":req.query.id}}
    },
    {new:true},
    (err,userInfo)=>{
        let cart=userInfo.cart;

        let array=cart.map(item=>{
            return item.id
        })
        Product.find({_id:{$in:array}}).populate('writer').exec((err,productInfo)=>{
            return res.status(200).json({
                productInfo,cart
            })
        })
    }
        )
    //남은 상품 정보를 다시 로드함
});


module.exports = router;
