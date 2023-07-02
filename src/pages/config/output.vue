<script setup lang="ts">
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";

</script>

<template>
    <Toolbar
        :pt="{
            root: { 
                style: { 
                    borderLeft: 'none',
                    borderRight: 'none',
                    borderTop: 'none',
                } 
            }
        }"
    >
        <template #start>
            Toolbar stuff?
<!--            <Button label="New" icon="pi pi-plus" class="mr-2" />-->
            <!--            <Button label="Delete" icon="pi pi-times" severity="danger" />-->
        </template>

        <template #end>
            <!-- Still not sure if i need something here.. -->
        </template>
    </Toolbar>
    Output config<br>
    Still being worked on.
</template>

<style scoped lang="scss">

</style>
