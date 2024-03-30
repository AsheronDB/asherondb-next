import { DB } from "./datasette"
import { PropertyString } from "./mappings";

const getWeenieTypeQuery = (classId: number) => {
	return `
		SELECT type
		FROM weenie
		WHERE
			class_Id = ${classId}
		LIMIT 1;
	`;
}

export const getWeenieTypeQueryURL = (classId: number) => {
	return DB.getURLForQuery(getWeenieTypeQuery(classId));

}

const getMonstersQuery = (name?: string, limit = 20, offset = 0) => {
	const name_filter = name && name.length > 0 ? `AND name LIKE '%${name}%'` : ""

	const pieces = [
		`
			SELECT
				weenie_properties_string.object_Id,
				weenie_properties_string.value AS name,
				weenie.type
			FROM
				weenie_properties_string
			LEFT JOIN
				weenie ON weenie_properties_string.object_Id == weenie.class_Id
			WHERE
				weenie_properties_string.type = '${PropertyString.Name}'
				${name_filter}
			LIMIT
				${limit}
			OFFSET
				${offset}
		`
	]

	return pieces.join(" ");
}

export const getMonstersQueryURL = (name?: string, page?: number) => {
	const limit = 20;
	const offset = ((page || 1) - 1) * limit;

	return DB.getURLForQuery(getMonstersQuery(name, limit, offset));
}

//
//
//

const getWeeniePropertiesStringQuery = (id: number) => `
		SELECT
			*
		FROM
			weenie_properties_string
		WHERE
			object_Id = ${id};
	`

export const getWeeniePropertiesStringQueryURL = (id: number) => DB.getURLForQuery(getWeeniePropertiesStringQuery(id))

const getWeeniePropertiesAttributeQuery = (id: number) => `
		SELECT
			*
		FROM
			weenie_properties_attribute
		WHERE
			object_Id = ${id};
	`

export const getWeeniePropertiesAttributeQueryURL = (id: number) => DB.getURLForQuery(getWeeniePropertiesAttributeQuery(id))

const getWeeniePropertiesAttribute2ndQuery = (id: number) => `
		SELECT
			*
		FROM
			weenie_properties_attribute_2nd
		WHERE
			object_Id = ${id};
	`

export const getWeeniePropertiesAttribute2ndQueryURL = (id: number) => DB.getURLForQuery(getWeeniePropertiesAttribute2ndQuery(id))

const getWeeniePropertiesIntQuery = (id: number) => `
		SELECT
			*
		FROM
			weenie_properties_int
		WHERE
			object_Id = ${id};
	`

export const getWeeniePropertiesIntQueryURL = (id: number) => DB.getURLForQuery(getWeeniePropertiesIntQuery(id))

const getWeeniePropertiesFloatsQuery = (id: number) => `
		SELECT
			*
		FROM
			weenie_properties_float
		WHERE
			object_Id = ${id};
	`

export const getWeeniePropertiesFloatsQueryURL = (id: number) => DB.getURLForQuery(getWeeniePropertiesFloatsQuery(id))

const getWeeniePropertiesBookQuery = (id: number) => `
		SELECT
			*
		FROM
			weenie_properties_book
		WHERE
			object_Id = ${id};
	`

export const getWeeniePropertiesBookQueryURL = (id: number) => DB.getURLForQuery(getWeeniePropertiesBookQuery(id))


const getWeeniePropertiesBookPageDataQuery = (id: number) => `
		SELECT
			*
		FROM
			weenie_properties_book_page_data
		WHERE
			object_Id = ${id};
	`

export const getWeeniePropertiesBookPageDataQueryURL = (id: number) => DB.getURLForQuery(getWeeniePropertiesBookPageDataQuery(id))

// TODO: anim_part
const getWeeniePropertiesAnimPartQuery = (id: number) => `
		SELECT
			*
		FROM
			weenie_properties_anim_part
		WHERE
			object_Id = ${id};
	`

export const getWeeniePropertiesAnimPartQueryURL = (id: number) => DB.getURLForQuery(getWeeniePropertiesAnimPartQuery(id))


// TODO: body_part
const getWeeniePropertiesBodyPartQuery = (id: number) => `
		SELECT
			*
		FROM
			weenie_properties_body_part
		WHERE
			object_Id = ${id};
	`

export const getWeeniePropertiesBodyPartQueryURL = (id: number) => DB.getURLForQuery(getWeeniePropertiesBodyPartQuery(id))

// TODO: bool
const getWeeniePropertiesBoolQuery = (id: number) => `
		SELECT
			*
		FROM
			weenie_properties_bool
		WHERE
			object_Id = ${id};
	`

export const getWeeniePropertiesBoolQueryURL = (id: number) => DB.getURLForQuery(getWeeniePropertiesBoolQuery(id))

// TODO: create_list
const getWeeniePropertiesCreateListQuery = (id: number) => `
		SELECT
			*
		FROM
			weenie_properties_create_list
		WHERE
			object_Id = ${id};
	`

export const getWeeniePropertiesCreateListQueryURL = (id: number) => DB.getURLForQuery(getWeeniePropertiesCreateListQuery(id))

