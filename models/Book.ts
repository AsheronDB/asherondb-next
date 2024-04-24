import type { $fetch } from "ofetch"
import { Item } from "./Item"

type FetchFunction = typeof $fetch

export class Book extends Item {
  get ClassName() {
    return "Book"
  }

  async load(fetch: FetchFunction) {
    await super.load(fetch)
    await this.loadPropertiesBook(fetch)
    await this.loadPropertiesBookPageData(fetch)
  }

  get max_num_pages(): number | undefined {
    return this.properties.book?.max_Num_Pages
  }

  get pages(): string[] {
    return Array.from(this.properties.book_page_data).map(x => x[1].page_Text)
  }

  json() {
    return {
      ...super.json(),
      max_num_pages: this.max_num_pages,
      pages: this.pages,
    }
  }
}
