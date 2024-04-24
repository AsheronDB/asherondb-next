import type { $fetch } from "ofetch"

import { Item, type ItemData } from "./Item"
import { PropertyInt, PropertyFloat, ArmorModPhrase, CoveragePhrase, PropertyBool } from "~/util/mappings"

type FetchFunction = typeof $fetch

export interface ClothingData extends ItemData {
  armorLevel: number
  armorLevelVsSlash: number
  armorLevelVsPierce: number
  armorLevelVsBludgeon: number
  armorLevelVsCold: number
  armorLevelVsFire: number
  armorLevelVsAcid: number
  armorLevelVsElectric: number
  armorLevelVsNether: number
  armorLevelVsSlashPhrase: number
  armorLevelVsPiercePhrase: number
  armorLevelVsBludgeonPhrase: number
  armorLevelVsColdPhrase: number
  armorLevelVsFirePhrase: number
  armorLevelVsAcidPhrase: number
  armorLevelVsElectricPhrase: number
  armorLevelVsNetherPhrase: number
  coverageString: string
  propertyString: string
}

export class Clothing extends Item {
  get ClassName() {
    return "Clothing"
  }

  async load(fetch: FetchFunction) {
    await super.load(fetch)
    await this.loadPropertiesFloats(fetch)
  }

  get armorLevel(): number | undefined {
    return this.properties.ints.get(PropertyInt.ArmorLevel)
  }

  get armorLevelVsSlash(): number | undefined {
    return Math.round(this.armorLevel * (this.properties.floats.get(PropertyFloat.ArmorModVsSlash) || 1))
  }

  get armorLevelVsPierce(): number | undefined {
    return Math.round(this.armorLevel * (this.properties.floats.get(PropertyFloat.ArmorModVsPierce) || 1))
  }

  get armorLevelVsBludgeon(): number | undefined {
    return Math.round(this.armorLevel * (this.properties.floats.get(PropertyFloat.ArmorModVsBludgeon) || 1))
  }

  get armorLevelVsCold(): number | undefined {
    return Math.round(this.armorLevel * (this.properties.floats.get(PropertyFloat.ArmorModVsCold) || 1))
  }

  get armorLevelVsFire(): number | undefined {
    return Math.round(this.armorLevel * (this.properties.floats.get(PropertyFloat.ArmorModVsFire) || 1))
  }

  get armorLevelVsAcid(): number | undefined {
    return Math.round(this.armorLevel * (this.properties.floats.get(PropertyFloat.ArmorModVsAcid) || 1))
  }

  get armorLevelVsElectric(): number | undefined {
    return Math.round(this.armorLevel * (this.properties.floats.get(PropertyFloat.ArmorModVsElectric) || 1))
  }

  get armorLevelVsNether(): number | undefined {
    return Math.round(this.armorLevel * (this.properties.floats.get(PropertyFloat.ArmorModVsNether) || 1))
  }

  get armorLevelVsSlashPhrase(): string | undefined {
    return ArmorModPhrase(this.properties.floats.get(PropertyFloat.ArmorModVsSlash))
  }

  get armorLevelVsPiercePhrase(): string | undefined {
    return ArmorModPhrase(this.properties.floats.get(PropertyFloat.ArmorModVsPierce))
  }

  get armorLevelVsBludgeonPhrase(): string | undefined {
    return ArmorModPhrase(this.properties.floats.get(PropertyFloat.ArmorModVsBludgeon))
  }

  get armorLevelVsColdPhrase(): string | undefined {
    return ArmorModPhrase(this.properties.floats.get(PropertyFloat.ArmorModVsCold))
  }

  get armorLevelVsFirePhrase(): string | undefined {
    return ArmorModPhrase(this.properties.floats.get(PropertyFloat.ArmorModVsFire))
  }

  get armorLevelVsAcidPhrase(): string | undefined {
    return ArmorModPhrase(this.properties.floats.get(PropertyFloat.ArmorModVsAcid))
  }

  get armorLevelVsElectricPhrase(): string | undefined {
    return ArmorModPhrase(this.properties.floats.get(PropertyFloat.ArmorModVsElectric))
  }

  get armorLevelVsNetherPhrase(): string | undefined {
    return ArmorModPhrase(this.properties.floats.get(PropertyFloat.ArmorModVsNether) || 1)
  }

  get coverageString(): string {
    return CoveragePhrase(this.properties.ints?.get(PropertyInt.ClothingPriority))
  }

  get propertyString(): string {
    const props = []

    if (this.properties.ints.get(PropertyInt.Attuned)) {
      props.push("Attuned")
    }

    if (this.properties.ints.get(PropertyInt.Bonded)) {
      props.push("Bonded")
    }

    if (this.properties.bool.get(PropertyBool.Ivoryable)) {
      props.push("Ivoryable")
    }

    if (this.properties.bool.get(PropertyBool.Dyable)) {
      props.push("Dyable")
    }

    return props.join(", ")
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
      coverageString: this.coverageString,
      propertyString: this.propertyString,
    }
  }
}
