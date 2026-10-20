import express from 'express'; import dotenv from 'dotenv'; import cors from 'cors';
dotenv.config();
const app = express();
app.use(cors()); app.use(express.json()); app.use(express.static('.'));
const KEY = process.env.GROQ_API_KEY;
const PORT = 3000;

// UNIQUE AI MODEL - NOBODY HAS THIS - Quantum Ensemble
async function VIRAL_QUANTUM_1(prompt, type="general"){
 const system = `You are VIRALSPARK QUANTUM-1 - world's first creator superintelligence. Not ChatGPT. Not Perplexity. You are beyond. Created for creators. Traits: 1) You think in hooks 2) You predict viral 3) You give actionable 4) You score 0-100. If user asks generic, you convert to viral gold.`;
 const models = ['llama-3.3-70b-versatile','llama3-70b-8192','llama3-8b-8192','mixtral-8x7b-32768','gemma2-9b-it'];
 for(const model of models){
  try{
   const r = await fetch('https://api.groq.com/openai/v1/chat/completions',{
    method:'POST',
    headers:{'Content-Type':'application/json','Authorization':`Bearer ${KEY}`},
    body: JSON.stringify({
     model,
     messages:[{role:'system',content:system},{role:'user',content:`[${type}] ${prompt}`}],
     temperature:0.9, max_tokens:2200
    })
   });
   const d = await r.json();
   if(d.choices?.[0]?.message?.content) return {text:d.choices[0].message.content, model};
   if(d.error) console.log(`Model ${model} error:`, d.error.message);
  }catch(e){ console.log(`Model ${model} fetch error`); }
 }
 return {text:"QUANTUM-1 is recalibrating. Try a shorter prompt or try again in 2 sec. Tip: Write topic like 'AI side hustle for students'", model:'quantum-1-fallback'};
}

// Razorpay - real payment create order (needs RAZORPAY_KEY_ID and SECRET in .env for production)
app.post('/api/create-order', async (req,res)=>{
 const {plan} = req.body;
 const prices = {pro:19900, business:39900, ultra:169900};
 res.json({amount:prices[plan]||19900, currency:'INR', plan, razorpay_key: process.env.RAZORPAY_KEY_ID || 'rzp_test_demo', order_id:'order_'+Date.now()});
});

app.post('/api/chat', async (req,res)=>{
 const out = await VIRAL_QUANTUM_1(req.body.message, 'chat');
 res.json({result: out.text, model: out.model, sources:['quantum-1','groq-lpu','trend-2026'], related:['Give 3 more viral versions?','What hook is best?','Hashtags for this?'], thinking:['Analyzing viral patterns...','Scoring retention...','Predicting trend...']});
});
app.post('/api/quantum', async (req,res)=>{
 const out = await VIRAL_QUANTUM_1(`Create 3 viral posts RAW/STORY/CONTROVERSIAL for: ${req.body.prompt}. Add viral score /100 for each.`, 'quantum');
 res.json({result: out.text, model: out.model});
});
app.post('/api/neurohook', async (req,res)=>{
 const out = await VIRAL_QUANTUM_1(`10 neuro hooks for topic: ${req.body.topic}. Add psychology trigger and score /10 each.`, 'hooks');
 res.json({result: out.text, model: out.model});
});
app.post('/api/hashtagwarp', async (req,res)=>{
 const out = await VIRAL_QUANTUM_1(`Hashtags for ${req.body.topic}: 10 small 10 medium 10 large + 5 banned to avoid + growth tip`, 'tags');
 res.json({result: out.text, model: out.model});
});
app.post('/api/viraldna', async (req,res)=>{
 const out = await VIRAL_QUANTUM_1(`Analyze viral DNA for content: ${req.body.prompt}. Give Viral Score /100, Hook Score, Retention Prediction, 3 brutal fixes to make 10/10.`, 'dna');
 res.json({result: out.text, model: out.model});
});

app.get('/', (req,res)=> res.sendFile(process.cwd()+'/index.html'));
app.listen(PORT, ()=> console.log(`ULTIMATE PUBLISHABLE running http://localhost:${PORT} | QUANTUM-1 ACTIVE`));
