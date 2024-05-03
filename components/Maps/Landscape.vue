<template>
  <canvas ref="canvas" class="flex-1" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { TerrainRenderer } from './../../util/maps/lib/terrainrenderer'

const canvas: Ref<HTMLCanvasElement | null> = ref(null)
const renderer = new TerrainRenderer(1);

const handleResize = () => { renderer?.handleResize() }
const handleMouseMove = (e: MouseEvent) => { renderer?.handleMouseMove(e.clientX, e.clientY) }

onMounted(() => {
  if (canvas.value) {
    renderer.init(canvas.value)

    addEventListener("resize", handleResize)
    addEventListener("mousemove", handleMouseMove)
  }
})

onUnmounted(() => {
  removeEventListener("resize", handleResize)
  removeEventListener("mousemove", handleMouseMove)
  renderer.destroy();
})
</script>
