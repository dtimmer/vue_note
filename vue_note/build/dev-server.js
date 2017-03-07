require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var fs = require('fs')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')
var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)
//
app.use(bodyParser.json());
app.use(urlencodedParser);

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})

app.all('/test.action', function(req, res) {
	fs.readFile('./static/data/data.json', 'utf-8', function(err, data) {
		res.json(JSON.parse(data));
	})
})

app.all('/save.action', function(req, res) {
	fs.writeFile('./static/data/data.json', JSON.stringify(req.body, null, '\t'), function(err) {
		if(err) {
			console.log(err);
			res.json({satus: 400});
		} else {
			res.json({satus: 200});
		}
	})
})

app.all('/down.action', function(req, res) {
	fs.readFile('./static/data/data.json', 'utf-8', function(err, data) {
		if(err) {
			res.json({status: 500});
		} else {
			let string = [];
			let jsonData = JSON.parse(data);
			for(let i of jsonData.notes) {
				string.push(`##${i.title}##\r\n${i.text}`)
			}
			fs.writeFile('./static/data/down.txt', string.join(`\r\n******************************************************\r\n`), function(err) {
				if(err) {
					res.json({status: 500});
				} else {
					res.download('./static/data/down.txt', 'notes.txt');
				}
			})
		}
	})
})
