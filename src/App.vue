<script setup>
  import { ref, onMounted } from 'vue'
  import { RouterLink, RouterView } from 'vue-router'
  import MenuItem from './components/MenuItem.vue';
  import MusicPlayer from './components/MusicPlayer.vue';
  import LoginView from './views/LoginView.vue';
  import ChevronUp from 'vue-material-design-icons/ChevronUp.vue';
  import ChevronDown from 'vue-material-design-icons/ChevronDown.vue';
  import ChevronRight from 'vue-material-design-icons/ChevronRight.vue';
  import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue';

  import { useSongStore } from './stores/song'
  import { storeToRefs } from 'pinia';
  const useSong = useSongStore()
  const { isPlaying, currentTrack } = storeToRefs(useSong)

  onMounted(() => { isPlaying.value = false })

  let openMenu = ref(false)
</script>

<template >
    <RouterView />
</template>




