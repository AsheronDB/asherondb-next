import { PropertyString, PropertyInt, PropertyFloat, PropertyBool } from "~/util/mappings";
import { Weenie, type WeenieData } from "./Weenie";

export interface ItemData extends WeenieData {
	value: number | undefined,
	burden: number | undefined,
	itemDifficulty: number | undefined,
	use: string | undefined,
	mana: number,
	manaRateString: string,
	spellcraft: number,
	propertyString: string,
	isSellable: bool
}

export class Item extends Weenie {
	get ClassName() {
		return "Item"
	}

	async load(fetch: any) {
		await super.load(fetch)
		await this.loadPropertiesInts(fetch);
		await this.loadPropertiesFloats(fetch);
		await this.loadWeeniePropertyBool(fetch);
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

	get mana(): number {
		return this.properties.ints.get(PropertyInt.ItemMaxMana);
	}

	get manaRateString(): string {
		return `1 point per ${Math.abs(1 / this.properties.floats.get(PropertyFloat.ManaRate))} seconds.`
	}

	get spellcraft(): number {
		return this.properties.ints.get(PropertyInt.ItemSpellcraft);
	}

	get propertyString(): string {
		const props = []

		if (this.properties.ints.get(PropertyInt.Attuned)) {
			props.push("Attuned");
		}

		if (this.properties.ints.get(PropertyInt.Bonded)) {
			props.push("Bonded");
		}

		if (this.properties.bool.get(PropertyBool.Ivoryable)) {
			props.push("Ivoryable");
		}

		if (this.properties.bool.get(PropertyBool.Dyable)) {
			props.push("Dyable");
		}

		return props.join(", ")
	}

	get isSellable(): bool {
		return this.properties.bool.get(PropertyBool.IsSellable)
	}

	json() : ItemData {
		return {
			...super.json(),
			value: this.value,
			burden: this.burden,
			itemDifficulty: this.itemDifficulty,
			use: this.use,
			mana: this.mana,
			manaRateString: this.manaRateString,
			spellcraft: this.spellcraft,
			propertyString: this.propertyString
			isSellable: this.isSellable
		}
	}
}
