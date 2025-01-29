export interface MusicModel {
	id:      string
	title:   string
	artist:  string
	poster:  string
	src:     string
	isLiked: boolean
}

export interface AlbumModel {
	id:      string
	title:   string
	active?: boolean
	musics:  MusicModel[]
}
