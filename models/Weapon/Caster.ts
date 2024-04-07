import { Weapon, type WeaponData } from "./Weapon";

export interface CasterData extends WeaponData {

}

export class Caster extends Weapon {
  get ClassName() {
    return "Caster"
  }

  async load(fetch: any) {
    await super.load(fetch);
  }

  json(): CasterData {
    return {
      ...super.json(),
    }
  }
}
