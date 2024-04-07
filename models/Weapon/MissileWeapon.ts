import { Weapon, type WeaponData } from "./Weapon";

export interface MissileWeaponData extends WeaponData {

}

export class MissileWeapon extends Weapon {
  get ClassName() {
    return "MissileWeapon"
  }

  async load(fetch: any) {
    await super.load(fetch);
  }

  json(): MissileWeaponData {
    return {
      ...super.json(),
    }
  }
}
