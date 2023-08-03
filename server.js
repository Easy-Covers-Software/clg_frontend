const { createServer, Server } = require('http');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const port = process.env.PORT || 3000;
const dev = process.env.NEXT_PUBLIC_NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

let server;

if (!dev) {
  // In production, we'll use an HTTP server
  server = Server;
} else {
  // In development, use an HTTPS server
  const { createServer } = require('https');
  const httpsOptions = {
    key: fs.readFileSync('/Users/davidsilveira/dave/projects/clg/clg_frontend_react/key.pem'),
    cert: fs.readFileSync('/Users/davidsilveira/dave/projects/clg/clg_frontend_react/cert.pem'),
  };
  server = createServer.bind(null, httpsOptions);
}

app.prepare().then(() => {
  server(async (req, res) => {
    const parsedUrl = parse(req.url, true);
    await handle(req, res, parsedUrl);
  }).listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
