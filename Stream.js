(function() {
  var Stream = (function() {

    var Observable = function(producer) {
      this.subscribe = producer
    }

    var Stream = {}

    // .of()
    Stream.of = function(...values){
      const producer = observer => {
        try {
          values.forEach(value => observer.next(value))
          observer.complete()
        } catch(err) {
          observer.error(err)
        }
      }
      return new Observable(producer)
    }

    // .fromArray()
    Stream.fromArray = function(array){
      const producer = observer => {
        try {
          array.forEach(value => observer.next(value))
          observer.complete()
        } catch(err) {
          observer.error(err)
        }
      }
      return new Observable(producer)
    }

    // .fromEvent()
    Stream.fromEvent = function(element, event){
      const producer = observer => {
        const eventHandler = e => {
          observer.next(e)
        }

        try {
          element.addEventListener(event, eventHandler)
        } catch(err) {
          observer.error(err)
        }

        return {
          unsubscribe() {
            element.removeEventListener(event, eventHandler)
          }
        }
      }
      return new Observable(producer)
    }

    // fromPromise()
    Stream.fromPromise = function(promise){
      const producer = observer => {

        promise
          .then(value => {
            observer.next(value)
            observer.complete()
          })
          .catch(reason => {
            observer.error(reason)
          })
        }
      return new Observable(producer)
    }

    // interval()
    Stream.interval = function(period){
      const intervalProducer = function(observer) {
        let counter = 0

        const unsubscribe = function() {
          clearInterval(timer)
        }

        const timer = setInterval(() => {
          try {
            observer.next(counter++)
          } catch(err) {
            unsubscribe()
            observer.error(err)
          }
        }, period)

        return {
          unsubscribe
        }
      }
      return new Observable(intervalProducer)
    }

    // .map()
    Observable.prototype.map = function(transformation){
      const originalProducer = this.subscribe;
      const newProducer = function(observer){
        originalProducer({
          next (value) {observer.next(transformation(value))},
          error (err) {observer.error(err)},
          complete () {observer.complete()}
        })
      }
      return new Observable(newProducer)
    }

    // .mapTo()
    Observable.prototype.mapTo = function(value){
      return this.map(() => value)
    }

    // .filter()
    Observable.prototype.filter = function(predicate){
      const originalProducer = this.subscribe;
      const newProducer = function(observer){
        originalProducer({
          next (value) {
            if (predicate(value) === true) {
              observer.next(value)
            }
          },
          error (err) {observer.error(err)},
          complete () {observer.complete()}
        })
      }
      return new Observable(newProducer)
    }

    // .takeUntil()
    Observable.prototype.takeUntil = function(predicate){
      const originalProducer = this.subscribe;
      const newProducer = function(observer){
        const interval = originalProducer({
          next (value) {
            if (predicate(value) !== true) {
              observer.next(value)
            } else {
              interval.unsubscribe()
            }
          },
          error (err) {observer.error(err)},
          complete () {observer.complete()}
        })
      }
      return new Observable(newProducer)
    }


    return Stream
  })()

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Stream
  else
    window.Stream = Stream
})()
