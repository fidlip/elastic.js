  /**
    @class
    <p>A <code>boolQuery</code> allows you to build <em>Boolean</em> query constructs
    from individual term or phrase queries. For example you might want to search
    for documents containing the terms <code>javascript</code> and <code>python</code>.</p>

    @name ejs.BoolQuery
    @ejs query
    @borrows ejs.QueryMixin.boost as boost
    @borrows ejs.QueryMixin._type as _type
    @borrows ejs.QueryMixin.toJSON as toJSON

    @desc
    A Query that matches documents matching boolean combinations of other
    queries, e.g. <code>termQuerys, phraseQuerys</code> or other <code>boolQuerys</code>.

    */
  ejs.BoolQuery = function () {

    let _common = ejs.QueryMixin('bool'), query = _common.toJSON();

    return extend(_common, {

      /**
             Adds query to boolean container. Given query "must" appear in matching documents.

             @member ejs.BoolQuery
             @param {Object} oQuery A valid <code>Query</code> object
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      must: function (oQuery) {
        let i, len;
        
        if (query.bool.must == null) {
          query.bool.must = [];
        }
    
        if (oQuery == null) {
          return query.bool.must;
        }

        if (isQuery(oQuery)) {
          query.bool.must.push(oQuery.toJSON());
        } else if (isArray(oQuery)) {
          query.bool.must = [];
          for (i = 0, len = oQuery.length; i < len; i++) {
            if (!isQuery(oQuery[i])) {
              throw new TypeError('Argument must be an array of Queries');
            }
            
            query.bool.must.push(oQuery[i].toJSON());
          }
        } else {
          throw new TypeError('Argument must be a Query or array of Queries');
        }
        
        return this;
      },

      /**
             Adds query to boolean container. Given query "must not" appear in matching documents.

             @member ejs.BoolQuery
             @param {Object} oQuery A valid query object
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      mustNot: function (oQuery) {
        let i, len;
        
        if (query.bool.must_not == null) {
          query.bool.must_not = [];
        }

        if (oQuery == null) {
          return query.bool.must_not;
        }
    
        if (isQuery(oQuery)) {
          query.bool.must_not.push(oQuery.toJSON());
        } else if (isArray(oQuery)) {
          query.bool.must_not = [];
          for (i = 0, len = oQuery.length; i < len; i++) {
            if (!isQuery(oQuery[i])) {
              throw new TypeError('Argument must be an array of Queries');
            }
            
            query.bool.must_not.push(oQuery[i].toJSON());
          }
        } else {
          throw new TypeError('Argument must be a Query or array of Queries');
        }
        
        return this;
      },

      /**
             Adds query to boolean container. Given query "should" appear in matching documents.

             @member ejs.BoolQuery
             @param {Object} oQuery A valid query object
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      should: function (oQuery) {
        let i, len;
        
        if (query.bool.should == null) {
          query.bool.should = [];
        }

        if (oQuery == null) {
          return query.bool.should;
        }
    
        if (isQuery(oQuery)) {
          query.bool.should.push(oQuery.toJSON());
        } else if (isArray(oQuery)) {
          query.bool.should = [];
          for (i = 0, len = oQuery.length; i < len; i++) {
            if (!isQuery(oQuery[i])) {
              throw new TypeError('Argument must be an array of Queries');
            }
            
            query.bool.should.push(oQuery[i].toJSON());
          }
        } else {
          throw new TypeError('Argument must be a Query or array of Queries');
        }
        
        return this;
      },

      /**
       Adds filter to boolean container.

       @member ejs.BoolQuery
       @param {Object} oFilter A valid <code>Filter</code> object
       @returns {Object} returns <code>this</code> so that calls can be chained.
       */
      filter: function(oFilter) {
        let i, len;

        if (query.bool.filter == null) {
          query.bool.filter = [];
        }

        if (oFilter == null) {
          return query.bool.filter;
        }

        if (isFilter(oFilter)) {
          query.bool.filter.push(oFilter.toJSON());
        } else if (isArray(oFilter)) {
          query.bool.filter = [];
          for (i = 0, len = oFilter.length; i < len; i++) {
            if (!isFilter(oFilter[i])) {
              throw new TypeError('Argument must be an array of Filters');
            }

            query.bool.filter.push(oFilter[i].toJSON());
          }
        } else {
          throw new TypeError('Argument must be a Filter or array of Filters');
        }

        return this;
      },

      /**
       Adds query in filter context to boolean container.

       @member ejs.BoolQuery
       @param {Object} oQuery A valid <code>Query</code> object
       @returns {Object} returns <code>this</code> so that calls can be chained.
       */
      filterQuery: function(oQuery) {
        let i, len;

        if (query.bool.filter == null) {
          query.bool.filter = [];
        }

        if (oQuery == null) {
          return query.bool.filter;
        }

        if (isQuery(oQuery)) {
          query.bool.filter.push(oQuery.toJSON());
        } else if (isArray(oQuery)) {
          query.bool.filter = [];
          for (i = 0, len = oQuery.length; i < len; i++) {
            if (!isQuery(oQuery[i])) {
              throw new TypeError('Argument must be an array of Queries');
            }

            query.bool.filter.push(oQuery[i].toJSON());
          }
        } else {
          throw new TypeError('Argument must be a Query or array of Queries');
        }

        return this;
      },

      /**
            Sets if the <code>Query</code> should be enhanced with a
            <code>MatchAllQuery</code> in order to act as a pure exclude when
            only negative (mustNot) clauses exist. Default: true.

            @member ejs.BoolQuery
            @param {String} trueFalse A <code>true/false</code value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      adjustPureNegative: function (trueFalse) {
        if (trueFalse == null) {
          return query.bool.adjust_pure_negative;
        }

        query.bool.adjust_pure_negative = trueFalse;
        return this;
      },
      
      /**
            Enables or disables similarity coordinate scoring of documents
            matching the <code>Query</code>. Default: false.

            @member ejs.BoolQuery
            @param {String} trueFalse A <code>true/false</code value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      disableCoord: function (trueFalse) {
        if (trueFalse == null) {
          return query.bool.disable_coord;
        }

        query.bool.disable_coord = trueFalse;
        return this;
      },

      /**
            <p>Sets the number of optional clauses that must match.</p>
      
            <p>By default no optional clauses are necessary for a match
            (unless there are no required clauses).  If this method is used,
            then the specified number of clauses is required.</p>

            <p>Use of this method is totally independent of specifying that
            any specific clauses are required (or prohibited).  This number will
            only be compared against the number of matching optional clauses.</p>
   
       Posible types of minMatch:
       Integer
       example: 3
       Indicates a fixed value regardless of the number of optional clauses.

       Negative integer
       example: -2
       Indicates that the total number of optional clauses, minus this number should be mandatory.

       Percentage
       example: "75%"
       Indicates that this percent of the total number of optional clauses are necessary. The number computed from the percentage is rounded down and used as the minimum.

       Negative percentage
       example: "-25%"
       Indicates that this percent of the total number of optional clauses can be missing. The number computed from the percentage is rounded down, before being subtracted from the total to determine the minimum.

       Combination
       example: "3<90%"
       A positive integer, followed by the less-than symbol, followed by any of the previously mentioned specifiers is a conditional specification. It indicates that if the number of optional clauses is equal to (or less than) the integer, they are all required, but if it’s greater than the integer, the specification applies. In this example: if there are 1 to 3 clauses they are all required, but for 4 or more clauses only 90% are required.

       Multiple combinations
       example: 2<-25% 9<-3
       Multiple conditional specifications can be separated by spaces, each one only being valid for numbers greater than the one before it. In this example: if there are 1 or 2 clauses both are required, if there are 3-9 clauses all but 25% are required, and if there are more than 9 clauses, all but three are required.

       NOTE:
       When dealing with percentages, negative values can be used to get different behavior in edge cases. 75% and -25% mean the same thing when dealing with 4 clauses, but when dealing with 5 clauses 75% means 3 are required, but -25% means 4 are required.
       If the calculations based on the specification determine that no optional clauses are needed, the usual rules about BooleanQueries still apply at search time (a BooleanQuery containing no required clauses must still match at least one optional clause)
       No matter what number the calculation arrives at, a value greater than the number of optional clauses, or a value less than 1 will never be used. (ie: no matter how low or how high the result of the calculation result is, the minimum number of required matches will never be lower than 1 or greater than the number of clauses.

            @member ejs.BoolQuery
            @param {Integer} minMatch A positive <code>integer</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      minimumShouldMatch: function(minMatch) {
        if (minMatch == null) {
          return query.bool.minimum_should_match;
        }

        query.bool.minimum_should_match = minMatch;
        return this;
      }
      
    });
  };
