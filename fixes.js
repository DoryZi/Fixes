/*======================================================================*\
  ICBIaW50OiBtYWtlIHRoaXMgYXMgY2xvc2UgdG8gcHJvZHVjdGlvbi1yZWFkeSBzb3VyY2
  UgY29kZSBhcyB5b3UgY2FuIQoKICBCb251cyBwb2ludHMgZm9yIHRlbGxpbmcgdXMgd2hh
  dCB0aGlzIGRvZXMgaW4gcGxhaW4gdGVybXM6CgogICAgJycuam9pbihpdGVydG9vbHMuY2
  hhaW4oKnppcChzWy0yOjotMl0sIHNbOjotMl0pKSk=
\*======================================================================*/
// Personally I'm not a big fan of creating objects in this way over creating Object.create / or plain ES3 
// prototypical, however I went with this syntax as I don't understand enough to see what the person that wrote the
// code choose this way over other ways.
// Also it seems nicer and cleaner to use the object literal approach over this nesting of functions and vars.
// again I'm not a big fan, but I went with it for now.

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
	
    // Creates an object that allocates a new or references an
    // existing very expensive resource associated with `id`
    var resource = function (id) {
        // Private data
        var _closed = false;
        var _id = id;
        var _expensive_resource = null;

        // Public data
        var persona = {
        };

        // Public methods
        var getExpensiveResource = function () {
            return _expensive_resource;
        };
        
        persona.getExpensiveResource = getExpensiveResource;

        var getId = function () {
            return _id;
        };
        
        persona.getId = getId;

        var close = function () {
            delete _all_ids[_id];
			// not sure if that's what you mean, but this will add a closed member to the 
			// object, perhaps that is what is wanted, however if so the bug is above when 
			// creating an internal var via the closure. 
            this._closed = true;
        };

        persona.close = close;
        
        // Private methods
        function _lookupOrCreateExpensiveResourceById(id) {
            _expensive_resource = _all_ids[id];
            
            if (_expensive_resource === null) {
                // Just pretend for the sake of this example
                _expensive_resource = {
                    value: "I'm a very expensive resource associated with ID " + id
                };

                _all_ids[id] = _expensive_resource;
            }
            
            return _expensive_resource;
        }
        
        // Initialization
        _expensive_resource = _lookupOrCreateExpensiveResourceById(id);
        
        return persona;
    };

    NAMESPACE.resource = resource;
}
