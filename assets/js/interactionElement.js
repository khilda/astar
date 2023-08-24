export class AAni {
  static defaultOptions = {
    // delay: 1000,
    duration: 5000,
    easing: 'ease-in-out',
    iterations: 1,
    fill: 'backwards',
    direction: 'alternate',
    // composite: 'add',
  }
  constructor(element, keyframes, options) {
    return element.animate(
      keyframes || AAni.getKeyframes('default'),
      options || AAni.defaultOptions
    )
  }
  applyAnimations(element, keyframes, options) {
    return element.animate(
      keyframes || AAni.getKeyframes('default'),
      options || AAni.defaultOptions
    )
  }
  static setOptions(value) {
    return { ...AAni.defaultOptions, ...value }
  }

  static orderedAnimation(elements) {
    elements.forEach((element, index, thisArr) => {
      if (index !== elements.length - 1) {
        thisArr[index].finished.then(() => thisArr[index + 1].play())
      }
    })
  }

  static getKeyframes(type, start = 0, end = 0, direction) {
    const keyframes = [
      {
        offset: 0,
      },
      {
        offset: 0.5,
      },
      {
        offset: 1,
      },
    ]
    switch(type) {
      case 'translate':
        const directions = {
          top: [0 , -1],
          topRight: [1 , -1],
          right: [1 , 0],
          bottomRight: [1 , 1],
          bottom: [0 , 1],
          bottomLeft: [-1 , 1],
          left: [-1 , 0],
          topLeft: [-1 , -1],
          top: [0 , -1],
        }
        const [ x, y ] = directions[direction || 'bottom'] 
        return [
          {
            offset: 0,
            transform: `translate(${start * x}px, ${start * y}px)`,
          },
          {
            offset: 1,
            transform: `translate(${end * x}px, ${end * y}px)`,
          },
        ]
        break;
      case 'rotate':
        return [
          {
            offset: 0,
            transform: `rotate(${start}deg)`,
          },
          {
            offset: 1,
            transform: `rotate(${end}deg)`,
          },
        ]
        break;
      case 'scale':
        return [
          {
            offset: 0,
            transform: `scale(${start})`,
          },
          {
            offset: 1,
            transform: `scale(${end})`,
          },
        ]
        break;
      case 'skew':
        console.log(start, end)
        return [
          {
            offset: 0,
            transform: `skew(${start}deg, ${start}deg)`,
          },
          {
            offset: 1,
            transform: `skew(${end}deg, ${end}deg)`,
          },
        ]
        break;
      case 'opacity':
        return [
          {
            offset: 0,
            opacity: start,
          },
          {
            offset: 1,
            opacity: end,
          },
        ]
        break;
    }
  }
}
