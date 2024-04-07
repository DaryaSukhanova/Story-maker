import { makeAutoObservable } from "mobx";

class PageState {
	backgrounds = []
	animations = []

	constructor() {
		makeAutoObservable(this)
	}

	addBackground(background) {
		this.backgrounds.push(background)
	}
}

const pageState = new PageState()

export default pageState