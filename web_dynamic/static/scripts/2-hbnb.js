const selectedAmenities = {};

$(document).ready(function () {
  $('input[type=checkbox]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');
    if (this.checked) {
      selectedAmenities[amenityId] = amenityName;
    } else {
      delete selectedAmenities[amenityId];
    }
    $('div.amenities h4').text(Object.values(selectedAmenities).join(', '));
  });

  $.ajax({
    type: 'GET',
    url: 'http://0.0.0.0:5001/api/v1/status/',
    success: function (data) {
      const statusElement = $('div#api_status');
      if (data.status === 'OK') {
        statusElement.addClass('available');
      } else {
        statusElement.removeClass('available');
      }
    }
  });
});
