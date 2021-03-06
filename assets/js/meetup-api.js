const events = [];

function formatDate( date ) {
	const monthNames = [
		'January', 'February', 'March',
		'April', 'May', 'June', 'July',
		'August', 'September', 'October',
		'November', 'December'
	];
	const weekNames = [
		'Sunday', 'Monday', 'Tuesday', 'Wednesday',
		'Thursday' ,'Friday', 'Saturday',
	];
	const dayofWeek = date.getDay();
	const day = date.getDate();
	const monthIndex = date.getMonth();
	const year = date.getFullYear();
	return date.toLocaleTimeString() + ', ' + weekNames[dayofWeek] + ', ' + day + ', ' + monthNames[monthIndex];
}

$.ajax({
	url: 'https://api.meetup.com/2/events?offset=0&format=json&limited_events=False&group_id=15832012%2C15813572%2C15719982%2C23027469%2C25604122%2C26350537&photo-host=public&page=20&fields=&order=time&desc=false&status=upcoming&sig_id=132403932&sig=dc12a501ae4c704c31417770c63ad3d09f48bbde',
	dataType: 'jsonp',
	success: function(data) {
		events.push(...data['results'])
		const html = events.map( event => {
			if ( event.group.urlname === 'WordPress-Kanpur' ) {
				group = 'wordpress';
			} else if ( event.group.urlname === 'Docker-Kanpur' ) {
				group = 'docker';
			} else if ( event.group.urlname === 'hackerspace-kanpur' ) {
				group = 'hackerspace';
			} else if ( event.group.urlname === 'PyDataKanpur' ) {
				group = 'pydata';
			} else if ( event.group.urlname === 'KanpurPython' ) {
				group = 'python';
			} else if ( event.group.urlname === 'Arduino-IoT-Kanpur' ) {
				group = 'arduino';
			}
			return `<div class="card-media">
						<div class="card-media-object-container">
							<div class="card-media-object" style="background-image: url('/assets/images/${group}.png');"></div>
						</div>
						<div class="card-media-body">
							<div class="card-media-body-top">
								<span class="subtle">${formatDate( new Date( event.time ) )}</span>
								<div class="card-media-body-top-icons u-float-right">
									<a href="https://www.facebook.com/sharer/sharer.php?u=${event.event_url}" target="_blank">
										<svg class="svg-icon"><use xlink:href="/assets/minima-social-icons.svg#facebook"></use></svg>
									</a>
									<a href="https://twitter.com/intent/tweet?text=${event.name + ': ' + event.event_url}&via=KanpurFOSS" target="_blank">
										<svg class="svg-icon"><use xlink:href="/assets/minima-social-icons.svg#twitter"></use></svg>
									</a>
								</div>
							</div>
							<a href="${event.event_url}" target="_blank" class="card-media-body-heading">${event.name}</a>
							<div class="card-media-body-supporting-bottom">
								<span class="card-media-body-supporting-bottom-text subtle">${event.group.name}</span>
								<span class="card-media-body-supporting-bottom-text subtle u-float-right">${event.yes_rsvp_count + ' ' + event.group.who} going</span>
							</div>
							<div class="card-media-body-supporting-bottom card-media-body-supporting-bottom-reveal">
								<span class="card-media-body-supporting-bottom-text subtle">${event.venue.name + ', ' + event.venue.address_1 + ', ' + event.venue.city}</span>
								<a href="${event.event_url}" target="_blank" class="card-media-body-supporting-bottom-text card-media-link u-float-right">RSVP</a>
							</div>
						</div>
					</div>`
		} ).join('');
		const container = document.querySelector( '.container' );
		container.innerHTML = html;
	}
});