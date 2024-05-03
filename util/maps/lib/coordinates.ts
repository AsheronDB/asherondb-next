// nothing here is good... but it works so..
// todo: rewrite and clean up

import { toHexStr } from "./util";

const minCoord = -101.95;
const maxCoord = 102.05;

function GetLandblockFromCoordinates(EW: number, NS: number) {
   const lbX = Math.floor((EW + Math.abs(minCoord)) / (maxCoord - minCoord) * 255);
   const lbY = Math.floor((NS + Math.abs(minCoord)) / (maxCoord - minCoord) * 255);

   return ((lbX << 24) >>> 0) | ((lbY << 16) >>> 0)
}

function LandblockToNS(landcell: number, yOffset: number) {
  const num = ((landcell & 0x00FF0000) >>> 0)  / 8192;
  const num2 = ((yOffset / 24.0 + num) - 1019.5) / 10.0;
  return num2;
}

function LandblockToEW(landcell: number, xOffset: number) {
  const num = ((landcell & 0xFF000000) >>> 0) / 2097152;
  const num2 = ((xOffset / 24.0 + num) - 1019.5) / 10.0;
  return num2;
}

function NSToLandblock(landcell: number, ns: number) {
  const num = ((landcell & 0x00FF0000) >>> 0)  / 8192;
  const num2 = ((ns * 10.0 - num) + 1019.5) * 24.0;
  return num2;
}

function EWToLandblock(landcell: number, ew: number) {
    const num = ((landcell & 0xFF000000) >>> 0) / 2097152;
    const num2 = ((ew * 10.0 - num) + 1019.5) * 24.0;
    return num2;
}


export default class Coordinates {
  readonly CoordinateRegex : RegExp = /(?<NSval>[0-9]{1,3}(?:\\.[0-9]{1,3})?)(?<NSchr>(?:[ns]))(?:[,\\s]+)?(?<EWval>[0-9]{1,3}(?:\\.[0-9]{1,3})?)(?<EWchr>(?:[ew]))?(,?\\s*(?<Zval>\\-?\\d+.?\\d+)z)?/i

  LandCell: number = 0
  LocalX: number = 0
  LocalY: number = 0
  LocalZ: number = 0

  get NS() { return LandblockToNS(this.LandCell, this.LocalY); }
  get EW() { return LandblockToEW(this.LandCell, this.LocalX); }

  public static FromCoordinates(northSouth: number, eastWeast: number, z: number) {
      const landcell = GetLandblockFromCoordinates(eastWeast, northSouth);
      const localX = EWToLandblock(landcell, eastWeast);
      const localY = NSToLandblock(landcell, northSouth);
      const localZ = z;
      return new Coordinates(landcell, localX, localY, localZ);
  }

  public FromLocation(landcell: number, localX: number, localY: number, localZ: number) {
    return new Coordinates(landcell, localX, localY, localZ);
  }

  constructor(landCell: number, localX: number, localY: number, localZ: number) {
    this.LandCell = landCell;
    this.LocalX = localX;
    this.LocalY = localY;
    this.LocalZ = localZ;
    if ((this.LandCell & 0xFFFF) == 0) {
      this.#CalculateOutdoorLandcell();
    }
  }

  #CalculateOutdoorLandcell() {
      this.LandCell = (this.LandCell | (Math.floor(this.LocalX / 24) * 8) + Math.ceil(this.LocalY / 24)) >>> 0;
  }
  
  LBX() {
      return this.LandCell >> 24 & 0xFF;
  }

  LBY() {
      return this.LandCell >> 16 & 0xFF;
  }

  IsOutside() {
      return (this.LandCell & 0xFFFF) < 0x100;
  }
}

Coordinates.prototype.toString = function() {
  return `${Math.abs(this.NS).toFixed(3)}${(this.NS >= 0) ? "N" : "S"}, ${Math.abs(this.EW).toFixed(3)}${(this.EW >= 0) ? "E" : "W"}, ${(this.LocalZ / 240).toFixed(3)}Z [0x${toHexStr(this.LandCell)} ${this.LocalX.toFixed(2)}, ${this.LocalY.toFixed(2)}, ${this.LocalZ.toFixed(2)}]`;
}