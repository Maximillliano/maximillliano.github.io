$(document).ready(function() {

	$(".popup").magnificPopup();
});
	
	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("#form").submit(function() { //Change
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: $(this).serialize()
		}).done(function() {
			alert("lol!");
			setTimeout(function() {
				// Done Functions
				$.magnificPopup.close();
			}, 1000);
		});
		return false;
	});	
