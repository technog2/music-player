type ObjectId = string
type Date     = string

export interface UserIntroductionModel {
	id:        ObjectId
	cellphone: string
	exp?:      number
}

export interface UserDetailModel {
	id:              ObjectId
	profile:         string
	name:            string
	username:        string
	description:     string
	joined:          Date
	score:           number
	storiesCount:    number
	speechesCount:   number
	commentsCount:   number
	followersCount:  number
	followingsCount: number
	lastFollowers:   string[] // their profiles
	lastFollowings:  string[] // their profiles
	followed:        boolean
}

export interface UserSettingsModel {
	id:          ObjectId
	profile:     string
	name:        string
	username:    string
	description: string
	email:       string
	password:    string
	score:       number
	joined:      Date
	bookmarks:   ObjectId[]
	followers:   ObjectId[]
	admin:       boolean
	abilities: {
		create:  boolean
		forward: boolean
		react:   boolean
		comment: boolean
	}
	vip: {
		legal:          boolean
		real:           boolean
		organizational: boolean
	}
}
