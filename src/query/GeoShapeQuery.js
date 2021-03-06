  /**
    @class
    <p>Efficient querying of documents containing shapes indexed using the 
    geo_shape type.</p>

    <p>Much like the geo_shape type, the geo_shape query uses a grid square 
    representation of the query shape to find those documents which have shapes 
    that relate to the query shape in a specified way. In order to do this, the 
    field being queried must be of geo_shape type. The query will use the same 
    PrefixTree configuration as defined for the field.</p>
  
    @name ejs.GeoShapeQuery
    @ejs query
    @borrows ejs.QueryMixin._type as _type
    @borrows ejs.QueryMixin.toJSON as toJSON

    @desc
    A Query to find documents with a geo_shapes matching a specific shape.

    */
  ejs.GeoShapeQuery = function (field) {

    let _common = ejs.QueryMixin('geo_shape'), query = _common.toJSON();

    query.geo_shape[field] = {};

    return extend(_common, {

      /**
            Sets the field to query against.

            @member ejs.GeoShapeQuery
            @param {String} f A valid field name.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      field: function (f) {
        let oldValue = query.geo_shape[field];
    
        if (f == null) {
          return field;
        }

        delete query.geo_shape[field];
        field = f;
        query.geo_shape[f] = oldValue;
    
        return this;
      },

      /**
            Sets the shape

            @member ejs.GeoShapeQuery
            @param {Shape} shape A valid <code>Shape</code> object.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      shape: function (shape) {
        if (shape == null) {
          return query.geo_shape[field].shape;
        }

        if (query.geo_shape[field].indexed_shape != null) {
          delete query.geo_shape[field].indexed_shape;
        }
        
        query.geo_shape[field].shape = shape.toJSON();
        return this;
      },

      /**
            Sets the indexed shape.  Use this if you already have shape definitions
            already indexed.

            @member ejs.GeoShapeQuery
            @param {IndexedShape} indexedShape A valid <code>IndexedShape</code> object.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      indexedShape: function (indexedShape) {
        if (indexedShape == null) {
          return query.geo_shape[field].indexed_shape;
        }

        if (query.geo_shape[field].shape != null) {
          delete query.geo_shape[field].shape;
        }
        
        query.geo_shape[field].indexed_shape = indexedShape.toJSON();
        return this;
      },

      /**
            Sets the shape relation type.  A relationship between a Query Shape 
            and indexed Shapes that will be used to determine if a Document 
            should be matched or not.  Valid values are:  intersects, disjoint,
            and within.

            @member ejs.GeoShapeQuery
            @param {String} relation Relation intersect|disjoint|within.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      relation: function (relation) {
        if (relation == null) {
          return query.geo_shape[field].relation;
        }

        relation = relation.toLowerCase();
        if (relation === 'intersects' || relation === 'disjoint' || relation === 'within') {
          query.geo_shape[field].relation = relation;
        }
      
        return this;
      },

      /**
            <p>Sets the spatial strategy.</p>  
            <p>Valid values are:</p>
            
            <dl>
                <dd><code>recursive</code> - default, recursively traverse nodes in
                  the spatial prefix tree.  This strategy has support for 
                  searching non-point shapes.</dd>
                <dd><code>term</code> - uses a large TermsFilter on each node
                  in the spatial prefix tree.  It only supports the search of 
                  indexed Point shapes.</dd>
            </dl>

            <p>This is an advanced setting, use with care.</p>
            
            @since elasticsearch 0.90
            @member ejs.GeoShapeQuery
            @param {String} strategy The strategy as a string.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      strategy: function (strategy) {
        if (strategy == null) {
          return query.geo_shape[field].strategy;
        }

        strategy = strategy.toLowerCase();
        if (strategy === 'recursive' || strategy === 'term') {
          query.geo_shape[field].strategy = strategy;
        }
        
        return this;
      },
             
      /**
            Sets the boost value for documents matching the <code>Query</code>.

            @member ejs.GeoShapeQuery
            @param {Number} boost A positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      boost: function (boost) {
        if (boost == null) {
          return query.geo_shape[field].boost;
        }

        query.geo_shape[field].boost = boost;
        return this;
      }
      
    });
  };
