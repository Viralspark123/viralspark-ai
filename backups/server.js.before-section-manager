import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname=path.dirname(fileURLToPath(import.meta.url));
const app=express();
app.disable('x-powered-by');
app.use(helmet({contentSecurityPolicy:false}));
app.use(express.json({limit:'12kb'}));
app.use('/api/',rateLimit({windowMs:15*60*1000,limit:30,standardHeaders:'draft-7',legacyHeaders:false,message:{error:'Too many requests. Please wait a little and try again.'}}));
const allowedTools=new Set(['ideas','hooks','titles','captions']);
app.post('/api/generate',async(req,res)=>{
  const {tool,topic,niche='Other',platform='Shorts',tone='Curiosity-driven'}=req.body||{};
  if(!allowedTools.has(tool)||typeof topic!=='string'||!topic.trim()||topic.length>600){return res.status(400).json({error:'Choose a valid tool and enter a topic under 600 characters.'})}
  if(!process.env.OPENAI_API_KEY){return res.status(503).json({error:'AI is not configured. Use demo mode or configure OPENAI_API_KEY on the server.'})}
  const spec={ideas:'Return exactly 5 distinct, practical video ideas.',hooks:'Return exactly 10 short opening hooks.',titles:'Return exactly 10 distinct video titles, mixing funny, mysterious, curiosity-driven and dramatic angles.',captions:'Return exactly 3 platform-appropriate caption options, each including a few relevant hashtags.'}[tool];
  const prompt=`You help beginner creators brainstorm. ${spec} Content topic: ${topic.trim()}\nCategory: ${String(niche).slice(0,50)}\nPlatform/format: ${String(platform).slice(0,40)}\nStyle: ${String(tone).slice(0,50)}\nBe specific, natural, original, age-appropriate, and avoid misleading claims or guaranteeing virality. Do not use copyrighted lyrics. Return JSON only in the shape {"results":["..."]}.`;
  const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),25000);
  try{
    const response=await fetch(process.env.OPENAI_API_URL||'https://api.openai.com/v1/chat/completions',{method:'POST',headers:{Authorization:`Bearer ${process.env.OPENAI_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({model:process.env.OPENAI_MODEL||'gpt-4o-mini',temperature:0.85,max_tokens:1200,response_format:{type:'json_object'},messages:[{role:'system',content:'Return valid JSON only. Follow the requested result count.'},{role:'user',content:prompt}]}),signal:controller.signal});
    if(!response.ok){console.error('AI provider status:',response.status);return res.status(502).json({error:'The AI provider could not complete this request. Please try again later.'})}
    const data=await response.json();const content=data.choices?.[0]?.message?.content;const parsed=JSON.parse(content||'{}');
    if(!Array.isArray(parsed.results)||!parsed.results.length||parsed.results.some(x=>typeof x!=='string'))return res.status(502).json({error:'The AI returned an unexpected format. Please try again.'});
    res.json({results:parsed.results.slice(0,10),mode:'ai'});
  }catch(err){console.error('Generation request failed:',err.name);res.status(502).json({error:'AI generation failed or timed out. Please try again.'})}finally{clearTimeout(timeout)}
});
app.use(express.static(__dirname));
app.get('*',(req,res)=>res.sendFile(path.join(__dirname,'index.html')));
const port=Number(process.env.PORT)||3000;app.listen(port,'0.0.0.0',()=>console.log(`ViralSpark AI running on port ${port}`));
