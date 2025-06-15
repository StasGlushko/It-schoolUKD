export interface IAdvantagesInfo {
	id: number
	text: string
}

export interface ICoursesInfo {
	id: number
	name: string
	description: string
}

export interface ICourse {
	id: number
	title: string
	description: string
	shortDescription: string
	price: number
	duration: string
	imageUrl: string
}

export interface ITeachers {
	id: number
	firstName: string
	lastName: string
	description: string
	imageUrl: string
	courses: []
}
