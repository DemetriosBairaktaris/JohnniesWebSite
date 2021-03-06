//whenver someone clicks on a nav list item (li)
function init() {
  var $main = $("main");
  $(".nav li").on("click", function() {
    var $id = $(this).attr("id");
    if ($id !== ($(".active").attr("id"))) {
      $(".nav li").removeClass("active");
      if ($id === "home") {
        $main.fadeOut(function() {
          populate_menu();
          $main.empty();
          $main.append(gimme_menu_html());
          $main.fadeIn();
        });
      } else if ($id === "contact_us") {
        $main.fadeOut(function() {
          $main.empty();
          $main.append(gimme_contact_us_html());
          $main.fadeIn();
        });
      } else if ($id == "jobs") {
        $main.fadeOut(function() {
          $main.empty();
          $main.append(gimme_jobs_html());
          $main.fadeIn();
        });
      }
      $(this).addClass("active");
    }
  });
  
  $("#admin_control").on("click",function(){
      $main.fadeOut(function(){
           $main.empty();
           $main.append(gimme_admin_form());
           $main.fadeIn();
      });
  });
}

function create_menu_section(section_name, items) {
  var section_name_no_spaces = section_name.replace(/\s+/g, '');
  var html = "<h2 id='" + section_name_no_spaces + "' style='color:white;cursor:pointer' data-toggle='collapse' data-target='#collapse_" + section_name_no_spaces + "'>" + section_name + " <span class='glyphicon glyphicon-menu-down'></span></h2>";
  html += "<div id='collapse_" + section_name_no_spaces + "' class='collapse'>";
  html += "<ul class='list-group menu-list'>";
  items.forEach(function(item, i) {
    html += "<li class='list-group-item' style='background:none;'>" + item + "</li>";
  });
  html += "</ul></div>";
  return html;
}

function populate_menu() {
  $.post("/reg_menu", function(menu) {
    $(".reg_menu ul").remove();
    $(".reg_menu h2").remove();
    menu.menu.forEach(function(item, index) {
      $(".reg_menu").append(create_menu_section(item.category, item.items));
    });
  });
  $.post("/soups", function(soups) {
    $(".soups li").remove();
    soups.soups.forEach(function(item, index) {
      $(".soups").append("<li style='background:none;' class='list-group-item'>" + item + "</li>");
    });
  });
}

function gimme_menu_html() {
  return `<div class="container">
        <div class="jumbotron featured" style='text-align:center;'>
          <h1 class="fancy-font">Now Serving Lemon Rice Soup <strong>Daily</strong></h1>
        </div>
      </div>
        <div class="container contact_us">
         <div class="class-sm-12" id = 'contact_us_for_prices'><h5>Contact Us for Prices</h5></div>
      </div>
      <div class="container menu">
          <div class="col-md-12 soups"><h1 class="fancy-font">Soups of The Day</h1>
            <ul class="list-group">
            </ul>
          </div>
         
          
      </div>
      <div class="container menu" style="margin-top:5px;">
          <div class="col-md-12 reg_menu"><h1 class="fancy-font">Menu</h1></div>
      </div>`;
}

function gimme_contact_us_html() {
  return ` <div class="container contact_us" style="text-align:center;">
        <h1>Contact Us</h1>
         <h2>Location: 1800 81st Ave, Merrillville, IN 46410</h2>
         <h2>Phone: (219) 769-1591</h2>
         
         <ul class="list-group" title="hours">
           <h2>Hours</h2>
           <li class="list-group-item hours">Mon-Sat 6 am - 9 pm</li>
            <li class="list-group-item hours">Sun 6 am - 8 pm</li>
          </ul>
      </div>`;
}

function gimme_jobs_html() {
  return `
    <div class="container">
        <div class="jumbotron well">
            <h2>We are hiring for the following positions</h2>
            <ul class='list-group'>
                <li class='list-group-item'>Server</li>
            </ul>
            <h6>Send Resume to JohnniesRoundTheClock@gmail.com</h6>
        </div>
    </div>
    `;
}

function gimme_admin_form(){
     return ` <div class='container' style=background:rgba(0,0,0,0.5);'> 
            <form class='col-md-12 text-center'>
          <div class="form-group">
            <label for="text">Soup 1</label>
            <input type="text" class="form-control" id="soup1">
          </div>
           <div class="form-group">
            <label for="text">Soup 2</label>
            <input type="text" class="form-control" id="soup2">
          </div>
          <div class="form-group">
            <label for="pwd">Password:</label>
            <input type="password" class="form-control" id="pwd">
          </div>
          <div onclick='submit_soups()' class="btn btn-warning">Submit</div>
         </form>
         </div>
    `;
}

function submit_soups(){
   var $soup1= $("#soup1").val();
   var $soup2 = $("#soup2").val();
   var $pwd =  $("#pwd").val();
   var $main = $("main");
   $.post("/change_soups",{pass:$pwd,soup1:$soup1,soup2:$soup2},function(status){
       $(".alert").remove();
        if (status.msg === "success"){
           var msg = ` <div class="alert alert-success">
              <strong>Success!</strong>
            </div>`
            $main.prepend(msg);
        } 
        else{
            var msg = ` <div class="alert alert-warning">
              <strong>Failed to Submit Soups, maybe bad password!</strong>
            </div>`
            $main.prepend(msg);
        }
       
   }).fail(function(){
       alert("Couldn't connect to server for some reason.....")
   }).done(function(){
       
   });

}