import { getColumnIndex } from "~/util/datasette"
import { PropertyString, WeenieType } from "~/util/mappings"
import { getWeenieTypeQueryURL, getWeeniePropertiesIntQueryURL, getWeeniePropertiesStringQueryURL, getWeeniePropertiesAttributeQueryURL, getWeeniePropertiesAttribute2ndQueryURL, getWeeniePropertiesFloatsQueryURL, getWeeniePropertiesBookQueryURL, getWeeniePropertiesBookPageDataQueryURL, getWeeniePropertiesAnimPartQueryURL, getWeeniePropertiesBodyPartQueryURL, getWeeniePropertiesBoolQueryURL, getWeeniePropertiesCreateListQueryURL, getWeeniePropertiesDataIdQueryURL, getWeeniePropertiesEmoteQueryURL, getWeeniePropertiesEventFilterQueryURL, getWeeniePropertiesGeneratorQueryURL, getWeeniePropertiesInstanceIdQueryURL, getWeeniePropertiesSInt64QueryURL, getWeeniePropertiesPaletteQueryURL, getWeeniePropertiesPositionQueryURL, getWeeniePropertiesSkillQueryURL, getWeeniePropertiesSpellBookQueryURL, getWeeniePropertiesTextureMapQueryURL } from "~/util/queries"
import type { WeeeniePropertyEmote, WeenieClassId, WeeniePropertyBodyPart, WeeniePropertyBook, WeeniePropertyBookPageData, WeeniePropertyCreateList, WeeniePropertyGenerator, WeeniePropertyPalette, WeeniePropertyPosition, WeeniePropertySkill, WeeniePropertySpellBook, WeeniePropertyTextureMap } from "~/util/types"

// Note: undefined signals that we haven't loaded the data from the db yet
export class WeenieProperties {
	ints: Map<number, number> | undefined
	strings: Map<number, string> | undefined
	attributes: Map<number, number> | undefined
	attributes_2nd: Map<number, number> | undefined
	floats: Map<number, number> | undefined
	book: WeeniePropertyBook | undefined
	book_page_data: Map<number, WeeniePropertyBookPageData> | undefined
	anim_part: Map<number, number> | undefined
	body_part: Map<number, WeeniePropertyBodyPart> | undefined
	bool: Map<number, boolean> | undefined
	create_list: Map<number, WeeniePropertyCreateList> | undefined
	d_i_d: Map<number, number> | undefined
	emote: Map<number, WeeeniePropertyEmote> | undefined
	emote_action: Map<number, number> | undefined
	event_filter: number[] | undefined
	generator: WeeniePropertyGenerator[] | undefined
	i_i_d: Map<number, number> | undefined
	int64: Map<number, number> | undefined
	palette: Map<number, WeeniePropertyPalette> | undefined
	position: Map<number, WeeniePropertyPosition> | undefined
	skill: Map<number, WeeniePropertySkill> | undefined
	spell_book: Map<number, WeeniePropertySpellBook> | undefined
	texture_map: Map<number, WeeniePropertyTextureMap> | undefined
}

export class Weenie {
	classId: WeenieClassId
	type?: WeenieType
	properties: WeenieProperties

	constructor(id: WeenieClassId) {
		this.classId = id;
		this.properties = new WeenieProperties();
	}

	get ClassName() {
		return "Weenie";
	}

	get IsMonster() {
		return this.type === WeenieType.Creature
	}

	get IsWeapon() {
		return this.type === WeenieType.MeleeWeapon ||
			this.type === WeenieType.MissileLauncher ||
			this.type === WeenieType.Caster
	}

	get IsBook() {
		return this.type === WeenieType.Book
	}

	get IsClothing() {
		return this.type === WeenieType.Clothing
	}

	get IsItem() {
		return this.type === WeenieType.CraftTool ||
			this.type === WeenieType.SpellComponent ||
			this.type === WeenieType.Food ||
			this.type === WeenieType.SkillAlterationDevice ||
			this.type === WeenieType.AttributeTransferDevice ||
			this.type === WeenieType.ManaStone
	}

