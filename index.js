const fs = require('fs');

/**
 * The route to read the input files
 */
const examplesPaths = './examples';

const Main = () =>
{
	ProcessInputFiles();
}

/**
 * This function returns a file content from a string path of file
 * @param {String} filePath 
 * @returns {String}
 */
const ReadFile = (filePath) =>
{
	let result = '';

	try
	{
		if(fs.existsSync(filePath))
		{
			result = fs.readFileSync(filePath, 'utf8');
		}
	}
	catch (err)
	{
		console.error(err);
	}

	return result;
}

/**
 * This function parse the input file content and returns an object with the parsed data
 * @param {String} inputFileContent 
 * @returns {Object}
 */
const GetInput = (inputFileContent) =>
{
	const parsedInput =
	{
		drones: [],
		locations: []
	};

	if(typeof inputFileContent === 'string' && inputFileContent.length > 0)
	{
		// convert to array of lines
		const inputLines = inputFileContent.split('\n');

		// get drones info
		const firstLineValues = Array.from(inputLines[0].matchAll(/\[(.*?)\]/g), match => match[1]);

		for(let i = 1; i < firstLineValues.length; i += 2)
		{
			parsedInput.drones.push
			({
				position: i,
				name: firstLineValues[i - 1],
				maxWeight: parseInt(firstLineValues[i])
			});
		}
		// end get drones info

		// max 100 drones from squad
		parsedInput.drones = parsedInput.drones.slice(0, 100);

		// get locations info
		for(let i = 1; i < inputLines.length; i++)
		{
			const lineValues = Array.from(inputLines[i].matchAll(/\[(.*?)\]/g), match => match[1]);

			parsedInput.locations.push
			({
				position: i,
				name: lineValues[0],
				weight: parseInt(lineValues[1])
			});
		}
		// end get locations info
	}

	return parsedInput;
}

/**
 * This function reads all available examples
 */
const ProcessInputFiles = () =>
{
	try
	{
		const examples = fs.readdirSync(examplesPaths);

		if(Array.isArray(examples))
		{
			for(let i = 0; i < examples.length; i++)
			{
				ProcessInputFile(examples[i]);
			}
		}
	}
	catch(err)
	{
		console.error(err);
	}
}

/**
 * This function process an individual file input
 * @param {String} exampleFileName 
 */
const ProcessInputFile = (exampleFileName) =>
{
	console.log(`\n------------- Start Process File: ${exampleFileName} -------------`);

	// ready file and parse content
	const inputFileContent = ReadFile(`${examplesPaths}/${exampleFileName}`);
	const parsedContent = GetInput(inputFileContent);

	console.log(`\nInput:\n\n${inputFileContent}`);

	if(parsedContent.drones.length === 0)
	{
		console.log('\nEmpty drones info.');
	}
	else if(parsedContent.locations.length === 0)
	{
		console.log('\nEmpty locations info.');
	}
	else
	{
		console.log('\nOutput:');

		const result = ProcessInputData(parsedContent);

		// show the result
		result.drones.sort((firstItem, secondItem) => firstItem.position - secondItem.position).forEach(drone =>
		{
			console.log(`\n[${drone.name}]`);
	
			drone.trips.forEach((trip, index) =>
			{
				if(trip.length > 0)
				{
					console.log(`Trip #${index + 1}`);
					console.log(`[${trip.map(location => location.name).join('], [')}]`);
				}
			});
		});
	
		if(result.notSupportedDeliveries.length > 0)
		{
			console.log('\nNot supported weights: ', `[${result.notSupportedDeliveries.map(location => location.name).join('], [')}]`);
		}
		// end show the result
	}

	console.log(`\n------------- End Process File: ${exampleFileName} -------------`);
}

/**
 * This function process a valid input data
 * @param {Object} input 
 */
const ProcessInputData = (input) =>
{
	// sort drones and locations from bigger weight to smaller weight
	const drones = input.drones.sort((firstItem, secondItem) => secondItem.maxWeight - firstItem.maxWeight);
	let locations = [...input.locations.sort((firstItem, secondItem) => secondItem.weight - firstItem.weight)];

	// filter not supported weights: when the delivery weight is bigger than drone max weight
	let supportedDeliveries = [];
	const notSupportedDeliveries = [];
	const biggerMaxWeight = drones[0].maxWeight;

	locations.forEach(location =>
	{
		if(location.weight <= biggerMaxWeight)
		{
			supportedDeliveries.push(location);
		}
		else
		{
			notSupportedDeliveries.push(location);
		}
	});
	// end filter not supported weights delivery

	// assign the deliveries trips to each drone
	while(supportedDeliveries.length > 0)
	{
		for(let i = 0; i < drones.length; i++)
		{
			let availableWeight = drones[i].maxWeight;
			const removeIndexes = [];
			const deliveries = [];

			if(!drones[i].trips)
			{
				drones[i].trips = [];
			}

			for(let j = 0; j < supportedDeliveries.length; j++)
			{
				if(availableWeight >= supportedDeliveries[j].weight)
				{
					deliveries.push(supportedDeliveries[j]);

					availableWeight -= supportedDeliveries[j].weight;
					removeIndexes.push(j);
				}
			}

			supportedDeliveries = supportedDeliveries.filter((location, index) => removeIndexes.indexOf(index) === -1);

			drones[i].trips.push(deliveries);
		}
	}

	return {drones, notSupportedDeliveries};
}

Main();