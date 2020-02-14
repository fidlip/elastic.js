  /**
    @class
      A multi-bucket aggregation that creates composite buckets from different sources.
    @name ejs.CompositeAggregation
    @ejs aggregation
    @borrows ejs.AggregationMixin._type as _type
    @borrows ejs.AggregationMixin.toJSON as toJSON

    @desc
    <p> Unlike the other multi-bucket aggregation the composite aggregation can be used to paginate all buckets from a multi-level aggregation efficiently. This aggregation provides a way to stream all buckets of a specific aggregation similarly to what scroll does for documents.
        The composite buckets are built from the combinations of the values extracted/created for each document and each combination is considered as a composite bucket.</p>

    @param {String} name The name which be used to refer to this aggregation.

    */
  ejs.CompositeAggregation = function (name) {

    let _common = ejs.AggregationMixin(name), agg = _common.toJSON();

    agg[name].sources = [];

    return extend(_common, {

      /**
       The sources parameter controls the sources that should be used to build the composite buckets. There are three different types of values source:
         - Terms: The terms value source is equivalent to a simple terms aggregation. The values are extracted from a field or a script exactly like the terms aggregation.
         - Histogram: The histogram value source can be applied on numeric values to build fixed size interval over the values. The interval parameter defines how the numeric values should be transformed. For instance an interval set to 5 will translate any numeric values to its closest interval, a value of 101 would be translated to 100 which is the key for the interval between 100 and 105.
         - Date Histogram: The date_histogram is similar to the histogram value source except that the interval is specified by date/time expression

      @member ejs.CompositeAggregation
      @param {Array} sources: array of sources
      @returns {CompositeAggregation|Array} returns <code>this</code> so that calls can be chained or sources if no argument is passed.
      */
      sources: function (sources) {
        if (sources == null) {
          return agg[name].sources;
        }

        agg[name].sources = sources;
        return this;
      }

    });

  };
