import type { $fetch } from "ofetch"

import { Weapon, type WeaponData } from "./Weapon"

type FetchFunction = typeof $fetch

export interface CasterData extends WeaponData {

}

export class Caster extends Weapon {
  get ClassName() {
    return "Caster"
  }

  async load(fetch: FetchFunction) {
    await super.load(fetch)
  }

  json(): CasterData {
    return {
      ...super.json(),

    }
  }
}
