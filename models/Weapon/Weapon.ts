import { PropertyInt, PropertyFloat, DamageTypePhrase, SkillName, WeaponTypeName, PropertyBool } from "~/util/mappings";
import { Item } from "../Item";
import type { ItemData } from "../Item";

interface SpellData {
  index: number,
  id: number,
  name: string
}

export interface WeaponData extends ItemData {
  damageString: string
  speedString: string
  offenseString: string
  defenseString: string
  skillString: string
  hasWieldRequirement: boolean
  spells: SpellData[]
  wieldRequirementSkillName: string
  wieldRequirementSkillValue: number
  manaConversionBonus: number
  hasElementalDamageMod: boolean
  elementalDamageModString: string
  elementalDamageModVsHumansString: string
  elementalDamageTypeString: string
  propertyString: string
}

export class Weapon extends Item {
  get ClassName() {
    return "Weapon"
  }

  async load(fetch: any) {
    await super.load(fetch);
  }

  get minDamage(): number {
    return this.maxDamage - (this.maxDamage * this.properties.floats.get(PropertyFloat.DamageVariance))
  }

  get maxDamage(): number {
    return this.properties.ints.get(PropertyInt.Damage)
  }

  get damageString(): string {
    return `${this.minDamage} - ${this.maxDamage}, ${DamageTypePhrase(this.properties.ints.get(PropertyInt.DamageType))}`
  }

  get speedString(): string {
    return this.properties.ints.get(PropertyInt.WeaponTime)
  }

  get defenseString(): string {
    const rawValue = this.properties.floats.get(PropertyFloat.WeaponDefense);
    const value = (Math.round((rawValue - 1) * 1000) / 10).toLocaleString(undefined, { minimumFractionDigits: 1 });

    return `${value}%`;
  }

  get offenseString(): string {
    const rawValue = this.properties.floats.get(PropertyFloat.WeaponOffense);
    const value = Math.round((rawValue - 1) * 1000) / 10;

    return `${value}%`;
  }

  get skillString(): string {
    const name = SkillName[this.properties.ints.get(PropertyInt.WeaponSkill)];
    const category = WeaponTypeName[this.properties.ints.get(PropertyInt.WeaponType)];

    return `${name} (${category})`;
  }

  get spells(): SpellData[] {
    return Array.from(this.properties.spell_book?.entries()).map((x, i) => {
      return {
        index: i,
        id: x[0],
        name: x[1]
      }
    });
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
    return this.properties.floats.get(PropertyFloat.ManaConversionMod) * 100;
  }

  get propertyString(): string {
    const props = []

    if (this.properties.ints.get(PropertyInt.Attuned)) {
      props.push("Attuned");
    }

    if (this.properties.ints.get(PropertyInt.Bonded)) {
      props.push("Bonded");
    }

    if (this.hasElementalDamageMod) {
      props.push(`Resistance Cleaving: ${this.elementalDamageTypeString}`)
    }

    if (this.properties.bool.get(PropertyBool.Ivoryable)) {
      props.push("Ivoryable");
    }

    if (this.properties.bool.get(PropertyBool.Dyable)) {
      props.push("Dyable");
    }

    return props.join(", ")
  }

  get hasElementalDamageMod(): boolean {
    return typeof this.properties.floats.get(PropertyFloat.ElementalDamageMod) !== "undefined"
  }

  get elementalDamageModString(): string {
    const rawValue = this.properties.floats.get(PropertyFloat.ElementalDamageMod);
    const value = (Math.round((rawValue - 1) * 1000) / 10).toLocaleString(undefined, { minimumFractionDigits: 1 });

    return value
  }

  get elementalDamageModVsHumansString(): string {
    const rawValue = this.properties.floats.get(PropertyFloat.ElementalDamageMod);
    const value = ((Math.round((rawValue - 1) * 1000) / 10) / 2).toLocaleString(undefined, { minimumFractionDigits: 1 });

    return value
  }

  get elementalDamageTypeString(): string {
    return DamageTypePhrase(this.properties.ints.get(PropertyInt.ResistanceModifierType));
  }

  json(): WeaponData {
    return {
      ...super.json(),
      damageString: this.damageString,
      speedString: this.speedString,
      offenseString: this.offenseString,
      defenseString: this.defenseString,
      skillString: this.skillString,
      hasWieldRequirement: this.hasWieldRequirement,
      wieldRequirementSkillName: this.wieldRequirementSkillName,
      wieldRequirementSkillValue: this.wieldRequirementSkillValue,
      manaConversionBonus: this.manaConversionBonus,
      spells: this.spells,
      hasElementalDamageMod: this.hasElementalDamageMod,
      elementalDamageModString: this.elementalDamageModString,
      elementalDamageModVsHumansString: this.elementalDamageModVsHumansString,
      elementalDamageTypeString: this.elementalDamageTypeString,
      propertyString: this.propertyString,
    }
  }
}
