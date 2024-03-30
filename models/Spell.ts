export class Spell {
	spellId: number

	constructor(spellId: number) {
		this.spellId = spellId;
	}

	json() {
		return {
			spellId: this.spellId
		}
	}
}
