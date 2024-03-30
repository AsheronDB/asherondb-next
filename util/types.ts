export interface DatasetteResult {
	columns: string[],
	rows: string[][]
}

export interface StringIndexedDict<V> {
	[key: string]: V
}

export type WeenieClassId = number

export interface WeeniePropertyInt {
	value: number
}

export interface WeeniePropertyString {
	value: string
}

export interface WeeniePropertyAttribute {
	init_Level: number;
	level_From_C_P: number;
	c_P_Spent: number;
}

export interface WeeniePropertyAttribute2nd {
	init_Level: number;
	level_From_C_P: number;
	c_P_Spent: number;
	current_Level: number;
}

export interface WeeniePropertyFloat {
	value: number
}

export interface WeeniePropertyBook {
	max_Num_Pages: number
	max_Num_Chars_Per_Page: number
}

export interface WeeniePropertyBookPageData {
	author_Id: number
	author_Name: string
	author_Account: string
	ignore_Author: number
	page_Text: string
}

export interface WeeniePropertyBodyPart {
	d_Type: number,
	d_Val: number,
	d_Var: number,
	base_Armor: number,
	armor_Vs_Slash: number,
	armor_Vs_Pierce: number,
	armor_Vs_Bludgeon: number,
	armor_Vs_Cold: number,
	armor_Vs_Fire: number,
	armor_Vs_Acid: number,
	armor_Vs_Electric: number,
	armor_Vs_Nether: number,
	b_h: number,
	h_l_f: number,
	m_l_f: number,
	l_l_f: number,
	h_r_f: number,
	m_r_f: number,
	l_r_f: number,
	h_l_b: number,
	m_l_b: number,
	l_l_b: number,
	h_r_b: number,
	m_r_b: number,
	l_r_b: number
}

export interface WeeniePropertyCreateList {
	weenie_Class_Id: number
	stack_Size: number
	palette: number
	shade: number
	try_To_Bond: number
}

export interface WeeeniePropertyEmote {
	probability: number
	weenie_Class_Id: number
	style: number
	substyle: number
	quest: number
	vendor_Type: number
	min_Health: number
	max_Health: number
}

export interface WeeniePropertyGenerator {
	probability: number
	weenie_Class_Id: number
	delay: number
	init_Create: number
	max_Create: number
	when_Create: number
	where_Create: number
	stack_Size: number
	palette_Id: number
	shade: number
	obj_Cell_Id: number
	origin_X: number
	origin_Y: number
	origin_Z: number
	angles_W: number
	angles_X: number
	angles_Y: number
	angles_Z: number
}

export interface WeeniePropertyPalette {
	sub_Palette_Id: number
	offset: number
	length: number
}

export interface WeeniePropertyPosition {
	position_Type: number
	obj_Cell_Id: number
	origin_X: number
	origin_Y: number
	origin_Z: number
	angles_W: number
	angles_X: number
	angles_Y: number
	angles_Z: number
}

export interface WeeniePropertySkill {
	level_From_P_P: number
	s_a_c: number
	p_p: number
	init_Level: number
	resistance_At_Last_Check: number
	last_Used_Time: number
}

export interface WeeniePropertySpellBook {
	spell: number
	name: string
}

export interface WeeniePropertyTextureMap {
	old_Id: number
	new_Id: number
}
