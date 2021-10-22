const http = require("http");
var requests = require("requests");

const fs = require("fs");



const server = http.createServer((req,res) => {
    if(req.url == "/video"){
        const range = req.headers.range;                 //Gives the position where u are in the video.Returns in bytes.
        const videoPath = './Video/DinDhalay.mp4';
        const videoSize = fs.statSync(videoPath).size;   //Getting the videoSize

        const chunk = 1 * 1e+6;
        const start = Number(range.replace(/\D/g,''));     //Getting rid of all the letters/alphabets.
        const end = Math.min(start + chunk,videoSize - 1);    //Determining the end.

        const contentLength = end - start + 1;

        const headers = {
            "Content-Range" : `bytes ${start}-${end}/${videoSize}`,
            "Asset-Range"   : "bytes",
            "Content-Length": contentLength,
            "Content-Type"  : "video/mp4"
        }

        res.writeHead(206,headers);
    
    const stream = fs.createReadStream(videoPath, { start ,end })
    stream.pipe(res);


}else{
    res.end("Error 404! File Not Found.")
}
})

server.listen(8000);

