jQuery(function($) {
	"use strict";
		
		/**
		 * Preloader
		 */
		$(window).on('load', function(){
			$('#pageLoad').fadeOut('fast');
		});
		
		
		/**
		 * Sticky Header
		 */
		$(document).ready(function() {
			$(window).on('scroll', function(){
				$('.navbar-fixed-top').addClass('fixed-position');
				if($(document).scrollTop() < 90){
					$('.navbar-fixed-top').removeClass('fixed-position');
				}
			});
		});
		
		
		/**
		 * bootstrap multi level dropdown
		 */
		 $('.navbar a.dropdown-toggle').on('click', function(e) {
			var $el = $(this);
			var $parent = $(this).offsetParent(".dropdown-menu");
			$(this).parent("li").toggleClass('open');
			$('.nav li.open').not($(this).parents("li")).removeClass("open");
	
			return false;
		});
		
		
		/**
		 * bootstrap multi level dropdown
		 */
		$('.dropdown-toggle').on('hover', function() {
			var dropdownList = $('.dropdown-menu');
			var dropdownOffset = $(this).offset();
			var offsetLeft = dropdownOffset.left;
			var dropdownWidth = dropdownList.width();
			var docWidth = $(window).width();
					
			var subDropdown = $('.dropdown-menu').eq(1);
			var subDropdownWidth = subDropdown.width();
			
			var isDropdownVisible = (offsetLeft + dropdownWidth <= docWidth);
			var isSubDropdownVisible = (offsetLeft + dropdownWidth + subDropdownWidth <= docWidth);
			
			if (!isDropdownVisible || !isSubDropdownVisible) {
				$('.navbar-nav>.dropdown').addClass('edge');
			} else {
				$('.navbar-nav>.dropdown').removeClass('edge');
			}
		});
		
		
		/**
		 * Key Search Scrict
		 */
		$('.search-toggle').on('click', function(){
			$('.navbar').toggleClass('search-active');
			$('.search-input').focus();
		});
		$(document).on('mouseup', function (e){
			var container = $(".navbar");
		
			if (!container.is(e.target)
				&& container.has(e.target).length === 0)
			{
				container.removeClass('search-active');
			}
		});
		
		
		/**
		 * Progrss Bar
		 */
		$('.barra-nivel').each(function() {
		var valorLargura = $(this).data('nivel');
		  //var valorNivel = $(this).html("<span class='valor-nivel'>"+valorLargura+"</span>");
			$(this).animate({
				width: valorLargura
			});
		});
		
		
		/**
		 * Initialization of hero parallax script
		 */
		function parallax(){
		  var scrolled = $(window).scrollTop();
		  $('.hero.banner').css('top',-(scrolled*0.0315)+'rem');
		  $('.hero .banner-caption .container').css('top',-(scrolled*-0.005)+'rem');
		  $('.hero .banner-caption .container').css('opacity',1-(scrolled*0.00175));
		}
		
		var header_height =$('.hero.banner').height();
		var footer_height =$('#footer').height();
		
		$('.content').css({
			'margin-top': header_height +"px"
		 });
		 $('.footer-height').css({
			'height': footer_height +"px"
		 });
 
		$(window).on('resize', function(){
			var header_height =$('.hero.banner').height();
			var footer_height =$('#footer').height();
			
			$('.content').css({
				'margin-top': header_height +"px"
				});
				
			$('.footer-height').css({
				'height': footer_height +"px"
				});
		});
		$(window).on('scroll', function(e){
		  parallax();
		});
		
		
		/**
		 * Background image will updater as window resize
		 */
			$(window).on('load resize orientationchange', function(){
				setTimeout(function() {
					$(window).trigger('fontresize');
					$('.bg-stretch').each(function() {
						var container = $(this),
							img = container.find('img');
						ImageStretcher.resizeImage(img, container);
					});
				}, 200);
		
			var ImageStretcher = {
				getDimensions: function(data) {
					// calculate element coords to fit in mask
					var ratio = data.imageRatio || (data.imageWidth / data.imageHeight),
						slideWidth = data.maskWidth,
						slideHeight = slideWidth / ratio;
		
					if(slideHeight < data.maskHeight) {
						slideHeight = data.maskHeight;
						slideWidth = slideHeight * ratio;
					}
					return {
						width: slideWidth,
						height: slideHeight,
						top: (data.maskHeight - slideHeight) / 2,
						left: (data.maskWidth - slideWidth) / 2
					};
				},
				getRatio: function(image) {
					if(image.prop('naturalWidth')) {
						return image.prop('naturalWidth') / image.prop('naturalHeight');
					} else {
						var img = new Image();
						img.src = image.prop('src');
						return img.width / img.height;
					}
				},
				imageLoaded: function(image, callback) {
					var self = this;
					var loadHandler = function() {
						callback.call(self);
					};
					if(image.prop('complete')) {
						loadHandler();
					} else {
						image.one('load', loadHandler);
					}
				},
				resizeHandler: function() {
					var self = this;
					$.each(this.imgList, function(index, item) {
						if(item.image.prop('complete')) {
							self.resizeImage(item.image, item.container);
						}
					});
				},
				resizeImage: function(image, container) {
					this.imageLoaded(image, function() {
						var styles = this.getDimensions({
							imageRatio: this.getRatio(image),
							maskWidth: container.width(),
							maskHeight: container.height()
						});
						image.css({
							width: styles.width,
							height: styles.height,
							marginTop: styles.top,
							marginLeft: styles.left
						});
					});
				},
				add: function(options) {
					var container = $(options.container ? options.container : window),
						image = typeof options.image === 'string' ? container.find(options.image) : $(options.image);
		
					// resize image
					this.resizeImage(image, container);
		
					// add resize handler once if needed
					if(!this.win) {
						this.resizeHandler = $.proxy(this.resizeHandler, this);
						this.imgList = [];
						this.win = $(window);
						this.win.on('resize orientationchange', this.resizeHandler);
					}
		
					// store item in collection
					this.imgList.push({
						container: container,
						image: image
					});
				}
			};
		});
		
		
		/**
		 * Smooth scroll to anchor
		 */
		 $('body').scrollspy({
			target: '#mainnav',
			offset:70
		});
		$('#mainnav a[href*=#]:not([href=#]), a.arrow[href*=#]:not([href=#]), #view-more[href*=#]:not([href=#])').on('click', function () {
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				if (target.length) {
					$('html, body').animate({ scrollTop: target.offset().top -65 +'px'}, 1000, 'easeInOutExpo');
					return false;
				}
			}
		});
		
		
		/**
		 * jqBootstrapValidation and ajax for contact form
		 */
		$("#contactUs input,#contactUs textarea").jqBootstrapValidation({
			preventSubmit: true,
			submitError: function($form, event, errors) {
				// additional error messages or events
			},
			submitSuccess: function($form, event) {
				event.preventDefault();
				// get values from FORM
				var name = $("input#name").val();
				var email = $("input#email").val();
				var phone = $("input#phone").val();
				var message = $("textarea#message").val();
				var firstName = name;
				
				if (firstName.indexOf(' ') >= 0) {
					firstName = name.split(' ').slice(0, -1).join(' ');
				}
				
				$.ajax({
					url: "././php/contact_me.php",
					type: "POST",
					data: {
						name: name,
						phone: phone,
						email: email,
						message: message
					},
					
					cache: false,
					success: function() {
						// Success message
						$('#success').html("<div class='alert alert-success'>");
						$('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
							.append("</button>");
						$('#success > .alert-success')
							.append("<strong> your message has been sent successfully. </strong>");
						$('#success > .alert-success')
							.append('</div>');
	
						//clear all fields
						$('#contactForm').trigger("reset");
					},
					
					error: function() {
						// Fail message
						$('#success').html("<div class='alert alert-danger'>");
						$('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
							.append("</button>");
						$('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
						$('#success > .alert-danger').append('</div>');
						//clear all fields
						$('#contactForm').trigger("reset");
					},
				})
			},
			
			filter: function() {
				return $(this).is(":visible");
			},
		});
	
		$("a[data-toggle=\"tab\"]").on('click', function(e) {
			e.preventDefault();
			$(this).tab("show");
		});
		
		
		/*When clicking on Full hide fail/success boxes */
		$('#name').on('focus', function() {
			$('#success').html('');
		});
		
		
		/**
		 * Initialization of msnry  and imagesLoaded  script
		 */
		var $grid = $('.grid').masonry({
		  itemSelector: '.grid-item',
		  percentPosition: true,
		});
		$grid.imagesLoaded().progress( function() {
		  $grid.masonry();
		});
		
		
		/**
		 * Initialization of Wow Script
		 */
		new WOW().init();
		
		
		
		/**
		 * Initialization of counter plugin
		 */
			$(document).ready(function(){
				$('.counter').counterUp({
					delay: 10,
					time: 2000
				});
			});
		
		
		/**
		 * Initialization of owl Carousel
		 */
		$(document).ready(function() {
				var owl = $(".client-list");
				  owl.owlCarousel({
						items : 5,
						itemsDesktop : [1199, 4],
						itemsDesktopSmall : [979, 3],
						itemsTablet : [768, 2],
						itemsTabletSmall : true,
						itemsMobile : [479, 1],
						navigation : false,
						pagination : false,
					 });
					 
				var owl = $(".team-list");
				  owl.owlCarousel({
						items : 3,
						itemsDesktop : [1199, 3],
						itemsDesktopSmall : [979, 3],
						itemsTablet : [768, 2],
						itemsTabletSmall : true,
						itemsMobile : [479, 1],
						navigation : true,
						pagination : false,
						navigationText : ["<i class='glyphicon glyphicon-menu-left'></i>", "<i class='glyphicon glyphicon-menu-right'></i>"],
					 });
					 
				var owl = $("#review-list");
				  owl.owlCarousel({
						items : 1,
						navigationText : ["", ""],
						navigation : true,
						singleItem : true,
					 });	
				});
		
		
		/**
		 * Initialization of Same Height Plugin
		 */
		$(document).ready(function(){
			$('body').addClass('js-ready');
			var byRow = $('body').hasClass('js-ready');
	
			$('.same-height').each(function() {
				$('.height').matchHeight({
					byRow: byRow
				});
			});
		});
		
		
		/**
		 * Initialization of Flex Slider Plugin
		 */
		 $(document).ready(function() {
			$('.flexslider').flexslider({
				animation: "fade",
				prevText: "",
				nextText: "",  
				controlNav: false,
				directionNav: true,
				slideshowSpeed: 30000,   
				animationSpeed: 2500,   
				start: function(slider){
				$('body').removeClass('loading');
				}
			});
		});
		
		
 },'jQuery');