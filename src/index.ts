import express from "express";
import { prismaclient } from "./db";
export const app = express();
app.use(express.json());

app.post("/sum",async (req, res) => {
    const a = req.body.a;
    const b = req.body.b;

    const answer = a + b;
    await prismaclient.request.create({
        data:{
            a,
            b,
            result:answer,
            type:"Sum"
        }
    })

    res.json({
        sum:answer
    })
});
app.post("/sub",async (req, res) => {
    const a = req.body.a;
    const b = req.body.b;

    if(a>b || a<0 || b<0){
        res.status(422).json({
            message:"sorry"
        });
    }
    else{
        const answer = a - b;
        await prismaclient.request.create({
            data: {
                a,
                b,
                result: answer,
                type: "Subtraction"
            }
        });

        res.json({
            sub: answer
        });

    }
    

});
app.post("/mul", async (req, res) => {
    const a = req.body.a;
    const b = req.body.b;
    const answer = a * b;
    await prismaclient.request.create({
        data: {
            a,
            b,
            result: answer,
            type: "Multiply"
        }
    })


    res.json({
        mul:answer
    })
});
app.post("/div",async (req, res) => {
    const a = req.body.a;
    const b = req.body.b;
    
    if ( a < 0 || b < 0) {
        res.status(422).json({
            message: "sorry"
        })

    }else{

    

    const answer = a / b;
    await prismaclient.request.create({
        data: {
            a,
            b,
            result: answer,
            type: "Division"
        }
    })
    res.json({
        div:answer
    })
}
});