var webpack = require( "webpack" );

module.exports = {

	context: __dirname,
	entry: [
		"./src/App.js",
	],
	output: {
		path: __dirname,
		publicPath: "/",
		filename: "static/js/bundle.js",
	},
	module: {
		loaders: [
			{ test: /\.(js|jsx)$/, loader: "babel?presets[]=es2015", exclude: /node_modules/ },
			{ test: /\.(css|scss)$/, loaders: [
				"style?sourceMap",
				"css?modules&localIdentName=[name]__[local]&importLoaders=2",
				"postcss",
				"sass"
			], exclude: /node_modules/ },
			{ test: /\.(woff\d?|eot|ttf|svg)$/, loader: "file" },
			{ test: /\.(png|jpg|gif)$|images\/.*\.svg$/i, loader: 'url?limit=8192' },
		],
	},
	postcss: function () {
        return [require( "autoprefixer" )];
    },
	resolve: {
		extensions: [ "", ".js", ".jsx", ".json" ],
		modulesDirectories: [
			"node_modules",
			"custom_modules",
			"assets",
			"components"
		]
	},

};
