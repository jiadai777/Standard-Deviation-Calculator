var rows = 1;

//add a row to the data entries
function add_row() {
	rows++;
	$(".data").append("<div class=\"form-group row" + rows + "\"><label><h4>Data " + rows + "</h4></label><input type=\"text\" class=\"form-control\" id=\"data" + rows + "\"></div>");
	$(".x-difference").append("<div class=\"form-group row" + rows + "\"><label><h4>Result</h4></label><input type=\"text\" class=\"form-control\" id=\"x-dif" + rows + "\"></div>");
	$(".x-dif-squared").append("<div class=\"form-group row" + rows + "\"><label><h4>Result</h4></label><input type=\"text\" class=\"form-control\" id=\"x-dif-squared" + rows + "\"></div>");
	$(".z-scores").append("<div class=\"form-group row" + rows + "\"><label><h4>Result</h4></label><input type=\"text\" class=\"form-control\" id=\"z-score" + rows + "\"></div>");
	$("#row-num").text(rows);
}

// delete a row in the data entries
function delete_row() {
	$(".row" + rows).remove();
	if (rows > 1) {
		rows--;
	}
	$("#row-num").text(rows);
}

// start to calculate based on data entries
function calculate() {
	var x = get_inputs();

	// check if user inputs are valid or not
	var has_error = check_inputs(x);
	if (has_error) {
		$("#alert").text("There are invalid inputs! Please enter valid data and try again.");
		$("#alert").addClass("red");
	} else {
		var mean = get_mean(x).toFixed(2);
		var x_dif = get_x_difference(mean, x);
		var x_dif_squared = get_squares(x_dif);
		var sum_of_squares = get_sum(x_dif_squared).toFixed(2);
		var s2 = (sum_of_squares / (rows - 1)).toFixed(2);
		var sd = (Math.sqrt(s2)).toFixed(2);
		var zscores = get_zscores(mean, sd, x);

		$("#alert").text("None");
		$("#mean").text(mean);
		$("#sum-of-x-squares").text(sum_of_squares);
		$("#s2").text(s2);
		$("#sd").text(sd);
	}
}

// gte user inputs and store them in an array
function get_inputs() {
	var inputs = [];

	for (i = 1; i <= rows; i++) {

		// if the user did not enter anything, treat it as 0
		if ($("#data" + i).val() == 0) {
			$("#data" + i).val("0");
		}

		inputs.push(Number($("#data" + i).val()));
	}

	return inputs;
}

// check if the inputs are valid numbers
function check_inputs(n) {
	$("*").removeClass("red");

	var error = false;

	for (i = 0; i < n.length; i++) {
		if (isNaN(n[i])) {
			$("#data" + (i + 1)).addClass("red");
			error = true;
		}
	}

	if (error) {
		return true;
	} else {
		return false;
	}
}

// calculate the mean
function get_mean(n) {
	var sum = get_sum(n);

	return (sum / n.length);
}

// get an array of x minus x-bar
function get_x_difference(mean, n) {
	var x_dif = [];

	for (i = 0; i < n.length; i++) {
		var dif = (n[i] - mean).toFixed(2);
		x_dif.push(dif);
		$("#x-dif" + (i + 1)).val("" + dif);
	}

	return x_dif;
}

// square each number in an array and return the new array
function get_squares(n) {
	var squares = [];

	for (i = 0; i < n.length; i++) {
		var square = Math.pow(n[i], 2).toFixed(2);
		squares.push(square);
		$("#x-dif-squared" + (i + 1)).val("" + square);
	}

	return squares;
}

// calculate the sum of all numbers in an array
function get_sum(n) {
	var sum = 0;

	for (i = 0; i < n.length; i++) {
		sum += Number(n[i]);
	}

	return sum;
}

// calculate the z scores of the data entries
function get_zscores(mean, sd, n) {
	var zscores = [];

	for (i = 0; i < n.length; i++) {
		var z = ((n[i] - mean) / sd).toFixed(2);

		$("#z-score" + (i + 1)).val(z);
		zscores.push(z);
	}

	return zscores;
}