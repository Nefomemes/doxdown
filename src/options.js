const options = {
	ignore: {
		alias: 'i',
		help: 'comma-separated list of files/directories to ignore',
		parser: value => value.split(','),
		value: ['.git', 'node_modules']
	},
	out: {
		alias: 'o',
		help: 'relative path to the output directory',
		parser: value => value,
		value: './mkdox'
	},
	regex: {
		alias: 'r',
		help: 'regex string for matching files in the source directory',
		parser: value => new RegExp(value),
		value: new RegExp(/\.js$/)
	},
	src: {
		alias: 's',
		help: 'relative path to the source directory',
		parser: value => value,
		value: './'
	}
};

function getOptionByAlias (alias) {
	
	const option = Object.keys(options).find(k =>
		options[k].alias === alias
	);
	
	return options[option];
}

function optionsError (optionName) {
	
	console.log(`'${optionName}' is not a supported option!\n`);
	
	Object.keys(options).forEach(k =>
		console.log(`   --${k}   \t-${options[k].alias}\t: ${options[k].help}`)
	);
	
	process.exit();
}

export function get (optionName) {
	return options[optionName].value;
}

export function set (optionName, value) {
	
	const option = optionName.length === 1 ?
		getOptionByAlias(optionName) : options[optionName];
	
	if (!option) {
		optionsError(optionName);
	}
	
	option.value = option.parser(value);
}