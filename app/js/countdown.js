angular.module('contador',['ngSanitize'])

	.controller('ContadorCtrl', ['$scope','$location','$timeout', function ($scope,$location,$timeout) {
		$scope.updateTimer=function(deadline) {
			var time = deadline - new Date(); //return differens between now and deadline
			return {
				'days': Math.floor(time / (1000 * 60 * 60 * 24)),
				'hours': Math.floor((time / (1000 * 60 * 60)) % 24),
				'minutes': Math.floor((time / 1000 / 60) % 60),
				'seconds': Math.floor((time / 1000) % 60),
				'total': time
			};
		};

		$scope.animateClock=function(span) {
			span.className = "turn";
			$timeout(function () {
				span.className = "";
			}, 700);
		};

		$scope.startTimer = function (id, deadline) {
			var timerInterval = setInterval(function () {
				//var clock = angular.element(document).find('#'+id);
				var timer = $scope.updateTimer(deadline);

				$scope.clock = '<span>' + timer.days + '</span>'  //put in clock element our time
					+ '<span>' + timer.hours + '</span>'
					+ '<span>' + timer.minutes + '</span>'
					+ '<span>' + timer.seconds + '</span>';

				var spans =angular.element(document.querySelector('#clock')).find('span');
				//var spans = clock.getElementsByTagName("span");

				$scope.animateClock(spans[3]);
				if (timer.seconds == 59) $scope.animateClock(spans[2]);
				if (timer.minutes == 59 && timer.seconds == 59) $scope.animateClock(spans[1]);
				if (timer.hours == 23 && timer.minutes == 59 && timer.seconds == 59) $scope.animateClock(spans[0]);

				if (timer.total < 1) {
					clearInterval(timerInterval);
					$scope.clock = '<span>0</span><span>0</span><span>0</span><span>0</span>';
				}

			}, 1000);
		};


		$scope.loadcount = function () {
			var url = $location.path();

			if (url == "/inicio") {

			var deadline = new Date("July 18, 2017 19:30:00");
			$scope.startTimer('clock', deadline);
		}
		};


	}]);






