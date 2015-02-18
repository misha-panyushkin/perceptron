function Perceptron (n) {
	this.weights = this.weights || [];
	while (n--) {
		this.weights[n] == Math.random() + Math.exp(-10);
	}
	this.bias = Math.random() + Math.exp(-10);
	this.learning_constant = Math.random() + Math.exp(-2);
}

Perceptron.prototype = {

	feedForward: function (signals) {
		return this.activation(function (signals) {
			return signals.reduce(function (memo, input, i) {
				return memo + input*this.weights[i];
			}.bind(this), 0) + this.bias;
		}.call(this, signals));
	},


	activation: function (sum) {
		return (Math.exp(sum) - Math.exp(-sum))/(Math.exp(sum) + Math.exp(-sum));
	},


	train: function (signals, output) {
		this.weights.forEach(function (error, weight) {
			weight += this.learning_constant*error*weight;
		}.bind(this, output - this.feedForward(signals)));
	}

};