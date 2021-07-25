
docReady( function() {

	var slidesElem = document.querySelector('#IPHONE .all-button-bottom-home');
	var slideSize = getSize( document.querySelector('#IPHONE .button-home') );
	var pckry = new Packery( slidesElem, {
		colWidth: slideSize.outerWidth
	});
  // get item elements
  var itemElems = pckry.getItemElements();
  // for each item...
  for ( var i = 0, len = itemElems.length; i < len; i++ ) {
  	var elem = itemElems[i];
    // make element draggable with Draggabilly
    var draggie = new Draggabilly( elem, {
    	axis: 'x'
    });
    // bind Draggabilly events to Packery
    pckry.bindDraggabillyEvents( draggie );
}

  // re-sort DOM after item is positioned
  // pckry.on( 'dragItemPositioned', function( _pckry, draggedItem ) {
  // 	var index = pckry.items.indexOf( draggedItem );
  // 	var nextItem = pckry.items[ index + 1 ];
  // 	if ( nextItem ) {
  // 		slidesElem.insertBefore( draggedItem.element, nextItem.element );
  // 	} else {
  // 		slidesElem.appendChild( draggedItem.element );
  // 	}

  // });

});

