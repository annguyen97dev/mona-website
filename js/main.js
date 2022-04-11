$(document).ready(function () {
  $(".slide-home").addClass("show");

  // let scrWidth = screen.width;

  // if (scrWidth > 1100) {
  //   var mouseX = 0,
  //     mouseY = 0;
  //   var xp = 0,
  //     yp = 0;

  //   $(document).mousemove(function (e) {
  //     mouseX = e.pageX - 5;
  //     mouseY = e.pageY - 40;
  //   });

  //   setInterval(function () {
  //     xp += (mouseX - xp) / 6;
  //     yp += (mouseY - yp) / 6;
  //     $(".mouse-pointer").css({ left: xp + "px", top: yp + "px" });
  //   }, 20);
  // }

  // Effect logo background

  let scrWidth = $(window).width();

  if (scrWidth < 1100) {
    setTimeout(() => {
      $(".wrap-slide").not(".slick-initialized").slick({
        speed: 1000,
        nextArrow:
          '<button class="slick-next" aria-label="Next" type="button"><svg  xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70"> <path id="Polygon_3" data-name="Polygon 3" d="M44.378,0,60.622,9.378,70,25.622V44.378L60.622,60.622,44.378,70H25.622L9.378,60.622,0,44.378V25.622L9.378,9.378,25.622,0Z" fill="#16ccd3"/> </svg><img class="icon" src="images/arrow-icon.svg"/></button>',
      });
    }, 3000);
  }

  // ----------------------

  let g_hover = [
    "23.4,128.5 51.5,156.6 90,167 128.5,156.6 156.6,128.5 167,90 156.6,51.5 128.5,23.4 90,13 51.5,23.4 23.4,51.5 13,90",
    "23.4,128.5 51.5,156.6 90,167 128.5,156.6 156.6,128.5 167,90 156.6,51.5 128.5,23.4 90,1 51.5,23.4 23.4,51.5 13,90",
    "23.4,128.5 51.5,156.6 90,167 128.5,156.6 156.6,128.5 167,90 156.6,51.5 134.5,13.1 90,1 45.5,13.1 23.4,51.5 13,90",
    "23.4,128.5 51.5,156.6 90,167 128.5,156.6 156.6,128.5 167,90 166.9,45.5 134.5,13.1 90,1 45.5,13.1 13.1,45.5 13,90",
    "23.4,128.5 51.5,156.6 90,167 128.5,156.6 156.6,128.5 179,90 166.9,45.5 134.5,13.1 90,1 45.5,13.1 13.1,45.5 1,90",
    "13.1,134.5 51.5,156.6 90,167 128.5,156.6 166.9,134.5 179,90 166.9,45.5 134.5,13.1 90,1 45.5,13.1 13.1,45.5 1,90",
    "13.1,134.5 45.5,166.9 90,167 134.5,166.9 166.9,134.5 179,90 166.9,45.5 134.5,13.1 90,1 45.5,13.1 13.1,45.5 1,90",
    "13.1,134.5 45.5,166.9 90,179 134.5,166.9 166.9,134.5 179,90 166.9,45.5 134.5,13.1 90,1 45.5,13.1 13.1,45.5 1,90",
  ];

  $("body").off("mouseover", "**");

  var timeline = gsap.timeline({
    repeat: false,
    repeatDelay: 0,
    repeatRefresh: true,
  });
  function run_timeline() {
    g_hover.forEach((value, index) => {
      timeline.to(".h-dode-poly", { duration: 0.05 }).call(function () {
        $(".h-dode-poly").attr("points", value);
      });
    });
  }

  function run_timeline_back() {
    timeline
      .to(".h-dode-poly", { duration: 0.05 })
      .call(function () {
        $(".h-dode-poly").attr("points", g_hover[6]);
      })
      .to(".h-dode-poly", { duration: 0.05 })
      .call(function () {
        $(".h-dode-poly").attr("points", g_hover[5]);
      })
      .to(".h-dode-poly", { duration: 0.05 })
      .call(function () {
        $(".h-dode-poly").attr("points", g_hover[4]);
      })
      .to(".h-dode-poly", { duration: 0.05 })
      .call(function () {
        $(".h-dode-poly").attr("points", g_hover[3]);
      })
      .to(".h-dode-poly", { duration: 0.05 })
      .call(function () {
        $(".h-dode-poly").attr("points", g_hover[2]);
      })
      .to(".h-dode-poly", { duration: 0.05 })
      .call(function () {
        $(".h-dode-poly").attr("points", g_hover[1]);
      })
      .to(".h-dode-poly", { duration: 0.05 })
      .call(function () {
        $(".h-dode-poly").attr("points", g_hover[0]);
      });
  }

  let check_run = 0;
  let check_amount = 0;

  // $(".btn-case").on("mouseenter", function () {
  //   check_run++;

  //   if (check_run == 1) {
  //     run_timeline();
  //   }
  // });

  // $(".btn-case").on("mouseleave", function () {
  //   if (check_run == 1) {
  //     run_timeline_back();
  //   }

  //   setTimeout(() => {
  //     check_run = 0;
  //   }, 500);
  // });

  // Click choose country
  const findMarket = (data) => {
    let getID = null;

    $(".wrap-slide-item").each(function (index) {
      let id_name = $(this).attr("id");

      if (data === id_name) {
        let index_slide = $(this).attr("data-slick-index");
        getID = index_slide;
      }
    });

    return getID;
  };

  $(".map-detail").on("click", function () {
    let data = $(this).attr("data-name");
    let index = $(this).index();

    console.log("Index: ", index);

    let getID = findMarket(data);

    $(".wrap-slide").slick("slickGoTo", getID);

    // $(".wrap-slide-item").hide();
    // $("body")
    //   .find(".wrap-slide-item#" + data)
    //   .show();

    // let arrBranch = [
    //   "../images/b-1.png",
    //   "../images/b-1.png",
    // ]
  });

  let getIndex = 0;
  $(".wrap-logo .tri").each(function (index) {
    getIndex++;

    imageUrl = "images/b-" + getIndex.toString() + ".png";

    if (getIndex > 10) {
      getIndex = 0;
    }

    $(this).css("background-image", "url(" + imageUrl + ")");
  });
});
