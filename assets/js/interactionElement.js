export class AstarUtil {
  static uuid() {
    return 'keyframexxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  static types = ['bounce', 'twinkle', 'rotate'];
  static intervals = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'];
  static intervalOptions = {
    xxs: 4,
    xs: 8,
    sm: 18,
    md: 20,
    lg: 40,
    xl: 60,
  }
  static directions = ['top', 'topRight', 'right', 'bottomRight', 'bottom', 'bottomLeft', 'left', 'topLeft'];
  static directionOptions = {
    top: [-1, 0],
    topRight: [-1, 1],
    right: [0, 1],
    bottomRight: [1, 1],
    bottom: [1, 0],
    bottomLeft: [1, -1],
    left: [0, -1],
    topLeft: [-1, -1],
  };
  static makeRandomIndex(min = 0, max = 10) {
    return Math.floor(Math.random() * (max - min)) + min
  }

  static checkRandom(value) {
    return value === 'random'
  }

  static setOptions(options) {
    return options.map(option => {
      const { type } = option
      const time = this.checkRandom(option.time) ? this.makeRandomIndex(500, 4000) : option.time
      const returnOption = {
        ...option,
        uuid: this.uuid(),
        time,
      }
      if (type === 'translate') {
        const direction = this.checkRandom(option.direction) ? this.directions[this.makeRandomIndex(0, this.directions.length)] : option.direction
        const interval = this.checkRandom(option.interval) ? this.intervals[this.makeRandomIndex(0, this.intervals.length)] : option.interval
        returnOption.direction = direction
        returnOption.interval = interval
      } else if (type === 'twinkle') {
        const min = this.checkRandom(option.min) ? this.makeRandomIndex(1, 10) : option.min
        const max = this.checkRandom(option.max) ? this.makeRandomIndex(1, 10) : option.max
        returnOption.min = min
        returnOption.max = max
      } else if (type === 'rotate') {
        const start = this.checkRandom(option.start) ? this.makeRandomIndex(0, 360) : option.start
        const end = this.checkRandom(option.end) ? this.makeRandomIndex(0, 360) : option.end
        returnOption.start = start
        returnOption.end = end
      } else if (type === 'scale') {
        const min = this.checkRandom(option.min) ? this.makeRandomIndex(0, 24) : option.min
        const max = this.checkRandom(option.max) ? this.makeRandomIndex(0, 24) : option.max
        returnOption.min = min
        returnOption.max = max
      } else if (type === 'skew') {
        const axisX = this.checkRandom(option.axisX) ? this.makeRandomIndex(0, 30) : option.axisX
        const axisY = this.checkRandom(option.axisY) ? this.makeRandomIndex(0, 30) : option.axisY
        returnOption.axisX = axisX
        returnOption.axisY = axisY
      }
      return returnOption
    })
  }

  static createKeyframes(option) {
    const { type, uuid } = option
    if (type === 'translate') {
      const { direction, interval } = option
      const [ x, y ] = this.directionOptions[direction]
      const px = this.intervalOptions[interval]
      const keyframes = `
        @keyframes ${uuid} {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(${y * px}px, ${x * px}px);
          }
          100% {
            transform: translate(0, 0);
          }
        }
      `
      return keyframes
    } else if (type === 'twinkle') {
      const { min, max } = option
      const keyframes = `
        @keyframes ${uuid} {
          0% {
            opacity: ${min / 10};
          }
          50% {
            opacity: ${max / 10};
          }
          100% {
            opacity: ${min / 10};
          }
        }
      `
      return keyframes
    } else if (type === 'rotate') {
      const { start, end } = option
      const keyframes = `
        @keyframes ${uuid} {
          0% {
            transform: rotate(${start}deg);
          }
          50% {
            transform: rotate(${end}deg);
          }
          100% {
            transform: rotate(${start}deg);
          }
        }
      `
      return keyframes
    } else if (type === 'scale') {
      const { min, max } = option
      const keyframes = `
        @keyframes ${uuid} {
          0% {
            transform: scale(${min * 0.1});
          }
          50% {
            transform: scale(${max * 0.1});
          }
          100% {
            transform: scale(${min * 0.1});
          }
        }
      `
      return keyframes
    } else if (type === 'skew') {
      const { axisX, axisY } = option
      const keyframes = `
        @keyframes ${uuid} {
          0% {
            transform: skew(0deg, 0deg);
          }
          50% {
            transform: skew(${axisX}deg, ${axisY}deg);
          }
          100% {
            transform: skew(0deg, 0deg);
          }
        }
      `
      return keyframes
    }
  }

  static setKeyframes(option) {
    const styleSheet = document.styleSheets[0];
    
    styleSheet.insertRule(this.createKeyframes(option), styleSheet.cssRules.length)
  }

  static setAnimation({ style }, options) {
    const animation = options.map(option => {
      const { uuid, time, infinite = true } = option
      this.setKeyframes(option)
      return `${uuid} ${time}ms ${infinite ? 'infinite' : ''}`
    })

    style.animation = `${animation.join(', ')}`
  }
  
}

export class AstarInteraction {
  constructor(element, options) {
    this.element = element;
    this.options = AstarUtil.setOptions(options)
    AstarUtil.setAnimation(this.element, this.options)
  }
  
}
