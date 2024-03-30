import { PropertyString, PropertyInt } from "~/util/mappings";
import { Weenie } from "./Weenie";

export class Item extends Weenie {
	get ClassName() {
		return "Item"
	}

	async load(fetch: any) {
		await super.load(fetch)
		await this.loadPropertiesInts(fetch);
		await this.loadPropertiesFloats(fetch);
		await this.loadWeeniePropertySpellBook(fetch);
	}

	get value(): number | undefined {
		return this.properties.ints.get(PropertyInt.Value);
	}

	get burden(): number | undefined {
		return this.properties.ints.get(PropertyInt.EncumbranceVal);
	}

	get itemDifficulty(): number | undefined {
		return this.properties.ints.get(PropertyInt.ItemDifficulty)
	}

	get use(): string | undefined {
		return this.properties.strings.get(PropertyString.Use)
	}

	json() {
		return {
			...super.json(),
			value: this.value,
			burden: this.burden,
			itemDifficulty: this.itemDifficulty,
			use: this.use
		}
	}
}
