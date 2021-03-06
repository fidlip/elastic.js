  /**
    @class
    <p>A method that allows to rescore queries with a typically more expensive.</p>

    @name ejs.Rescore
    @ejs request

    @desc
    <p>Defines an operation that rescores a query with another query.</p>

    @param {Number} windowSize The optional number of documents to reorder per shard.
    @param {Query} qry The optional query to use for rescoring.

    */
  ejs.Rescore = function (windowSize, qry) {

    if (windowSize != null && !isNumber(windowSize)) {
      throw new TypeError('Argument must be a Number');
    }
    
    if (qry != null && !isQuery(qry)) {
      throw new TypeError('Argument must be a Query');
    }
    
    let rescore = {
      query: {},
    };

    if (windowSize != null) {
      rescore.window_size = windowSize;
    }
    
    if (qry != null) {
      rescore.query.rescore_query = qry.toJSON();
    }
    
    return {

      /**
            Sets the query used by the rescoring.

            @member ejs.Rescore
            @param {Query} someQuery a valid query.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      rescoreQuery: function (someQuery) {
        if (someQuery == null) {
          return rescore.query.rescore_query;
        }

        if (!isQuery(someQuery)) {
          throw new TypeError('Argument must be a Query');
        }

        rescore.query.rescore_query = someQuery.toJSON();
        return this;
      },

      /**
            Sets the weight assigned to the original query of the rescoring.

            @member ejs.Rescore
            @param {Number} weight a valid query weight.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      queryWeight: function (weight) {
        if (weight == null) {
          return rescore.query.query_weight;
        }

        if (!isNumber(weight)) {
          throw new TypeError('Argument must be a Number');
        }

        rescore.query.query_weight = weight;
        return this;
      },

      /**
            Sets the weight assigned to the query used to rescore the original query.

            @member ejs.Rescore
            @param {Number} weight a valid rescore query weight.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      rescoreQueryWeight: function (weight) {
        if (weight == null) {
          return rescore.query.rescore_query_weight;
        }

        if (!isNumber(weight)) {
          throw new TypeError('Argument must be a Number');
        }

        rescore.query.rescore_query_weight = weight;
        return this;
      },

      /**
            Sets the window_size parameter of the rescoring.

            @member ejs.Rescore
            @param {Number} size a valid window size.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      windowSize: function (size) {
        if (size == null) {
          return rescore.window_size;
        }

        if (!isNumber(size)) {
          throw new TypeError('Argument must be a Number');
        }

        rescore.window_size = size;
        return this;
      },

      /**
            Sets the scoring mode.  Valid values are:
            
            total - default mode, the scores combined
            multiply - the scores multiplied
            min - the lowest of the scores
            max - the highest score 
            avg - the average of the scores

            @member ejs.Rescore
            @param {String} s The score mode as a string.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      scoreMode: function (s) {
        if (s == null) {
          return rescore.query.score_mode;
        }
    
        s = s.toLowerCase();
        if (s === 'total' || s === 'min' || s === 'max' || s === 'multiply' || 
          s === 'avg') {
          rescore.query.score_mode = s;
        }
        
        return this;
      },

      /**
            The type of ejs object.  For internal use only.

            @member ejs.Rescore
            @returns {String} the type of object
            */
      _type: function () {
        return 'rescore';
      },

      /**
            Retrieves the internal <code>script</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.Rescore
            @returns {{query: {}}} returns this object's internal object representation.
            */
      toJSON: function () {
        return rescore;
      }
    };
  };