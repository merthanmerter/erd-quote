export function calcExtPrice(ar: any, lme: number, premium: number) {
  const cost: number =
    +ar?.['molds']?.['kgm'] * (ar?.['profileLength'] / 1000) * ((+ar?.['alloys']?.['cost'] + lme + premium) / 1000)
  return Math.round(cost * 100) / 100
}

export function calcSurfaceCost(ar: any) {
  const cost: number =
    +ar?.['molds']?.['perimeter'] *
    (ar?.['profileLength'] / 1000 / 1000) *
    (+ar?.['surfaces']?.['cost'] + +ar?.['colors']?.['cost'])
  return Math.round(cost * 100) / 100
}

export function calcFabricationCost(ar: any) {
  let cost: number = 0

  switch (ar?.['fabrications']?.['unit']) {
    case 'pcs':
      cost = +ar?.['fabrications']?.['cost']
      break
    case 'm':
      cost = +ar?.['fabrications']?.['cost'] * (ar?.['profileLength'] / 1000)
      break
    case 'kg':
      cost = +ar?.['fabrications']?.['cost'] * (+ar?.['molds']?.['kgm'] * (ar?.['profileLength'] / 1000))
      break
    default:
      break
  }

  return Math.round(cost * 100) / 100
}

module.exports = {
  calcExtPrice,
  calcSurfaceCost,
  calcFabricationCost,
}
