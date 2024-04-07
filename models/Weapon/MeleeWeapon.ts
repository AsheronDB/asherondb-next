import { Weapon, type WeaponData } from "./Weapon";

export interface MeleeWeaponData extends WeaponData {

}

export class MeleeWeapon extends Weapon {
	get ClassName() {
		return "MeleeWeapon"
	}

	async load(fetch: any) {
		await super.load(fetch);
	}

	json(): MeleeWeaponData {
		return {
			...super.json(),
		}
	}
}
