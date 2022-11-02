/**
 *  node .bin/www 启动更改为热启动：nodemon ./bin/www  启动命令：npm start
 **/

const createError = require('http-errors'),
        express = require('express'),
           path = require('path'),
   cookieParser = require('cookie-parser'),
         logger = require('morgan'),
            app = express();
            NodeMediaServer = require('node-media-server');
 
const config = {
    // 接受推过来的流
    rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60
    },
    // 转发推流的信息
    http: {
        port: 8000,
        allow_origin: '*'
    }
}
var nms = new NodeMediaServer(config);
nms.run();

// 推流工具、通常我们常用ffmpeg这个工具来推流、推给我们的中间件1935端口
// 新建一个命令行选择并输入以下命令开始推送资源(其中的ip就是你电脑自己的ip)

// 推送视频:xm0525$ ffmpeg -re -i 视频名称 -c copy -f flv rtmp://ip:1935/live/STREAM_NAME
// 推送摄像头:ffmpeg -f avfoundation -video_size 640x480 -framerate 30 -i 0:0 -vcodec libx264 -preset veryfast -f flv rtmp://ip:1935/live/STREAM_NAME
// 推送屏幕:ffmpeg -f avfoundation -i "1" -vcodec libx264 -preset ultrafast -acodec libfaac -f flv rtmp://ip:1935/live/STREAM_NAME

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

 
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

process.env.PORT = 3000; //默认3000端口,可自行更改端口号

module.exports = app;
