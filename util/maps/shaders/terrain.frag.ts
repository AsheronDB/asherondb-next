export const TerrainFragSource = `#version 300 es

// terrain blending borrowed from paradox
// pcode / tcode logic borrowed from ace / ACViewer

precision highp float;
precision highp int;
precision highp sampler2D;
precision highp sampler2DArray;

const int roadTextureIdx = 31;
const float dataWidth = 2041.0;

// the height lookup table from dat region file
uniform float heightTable[255];

// array of floats, where index is texture atlas idx.
// if 0, terrain texture is not loaded, if 1 is loaded.
uniform float hasTerrainTexture[32];

// terrain color lookup
uniform vec3 terrainColors[32];

// the minimum zoom level to resolve textures at, otherwise shows colors
uniform float minZoomForTextures;

// wether to show landcell lines, 1 shows, 0 hides
uniform float showLandcellLines;

// wether to show landblock lines, 1 shows, 0 hides
uniform float showLandblockLines;

// pixel size
uniform float pixelSize;

// texture with all the terrain data needed for rendering
//
// this is how the terrain data is stored in the texture:
// There are 2041 * 2041 vertice datas stored
//
// var height = lbInfo.Height[(vx * 9) + vy];
// var terrain = (lbInfo.Terrain[(vx * 9) + vy] & 0x7C) >> 2;
// var road = (lbInfo.Terrain[(vx * 9) + vy] & 0x3);
// var scenery = (lbInfo.Terrain[(vx * 9) + vy] & 0xF800) >> 11;
// bmp.SetPixel(ox, size - 1 - oy, Color.FromArgb(255, height, terrain, road));
uniform sampler2D terrainData;

// texture array of all the terrain textures from the dat
uniform sampler2DArray terrainAtlas;

// texture array of all the terrain alpha overlay textures from the dat
uniform sampler2DArray alphaAtlas;

// current drawing scale
uniform float scale;

in vec4 someColor;
in vec3 pos;
in vec3 wpos;

out vec4 FragColor;

struct BaseData {
  vec4 Position;
  vec3 TexUV;
};

struct TerrainData {
  vec4 Overlay0;
  vec4 Overlay1;
  vec4 Overlay2;
};

struct RoadData {
  vec4 Road0;
  vec4 Road1;
};

vec3 saturate(vec3 value) {
  return clamp(value, 0.0, 1.0);
}

uint getPalCode(int r1, int r2, int r3, int r4, int t1, int t2, int t3, int t4) {
  int terrainBits = t1 << 15 | t2 << 10 | t3 << 5 | t4;
  int roadBits = r1 << 26 | r2 << 24 | r3 << 22 | r4 << 20;

  // tex_size = 1 or 4, only used for palette shift (unused?)
  int sizeBits = 1 << 28;

  return uint(sizeBits | roadBits | terrainBits);
}

// returns an ivec3 where x/y are the road codes 0/1, and z is allRoads bool(0/1)
ivec3 getRoadCode(uint pcode) {
  ivec3 rcode = ivec3(0, 0, 0);

  int mask = 0;
  if ((pcode & 0xC000000u) != 0u) {   // upper left (0)
      mask = 1;
  }
  if ((pcode & 0x3000000u) != 0u) {   // upper right (1)
      mask |= 2;
  }
  if ((pcode & 0xC00000u) != 0u) {    // bottom right (2)
      mask |= 4;
  }
  if ((pcode & 0x300000u) != 0u) {    // bottom left (3)
      mask |= 8;
  }

  switch (mask) {
      case 0xF:       // 0 + 1 + 2 + 3
          rcode.z = 1;
          break;
      case 0xE:       // 1 + 2 + 3
          rcode.x = 6;
          rcode.y = 12;
          break;
      case 0xD:       // 0 + 2 + 3
          rcode.x = 9;
          rcode.y = 12;
          break;
      case 0xB:       // 0 + 1 + 3
          rcode.x = 9;
          rcode.y = 3;
          break;
      case 0x7:       // 0 + 1 + 2
          rcode.x = 3;
          rcode.y = 6;
          break;
      case 0x0:
          break;
      default:        // 1-6, 8, 9, A, C       
          rcode.x = mask;
          break;
  }

  return rcode;
}

ivec4 getTerrainCodes(uint pcode) {
  return ivec4((pcode >> 15) & 0x1Fu, (pcode >> 10) & 0x1Fu, (pcode >> 5) & 0x1Fu, pcode & 0x1Fu);
}

ivec3 buildTCodes(ivec4 pcodes, ivec3 tcodes, int i) {
  int t1 = pcodes[i];
  int t2 = 0;

  for (int k = 0; k < 4; k++) {
      if (t1 == pcodes[k]) {
          continue;
      }

      if (tcodes[0] == 0) {
          tcodes[0] = 1 << k;
          t2 = pcodes[k];
      }
      else {
          if (t2 == pcodes[k] && tcodes[0] == (1 << (k - 1))) {
              tcodes[0] += 1 << k;
          }
          else {
              tcodes[1] = 1 << k;
          }
          break;
      }
  }

  return tcodes;
}

ivec3 getTCodes(uint pcode) { // GetTerrain in ACE
  ivec3 tcodes = ivec3(0, 0, 0);
  ivec4 pcodes = getTerrainCodes(pcode);
  
  for (int i = 0; i < 4; i++) {
      for (int j = i + 1; j < 4; j++) {
          if (pcodes[i] == pcodes[j]) {
              return buildTCodes(pcodes, tcodes, i);
           }
      }
  }

  for (int i = 0; i < 3; i++) {
    tcodes[i] = (1 << (i + 1));
  }

  return tcodes;
}

// out.x is rot, out.y is alphaIdx
ivec2 getRoadAlpha(uint pcode, int rcode) {
  int numRoadMaps = 3;
  float rot = 0.0;
  float alphaIdx = 0.0;

  int prng = int(floor(float(1379576222u * pcode - 1372186442u) * 2.3283064e-10 * float(numRoadMaps)));

  for (int i = 0; i < numRoadMaps; i++) {
    int idx = (i + prng) % numRoadMaps;
    rot = 0.0;
    int alphaCode = 9;
    alphaIdx = 5.0 + float(idx);

    for (int j = 0; j < 4; j++) {
      if (alphaCode == rcode) {
        rot = float(j);
        return ivec2(rot, alphaIdx);
        break;
      }
      alphaCode *= 2;
      if (alphaCode >= 16) {
        alphaCode -= 15;
      }
    }
  }
  return ivec2(0, 0);
}

// out.x is rot, out.y is alphaIdx
ivec2 getTerrainAlpha(uint pcode, int tcode) {
  int baseIdx = 0;
  int numAlphas = 0;
  int alphaCode = 8;

  // corner tcodes - sw / se / ne / nw
  if (tcode != 1 && tcode != 2 && tcode != 4 && tcode != 8) {
    baseIdx = 4;
    alphaCode = 9;
    numAlphas = 1;
  }
  else {
    alphaCode = 8;
    baseIdx = 0;
    numAlphas = 4;
  }

  // TODO: these casts may be questionable...
  // look here if broken...
  int prng = int(floor(float(1379576222u * pcode - 1372186442u) * 2.3283064e-10 * float(numAlphas)));
  if (prng >= numAlphas) {
    prng = 0;
  }

  int alphaIdx = baseIdx + prng;

  int rot = 0;
  while (alphaCode != tcode) {
      // corners: 8 -> 1 -> 2 -> 4
      // sides: 9 -> 3 -> 6 -> 12
      // west / south / east / north?
      alphaCode *= 2;
      if (alphaCode >= 16) {
          alphaCode -= 15;
      }
      if (++rot >= 4) {
          alphaIdx = -1;
          break;
      }
  }

  return ivec2(rot, alphaIdx);
}

vec2 getRot(int rot, vec2 cPos) {
  if (rot == 0) return cPos; // 0
  if (rot == 1) return vec2(-cPos.y, cPos.x); // 90
  if (rot == 2) return vec2(-cPos.x, -cPos.y); // 180
  if (rot == 3) return vec2(cPos.y, -cPos.x); // 270
}

vec4 maskBlend3(vec4 t0, vec4 t1, vec4 t2, float h0, float h1, float h2) {
  float a0 = h0 <= 0. ? 1. : t0.a;
  float a1 = h1 <= 0. ? 1. : t1.a;
  float a2 = h2 <= 0. ? 1. : t2.a;
  float aR = 1. - (a0 * a1 * a2);

  a0 = 1. - a0;
  a1 = 1. - a1;
  a2 = 1. - a2;

  vec3 r0 = (a0 * t0.rgb + (1. - a0) * a1 * t1.rgb + (1. - a1) * a2 * t2.rgb);

  vec4 r;
  r.a = aR;
  r.rgb = (1. / aR) * r0;

  return r;
}

vec4 CombineOverlays(BaseData base, TerrainData terrains) {
  float h0 = terrains.Overlay0.z < 0. ? 0. : 1.;
  float h1 = terrains.Overlay1.z < 0. ? 0. : 1.;
  float h2 = terrains.Overlay2.z < 0. ? 0. : 1.;

  vec4 overlay0 = vec4(0, 0, 0, 0);
  vec4 overlay1 = vec4(0, 0, 0, 0);
  vec4 overlay2 = vec4(0, 0, 0, 0);
  vec4 overlayAlpha0 = vec4(0, 0, 0, 0);
  vec4 overlayAlpha1 = vec4(0, 0, 0, 0);
  vec4 overlayAlpha2 = vec4(0, 0, 0, 0);

  vec2 uvb = base.TexUV.xy;

  vec4 result;

  if (h0 > 0.) {
    overlay0 = texture(terrainAtlas, vec3(uvb, terrains.Overlay0.z));
    overlayAlpha0 = texture(alphaAtlas, vec3(terrains.Overlay0.xy, terrains.Overlay0.w)).aaaa;
    overlay0.a = overlayAlpha0.a;

    if (h1 > 0.) {
      overlay1 = texture(terrainAtlas, vec3(uvb, terrains.Overlay1.z));
      overlayAlpha1 = texture(alphaAtlas, vec3(terrains.Overlay1.xy, terrains.Overlay1.w)).aaaa;
      overlay1.a =  overlayAlpha1.a;

      if (h2 > 0.) {
        overlay2 = texture(terrainAtlas, vec3(uvb, terrains.Overlay2.z));
        overlayAlpha2 = texture(alphaAtlas, vec3(terrains.Overlay2.xy, terrains.Overlay2.w)).aaaa;
        overlay2.a = overlayAlpha2.a;
      }
    }
  }

  result = maskBlend3(overlay0, overlay1, overlay2, h0, h1, h2);

  return result;
}

vec4 CombineRoad(BaseData base, RoadData roads) {
  float h0 = roads.Road0.z <= 0. ? 0. : 1.;
  float h1 = roads.Road1.z <= 0. ? 0. : 1.;

  vec2 uvb = base.TexUV.xy;

  vec4 result = vec4(0, 0, 0, 0);

  if (h0 > 0.) {
    result = texture(terrainAtlas, vec3(uvb, roads.Road0.z));
    vec4 roadAlpha0 = texture(alphaAtlas, vec3(roads.Road0.xy, roads.Road0.w));
    result.a = 1. - roadAlpha0.a;

    if (h1 > 0.) {
      vec4 roadAlpha1 = texture(alphaAtlas, vec3(roads.Road1.xy, roads.Road1.w));
      result.a = 1. - (roadAlpha0.a * roadAlpha1.a);
    }
  }

  return result;
}

// get the color at the specific position, with all splatted textures (roads / terrain overlays)
// the xy position is 0.0 - 1.0, where 0 is the bottom left of the map, and 1 is the top right (255 * 192)
vec4 getSplattedTerrainColor(vec3 pos) {
  vec2 tPos = pos.xy * (dataWidth - 1.);

  vec4 p1 = texelFetch(terrainData, ivec2(tPos + vec2(0, 1)), 0); // base (SouthWest) vertex terrain data
  vec4 p2 = texelFetch(terrainData, ivec2(tPos + vec2(1, 1)), 0); // SouthEast vertex terrain data 
  vec4 p3 = texelFetch(terrainData, ivec2(tPos + vec2(1, 0)), 0); // NorthEast vertex terrain data 
  vec4 p4 = texelFetch(terrainData, ivec2(tPos + vec2(0, 0)), 0); // NorthWest vertex terrain data 

  int t1 = int(p1.g * 255.0); // base (SouthWest) terrain
  int t2 = int(p2.g * 255.0); // SouthEast terrain
  int t3 = int(p3.g * 255.0); // NorthEast terrain
  int t4 = int(p4.g * 255.0); // NorthWest terrain

  int r1 = int(p1.b * 255.0); // base (SouthWest) road
  int r2 = int(p2.b * 255.0); // SouthEast road
  int r3 = int(p3.b * 255.0); // NorthEast road
  int r4 = int(p4.b * 255.0); // NorthWest road

  bool singleTypeCell = t1 == t2 && t1 == t3 && t1 == t4; // all terrains same
  bool singleRoadCell = r1 == r2 && r1 == r3 && r1 == r4; // all roads same

  uint pcode = getPalCode(r1, r2, r3, r4, t1, t2, t3, t4);
  ivec3 roadCode = getRoadCode(pcode);

  // if the cell is "all road", override the "base" texture index with the road texture index
  if (roadCode.z > 0) {
      t1 = roadTextureIdx;
  }

  // position scaled to cell size, for terrain texture sampling
  vec2 cPos = pos.xy * 255.0 * 8.;

  // base terrain sampled texture color
  vec4 c1 = texture(terrainAtlas, vec3(cPos.xy + vec2(0, 1), t1));

  // if there is no terrain / road blends, bail early
  if (singleTypeCell && r1 == 0 && singleRoadCell) {
    //return vec4(0, 0, 0, 0);
    return vec4(c1.rgb, 1);
  }

  ivec3 tcodes = getTCodes(pcode);

  ivec2 tAlpha0 = getTerrainAlpha(pcode, tcodes.x);
  ivec2 tAlpha1 = getTerrainAlpha(pcode, tcodes.y);
  ivec2 tAlpha2 = getTerrainAlpha(pcode, tcodes.z);

  vec4 a1 = texture(alphaAtlas, vec3(getRot(tAlpha0.x, cPos.xy), tAlpha0.y));
  vec4 a2 = texture(alphaAtlas, vec3(getRot(tAlpha1.x, cPos.xy), tAlpha1.y));
  vec4 a3 = texture(alphaAtlas, vec3(getRot(tAlpha2.x, cPos.xy), tAlpha2.y));

  /*
  vec4 combined = vec4((a1.r * a2.r * a3.r), 0, 0, 0.5);
  //(a1.r * a2.r * a3.r)
  return vec4(saturate(combined.rgb), 1.0);
  return vec4(saturate(c1.rgb * (1. - combined.r)), 1);
  return c1;
//*/
  BaseData base = BaseData(vec4(wpos.xyz, 1), vec3(pos.xy, t1));
  TerrainData terrains = TerrainData(
    vec4(getRot(tAlpha0.x, cPos.xy), t2, tAlpha0.y),
    vec4(getRot(tAlpha1.x, cPos.xy), t3, tAlpha1.y),
    vec4(getRot(tAlpha2.x, cPos.xy), t4, tAlpha2.y)
  );

  RoadData roads = RoadData(
    vec4(cPos.xy, roadCode.x, getRoadAlpha(pcode, roadCode.x)),
    vec4(cPos.xy, roadCode.y, getRoadAlpha(pcode, roadCode.y))
  );

  vec4 combinedOverlays = vec4(0, 0, 0, 0);
  vec4 combinedRoad = vec4(0, 0, 0, 0);

  if (!singleTypeCell) {
    combinedOverlays = CombineOverlays(base, terrains);
    //return vec4(combinedOverlays.rgb, 1);
  }

  if (!singleRoadCell) {
    //combinedRoad = CombineRoad(base, roads);
  }

  vec3 baseMasked = saturate(c1.rgb * ((1. - combinedOverlays.a) * (1. - combinedRoad.a)));
  vec3 overlaysMasked = saturate(combinedOverlays.rgb * (combinedOverlays.a * (1. - combinedRoad.a)));
  vec3 roadMasked = combinedRoad.rgb * combinedRoad.a;

  return vec4(baseMasked + overlaysMasked + roadMasked, 1);
}

void highlightLandcells() {
  float ep = pixelSize;
  if (showLandblockLines > 0.5 && (fract(wpos.x / 192.0) < ep / 3. || fract(wpos.y / 192.0) < ep / 3.)) {
    FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
  else if (showLandcellLines > 0.5 && (fract(wpos.x / 24.0) < ep * 2.0 || fract(wpos.y / 24.0) < ep * 2.0)) {
    FragColor = vec4(1.0, 0.0, 1.0, 1.0);
  }
}

void main() {
  vec2 cPos = pos.xy * (dataWidth - 1.0);

  int tCode = int(texelFetch(terrainData, ivec2(cPos + vec2(0, 0)), 0).g * 255.0);
  vec3 tColor = terrainColors[tCode];

  if (scale > minZoomForTextures && hasTerrainTexture[tCode] >= 0.5) {
    FragColor = getSplattedTerrainColor(pos);
  }
  else {
    FragColor = vec4(tColor, 1);
  }

  highlightLandcells();
}
`;