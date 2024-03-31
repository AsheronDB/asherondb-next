// WIP: I'm factoring out queries I need for pages in here
// TODO: Rename this once I get a sense of what is needed
export interface CountResponse {
   total: number
 }

export interface WeenieListingRow {
   wcid: string,
   name: string
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