	async load(fetch: any) {
		// TODO: Maybe delegate loading to the sub-class so what we load is narrow
		// enough to limit the number of queries we send
		await this.loadWeenieType(fetch);
		await this.loadPropertiesStrings(fetch);

	}
	async loadAll(fetch: any) {
		await this.loadWeenieType(fetch);
		await this.loadPropertiesInts(fetch);
		await this.loadPropertiesStrings(fetch);
		await this.loadPropertiesAttributes(fetch);
		await this.loadPropertiesAttributes2nd(fetch);
		await this.loadPropertiesFloats(fetch);
		await this.loadPropertiesBook(fetch)
		await this.loadPropertiesBookPageData(fetch);
		await this.loadWeeniePropertyAnimPart(fetch);
		await this.loadWeeniePropertyBodyPart(fetch);
		await this.loadWeeniePropertyBool(fetch);
		await this.loadWeeniePropertyCreateList(fetch);
		await this.loadWeeniePropertyDataId(fetch);
		await this.loadWeeniePropertyEmote(fetch);
		// // TODO: Not yet implemented properly
		// // await this.loadWeeniePropertyEmoteAction(fetch);
		await this.loadWeeniePropertyEventFilter(fetch);
		await this.loadWeeniePropertyGenerator(fetch);
		await this.loadWeeniePropertyInstanceId(fetch);
		await this.loadWeeniePropertyInt64(fetch);
		await this.loadWeeniePropertyPalette(fetch);
		await this.loadWeeniePropertyPosition(fetch);
		await this.loadWeeniePropertySkill(fetch);
		await this.loadWeeniePropertySpellBook(fetch);
		await this.loadWeeniePropertyTextureMap(fetch);
	}

	async loadWeenieType(fetch: any) {
		const url = getWeenieTypeQueryURL(this.classId);
		const res = await fetch(url);
		const result = await res.json();

		const type_idx = getColumnIndex(result.columns, "type");
		this.type = result.rows[0][type_idx];
	}

	async loadPropertiesInts(fetch: any) {
		this.properties.ints = new Map<number, number>();

		const url = getWeeniePropertiesIntQueryURL(this.classId);
		const res = await fetch(url);
		const result = await res.json();

		const type_idx = getColumnIndex(result.columns, "type");
		const value_idx = getColumnIndex(result.columns, "value");

		for (const row of result.rows) {
			this.properties.ints.set(row[type_idx], row[value_idx]);
		}
	}

	async loadPropertiesStrings(fetch: any) {
		this.properties.strings = new Map<number, string>();

		const url = getWeeniePropertiesStringQueryURL(this.classId);
		const res = await fetch(url);
		const result = await res.json();

		const type_idx = getColumnIndex(result.columns, "type");
		const value_idx = getColumnIndex(result.columns, "value");

		for (const row of result.rows) {
			this.properties.strings.set(row[type_idx], row[value_idx]);
		}
	}

	async loadPropertiesAttributes(fetch: any) {
		this.properties.attributes = new Map<number, number>();

		const url = getWeeniePropertiesAttributeQueryURL(this.classId);
		const res = await fetch(url);
		const result = await res.json();

		const type_idx = getColumnIndex(result.columns, "type");
		const value_idx = getColumnIndex(result.columns, "init_Level");

		for (const row of result.rows) {
			this.properties.attributes.set(row[type_idx], row[value_idx]);
		}
	}

	async loadPropertiesAttributes2nd(fetch: any) {
		this.properties.attributes_2nd = new Map<number, number>();

		const url = getWeeniePropertiesAttribute2ndQueryURL(this.classId);
		const res = await fetch(url);
		const result = await res.json();

		const type_idx = getColumnIndex(result.columns, "type");
		const value_idx = getColumnIndex(result.columns, "init_Level");

		for (const row of result.rows) {
			this.properties.attributes_2nd.set(row[type_idx], row[value_idx]);
		}
	}

