  /**
    @class
    <p>A single-value metrics aggregation that keeps track and returns the
    maximum value among the numeric values extracted from the aggregated
    documents. These values can be extracted either from specific numeric fields
    in the documents, or be generated by a provided script.</p>

    @name ejs.MaxAggregation
    @ejs aggregation
    @borrows ejs.MetricsAggregationMixin.field as field
    @borrows ejs.MetricsAggregationMixin.script as script
    @borrows ejs.MetricsAggregationMixin.lang as lang
    @borrows ejs.MetricsAggregationMixin.scriptValuesSorted as scriptValuesSorted
    @borrows ejs.MetricsAggregationMixin.params as params
    @borrows ejs.AggregationMixin._type as _type
    @borrows ejs.AggregationMixin.toJSON as toJSON

    @desc
    <p>Aggregation that keeps track and returns the maximum value among the
    numeric values extracted from the aggregated documents.</p>

    @param {String} name The name which be used to refer to this aggregation.

    */
  ejs.MaxAggregation = function (name) {

    return ejs.MetricsAggregationMixin(name, 'max');
  };
