<script setup lang="ts">
import { usePrimeVue } from 'primevue/config';
import { useMainStore } from "./stores/main.ts"

const store = useMainStore();
const PrimeVue = usePrimeVue();

if (store.currentTheme !== 'arya-blue') {
    // @ts-ignore
    PrimeVue.changeTheme('arya-blue', store.currentTheme, 'theme-stylesheet', () => {});
}


</script>

<template>
    <div id="main-wrapper">
        <div id="main-top-frame">
            <div id="main-menu-title">
                Tint & Shade Generator
            </div>
            <div id="main-top-frame-minimize" class="main-top-frame-button" data-action="minimize">
                <span class="material-icons">minimize</span>
            </div>
            <div id="main-top-frame-maximize" class="main-top-frame-button" data-action="maximize">
                <span class="material-icons">check_box_outline_blank</span>
            </div>
            <div id="main-top-frame-close" class="main-top-frame-button" data-action="close">
                <span class="material-icons">close</span>
            </div>
        </div>
        <div id="main-content-wrapper">
            <div id="main-content-menu">
                <div>
                    <router-link to="/"><span class="material-icons">home</span></router-link>
                </div>
                <div>
                    <router-link to="/config"><span class="material-icons">mode_edit</span></router-link>
                </div>
                <div>
                    <router-link to="/preview"><span class="material-icons">palette</span></router-link>
                </div>
                <div>
                    <router-link to="/download"><span class="material-icons">download</span></router-link>
                </div>
                <div class="mt-auto">
                    <router-link to="/settings"><span class="material-icons">settings</span></router-link>
                </div>
            </div>
            <div id="main-content-router">
                <div>
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

    #main-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        
        #main-top-frame {
            display: flex;
            height:30px;
            
            #main-menu-title {
                display: flex;
                flex-grow: 1;
                align-items: center;
                margin-left: 0.5rem;

                user-select: none;
                -webkit-app-region: drag;
            }

            .main-top-frame-button {
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
                
                > span {
                    font-size: 16px;
                }

                &:hover {
                    background-color: rgba(255,255,255,0.2);
                }
            }
        }
        
        #main-content-wrapper {
            flex-grow: 1;
            display: flex;
            flex-direction: row;
            height: calc(100% - 30px);
            max-height: calc(100% - 30px);
            
            #main-content-menu {
                user-select: none;
                padding: 0.5rem;
                display: flex;
                flex-direction: column;
                gap: 1rem;
                
                > div {
                    //cursor: pointer;
                    padding: 0.5rem;
                    > a {
                        > span {
                            font-size: 2rem;
                        }
                    }
                }
            }
            
            #main-content-router {
                height: 100%;
                max-height: 100%;
                flex-grow: 1;
                border-top-left-radius: 10px;
                overflow:hidden;
                background-color: var(--surface-overlay);
                
                > div {
                    height: 100%;
                    max-height: 100%;
                    width: 100%;
                    max-width: 100%;
                    overflow: auto;
                }
            }
        }
    }
</style>