	async loadPropertiesFloats(fetch: any) {
		this.properties.floats = new Map<number, number>();

		const url = getWeeniePropertiesFloatsQueryURL(this.classId);
		const res = await fetch(url);
		const result = await res.json();

		const type_idx = getColumnIndex(result.columns, "type");
		const value_idx = getColumnIndex(result.columns, "value");

		for (const row of result.rows) {
			this.properties.floats.set(row[type_idx], row[value_idx]);
		}
	}

	async loadPropertiesBook(fetch: any) {
		const url = getWeeniePropertiesBookQueryURL(this.classId);
		const res = await fetch(url);
		const result = await res.json();

		const max_Num_Pages_idx = getColumnIndex(result.columns, "max_Num_Pages");
		const max_Num_Chars_Per_Page_idx = getColumnIndex(result.columns, "max_Num_Chars_Per_Page");

		if (result.rows.length !== 1) {
			return;
		}

		this.properties.book = {
			max_Num_Pages: result.rows[0][max_Num_Pages_idx],
			max_Num_Chars_Per_Page: result.rows[0][max_Num_Chars_Per_Page_idx]
		};
	}

	async loadPropertiesBookPageData(fetch: any) {
		this.properties.book_page_data = new Map<number, WeeniePropertyBookPageData>();

		const url = getWeeniePropertiesBookPageDataQueryURL(this.classId);
		const res = await fetch(url);
		const result = await res.json();

		const page_Id_idx = getColumnIndex(result.columns, "page_Id");
		const author_Id_idx = getColumnIndex(result.columns, "author_Id");
		const author_Name_idx = getColumnIndex(result.columns, "author_Name");
		const author_Account_idx = getColumnIndex(result.columns, "author_Account");
		const ignore_Author_idx = getColumnIndex(result.columns, "ignore_Author");
		const page_Text_idx = getColumnIndex(result.columns, "page_Text");

		for (const row of result.rows) {
			this.properties.book_page_data.set(row[page_Id_idx], {
				author_Id: row[author_Id_idx],
				author_Name: row[author_Name_idx],
				author_Account: row[author_Account_idx],
				ignore_Author: row[ignore_Author_idx],
				page_Text: row[page_Text_idx],
			});
		}
	}

	async loadWeeniePropertyAnimPart(fetch: any) {
		this.properties.anim_part = new Map<number, number>();

		const url = getWeeniePropertiesAnimPartQueryURL(this.classId);
		const res = await fetch(url);
		const result = await res.json();

		const index_idx = getColumnIndex(result.columns, "index");
		const animation_Id_idx = getColumnIndex(result.columns, "animation_Id");

		for (const row of result.rows) {
			this.properties.anim_part.set(row[index_idx], row[animation_Id_idx]);
		}
	}

