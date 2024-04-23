<template>
  <div class="gameicon">
    <img
      v-if="imgData"
      ref="imgRef"
      :src="imgData"
    >

    <!--

    <tippy to="myTrigger" arrow>
        <div>
    <h3>Header</h3>
    <p style="color: black">data binding</p>
    <button>Click</button>
    </div>
    </tippy> -->
  </div>
</template>

<script setup lang="ts">
import type { Weenie } from "~/models/Weenie"

const props = defineProps<{ weenie: Weenie }>()

const { weenie } = toRefs(props)

const itemUnderlays = {
  "0": 100667860, // - Default
  "1": 100667851, // - MeleeWeapon
  "2": 100667855, // - Armor
  "4": 100667891, // - Clothing
  "8": 100667861, // - Jewelry
  "16": 100667857, // - Creature
  "32": 100667852, // - Food
  "64": 100667892, // - Money
  "128": 100667860, // - Misc
  "256": 100667858, // - MissileWeapon
  "512": 100667854, // - Container
  "1024": 100667856, // - Useless
  "2048": 100667859, // - Gem
  "4096": 100667853, // - Spell Components
  "8192": 100667860, // - Writable
  "16384": 100667860, // - Key
  "32768": 100667860, // - Caster
  "65536": 100667860, // - Portal
  "131072": 100667860, // - Lockable
  "262144": 100667860, // - PromissoryNote
  "524288": 100667860, // - Manastone
  "1048576": 100687395, // - Service
  "2097152": 100667860, // - MagicWieldable
  "4194304": 100667860, // - CraftCookingBase
  "8388608": 100667860, // - CraftAlchemyBase
  "16777216": 100667860, // - CraftFletchingBase
  // 100667860, //- NotUsed
  "67108864": 100667860, // - CraftAlchemyIntermediate
  "134217728": 100667860, // - CraftFletchingIntermediate
  "268435456": 100667860, // - Lifestone
  "536870912": 100667860, // - TinkeringTool
  "1073741824": 100667860, // - TinkeringMaterial
  "-2147483648": 100667860, // - Gameboard
}

const uiEffects = {
  0: "060011C5", // - UI_EFFECT_UNDEF
  1: "060011CA", // - UI_EFFECT_MAGICAL
  2: "060011C6", // - UI_EFFECT_POISONED
  4: "06001B05", // ,// - UI_EFFECT_BOOST_HEALTH
  8: "060011CA", // - UI_EFFECT_BOOST_MANA
  16: "06001B06", // - UI_EFFECT_BOOST_STAMINA
  32: "06001B2E", // - UI_EFFECT_FIRE
  64: "06001B2D", // - UI_EFFECT_LIGHTNING
  128: "06001B2F", // - UI_EFFECT_FROST
  256: "06001B2C", // - UI_EFFECT_ACID
  512: "060033C3", // - UI_EFFECT_BLUDGEONING
  1024: "060033C2", // - UI_EFFECT_SLASHING
  2048: "060033C4", // - UI_EFFECT_PIERCING
  4096: "060011C5", // - UI_EFFECT_NETHER
  2147483647: "060011C5", // - FORCE_UI_EFFECT_TYPE_32_BIT
}

const isRendering = ref(false)
const gameIconPath = ref("/assets/img/gameicons-hex/")
const imgData = ref(null)
const imgRef = ref(null)

const render = () => {
  // console.log('RENDERING GAME ICON')
  isRendering.value = true

  // const imgEl = imgRef.value;

  const c = document.createElement("canvas")
  const ctx = c.getContext("2d")

  const w = 32
  const h = 32

  c.width = w
  c.height = h

  // Apply underlay

  // Apply icon and outline (UI effect)

  // Apply overlay ;

  if (weenie.value.itemType) {
    const underlayPath
      = gameIconPath.value
      + "0"
      + itemUnderlays[this.weenie.itemType].toString(16).toUpperCase()
      + ".png"

    const underlayImg = await new Promise((resolve, reject) => {
      const img = new Image(32, 32)
      img.src = underlayPath
      img.onload = () => resolve(img)
      img.onerror = reject
    })

    ctx.drawImage(underlayImg, 0, 0, w, h)
  }

  const iconPath = gameIconPath.value + weenie.value.icon + ".png"

  // console.log(iconPath);

  let maskPath

  if (weenie.value.iconOutline) {
    // console.log(this.weenie.iconOutline);
    maskPath
      = gameIconPath.value + uiEffects[weenie.value.iconOutline] + ".png"
  }
  else {
    maskPath = gameIconPath.value + uiEffects[0] + ".png"
  }

  const iconImg = await new Promise((resolve, reject) => {
    const img = new Image(32, 32)
    img.src = iconPath
    img.onload = () => resolve(img)
    img.onerror = reject
  })

  ctx.drawImage(iconImg, 0, 0, w, h)

  const maskImg = await new Promise((resolve, reject) => {
    const img = new Image(32, 32)
    img.src = maskPath
    img.onload = () => resolve(img)
    img.onerror = reject
  })

  const outlineC = document.createElement("canvas")
  const outlineCtx = outlineC.getContext("2d")

  outlineC.width = w
  outlineC.height = h

  const r = 0,
    g = 1,
    b = 2
    // a = 3;

  // var maskCanvas = document.createElement('canvas');
  // var maskContext = maskCanvas.getContext('2d');
  //
  // maskCanvas.width = w;
  // maskCanvas.height = h;
  // maskContext.drawImage(mask, 0, 0);

  const imageData = ctx.getImageData(0, 0, w, h)
  const pixel = imageData.data

  for (let p = 0; p < pixel.length; p += 4) {
    const x = (p / 4) % w
    const y = (p / 4 - x) / w

    if (pixel[p + r] == 255 && pixel[p + g] == 255 && pixel[p + b] == 255) {
      // if white then change alpha to 0
      const outlineId = outlineCtx.createImageData(1, 1) // only do this once per page
      const outlineData = outlineId.data // only do this once per page

      outlineData[0] = 255
      outlineData[1] = 255
      outlineData[2] = 255
      outlineData[3] = 255

      outlineCtx.putImageData(outlineId, x, y)

      //
      // pixel[p + r] = 255;
      // pixel[p + g] = 0;
      // pixel[p + b] = 228;
      // pixel[p + a] = 0;
    }
  }

  outlineCtx.globalCompositeOperation = "source-in"
  outlineCtx.drawImage(maskImg, 0, 0, w, h)

  // const outlineImageData = outlineCtx.getImageData(0, 0, w, h);

  ctx.drawImage(outlineC, 0, 0, w, h)

  // ctx.putImageData(imageData, 0, 0);
  const dataUrl = c.toDataURL("image/png")

  // console.log(dataUrl);

  /*

                - Read all white pixels in icon canvas

                - Draw those white pixels to new temp canvas

                - Apply outline mask to temp canvas

                - Draw temp canvas on top of icon canvas

            */

  // imgEl.src = dataUrl;

  imgData.value = dataUrl
  isRendering.value = false
}

onMounted(() => {
  render()
})
</script>

<style scoped>
.gameicon {
  height: 32px;
  width: 32px;
}

.gameicon img {
  display: block;
  height: 32px;
  width: 32px;
}
</style>
