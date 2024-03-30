import { PropertyInt, CreatureTypeName, PropertyAttribute, PropertyAttribute2nd } from "~/util/mappings";
import { Weenie } from "./Weenie";

export class Vitals {
	health?: number
	stamina?: number
	mana?: number

	constructor(health?: number, stamina?: number, mana?: number) {
		this.health = health;
		this.stamina = stamina;
		this.mana = mana;
	}

	json() {
		return {
			health: this.health,
			stamina: this.stamina,
			mana: this.mana
		}
	}
}

export class Attributes {
	strength?: number
	endurance?: number
	coordination?: number
	quickness?: number
	focus?: number
	self?: number

	constructor(strength?: number, endurance?: number, coordination?: number, quickness?: number, focus?: number, self?: number) {
		this.strength = strength;
		this.endurance = endurance;
		this.coordination = coordination;
		this.quickness = quickness;
		this.focus = focus;
		this.self = self;
	}

	json() {
		return {
			strength: this.strength,
			endurance: this.endurance,
			coordination: this.coordination,
			quickness: this.quickness,
			focus: this.focus,
			self: this.self,
		}
	}
}

export class Monster extends Weenie {
	get ClassName() {
		return "Monster"
	}


	async load(fetch: any) {
		await super.load(fetch);
		await this.loadPropertiesInts(fetch);
		await this.loadPropertiesAttributes(fetch);
		await this.loadPropertiesAttributes2nd(fetch);
	}

	get creatureTypeName(): string | undefined {
		const creatureType = this.properties.ints?.get(PropertyInt.CreatureType);

		if (!creatureType) {
			return undefined
		}

		return CreatureTypeName[creatureType];
	}

	get level(): number | undefined {
		return this.properties.ints?.get(PropertyInt.Level);
	}

	get attributes(): Attributes {
		return new Attributes(
			this.properties.attributes?.get(PropertyAttribute.Strength),
			this.properties.attributes?.get(PropertyAttribute.Endurance),
			this.properties.attributes?.get(PropertyAttribute.Coordination),
			this.properties.attributes?.get(PropertyAttribute.Quickness),
			this.properties.attributes?.get(PropertyAttribute.Focus),
			this.properties.attributes?.get(PropertyAttribute.Self)
		);
	}

	get vitals(): Vitals {
		return new Vitals(
			this.properties.attributes_2nd?.get(PropertyAttribute2nd.MaxHealth),
			this.properties.attributes_2nd?.get(PropertyAttribute2nd.MaxStamina),
			this.properties.attributes_2nd?.get(PropertyAttribute2nd.MaxMana),
		);
	}

	json() {
		return {
			...super.json(),
			creatureTypeName: this.creatureTypeName,
			level: this.level,
			attributes: this.attributes.json(),
			vitals: this.vitals.json(),
		}
	}
}
