import { makeAutoObservable } from "mobx";

class PageState {
	backgrounds = []
	animations = []
	totalTime = 5

	constructor() {
		makeAutoObservable(this)
	}

	addBackground(background) {
		this.backgrounds.push(background)
	}
	setTotalTime(time){
		this.totalTime = time
	}

}

const pageState = new PageState()

export default pageState