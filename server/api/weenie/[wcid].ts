import { Book } from "~/models/Book"
import { Clothing } from "~/models/Clothing"
import { Item } from "~/models/Item"
import { Monster } from "~/models/Monster"
import { Caster } from "~/models/Weapon/Caster"
import { MeleeWeapon } from "~/models/Weapon/MeleeWeapon"
import { MissileWeapon } from "~/models/Weapon/MissileWeapon"
import { Weenie } from "~/models/Weenie"
import type { WeenieClassId } from "~/util/types"

// This determines what weenies get their specialized view and which get a
// fallback (Generic) view.
//
// As views for more weenie types are implemented, expand this enum and the
// functions below.
enum WeenieModelType {
  Generic,
  Item,
  Monster,
  MeleeWeapon,
  MissileWeapon,
  Caster,
  Book,
  Clothing,
  Vendor,
}

const getWeenieModelType = async (fetch: any, classId: WeenieClassId): Promise<WeenieModelType> => {
  const w = new Weenie(classId)
  await w.loadWeenieType(fetch)

  if (w.IsMonster) {
    return WeenieModelType.Monster
  }

  if (w.IsVendor) {
    return WeenieModelType.Vendor
  }

  if (w.IsMeleeWeapon) {
    return WeenieModelType.MeleeWeapon
  }

  if (w.IsMissileWeapon) {
    return WeenieModelType.MissileWeapon
  }

  if (w.IsCaster) {
    return WeenieModelType.Caster
  }

  if (w.IsBook) {
    return WeenieModelType.Book
  }

  if (w.IsClothing) {
    return WeenieModelType.Clothing
  }

  // Note: Keep this below other comparisons since this is really a fallback
  // for items that don't need a specialized view like armor and weapons.
  if (w.IsItem) {
    return WeenieModelType.Item
  }

  return WeenieModelType.Generic
}

interface GetWeenieReturnType {
  model_type: WeenieModelType
  weenie: Weenie
}

export const getWeenie = async (fetch: any, classId: WeenieClassId): Promise<GetWeenieReturnType> => {
  // Get Weenie type so we know what kind of model to return
  const model_type = await getWeenieModelType(fetch, classId)

  let weenie: Weenie

  if (model_type === WeenieModelType.Monster || model_type === WeenieModelType.Vendor) {
    weenie = new Monster(classId)
  }
  else if (model_type === WeenieModelType.MeleeWeapon) {
    weenie = new MeleeWeapon(classId)
  }
  else if (model_type === WeenieModelType.MissileWeapon) {
    weenie = new MissileWeapon(classId)
  }
  else if (model_type === WeenieModelType.Caster) {
    weenie = new Caster(classId)
  }
  else if (model_type === WeenieModelType.Book) {
    weenie = new Book(classId)
  }
  else if (model_type === WeenieModelType.Clothing) {
    weenie = new Clothing(classId)
  }
  else if (model_type === WeenieModelType.Item) {
    weenie = new Item(classId)
  }
  else {
    weenie = new Weenie(classId)
  }

  await weenie.load(fetch)

  return { model_type: model_type, weenie: weenie }
}

export default defineEventHandler(async (event) => {
  const wcid = Number(event.context.params?.wcid)

  if (Number.isNaN(wcid)) {
    // TODO: Handle missing or malformed param (bad request)
    return
  }

  // TODO: Handle error (http status, different body)
  const result = await getWeenie(fetch, wcid)

  return {
    type: result.model_type,
    classId: wcid,
    data: result.weenie.json(),
  }
})
