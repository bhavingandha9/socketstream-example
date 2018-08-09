const socket = io();

let fileElem = document.getElementById('example_file');

fileElem.onchange = e => {
  let file = e.target.files[0];

  let stream = ss.createStream();

  ss(socket).emit('file', stream, { size: file.size, name: file.name });

  let blobStream = ss.createBlobReadStream(file);

  blobStream.pipe(stream);
  blobStream.on('end', () => {
    console.log('done');
  });
}