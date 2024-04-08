import { DamageTypePhrase, PropertyFloat, PropertyInt } from "~/util/mappings";
import { Weapon, type WeaponData } from "./Weapon";

export interface MeleeWeaponData extends WeaponData {
	damageString: string
}

export class MeleeWeapon extends Weapon {
	get ClassName() {
		return "MeleeWeapon"
	}

	async load(fetch: any) {
		await super.load(fetch);
	}

	get minDamage(): number {
		return (this.maxDamage - (this.maxDamage * this.properties.floats.get(PropertyFloat.DamageVariance))).toLocaleString(undefined, { minimumFractionDigits: 2 });
	}

	get maxDamage(): number {
		return this.properties.ints.get(PropertyInt.Damage)
	}

	get damageString(): string {
		return `${this.minDamage} - ${this.maxDamage}, ${DamageTypePhrase(this.properties.ints.get(PropertyInt.DamageType))}`
	}

	json(): MeleeWeaponData {
		return {
			...super.json(),
			damageString: this.damageString,

		}
	}
}
