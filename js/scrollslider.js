$(document).ready(function () {
  console.log("run");

  let activeScroll = 0;

  checkHasClass();

  function checkHasClass(index) {
    // $(".slide").each(function (index) {
    //   if ($(this).hasClass("active") && $(this).hasClass("slide-maps")) {
    //     console.log("Yeah");
    //     $(".navigation").hide();
    //   }
    // });
    // console.log("index: ", index);
    if ($(".slide").eq(index).hasClass("slide-maps")) {
      $(".navigation").hide();
    } else {
      $(".navigation").show();
    }
  }

  function effectNumber() {
    $(".slide-project .slide-content__box p.number-project").text("");
    let countNumber = 0;
    let countNumberC = 0;
    let number = parseInt(
      $(".slide-project .slide-content__box p.number-project").attr(
        "data-number"
      )
    );
    let numberC = parseInt(
      $(".slide-project .slide-content__box p.number-countries").attr(
        "data-number"
      )
    );

    let runCountNumber = setInterval(function () {
      if (countNumber > 1400) {
        countNumber++;
      } else {
        countNumber = countNumber + 10;
      }

      $(".slide-project .slide-content__box p.number-project").text(
        countNumber
      );
      if (countNumber === number) {
        clearTimeout(runCountNumber);
      }
    }, 1000 / 1456);

    let runCountNumberC = setInterval(function () {
      countNumberC++;

      $(".slide-project .slide-content__box p.number-countries").text(
        countNumberC
      );
      if (countNumberC === numberC) {
        clearTimeout(runCountNumberC);
      }
    }, 100);
  }

  function actionInSlide(index) {
    // console.log("INDEX: ", index);
    setTimeout(() => {
      if (index === 0) {
        $(".slide").removeClass("show");
        $(".slide-home").addClass("show");
      }

      if (index === 1) {
        effectNumber();
        $(".slide").removeClass("show");
        $(".slide-project").addClass("show");
      }

      if (index === 2) {
        new Vivus("my-svg", { duration: 200 });
        $(".slide").removeClass("show");
        $(".slide-maps").addClass("show");
      }
    }, 500);
  }

  function nextSlide() {
    let presentIndex = null;

    $(".scroll-slider .slide").each(function (index) {
      checkHasClass(index + 1);
      if (index === $(".scroll-slider .slide").length - 1) {
        nextIndex = 0;
      } else {
        nextIndex = index + 1;
      }

      $(".scroll-slider .slide").removeClass("active-up");
      $(".scroll-slider__pagination .list .number").removeClass("active");

      if ($(this).hasClass("active")) {
        // Active slide and add animation for element
        actionInSlide(nextIndex);
        if (index === $(".scroll-slider .slide").length - 1) {
          console.log("option 1");
          $(this).removeClass("active active-down");
          $(this).addClass("sub-active");

          $(".scroll-slider .slide").eq(0).addClass("active active-down");

          setTimeout(() => {
            $(".scroll-slider__pagination .list .number")
              .eq(0)
              .addClass("active");
          }, 1000);

          $(".scroll-slider .slide")
            .eq(index - 1)
            .removeClass("sub-active");

          return false;
        } else {
          $(this).removeClass("active active-down");
          $(this).addClass("sub-active");

          $(".scroll-slider .slide")
            .eq(index + 1)
            .addClass("active active-down")
            .removeClass("sub-active");

          $(".scroll-slider .slide")
            .eq(index - 1)
            .removeClass("sub-active");

          setTimeout(() => {
            $(".scroll-slider__pagination .list .number")
              .eq(index + 1)
              .addClass("active");
          }, 1000);

          return false;
        }
      }
    });
  }

  function previousSlide() {
    $(".scroll-slider .slide").removeClass("active-down");
    $(".scroll-slider__pagination .list .number").removeClass("active");

    $(".scroll-slider .slide").each(function (index) {
      checkHasClass(index - 1);
      if (index === 0) {
        previousIndex = $(".scroll-slider .slide").length - 1;
      } else {
        previousIndex = index - 1;
      }

      if ($(this).hasClass("active")) {
        actionInSlide(previousIndex);
        if (index === 0) {
          console.log("option 1");
          $(this).removeClass("active active-up");
          $(this).addClass("sub-active");

          $(".scroll-slider .slide")
            .eq($(".slide").length - 1)
            .addClass("active active-up");

          $(".scroll-slider__pagination .list .number")
            .eq($(".slide").length - 1)
            .addClass("active");

          $(".scroll-slider .slide")
            .eq(index + 1)
            .removeClass("sub-active");

          return false;
        } else {
          $(this).removeClass("active active-up");
          $(this).addClass("sub-active");

          $(".scroll-slider .slide")
            .eq(index - 1)
            .addClass("active active-up")
            .removeClass("sub-active");

          $(".scroll-slider .slide")
            .eq(index + 1)
            .removeClass("sub-active");

          $(".scroll-slider__pagination .list .number")
            .eq(index - 1)
            .addClass("active");

          return false;
        }
      }
    });
  }

  function findMaxTimeAnimation() {
    let maxTimeAnimation = null;
    document.getAnimations().forEach(function (animation) {
      if (animation.playState === "finished") {
        if (animation.currentTime > maxTimeAnimation) {
          maxTimeAnimation = animation.currentTime;
        }
      }
    });
    return maxTimeAnimation;
  }

  function findElementHaveMaxTime(maxTime) {
    document.getAnimations().forEach(function (animation) {
      if (animation.currentTime === maxTime) {
        console.log("This element: ", animation);
        return false;
      }
    });
  }

  console.log("Screen: ", screen.width);

  function moveToSlide(deltaY) {
    activeScroll++;

    if (activeScroll < 2) {
      setTimeout(() => {
        if (deltaY < 0) {
          // Scroll Down
          previousSlide();
          activeScroll = 0;
        } else if (deltaY > 0) {
          nextSlide();
          activeScroll = 0;
        }
      }, 300);
    }
  }

  window.addEventListener("wheel", function (event) {
    // let maxTimeAnimation = findMaxTimeAnimation();
    // findElementHaveMaxTime(maxTimeAnimation);
    // let getIndex = null;
    // $(".slide").each(function (index) {
    //   if ($(this).hasClass("active")) {
    //     getIndex = index;
    //   }
    // });

    let screenWidth = screen.width;

    if (screenWidth > 1100) {
      if ($(".modal").length > 0) {
        if (
          $(".modal").css("display") !== "block" ||
          !$(".modal").hasClass("show")
        ) {
          moveToSlide(event.deltaY);
        }
      } else {
        moveToSlide(event.deltaY);
      }
    }
  });

  function checkPosition() {
    let position = null;
    $(".scroll-slider__page .slide").each(function (index) {
      if ($(this).hasClass("active")) {
        position = index;
      }
    });

    return position;
  }

  function handleNext() {
    let position = checkPosition();

    $(".scroll-slider .slide").each(function (index) {
      if ($(this).hasClass("sub-active")) {
        $(this).removeClass("sub-active");
      }
    });

    $(".scroll-slider .slide").eq(position).removeClass("active active-down");
    $(".scroll-slider .slide").eq(position).addClass("sub-active");
  }

  function handlePrevious() {
    let position = checkPosition();

    $(".scroll-slider .slide").each(function (index) {
      if ($(this).hasClass("sub-active")) {
        $(this).removeClass("sub-active");
      }
    });

    $(".scroll-slider .slide").eq(position).removeClass("active active-up");
    $(".scroll-slider .slide").eq(position).addClass("sub-active");
  }

  $(".scroll-slider__pagination .item").each(function (index) {
    $(this).click(function () {
      let position = checkPosition();
      $(".scroll-slider__pagination .list .number").removeClass("active");
      $(this).children().addClass("active");

      if (index > position) {
        $(".scroll-slider .slide").removeClass("active-up");
        handleNext();
        if (position === $(".scroll-slider .slide").length - 1) {
          $(".scroll-slider .slide")
            .eq(0)
            .addClass("active active-down")
            .removeClass("sub-active");
        } else {
          $(".scroll-slider .slide")
            .eq(index)
            .addClass("active active-down")
            .removeClass("sub-active");
        }
      } else {
        $(".scroll-slider .slide").removeClass("active-down");
        handlePrevious();
        if (position === 0) {
          $(".scroll-slider .slide")
            .eq($(".slide").length - 1)
            .addClass("active active-up");
        } else {
          $(".scroll-slider .slide").eq(index).addClass("active active-up");
        }
      }
    });
  });

  $("html").on("click", ".wheel", function () {
    nextSlide();
  });
});
