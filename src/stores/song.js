import { defineStore } from 'pinia'

export const useSongStore = defineStore('song', {
  state: () => ({
    isPlaying: false,
    audio: null,
    currentArtist: null, // 1 loại (type)
    currentTrack: null // 1 bài hát
  }),
  actions: {
    loadSong(artist, track) {
        this.currentArtist = artist
        this.currentTrack = track

        if (this.audio && this.audio.src) {
            this.audio.pause()
            this.isPlaying = false
            this.audio.src = ''
        }

        this.audio = new Audio()
        console.log(artist, track)
        this.audio.src = track.path
        console.log(this.audio)
        setTimeout(() => {
            this.isPlaying = true
            this.audio.play()
        }, 200)
    },

    playOrPauseSong() {
        if (this.audio.paused) {
            this.isPlaying = true
            this.audio.play()
        } else {
            this.isPlaying = false
            this.audio.pause()
        }
    },

    playOrPauseThisSong(artist, track) {
        if (!this.audio || !this.audio.src || (this.currentTrack.id !== track.id)) {
            this.loadSong(artist, track)
            return
        }

        this.playOrPauseSong()
    },

    prevSong(currentTrack) {
        let lenghTrack = this.currentArtist.tracks.length
        let track
        if (this.currentTrack.id == this.currentArtist.tracks[0].id) {
            track = this.currentArtist.tracks[lenghTrack - 1]
        }
        else  {
            const index = this.currentArtist.tracks.findIndex(item => item.id === currentTrack.id);
            track = this.currentArtist.tracks[index - 1]
        }
        this.loadSong(this.currentArtist, track)
    },

    nextSong(currentTrack) {
        let lenghTrack = this.currentArtist.tracks.length
        let track
        if (this.currentTrack.id == this.currentArtist.tracks[lenghTrack - 1].id) {
            track = this.currentArtist.tracks[0]
        } else {
            const index = this.currentArtist.tracks.findIndex(item => item.id === currentTrack.id);
            track = this.currentArtist.tracks[index + 1]
        }
        this.loadSong(this.currentArtist, track)
    },

    playFromFirst() {
        this.resetState()
        let track = artist.tracks[0]
        this.loadSong(artist, track)
    },

    resetState() {
        this.isPlaying = false
        this.audio = null
        this.currentArtist = null
        this.currentTrack = null
    }
  },
  persist: true
})
