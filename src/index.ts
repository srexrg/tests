import express from "express";

export const app = express();
app.use(express.json());

app.post("/sum", (req, res) => {
    const a = req.body.a;
    const b = req.body.b;
    const answer = a + b;

    res.json({
        sum:answer
    })
});
app.post("/sub", (req, res) => {
    const a = req.body.a;
    const b = req.body.b;

    if(a>b || a<0 || b<0){
        res.status(422).json({
            message:"sorry"
        })
        
    }
    const answer = a - b;

    res.json({
        sub:answer
    })
});
app.post("/mul", (req, res) => {
    const a = req.body.a;
    const b = req.body.b;
    const answer = a * b;

    res.json({
        mul:answer
    })
});
app.post("/div", (req, res) => {
    const a = req.body.a;
    const b = req.body.b;
    
    if ( a < 0 || b < 0) {
        res.status(422).json({
            message: "sorry"
        })

    }

    const answer = a / b;
    res.json({
        div:answer
    })
});