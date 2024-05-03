const labels = {
  minZoom: 'minZoom',
  maxZoom: 'maxZoom',
  minZoomForTextures: 'minZoomForTextures',
  showLandcellLines: 'showLandcellLines',
  showLandblockLines: 'showLandblockLines',
  badWireframe: 'badWireframe',
  renderQuality: 'renderQuality'
}

const data =  {
  minZoom: 0.002,
  maxZoom: 1000,
  minZoomForTextures: 0.02,
  showLandcellLines: false,
  showLandblockLines: false,
  badWireframe: false,
  maxRenderQuality: 10,
  minRenderQuality: 1,
  renderQuality: 10,
  get renderScale() {
    return data.maxRenderQuality + 1 - data.renderQuality;
  },
}

export {
  data,
  labels,
};