	async loadWeeniePropertyBodyPart(fetch: any) {
		this.properties.body_part = new Map<number, WeeniePropertyBodyPart>();

		const url = getWeeniePropertiesBodyPartQueryURL(this.classId);
		const res = await fetch(url);
		const result = await res.json();

		const key_idx = getColumnIndex(result.columns, "key");

		for (const row of result.rows) {
			this.properties.body_part.set(row[key_idx], {
				d_Type: row[getColumnIndex(result.columns, "d_Type")],
				d_Val: row[getColumnIndex(result.columns, "d_Val")],
				d_Var: row[getColumnIndex(result.columns, "d_Var")],
				base_Armor: row[getColumnIndex(result.columns, "base_Armor")],
				armor_Vs_Slash: row[getColumnIndex(result.columns, "armor_Vs_Slash")],
				armor_Vs_Pierce: row[getColumnIndex(result.columns, "armor_Vs_Pierce")],
				armor_Vs_Bludgeon: row[getColumnIndex(result.columns, "armor_Vs_Bludgeon")],
				armor_Vs_Cold: row[getColumnIndex(result.columns, "armor_Vs_Cold")],
				armor_Vs_Fire: row[getColumnIndex(result.columns, "armor_Vs_Fire")],
				armor_Vs_Acid: row[getColumnIndex(result.columns, "armor_Vs_Acid")],
				armor_Vs_Electric: row[getColumnIndex(result.columns, "armor_Vs_Electric")],
				armor_Vs_Nether: row[getColumnIndex(result.columns, "armor_Vs_Nether")],
				b_h: row[getColumnIndex(result.columns, "b_h")],
				h_l_f: row[getColumnIndex(result.columns, "h_l_f")],
				m_l_f: row[getColumnIndex(result.columns, "m_l_f")],
				l_l_f: row[getColumnIndex(result.columns, "l_l_f")],
				h_r_f: row[getColumnIndex(result.columns, "h_r_f")],
				m_r_f: row[getColumnIndex(result.columns, "m_r_f")],
				l_r_f: row[getColumnIndex(result.columns, "l_r_f")],
				h_l_b: row[getColumnIndex(result.columns, "h_l_b")],
				m_l_b: row[getColumnIndex(result.columns, "m_l_b")],
				l_l_b: row[getColumnIndex(result.columns, "l_l_b")],
				h_r_b: row[getColumnIndex(result.columns, "h_r_b")],
				m_r_b: row[getColumnIndex(result.columns, "m_r_b")],
				l_r_b: row[getColumnIndex(result.columns, "l_r_b")],
			});
		}
	}

	async loadWeeniePropertyBool(fetch: any) {
		this.properties.bool = new Map<number, boolean>();

		const url = getWeeniePropertiesBoolQueryURL(this.classId);
		const res = await fetch(url);
		const result = await res.json();

		const type_idx = getColumnIndex(result.columns, "type");
		const value_idx = getColumnIndex(result.columns, "value");

		for (const row of result.rows) {
			this.properties.bool.set(row[type_idx], row[value_idx]);
		}
	}

	async loadWeeniePropertyCreateList(fetch: any) {
		this.properties.create_list = new Map<number, WeeniePropertyCreateList>();

		const url = getWeeniePropertiesCreateListQueryURL(this.classId);
		const res = await fetch(url);
		const result = await res.json();

		const destination_Type_idx = getColumnIndex(result.columns, "destination_Type");

		for (const row of result.rows) {
			this.properties.create_list.set(row[destination_Type_idx], {
				weenie_Class_Id: getColumnIndex(result.columns, "weenie_Class_Id"),
				stack_Size: getColumnIndex(result.columns, "stack_Size"),
				palette: getColumnIndex(result.columns, "palette"),
				shade: getColumnIndex(result.columns, "shade"),
				try_To_Bond: getColumnIndex(result.columns, "try_To_Bond"),
			});
		}
	}

	async loadWeeniePropertyDataId(fetch: any) {
		this.properties.d_i_d = new Map<number, number>();

		const url = getWeeniePropertiesDataIdQueryURL(this.classId);
		const res = await fetch(url);
		const result = await res.json();

		const type_idx = getColumnIndex(result.columns, "type");
		const value_idx = getColumnIndex(result.columns, "value");

		for (const row of result.rows) {
			this.properties.d_i_d.set(row[type_idx], row[value_idx]);
		}
	}

	async loadWeeniePropertyEmote(fetch: any) {
		this.properties.emote = new Map<number, WeeeniePropertyEmote>();

		const url = getWeeniePropertiesEmoteQueryURL(this.classId);
		const res = await fetch(url);
		const result = await res.json();

		const category_idx = getColumnIndex(result.columns, "category");

		for (const row of result.rows) {
			this.properties.emote.set(row[category_idx], {
				probability: getColumnIndex(result.columns, "probability"),
				weenie_Class_Id: getColumnIndex(result.columns, "weenie_Class_Id"),
				style: getColumnIndex(result.columns, "style"),
				substyle: getColumnIndex(result.columns, "substyle"),
				quest: getColumnIndex(result.columns, "quest"),
				vendor_Type: getColumnIndex(result.columns, "vendor_Type"),
				min_Health: getColumnIndex(result.columns, "min_Health"),
				max_Health: getColumnIndex(result.columns, "max_Health"),
			});
		}
	}

