  /**
    @class
    <p>A multi-value metrics aggregation that computes stats over numeric values
    extracted from the aggregated documents. These values can be extracted either
    from specific numeric fields in the documents, or be generated by a provided
    script.</p>

    <p>The extended_stats aggregations is an extended version of the
    <code>StatsAggregation</code>, where additional metrics are added such as
    sum_of_squares, variance and std_deviation.</p>

    @name ejs.ExtendedStatsAggregation
    @ejs aggregation
    @borrows ejs.MetricsAggregationMixin.field as field
    @borrows ejs.MetricsAggregationMixin.script as script
    @borrows ejs.MetricsAggregationMixin.lang as lang
    @borrows ejs.MetricsAggregationMixin.scriptValuesSorted as scriptValuesSorted
    @borrows ejs.MetricsAggregationMixin.params as params
    @borrows ejs.AggregationMixin._type as _type
    @borrows ejs.AggregationMixin.toJSON as toJSON

    @desc
    <p>Aggregation that computes extra stats over numeric values extracted from
    the aggregated documents.</p>

    @param {String} name The name which be used to refer to this aggregation.

    */
  ejs.ExtendedStatsAggregation = function (name) {

    return ejs.MetricsAggregationMixin(name, 'extended_stats');
  };
