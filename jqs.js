  $(document).ready(function () {
    let scrollY = 0;
    let lastScrollTop = 0;

    // Reset on load
    $('.burger').removeClass('active');
    $('.burger').children().removeClass('active');
    $('section.navigation').removeClass('mobile');
    $('.mobile-nav').removeClass('open');
    $('body').removeClass('no-scroll').css('top', '');
    $('.nav-sub').removeClass('collapsed');

    function bindEvents() {
      $('.nav-col').off('mouseenter mouseleave click');
      $('.burger').off('click mouseenter');

      // Desktop hover
      if ($(window).width() > 991) {
        $('.nav-col').on('mouseenter', function () {
          const $navLinksCtr = $(this).find('.nav-links-ctr');
          const $navCategory = $(this).find('.nav-category');

          $(this).css('cursor', 'pointer');
          $navCategory.addClass('active');

          if ($navLinksCtr.length > 0) {
            $(this).addClass('moused');
            $navLinksCtr.addClass('open');
          }
        }).on('mouseleave', function () {
          const $navLinksCtr = $(this).find('.nav-links-ctr');
          const $navCategory = $(this).find('.nav-category');

          $navCategory.removeClass('active');

          if ($navLinksCtr.length > 0) {
            $(this).removeClass('moused');
            $navLinksCtr.removeClass('open');
          }
        });

      } else {
        // Mobile click
        $('.nav-col').on('click', function (e) {
          const $navLinksCtr = $(this).find('.nav-links-ctr');
          const $navCategory = $(this).find('.nav-category');
          const isOpen = $(this).hasClass('moused');

          $(this).css('cursor', 'pointer');
          $navCategory.addClass('active');

          if ($navLinksCtr.length > 0) {
            e.preventDefault();

            $('.nav-col').removeClass('moused');
            $('.nav-links-ctr').removeClass('open');
            $('.nav-category').removeClass('active');

            $navCategory.addClass('active');

            if (!isOpen) {
              $(this).addClass('moused');
              $navLinksCtr.addClass('open');
            }
          }
        });
      }

      // Burger click (scroll to top, then restore)
      $('.burger').on('click', function (e) {
        e.preventDefault();
        const isOpen = $(this).hasClass('active');

        $(this).toggleClass('active');
        $(this).children().toggleClass('active');
        $('section.navigation').toggleClass('mobile');
        $('.mobile-nav').toggleClass('open');

        if (!isOpen) {
          scrollY = window.scrollY;
          window.scrollTo({ top: 0, behavior: 'instant' });
          $('body').addClass('no-scroll').css('top', '0');
        } else {
          $('body').removeClass('no-scroll').css('top', '');
          window.scrollTo({ top: scrollY, behavior: 'instant' });
        }
      });

      $('.burger').on('mouseenter', function () {
        $(this).css('cursor', 'pointer');
      });
    }

    function handleScrollCollapse() {
      if ($(window).width() > 992) {
        const currentScroll = $(window).scrollTop();

        if (currentScroll > lastScrollTop) {
          // Scrolling down
          $('.nav-sub').addClass('collapsed');
        } else {
          // Scrolling up
          $('.nav-sub').removeClass('collapsed');
        }

        lastScrollTop = currentScroll;
      } else {
        $('.nav-sub').removeClass('collapsed');
      }
    }

    bindEvents();
    $(window).on('resize', function () {
      bindEvents();
    });

    $(window).on('scroll', handleScrollCollapse);
  });
