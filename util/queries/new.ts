// WIP: I'm factoring out queries I need for pages in here
import { SQLiteSyncDialect } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm'

import { PropertyString } from "../mappings";

// Run a raw query through Drizzle sql.raw and generate an SQLite query string
export const getSQLString = function (query: string): string {
   const sqliteDialect = new SQLiteSyncDialect();

   return sqliteDialect.sqlToQuery(sql.raw(query)).sql;
}

// TODO: Rename this once I get a sense of what is needed
export interface CountResponse {
   total: number
}

export interface WeenieListingRow {
   wcid: string,
   name: string
}

export interface WeenieSearchListingRow {
   wcid: string,
   type: number,
   name: string,
}

// getCountOfWeenieByClassId
export const getCountOfWeenieByClassId = (classIds: number[]) => {
   const where = classIds.map((x) => `type = ${x}`).join(" OR ")

   return `SELECT
      COUNT(1) as total
      FROM weenie
      WHERE
         ${where}
    `;
}

// getCountOfWeenieByClassId
export const getWeenies = (classIds: number[], page: number, page_size: number) => {
   const where = classIds.map((x) => `w.type = ${x}`).join(" OR ")

   return `
   SELECT
      w.class_Id as wcid,
      w_string_name.value as name
   FROM
     weenie as w
   LEFT JOIN
      weenie_properties_string AS w_string_name ON w.class_Id = w_string_name.object_Id AND w_string_name.type = 1
   WHERE
      ${where}
   LIMIT
      ${page_size}
   OFFSET
      ${(page - 1) * page_size}`
}

// getCountOfWeenieByName
export const getCountOfWeenieByName = (name: string | null) => {
   // const where = classIds.map((x) => `type = ${x}`).join(" OR ")

   let filter = "";

   if (name) {
      filter = `AND weenie_properties_string.value LIKE '%${name}%'`
   } else {
      filter = ""
   }

   return `SELECT
      COUNT(1) as total
      FROM weenie
      LEFT JOIN weenie_properties_string ON weenie.class_Id = weenie_properties_string.object_Id
      WHERE
         weenie_properties_string.type = ${PropertyString.Name}
         ${filter}
    `;
}

// getWeeniesByName
export const getWeeniesByName = (name: string | null, page: number, page_size: number) => {
   // Handle name being null
   let filter = "";

   if (name) {
      filter = `AND name LIKE '%${name}%'`
   } else {
      filter = ""
   }

   return `
   SELECT
      weenie_properties_string.object_Id as wcid,
      weenie.type as type,
      weenie_properties_string.value as name
   FROM
      weenie
   LEFT JOIN weenie_properties_string ON weenie.class_Id = weenie_properties_string.object_Id
   WHERE
      weenie_properties_string.type = ${PropertyString.Name}
      ${filter}
   ORDER BY
      id
   LIMIT
      ${page_size}
   OFFSET
      ${(page - 1) * page_size}`
}
