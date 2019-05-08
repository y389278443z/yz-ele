<template>
  <div class="home">
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name: 'home',
    data () {
        return {
            checked: true
        }
    }
}
</script>


