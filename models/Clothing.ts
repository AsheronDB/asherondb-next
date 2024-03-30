import { PropertyInt, PropertyFloat, ArmorModPhrase, CoveragePhrase } from "~/util/mappings";
import { Item } from "./Item";

export class Clothing extends Item {
	get ClassName() {
		return "Clothing"
	}

	async load(fetch: any) {
		await super.load(fetch)
		await this.loadPropertiesFloats(fetch);
	}

	get armorLevel(): number | undefined {
		return this.properties.ints.get(PropertyInt.ArmorLevel);
	}

	get armorLevelVsSlash(): number | undefined {
		return this.armorLevel * (this.properties.floats.get(PropertyFloat.ArmorModVsSlash) || 1)
	}

	get armorLevelVsPierce(): number | undefined {
		return this.armorLevel * (this.properties.floats.get(PropertyFloat.ArmorModVsPierce) || 1)
	}

	get armorLevelVsBludgeon(): number | undefined {
		return this.armorLevel * (this.properties.floats.get(PropertyFloat.ArmorModVsBludgeon) || 1)
	}

	get armorLevelVsCold(): number | undefined {
		return this.armorLevel * (this.properties.floats.get(PropertyFloat.ArmorModVsCold) || 1)
	}

	get armorLevelVsFire(): number | undefined {
		return this.armorLevel * (this.properties.floats.get(PropertyFloat.ArmorModVsFire) || 1)
	}

	get armorLevelVsAcid(): number | undefined {
		return this.armorLevel * (this.properties.floats.get(PropertyFloat.ArmorModVsAcid) || 1)
	}

	get armorLevelVsElectric(): number | undefined {
		return this.armorLevel * (this.properties.floats.get(PropertyFloat.ArmorModVsElectric) || 1)
	}

	get armorLevelVsNether(): number | undefined {
		return this.armorLevel * (this.properties.floats.get(PropertyFloat.ArmorModVsNether) || 1)
	}

	get armorLevelVsSlashPhrase(): string | undefined {
		return ArmorModPhrase(this.properties.floats.get(PropertyFloat.ArmorModVsSlash));
	}
	get armorLevelVsPiercePhrase(): string | undefined {
		return ArmorModPhrase(this.properties.floats.get(PropertyFloat.ArmorModVsPierce));
	}
	get armorLevelVsBludgeonPhrase(): string | undefined {
		return ArmorModPhrase(this.properties.floats.get(PropertyFloat.ArmorModVsBludgeon));
	}
	get armorLevelVsColdPhrase(): string | undefined {
		return ArmorModPhrase(this.properties.floats.get(PropertyFloat.ArmorModVsCold));
	}
	get armorLevelVsFirePhrase(): string | undefined {
		return ArmorModPhrase(this.properties.floats.get(PropertyFloat.ArmorModVsFire));
	}
	get armorLevelVsAcidPhrase(): string | undefined {
		return ArmorModPhrase(this.properties.floats.get(PropertyFloat.ArmorModVsAcid));
	}
	get armorLevelVsElectricPhrase(): string | undefined {
		return ArmorModPhrase(this.properties.floats.get(PropertyFloat.ArmorModVsElectric));
	}
	get armorLevelVsNetherPhrase(): string | undefined {
		return ArmorModPhrase(this.properties.floats.get(PropertyFloat.ArmorModVsNether) || 1);
	}

	get coverageString(): string {
		return CoveragePhrase(this.properties.ints?.get(PropertyInt.ClothingPriority));
	}

	json() {
		return {
			...super.json(),
			armorLevel: this.armorLevel,
			armorLevelVsSlash: this.armorLevelVsSlash,
			armorLevelVsPierce: this.armorLevelVsPierce,
			armorLevelVsBludgeon: this.armorLevelVsBludgeon,
			armorLevelVsCold: this.armorLevelVsCold,
			armorLevelVsFire: this.armorLevelVsFire,
			armorLevelVsAcid: this.armorLevelVsAcid,
			armorLevelVsElectric: this.armorLevelVsElectric,
			armorLevelVsNether: this.armorLevelVsNether,
			armorLevelVsSlashPhrase: this.armorLevelVsSlashPhrase,
			armorLevelVsPiercePhrase: this.armorLevelVsPiercePhrase,
			armorLevelVsBludgeonPhrase: this.armorLevelVsBludgeonPhrase,
			armorLevelVsColdPhrase: this.armorLevelVsColdPhrase,
			armorLevelVsFirePhrase: this.armorLevelVsFirePhrase,
			armorLevelVsAcidPhrase: this.armorLevelVsAcidPhrase,
			armorLevelVsElectricPhrase: this.armorLevelVsElectricPhrase,
			armorLevelVsNetherPhrase: this.armorLevelVsNetherPhrase,
			coverageString: this.coverageString
		}
	}
}
