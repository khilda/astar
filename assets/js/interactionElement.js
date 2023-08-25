export class AAni {
  #makeRandomValue([min, max, decimal = 1]) {
    return Math.floor(Math.random() * (max - min + 1) + min) / decimal
  }

  constructor(element, ...animations) {
    this.element = element
    this.animations = this.applyAnimations(animations)
  }
  applyAnimations(animations) {
    return animations.map(animation => {
      const [ keyframes, options ] = animation
      return this.element.animate(
        Array.isArray(keyframes) ? keyframes : this.#getKeyframes(keyframes),
        this.#setOptions(options) || this.#setOptions()
      )
    })
  }
  play(index) {
    this.animations.forEach(animation => {
      if (`${index}` || !index) {
        animation.play()
      }
    })
  }
  pause(index) {
    this.animations.forEach(animation => {
      if (`${index}` || !index) {
        animation.pause()
      }
    })
  }
  #setOptions(value) {
    const defaultOptions = {
      // delay: 1000,
      duration: 5000,
      easing: 'ease-in-out',
      iterations: 1,
      fill: 'backwards',
      direction: 'alternate',
      // composite: 'add',
    }
    return { ...defaultOptions, ...value }
  }
  #getKeyframes({type, start = 0, end = 0, direction}) {
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
    const startValue = Array.isArray(start) ? this.#makeRandomValue(start) : start
    const endValue = Array.isArray(end) ? this.#makeRandomValue(end) : end
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
            transform: `translate(${startValue * x}px, ${startValue * y}px)`,
          },
          {
            offset: 1,
            transform: `translate(${endValue * x}px, ${endValue * y}px)`,
          },
        ]
        break;
      case 'rotate':
        return [
          {
            offset: 0,
            transform: `rotate(${startValue}deg)`,
          },
          {
            offset: 1,
            transform: `rotate(${endValue}deg)`,
          },
        ]
        break;
      case 'scale':
        return [
          {
            offset: 0,
            transform: `scale(${startValue})`,
          },
          {
            offset: 1,
            transform: `scale(${endValue})`,
          },
        ]
        break;
      case 'skew':
        console.log(startValue, endValue)
        return [
          {
            offset: 0,
            transform: `skew(${startValue}deg, ${startValue}deg)`,
          },
          {
            offset: 1,
            transform: `skew(${endValue}deg, ${endValue}deg)`,
          },
        ]
        break;
      case 'opacity':
        return [
          {
            offset: 0,
            opacity: startValue,
          },
          {
            offset: 1,
            opacity: endValue,
          },
        ]
        break;
    }
  }
}