	// TODO: Not sure how this one goes together yet
	// async loadWeeniePropertyEmoteAction(fetch) {
	// 	const url = getWeeniePropertiesEmoteActionQueryURL(this.classId);
	// 	const res = await fetch(url);
	// 	const result = await res.json();

	// 	const type_idx = getColumnIndex(result.columns, "type");
	// 	const value_idx = getColumnIndex(result.columns, "value");

	// 	for (const row of result.rows) {
	// 		this.properties.emote_action.set(row[type_idx], row[value_idx]);
	// 	}
	// }

	async loadWeeniePropertyEventFilter(fetch: any) {
		this.properties.event_filter = [];

		const url = getWeeniePropertiesEventFilterQueryURL(this.classId);
		const res = await fetch(url);
		const result = await res.json();

		const event_idx = getColumnIndex(result.columns, "event");

		for (const row of result.rows) {
			this.properties.event_filter.push(row[event_idx]);
		}
	}

	async loadWeeniePropertyGenerator(fetch: any) {
		this.properties.generator = [];

		const url = getWeeniePropertiesGeneratorQueryURL(this.classId);
		const res = await fetch(url);
		const result = await res.json();

		for (const row of result.rows) {
			this.properties.generator.push({
				probability: row[getColumnIndex(result.columns, "probability")],
				weenie_Class_Id: row[getColumnIndex(result.columns, "weenie_Class_Id")],
				delay: row[getColumnIndex(result.columns, "delay")],
				init_Create: row[getColumnIndex(result.columns, "init_Create")],
				max_Create: row[getColumnIndex(result.columns, "max_Create")],
				when_Create: row[getColumnIndex(result.columns, "when_Create")],
				where_Create: row[getColumnIndex(result.columns, "where_Create")],
				stack_Size: row[getColumnIndex(result.columns, "stack_Size")],
				palette_Id: row[getColumnIndex(result.columns, "palette_Id")],
				shade: row[getColumnIndex(result.columns, "shade")],
				obj_Cell_Id: row[getColumnIndex(result.columns, "obj_Cell_Id")],
				origin_X: row[getColumnIndex(result.columns, "origin_X")],
				origin_Y: row[getColumnIndex(result.columns, "origin_Y")],
				origin_Z: row[getColumnIndex(result.columns, "origin_Z")],
				angles_W: row[getColumnIndex(result.columns, "angles_W")],
				angles_X: row[getColumnIndex(result.columns, "angles_X")],
				angles_Y: row[getColumnIndex(result.columns, "angles_Y")],
				angles_Z: row[getColumnIndex(result.columns, "angles_Z")],
			});
		}
	}

	async loadWeeniePropertyInstanceId(fetch: any) {
		this.properties.i_i_d = new Map<number, number>();

		const url = getWeeniePropertiesInstanceIdQueryURL(this.classId);
		const res = await fetch(url);
		const result = await res.json();

		const type_idx = getColumnIndex(result.columns, "type");
		const value_idx = getColumnIndex(result.columns, "value");

		for (const row of result.rows) {
			this.properties.i_i_d.set(row[type_idx], row[value_idx]);
		}
	}

	async loadWeeniePropertyInt64(fetch: any) {
		this.properties.int64 = new Map<number, number>();

		const url = getWeeniePropertiesSInt64QueryURL(this.classId);
		const res = await fetch(url);
		const result = await res.json();

		const type_idx = getColumnIndex(result.columns, "type");
		const value_idx = getColumnIndex(result.columns, "value");

		for (const row of result.rows) {
			this.properties.int64.set(row[type_idx], row[value_idx]);
		}
	}

