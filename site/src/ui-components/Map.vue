<template>
    <div>
        <p>I am a map!</p>
        <div ref="map"/>
    </div>
</template>

<script>
import googleMaps from '@google/maps';

export default {
    data() {
        return {
            googleMap: googleMaps.createClient({
                key: this.$store.state.googleMapsApiKey
            })
        }
    },
    mounted() {
        console.log(this.googleMap);
        // var uluru = {lat: -25.363, lng: 131.044};
        // var map = new google.maps.Map(this.$refs.map, {
        //   zoom: 4,
        //   center: uluru
        // });
        // var marker = new google.maps.Marker({
        //   position: uluru,
        //   map: map
        // });
    }
}
</script>

<style>

</style>
