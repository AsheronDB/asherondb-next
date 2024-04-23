import { Item } from "../Item"
import type { ItemData } from "../Item"
import { PropertyInt, PropertyFloat, DamageTypePhrase, SkillName, WeaponTypeName, PropertyBool, SpeedCategoryName } from "~/util/mappings"

export interface WeaponData extends ItemData {
  damageBonus: number
  damageMod: number
  speedString: string
  offenseString: string
  hasMeleeDefenseBonus: boolean
  defenseString: string
  skillString: string
  hasWieldRequirement: boolean
  wieldRequirementSkillName: string
  wieldRequirementSkillValue: number
  manaConversionBonus: number
  elementalDamageModString: string
  elementalDamageModVsHumansString: string
  hasElementalDamageMod: boolean
  elementalDamageTypeString: string
  propertyString: string
  elementalDamageBonus: number
}

export class Weapon extends Item {
  get ClassName() {
    return "Weapon"
  }

  async load(fetch: any) {
    await super.load(fetch)
  }

  get damageBonus(): number {
    return this.properties.ints.get(PropertyInt.Damage)
  }

  get damageMod(): number {
    return Math.round((this.properties.floats.get(PropertyFloat.DamageMod) - 1) * 100)
  }

  get speedString(): string {
    return `${SpeedCategoryName(this.properties.ints.get(PropertyInt.WeaponTime))} (${this.properties.ints.get(PropertyInt.WeaponTime)})`
  }

  get hasMeleeDefenseBonus(): boolean {
    return this.properties.floats.get(PropertyFloat.WeaponDefense) > 1
      + Number.EPSILON
  }

  get offenseString(): string {
    const rawValue = this.properties.floats.get(PropertyFloat.WeaponOffense)
    const value = Math.round((rawValue - 1) * 1000) / 10

    return `${value}%`
  }

  get defenseString(): string {
    const rawValue = this.properties.floats.get(PropertyFloat.WeaponDefense)
    const value = (Math.round((rawValue - 1) * 1000) / 10).toLocaleString(undefined, { minimumFractionDigits: 1 })

    return `${value}%`
  }

  get skillString(): string {
    console.log("skillStringskillStringskillString", this.properties.ints.get(PropertyInt.WeaponType))
    const name = SkillName[this.properties.ints.get(PropertyInt.WeaponSkill)]
    // Category can sometimes be undefined, see Enhanced Shivering Atlan Bow
    const category = WeaponTypeName[this.properties.ints.get(PropertyInt.WeaponType)]

    if (typeof category === "undefined") {
      return `${name}`
    }
    else {
      return `${name} (${category})`
    }
  }

  get hasWieldRequirement(): boolean {
    return typeof this.properties.ints.get(PropertyInt.WieldDifficulty) !== "undefined"
  }

  get wieldRequirementSkillName(): string {
    return SkillName[this.properties.ints.get(PropertyInt.WieldSkillType)]
  }

  get wieldRequirementSkillValue(): number {
    return this.properties.ints.get(PropertyInt.WieldDifficulty)
  }

  get manaConversionBonus(): number {
    return this.properties.floats.get(PropertyFloat.ManaConversionMod) * 100
  }

  get propertyString(): string {
    const props = []

    if (this.properties.ints.get(PropertyInt.Attuned)) {
      props.push("Attuned")
    }

    if (this.properties.ints.get(PropertyInt.Bonded)) {
      props.push("Bonded")
    }

    if (this.hasElementalDamageMod) {
      props.push(`Resistance Cleaving: ${this.elementalDamageTypeString}`)
    }

    if (this.properties.bool.get(PropertyBool.Ivoryable)) {
      props.push("Ivoryable")
    }

    if (this.properties.bool.get(PropertyBool.Dyable)) {
      props.push("Dyable")
    }

    return props.join(", ")
  }

  get elementalDamageModString(): string {
    const rawValue = this.properties.floats.get(PropertyFloat.ElementalDamageMod)
    const value = (Math.round((rawValue - 1) * 1000) / 10).toLocaleString(undefined, { minimumFractionDigits: 1 })

    return value
  }

  get elementalDamageModVsHumansString(): string {
    const rawValue = this.properties.floats.get(PropertyFloat.ElementalDamageMod)
    const value = ((Math.round((rawValue - 1) * 1000) / 10) / 2).toLocaleString(undefined, { minimumFractionDigits: 1 })

    return value
  }

  get hasElementalDamageMod(): boolean {
    return this.properties.ints.get(PropertyInt.ResistanceModifierType)
  }

  get elementalDamageTypeString(): string {
    return DamageTypePhrase(this.properties.ints.get(PropertyInt.ResistanceModifierType))
  }

  get elementalDamageBonus(): number {
    return this.properties.ints.get(PropertyInt.ElementalDamageBonus)
  }

  json(): WeaponData {
    return {
      ...super.json(),
      damageBonus: this.damageBonus,
      damageMod: this.damageMod,
      speedString: this.speedString,
      offenseString: this.offenseString,
      hasMeleeDefenseBonus: this.hasMeleeDefenseBonus,
      defenseString: this.defenseString,
      skillString: this.skillString,
      hasWieldRequirement: this.hasWieldRequirement,
      wieldRequirementSkillName: this.wieldRequirementSkillName,
      wieldRequirementSkillValue: this.wieldRequirementSkillValue,
      manaConversionBonus: this.manaConversionBonus,
      hasElementalDamageMod: this.hasElementalDamageMod,
      elementalDamageModString: this.elementalDamageModString,
      elementalDamageModVsHumansString: this.elementalDamageModVsHumansString,
      elementalDamageTypeString: this.elementalDamageTypeString,
      propertyString: this.propertyString,
      elementalDamageBonus: this.elementalDamageBonus,
    }
  }
}
