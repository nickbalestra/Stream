(function() {
  var Stream = (function() {

    var Observable = function(producer) {
      this.subscribe = producer
    }

    var Stream = {}

    // .of()
    Stream.of = function(...values){
    }

    // .fromArray()
    Stream.fromArray = function(array){
    }

    // .fromEvent()
    Stream.fromEvent = function(element, event){
    }

    // fromPromise()
    Stream.fromPromise = function(promise){
    }

    // interval()
    Stream.interval = function(period){
    }

    // .map()
    Observable.prototype.map = function(transformation){
    }

    // .mapTo()
    Observable.prototype.mapTo = function(value){
    }

    // .filter()
    Observable.prototype.filter = function(predicate){
    }

    // .takeUntil()
    Observable.prototype.takeUntil = function(predicate){
    }

    return Stream
  })()

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Stream
  else
    window.Stream = Stream
})()
