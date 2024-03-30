class Datasette {
	baseUrl: string
	databaseName: string
	defaultFormat: string

	constructor(baseUrl: string, databaseName: string, defaultFormat: string) {
		this.baseUrl = baseUrl;
		this.databaseName = databaseName;
		this.defaultFormat = defaultFormat;
	}

	getURLForQuery(queryString: string, format?: string) {
		return `${this.baseUrl}/${this.databaseName}.${format || this.defaultFormat}?sql=${encodeURIComponent(queryString)}`;
	}
}

const enum FORMAT {
	JSON = "json"
}

export const DB = new Datasette("https://acedb.treestats.net", "ace_world_patches", FORMAT.JSON);

export const getColumnIndex = (columns: string[], name: string) => {
	if (columns.length <= 0) {
		return -1;
	}

	return columns.indexOf(name);
}
