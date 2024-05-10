import { makeAutoObservable } from "mobx";

class PageState {
	backgrounds = []
	animations = []

	constructor() {
		makeAutoObservable(this)
	}

	
}

const pageState = new PageState()

export default pageState