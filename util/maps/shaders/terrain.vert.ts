export const TerrainVertSource = `#version 300 es
     
precision highp float;
precision highp int;
precision highp sampler2D;
precision highp sampler2DArray;

uniform sampler2D terrainData;

uniform mat4 xWorld;
uniform vec4 renderView;
uniform float heightTable[255];
uniform vec4 someColor;

out vec3 pos;
out vec3 wpos;
out vec4 color;

const int sideCount = 8;
const int numVertsPerCell = 6;
const float cellSize = 24.0;
const float maxHeight = 700.0;

float getHeight(vec2 pos) {
  int heightIdx = int(texelFetch(terrainData, ivec2(pos.xy * 255. * 8.), 0).r * 255.);
  return heightTable[heightIdx] / maxHeight;
}

void main() {
  color = someColor;

  int numVertsPerBlock = sideCount * sideCount * numVertsPerCell;
  int numLandblocksX = int(renderView.z);
  int numLandblocksY = int(renderView.w);
  
  float blockSize = cellSize * float(sideCount);

  int idx = gl_VertexID % 3;
  int lbid = gl_InstanceID;
  int lbx = (lbid % numLandblocksX) + int(renderView.x);
  int lby = ((lbid / numLandblocksX) + int(renderView.y));

  int cellIdx = (gl_VertexID % numVertsPerBlock) / numVertsPerCell;
  int cellIdxD = cellIdx / sideCount;
  int cellIdyD = cellIdx % sideCount;

  float cellX = float(cellIdxD) * cellSize;
  float cellY = float(cellIdyD) * cellSize;
  
  int lcoordX = lbx * 8;
  int lcoordY = lby * 8;
  
  uint seedA = uint(lcoordX * 214614067);
  uint seedB = uint(lcoordX * 1109124029);

  seedB += 1109124029u * uint(cellIdxD);
  seedA += 214614067u * uint(cellIdxD);

  uint magicB = seedB;
  uint magicA = seedA + 1813693831u;
  
  float splitDir = float(uint(lcoordY + cellIdyD) * magicA - magicB - 1369149221u);

  // add landblock offsets
  cellX = cellX + (float(lbx) * 192.0);
  cellY = (255.0 * 192.0) - (cellY + cellSize + (float(lby) * 192.0));
  
  float split = step(splitDir * 0.00000000023283064, 0.5);
  int vIdm = gl_VertexID % 6;
  
  vec2 v = vec2(0.0, 0.0);

  if (splitDir * 2.3283064e-10 >= 0.5) {
    if (vIdm == 0) {
      v = vec2(cellX, cellY);
    }
    else if (vIdm == 1) {
      v = vec2(cellX + cellSize, cellY);
    }
    else if (vIdm == 2) {
      v = vec2(cellX, cellY + cellSize);
    }
    else if (vIdm == 3) {
      v = vec2(cellX + cellSize, cellY + cellSize);
    }
    else if (vIdm == 4) {
      v = vec2(cellX, cellY + cellSize);
    }
    else if (vIdm == 5) {
      v = vec2(cellX + cellSize, cellY);
    }
  }
  else  {
    if (vIdm == 0) {
      v = vec2(cellX, cellY);
    }
    else if (vIdm == 1) {
      v = vec2(cellX + cellSize, cellY);
    }
    else if (vIdm == 2) {
      v = vec2(cellX + cellSize, cellY + cellSize);
    }
    else if (vIdm == 3) {
      v = vec2(cellX, cellY);
    }
    else if (vIdm == 4) {
      v = vec2(cellX + cellSize, cellY + cellSize);
    }
    else if (vIdm == 5) {
      v = vec2(cellX, cellY + cellSize);
    }
  }

  vec2 xy = v / (255.0 * 192.0);
  float h = getHeight(xy);
  pos = vec3(xy.xy, h);
  wpos = vec3(v.xy, h);
  
  //gl_Position = xWorld * vec4(v.xy, h * maxHeight, 1);
  gl_Position = xWorld * vec4(v.xy, 1, 1);
}
`;