// TODO: d_i_d
const getWeeniePropertiesDataIdQuery = (id: number) => `
		SELECT
			*
		FROM
			weenie_properties_d_i_d
		WHERE
			object_Id = ${id};
	`

export const getWeeniePropertiesDataIdQueryURL = (id: number) => DB.getURLForQuery(getWeeniePropertiesDataIdQuery(id))

// TODO: emote
const getWeeniePropertiesEmoteQuery = (id: number) => `
		SELECT
			*
		FROM
			weenie_properties_emote
		WHERE
			object_Id = ${id};
	`

export const getWeeniePropertiesEmoteQueryURL = (id: number) => DB.getURLForQuery(getWeeniePropertiesEmoteQuery(id))

// TODO: emote_action
const getWeeniePropertiesEmoteActionQuery = (id: number) => `
		SELECT
			*
		FROM
			weenie_properties_emote_action
		WHERE
			object_Id = ${id};
	`

export const getWeeniePropertiesEmoteActionQueryURL = (id: number) => DB.getURLForQuery(getWeeniePropertiesEmoteActionQuery(id))

// TODO: event_filter
const getWeeniePropertiesEventFilterQuery = (id: number) => `
		SELECT
			*
		FROM
			weenie_properties_event_filter
		WHERE
			object_Id = ${id};
	`

export const getWeeniePropertiesEventFilterQueryURL = (id: number) => DB.getURLForQuery(getWeeniePropertiesEventFilterQuery(id))

// TODO: generator
const getWeeniePropertiesGeneratorQuery = (id: number) => `
		SELECT
			*
		FROM
			weenie_properties_generator
		WHERE
			object_Id = ${id};
	`

export const getWeeniePropertiesGeneratorQueryURL = (id: number) => DB.getURLForQuery(getWeeniePropertiesGeneratorQuery(id))

// TODO: i_i_d
const getWeeniePropertiesInstanceIdQuery = (id: number) => `
		SELECT
			*
		FROM
			weenie_properties_i_i_d
		WHERE
			object_Id = ${id};
	`

export const getWeeniePropertiesInstanceIdQueryURL = (id: number) => DB.getURLForQuery(getWeeniePropertiesInstanceIdQuery(id))

// TODO: int64
const getWeeniePropertiesSInt64Query = (id: number) => `
		SELECT
			*
		FROM
			weenie_properties_int64
		WHERE
			object_Id = ${id};
	`

export const getWeeniePropertiesSInt64QueryURL = (id: number) => DB.getURLForQuery(getWeeniePropertiesSInt64Query(id))

// TODO: palette
const getWeeniePropertiesPaletteQuery = (id: number) => `
		SELECT
			*
		FROM
			weenie_properties_palette
		WHERE
			object_Id = ${id};
	`

export const getWeeniePropertiesPaletteQueryURL = (id: number) => DB.getURLForQuery(getWeeniePropertiesPaletteQuery(id))

// TODO: position
const getWeeniePropertiesPositionQuery = (id: number) => `
		SELECT
			*
		FROM
			weenie_properties_position
		WHERE
			object_Id = ${id};
	`

export const getWeeniePropertiesPositionQueryURL = (id: number) => DB.getURLForQuery(getWeeniePropertiesPositionQuery(id))

// TODO: skill
const getWeeniePropertiesSkillQuery = (id: number) => `
		SELECT
			*
		FROM
			weenie_properties_skill
		WHERE
			object_Id = ${id};
	`

export const getWeeniePropertiesSkillQueryURL = (id: number) => DB.getURLForQuery(getWeeniePropertiesSkillQuery(id))

// TODO: spell_book
const getWeeniePropertiesSpellBookQuery = (id: number) => `
		SELECT
			spell.id,
			spell.name
		FROM
			weenie_properties_spell_book
		LEFT JOIN
			spell ON weenie_properties_spell_book.spell = spell.id
		WHERE
			object_Id = ${id};
	`

export const getWeeniePropertiesSpellBookQueryURL = (id: number) => DB.getURLForQuery(getWeeniePropertiesSpellBookQuery(id))

// TODO: texture_map
const getWeeniePropertiesTextureMapQuery = (id: number) => `
		SELECT
			*
		FROM
			weenie_properties_texture_map
		WHERE
			object_Id = ${id};
	`

export const getWeeniePropertiesTextureMapQueryURL = (id: number) => DB.getURLForQuery(getWeeniePropertiesTextureMapQuery(id))

export const getGeneratorsForWeenieClassIdQuery = (weenieClassId: number) => `
	WITH RECURSIVE generator (object_Id, weenie_Class_Id, obj_Cell_Id) AS (
		SELECT
			e.object_Id,
			e.weenie_Class_Id,
			e.obj_Cell_Id
		FROM
			weenie_properties_generator e
		WHERE
			e.weenie_Class_Id = ${weenieClassId}
		UNION
		SELECT
			e.object_Id,
			e.weenie_Class_Id,
			e.obj_Cell_Id
		FROM
			weenie_properties_generator e
			JOIN generator c ON c.object_Id = e.weenie_Class_Id
	)
	SELECT
		*
	FROM
		generator
	WHERE
		object_Id
`

export const getGeneratorsForWeenieClassIdQueryURL = (id: number) => DB.getURLForQuery(getGeneratorsForWeenieClassIdQuery(id))
