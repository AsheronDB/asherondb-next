import { Weenie, type WeenieData } from "./Weenie"
import { PropertyString, PropertyInt, PropertyFloat, PropertyBool } from "~/util/mappings"

export interface SpellData {
  index: number
  id: number
  name: string
}

export interface ItemData extends WeenieData {
  value: number | undefined
  burden: number | undefined
  wieldDifficulty: number
  itemDifficulty: number | undefined
  use: string | undefined
  mana: number
  manaRateString: string
  spellcraft: number
  isSellable: boolean
  spells: SpellData[]
}

export class Item extends Weenie {
  get ClassName() {
    return "Item"
  }

  async load(fetch: any) {
    await super.load(fetch)
    await this.loadPropertiesInts(fetch)
    await this.loadPropertiesFloats(fetch)
    await this.loadWeeniePropertyBool(fetch)
    await this.loadWeeniePropertySpellBook(fetch)
  }

  get value(): number | undefined {
    return this.properties.ints.get(PropertyInt.Value)
  }

  get burden(): number | undefined {
    return this.properties.ints.get(PropertyInt.EncumbranceVal)
  }

  get wieldDifficulty(): number {
    return this.properties.ints.get(PropertyInt.WieldDifficulty)
  }

  get itemDifficulty(): number | undefined {
    return this.properties.ints.get(PropertyInt.ItemDifficulty)
  }

  get use(): string | undefined {
    return this.properties.strings.get(PropertyString.Use)
  }

  get mana(): number {
    return this.properties.ints.get(PropertyInt.ItemMaxMana)
  }

  get manaRateString(): string {
    return `1 point per ${Math.round(Math.abs(1 / this.properties.floats.get(PropertyFloat.ManaRate)))} seconds.`
  }

  get spellcraft(): number {
    return this.properties.ints.get(PropertyInt.ItemSpellcraft)
  }

  get isSellable(): bool {
    return this.properties.bool.get(PropertyBool.IsSellable)
  }

  get spells(): SpellData[] {
    return Array.from(this.properties.spell_book?.entries()).map((x, i) => {
      return {
        index: i,
        id: x[0],
        name: x[1],
      }
    })
  }

  json(): ItemData {
    return {
      ...super.json(),
      value: this.value,
      burden: this.burden,
      wieldDifficulty: this.wieldDifficulty,
      itemDifficulty: this.itemDifficulty,
      use: this.use,
      mana: this.mana,
      manaRateString: this.manaRateString,
      spellcraft: this.spellcraft,
      isSellable: this.isSellable,
      spells: this.spells,
    }
  }
}
