import { getSQLString } from './queries/new';

class Datasette {
	baseUrl: string
	databaseName: string
	defaultFormat: string
	queryFormatter: Function

	constructor(baseUrl: string, databaseName: string, defaultFormat: string, queryFormatter: Function) {
		this.baseUrl = baseUrl;
		this.databaseName = databaseName;
		this.defaultFormat = defaultFormat;

		// Handle queryFormatter
		if (queryFormatter) {
			this.queryFormatter = queryFormatter
		} else {
			this.queryFormatter = function(x: string) : string { return x; }
		}
	}

	getURLForQuery(queryString: string, format?: string) {
		return `${this.baseUrl}/${this.databaseName}.${format || this.defaultFormat}?sql=${encodeURIComponent(this.queryFormatter(queryString))}`;
	}
}

const enum FORMAT {
	JSON = "json"
}

export const DB = new Datasette("https://acedb.treestats.net", "ace_world_patches", FORMAT.JSON, getSQLString);

export const getColumnIndex = (columns: string[], name: string) => {
	if (columns.length <= 0) {
		return -1;
	}

	return columns.indexOf(name);
}
