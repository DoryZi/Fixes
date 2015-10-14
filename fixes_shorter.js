/*======================================================================*\
  ICBIaW50OiBtYWtlIHRoaXMgYXMgY2xvc2UgdG8gcHJvZHVjdGlvbi1yZWFkeSBzb3VyY2
  UgY29kZSBhcyB5b3UgY2FuIQoKICBCb251cyBwb2ludHMgZm9yIHRlbGxpbmcgdXMgd2hh
  dCB0aGlzIGRvZXMgaW4gcGxhaW4gdGVybXM6CgogICAgJycuam9pbihpdGVydG9vbHMuY2
  hhaW4oKnppcChzWy0yOjotMl0sIHNbOjotMl0pKSk=
\*======================================================================*/
// If you really want to use closures, this is a better way.
// lots less code, means lot less places to go wrong..

// First fix, you must first check for undefined, only after you can check for null.
// As NAMESPACE can be undefined, in which case the code will error on this line and not continue.
// also changes to === which you should really almost always use instead of ==
if (typeof NAMESPACE === 'undefined' || NAMESPACE === null) {
    NAMESPACE = {};

	// 1) Must move the _all_ids out of the internal function (resource).
	// before it would create a new array each time, and not maintain the resources
	// as the function lookup or create implies, it would create a new resource each time.
	// also the close seems to delete only the element in the key position.
	// 2) furthermore this should not be an array but an associative array, which is an object and not 
	// an array. 
	var _all_ids = {}; //new Array();


   // Private methods
	var _lookupOrCreateExpensiveResourceById = function(id) {
		_expensive_resource = _all_ids[id].res;
		_all_ids[id].count += 1;
		
		if (_expensive_resource == null) {
			// Just pretend for the sake of this example
			_expensive_resource = {
				value: "I'm a very expensive resource associated with ID " + id
			};

			_all_ids[id] = { res : _expensive_resource, count : 1};
		}
		
		return _expensive_resource;
	}
 

     
    // Creates an object that allocates a new or references an
    // existing very expensive resource associated with `id`
    var resource = function (id) {
	    // Private data
        var _closed = false;
        var _id = id;
        var _expensive_resource = _lookupOrCreateExpensiveResourceById(id);
		
        // Public data
        return {
		  getExpensiveResource : function () {
            return (_closed) ? null : _expensive_resource;
		  },
		  getId : function () {
            return _id;
          },
		  close : function () {
			_all_ids[_id].count -= 1;
			if (_all_ids[_id].count < 1) delete _all_ids[_id];
            _closed = true;
          }
        };
    };

    NAMESPACE.resource = resource;
}

