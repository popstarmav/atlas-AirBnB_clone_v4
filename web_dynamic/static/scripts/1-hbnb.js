#!/usr/bin/node

$(document).ready(function() {
    let selectedAmenities = {};

    $('input[type="checkbox"]').change(function() {
        if (this.checked) {
            selectedAmenities[$(this).data('id')] = $(this).data('name');
        } else {
            delete selectedAmenities[$(this).data('id')];
        }
        let amenitiesList = Object.values(selectedAmenities).join(', ');
        if (amenitiesList.length > 0) {
            $('div.amenities h4').text(amenitiesList);
        } else {
            $('div.amenities h4').html('&nbsp;');
        }
    });
});