	async loadWeeniePropertyPalette(fetch: any) {
		this.properties.palette = new Map<number, WeeniePropertyPalette>();

		const url = getWeeniePropertiesPaletteQueryURL(this.classId);
		const res = await fetch(url);
		const result = await res.json();

		for (const row of result.rows) {
			// TODO: Not right yet
			this.properties.palette.set({
				sub_Palette_Id: row[getColumnIndex(result.columns, "sub_Palette_Id")],
				offset: row[getColumnIndex(result.columns, "offset")],
				length: row[getColumnIndex(result.columns, "length")],
			});
		}
	}

	async loadWeeniePropertyPosition(fetch: any) {
		this.properties.position = new Map<number, WeeniePropertyPosition>();

		const url = getWeeniePropertiesPositionQueryURL(this.classId);
		const res = await fetch(url);
		const result = await res.json();

		for (const row of result.rows) {
			// TODO: Not right yet
			this.properties.position.push({
				position_Type: row[getColumnIndex(result.columns, "position_Type")],
				obj_Cell_Id: row[getColumnIndex(result.columns, "obj_Cell_Id")],
				origin_X: row[getColumnIndex(result.columns, "origin_X")],
				origin_Y: row[getColumnIndex(result.columns, "origin_Y")],
				origin_Z: row[getColumnIndex(result.columns, "origin_Z")],
				angles_W: row[getColumnIndex(result.columns, "angles_W")],
				angles_X: row[getColumnIndex(result.columns, "angles_X")],
				angles_Y: row[getColumnIndex(result.columns, "angles_Y")],
				angles_Z: row[getColumnIndex(result.columns, "angles_Z")],
			});
		}
	}

	async loadWeeniePropertySkill(fetch: any) {
		this.properties.skill = new Map<number, WeeniePropertySkill>();

		const url = getWeeniePropertiesSkillQueryURL(this.classId);
		const res = await fetch(url);
		const result = await res.json();

		const type_idx = getColumnIndex(result.columns, "type");

		for (const row of result.rows) {
			this.properties.skill.set(row[type_idx], {
				level_From_P_P: row[getColumnIndex(result.columns, "level_From_P_P")],
				s_a_c: row[getColumnIndex(result.columns, "s_a_c")],
				p_p: row[getColumnIndex(result.columns, "p_p")],
				init_Level: row[getColumnIndex(result.columns, "init_Level")],
				resistance_At_Last_Check: row[getColumnIndex(result.columns, "resistance_At_Last_Check")],
				last_Used_Time: row[getColumnIndex(result.columns, "last_Used_Time")],
			});
		}
	}

	async loadWeeniePropertySpellBook(fetch: any) {
		this.properties.spell_book = new Map<number, WeeniePropertySpellBook>();

		const url = getWeeniePropertiesSpellBookQueryURL(this.classId);
		const res = await fetch(url);
		const result = await res.json();

		const id_idx = getColumnIndex(result.columns, "id");
		const name_idx = getColumnIndex(result.columns, "name");

		for (const row of result.rows) {
			this.properties.spell_book.set(row[id_idx], row[name_idx]);
		}
	}

	async loadWeeniePropertyTextureMap(fetch: any) {
		this.properties.texture_map = new Map<number, WeeniePropertyTextureMap>();

		const url = getWeeniePropertiesTextureMapQueryURL(this.classId);
		const res = await fetch(url);
		const result = await res.json();

		const index_idx = getColumnIndex(result.columns, "index");

		for (const row of result.rows) {
			this.properties.texture_map.set(row[index_idx], {
				old_Id: row[getColumnIndex(result.columns, "old_Id")],
				new_Id: row[getColumnIndex(result.columns, "new_Id")],
			});
		}
	}

	get name(): string | undefined {
		return this.properties.strings?.get(PropertyString.Name);
	}

	get description(): string | undefined {
		return this.properties.strings?.get(PropertyString.LongDesc) || this.properties.strings?.get(PropertyString.ShortDesc);
	}

	json() {
		return {
			classId: this.classId,
			type: this.type,
			name: this.name,
			description: this.description,
			properties: this.properties
		}
	}
}
