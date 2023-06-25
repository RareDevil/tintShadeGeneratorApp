<script setup lang="ts">
const href = window.location.href;
</script>

<template>
    <div id="main-wrapper">
        <div id="main-menu">
            <div id="main-menu-title">
                Tint & Shade Generator
            </div>
            <div id="main-menu-minimize" class="main-menu-button" data-action="minimize">
                <span class="material-symbols-outlined">minimize</span>
            </div>
            <div id="main-menu-maximize" class="main-menu-button" data-action="maximize">
                <span class="material-symbols-outlined">check_box_outline_blank</span>
            </div>
            <div id="main-menu-close" class="main-menu-button" data-action="close">
                <span class="material-symbols-outlined">close</span>
            </div>
        </div>
        <div id="main-content-wrapper" class="flex-grow-1">
            <router-view></router-view>
        </div>
        <div id="main-footer" class="p-2 surface-overlay">
            Footer - <router-link to="/">Go to Home</router-link> <router-link to="/settings">Go to Settings</router-link>
        </div>
    </div>
</template>

<style scoped lang="scss">

    #main-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        
        #main-menu {
            display: flex;
            height:30px;
            background-color: var(--surface-overlay);
            
            #main-menu-title {
                display: flex;
                flex-grow: 1;
                align-items: center;
                margin-left: 0.5rem;

                -webkit-user-select: none;
                -webkit-app-region: drag;
            }

            .main-menu-button {
                width:45px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: default;
                user-select: none;

                &[data-action="minimize"] {
                    margin-left: 0.5rem;
                }
                
                &[data-action="close"] {
                    &:hover {
                        background-color: rgba(255,0,0,0.6);
                    }
                }
                
                > .material-symbols-outlined {
                    font-size: 16px;
                }

                &:hover {
                    background-color: rgba(255,255,255,0.2);
                }
            }
        }
    }
</style>
