<script setup>
import MainLayout from "../layout/MainLayout.vue"
import SongRow from '../components/SongRow.vue'
import Play from 'vue-material-design-icons/Play.vue';
import Pause from 'vue-material-design-icons/Pause.vue';
import DotsHorizontal from 'vue-material-design-icons/DotsHorizontal.vue';
import Heart from 'vue-material-design-icons/Heart.vue';
import ClockTimeThreeOutline from 'vue-material-design-icons/ClockTimeThreeOutline.vue';

import { useSongStore } from '../stores/song'
import { storeToRefs } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

    const useSong = useSongStore()
    const { isPlaying, currentTrack, currentArtist } = storeToRefs(useSong)

    const playFunc = () => {
        if (currentTrack.value) {
            useSong.playOrPauseThisSong(currentArtist.value, currentTrack.value)
            return
        } 
        useSong.playFromFirst()
    }



    const types = ref();
    const currentPath =  window.location.pathname;

    const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api' + currentPath);
        response.data.tracks = [...response.data.songs]
        delete response.data.songs
        types.value = response.data; 
        
        useSong.loadSong(types?.value, types?.value?.tracks[0])
    } catch (error) {
        console.error(error);
    }
    };
    fetchData();
    
</script>

<template>
    <MainLayout>

    <div class="p-8 overflow-x-hidden">
        <button
            type="button"
            class="text-white text-2xl font-semibold hover:underline cursor-pointer"
        >
            {{ currentArtist.name }}
        </button>

        <div class="py-1.5"></div>
        <div class="flex items-center w-full relative h-full">
            <img width="140" :src="currentArtist.albumCover">

            <div class="w-full ml-5">

                <div
                    style="font-size: 33px;"
                    class="text-white absolute w-full hover:underline cursor-pointer top-0 font-bosemiboldld"
                >
                    {{ currentArtist.name }}
                </div>

                <div class="text-gray-300 text-[13px] flex">
                    <div class="flex">Album</div>
                    
                    <div class="ml-2 flex">
                        <div class="circle mt-2 mr-2" />
                        <span class="-ml-0.5">{{ types?.tracks.length || 0 }} songs</span>
                    </div>
                </div>

                <div class="absolute flex gap-4 items-center justify-start bottom-0 mb-1.5">
                    <button class="p-1 rounded-full bg-white" @click="playFunc()">
                        <Play v-if="!isPlaying" fillColor="#181818" :size="25"/>
                        <Pause v-else fillColor="#181818" :size="25"/>
                    </button>
                    <button type="button">
                        <Heart fillColor="#1BD760" :size="30"/>
                    </button>
                    <button type="button">
                        <DotsHorizontal fillColor="#FFFFFF" :size="25"/>
                    </button>
                </div>
            </div>
        </div>

        <div class="mt-6"></div>
        <div class="flex items-center justify-between px-5 pt-2">
            <div class="flex items-center justify-between text-gray-400">
                <div class="mr-7">#</div>
                <div class="text-sm">Title</div>
            </div>
            <div><ClockTimeThreeOutline fillColor="#FFFFFF" :size="18"/></div>
        </div>
        <div class="border-b border-b-[#2A2A2A] mt-2"></div>
        <div class="mb-4"></div>
        <ul class="w-full" v-for="track, index in types?.tracks" :key="track">
            <SongRow :artist="types" :track="track" :index="++index"/>
        </ul>
    </div>
    </MainLayout>
</template>

<style scoped>
    .circle {
        width: 4px;
        height: 4px;
        background-color: rgb(189, 189, 189);
        border-radius: 100%;
    }
</style>
