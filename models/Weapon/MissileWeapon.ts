import type { $fetch } from "ofetch"

import { Weapon, type WeaponData } from "./Weapon"
import { AmmoTypePhrase, PropertyInt } from "~/util/mappings"

type FetchFunction = typeof $fetch

export interface MissileWeaponData extends WeaponData {
  ammoTypeString: string
  range: number
}

export class MissileWeapon extends Weapon {
  get ClassName() {
    return "MissileWeapon"
  }

  async load(fetch: FetchFunction) {
    await super.load(fetch)
  }

  get ammoTypeString(): string {
    return AmmoTypePhrase(this.properties.ints.get(PropertyInt.AmmoType))
  }

  get range(): number {
    // TODO
    // 65 is 150
    // 75 yds is 180
    // 80 yds is 192
    return this.properties.ints.get(PropertyInt.WeaponRange)
  }

  json(): MissileWeaponData {
    return {
      ...super.json(),
      ammoTypeString: this.ammoTypeString,
      range: this.range,
    }
  }
}
