$(document).ready(function() {
    const HOST = '0.0.0.0';
    const amenityObj = {};

    $('.amenities .popover input').change(function () {
        const key = $(this).data('name');
        const id = $(this).data('id');
        if ($(this).is(':checked')) {
            amenityObj[key] = id;
        } else {
            delete amenityObj[key];
        }
        $('.amenities h4').text(Object.keys(amenityObj).sort().join(', '));
    });

    function apiStatus() {
        $.get(`http://${HOST}:5001/api/v1/status/`, (data) => {
            $('#api_status').toggleClass('available', data.status === 'OK');
        });
    }

    function fetchPlaces(amenities) {
        $.ajax({
            url: `http://${HOST}:5001/api/v1/places_search/`,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ amenities: Object.values(amenities) }),
            success: function(response) {
                $('section.places').empty();
                response.forEach(place => {
                    $('section.places').append(`
                        <article>
                            <div class="title_box">
                                <h2>${place.name}</h2>
                                <div class="price_by_night">$${place.price_by_night}</div>
                            </div>
                            <div class="information">
                                <div class="max_guest">${place.max_guest} Guest(s)</div>
                                <div class="number_rooms">${place.number_rooms} Bedroom(s)</div>
                                <div class="number_bathrooms">${place.number_bathrooms} Bathroom(s)</div>
                            </div>
                            <div class="description">${place.description.replace(/Owner:.*$/, '')}</div>
                        </article>`);
                });
            },
            error: function(error) {
                console.error('Error fetching places:', error);
            }
        });
    }

    $('#filter-button').click(function() {
        fetchPlaces(amenityObj);
    });

    apiStatus();
});
