const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const path = require('path');
const app = express();
const readline = require('readline');
const ffmpeg   = require('fluent-ffmpeg');
const port = process.env.PORT || 3000;

var file_name;

app.use(cors());
app.use(express.static(__dirname + '/public'));

app.listen(port, () => console.log(`Server Works !!! At port ${port}!`));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/downloadmp3', (req,res) => {
	var url = req.query.url;
	file_name = 'audio';
	
	ytdl.getInfo(url, (err, info) => {
	  if (err) throw err;
	  console.log('title:', info.title);
	  console.log('rating:', info.avg_rating);
	  console.log('uploaded by:', info.author.name);
	  res.header('Content-Disposition', `attachment; filename="${info.title.substring(0,30)}.mp3"`);
	});

	let stream = ytdl(url, {
	  quality: 'highestaudio',
	  //filter: 'audioonly',
	});

	let start = Date.now();
	ffmpeg(stream)
	  .audioBitrate(128)
	  .save(`${__dirname}/Audio.mp3`)
	  .on('progress', (p) => {
		readline.cursorTo(process.stdout, 0);
		process.stdout.write(`${p.targetSize}kb downloaded`);
	  })
	  .on('end', () => {
		console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`);
	  });
});

app.get('/downloadmp4', (req,res) => {
	var url = req.query.url;
	file_name = 'video';
	
	ytdl.getInfo(url, (err, info) => {
	  if (err) throw err;
	  console.log('title:', info.title);
	  console.log('rating:', info.avg_rating);
	  console.log('uploaded by:', info.author.name);

	  res.header('Content-Disposition', `attachment; filename="${info.title.substring(0,30)}.mp4"`);
	});

	// res.header('Content-Disposition', 'attachment; filename="video.mp4"');
	
	ytdl(url, {
		format: 'mp4'
	}).pipe(res);
});
